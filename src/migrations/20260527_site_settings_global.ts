import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "site_settings" (
      "id" serial PRIMARY KEY NOT NULL,
      "og_logo_id" integer,
      "og_icon_id" integer,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );

    DO $$ BEGIN
      ALTER TABLE "site_settings"
        ADD CONSTRAINT "site_settings_og_logo_id_media_id_fk"
        FOREIGN KEY ("og_logo_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings"
        ADD CONSTRAINT "site_settings_og_icon_id_media_id_fk"
        FOREIGN KEY ("og_icon_id") REFERENCES "public"."media"("id")
        ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "site_settings_og_logo_idx" ON "site_settings" USING btree ("og_logo_id");
    CREATE INDEX IF NOT EXISTS "site_settings_og_icon_idx" ON "site_settings" USING btree ("og_icon_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "site_settings" CASCADE;
  `)
}
