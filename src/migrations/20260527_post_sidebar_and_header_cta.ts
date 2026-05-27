import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_cta_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_site_settings_post_sidebar_cta_link_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "cta_enabled" boolean DEFAULT true;
    ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "cta_link_type" "enum_header_cta_link_type" DEFAULT 'reference';
    ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "cta_link_new_tab" boolean;
    ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "cta_link_url" varchar;
    ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "cta_link_label" varchar;

    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "post_sidebar_cta_enabled" boolean DEFAULT true;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "post_sidebar_cta_eyebrow" varchar DEFAULT '// chcesz przyjechać?';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "post_sidebar_cta_description" varchar DEFAULT 'Nie zwlekaj! Rejestracja trwa.';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "post_sidebar_cta_link_type" "enum_site_settings_post_sidebar_cta_link_type" DEFAULT 'reference';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "post_sidebar_cta_link_new_tab" boolean;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "post_sidebar_cta_link_url" varchar;
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "post_sidebar_cta_link_label" varchar;

    CREATE TABLE IF NOT EXISTS "site_settings_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "pages_id" integer,
      "posts_id" integer
    );

    DO $$ BEGIN
      ALTER TABLE "site_settings_rels"
        ADD CONSTRAINT "site_settings_rels_parent_fk"
        FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings_rels"
        ADD CONSTRAINT "site_settings_rels_pages_fk"
        FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings_rels"
        ADD CONSTRAINT "site_settings_rels_posts_fk"
        FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id")
        ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "site_settings_rels_order_idx" ON "site_settings_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "site_settings_rels_parent_idx" ON "site_settings_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "site_settings_rels_path_idx" ON "site_settings_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "site_settings_rels_pages_id_idx" ON "site_settings_rels" USING btree ("pages_id");
    CREATE INDEX IF NOT EXISTS "site_settings_rels_posts_id_idx" ON "site_settings_rels" USING btree ("posts_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "site_settings_rels" CASCADE;

    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "post_sidebar_cta_link_label";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "post_sidebar_cta_link_url";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "post_sidebar_cta_link_new_tab";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "post_sidebar_cta_link_type";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "post_sidebar_cta_description";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "post_sidebar_cta_eyebrow";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "post_sidebar_cta_enabled";

    ALTER TABLE "header" DROP COLUMN IF EXISTS "cta_link_label";
    ALTER TABLE "header" DROP COLUMN IF EXISTS "cta_link_url";
    ALTER TABLE "header" DROP COLUMN IF EXISTS "cta_link_new_tab";
    ALTER TABLE "header" DROP COLUMN IF EXISTS "cta_link_type";
    ALTER TABLE "header" DROP COLUMN IF EXISTS "cta_enabled";

    DROP TYPE IF EXISTS "public"."enum_site_settings_post_sidebar_cta_link_type";
    DROP TYPE IF EXISTS "public"."enum_header_cta_link_type";
  `)
}
