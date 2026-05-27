import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_cta_link_appearance" AS ENUM('default', 'outline', 'disabled');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_site_settings_post_sidebar_cta_link_appearance" AS ENUM('default', 'outline', 'disabled');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "header"
      ADD COLUMN IF NOT EXISTS "cta_link_appearance" "enum_header_cta_link_appearance" DEFAULT 'default';

    ALTER TABLE "site_settings"
      ADD COLUMN IF NOT EXISTS "post_sidebar_cta_link_appearance" "enum_site_settings_post_sidebar_cta_link_appearance" DEFAULT 'default';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "post_sidebar_cta_link_appearance";
    ALTER TABLE "header" DROP COLUMN IF EXISTS "cta_link_appearance";

    DROP TYPE IF EXISTS "public"."enum_site_settings_post_sidebar_cta_link_appearance";
    DROP TYPE IF EXISTS "public"."enum_header_cta_link_appearance";
  `)
}
