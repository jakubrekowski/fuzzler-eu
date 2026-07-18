import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_recommendations" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "anchor" varchar,
      "tagline" varchar DEFAULT '// POLECAM ALLEGROWICZA',
      "title" varchar NOT NULL DEFAULT 'WARTO [[ICH POZNAĆ.]]',
      "description" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_recommendations_organizations" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "name" varchar,
      "description" varchar,
      "image_id" integer,
      "link_url" varchar,
      "link_new_tab" boolean DEFAULT true
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_recommendations" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "anchor" varchar,
      "tagline" varchar DEFAULT '// POLECAM ALLEGROWICZA',
      "title" varchar DEFAULT 'WARTO [[ICH POZNAĆ.]]',
      "description" varchar,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_recommendations_organizations" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "description" varchar,
      "image_id" integer,
      "link_url" varchar,
      "link_new_tab" boolean DEFAULT true,
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_recommendations" ADD CONSTRAINT "pages_recs_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_recommendations_organizations" ADD CONSTRAINT "pages_recs_org_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_recommendations"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_recommendations_organizations" ADD CONSTRAINT "pages_recs_org_image_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_recommendations" ADD CONSTRAINT "pages_v_recs_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_recommendations_organizations" ADD CONSTRAINT "pages_v_recs_org_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_recommendations"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_recommendations_organizations" ADD CONSTRAINT "pages_v_recs_org_image_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_recommendations_order_idx" ON "pages_blocks_recommendations" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_recommendations_parent_id_idx" ON "pages_blocks_recommendations" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_recommendations_path_idx" ON "pages_blocks_recommendations" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_recommendations_organizations_order_idx" ON "pages_blocks_recommendations_organizations" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_recommendations_organizations_parent_id_idx" ON "pages_blocks_recommendations_organizations" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_recommendations_organizations_image_idx" ON "pages_blocks_recommendations_organizations" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_recommendations_order_idx" ON "_pages_v_blocks_recommendations" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_recommendations_parent_id_idx" ON "_pages_v_blocks_recommendations" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_recommendations_path_idx" ON "_pages_v_blocks_recommendations" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_recommendations_organizations_order_idx" ON "_pages_v_blocks_recommendations_organizations" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_recommendations_organizations_parent_id_idx" ON "_pages_v_blocks_recommendations_organizations" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_recommendations_organizations_image_idx" ON "_pages_v_blocks_recommendations_organizations" USING btree ("image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_pages_v_blocks_recommendations_organizations" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_recommendations" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_recommendations_organizations" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_recommendations" CASCADE;
  `)
}
