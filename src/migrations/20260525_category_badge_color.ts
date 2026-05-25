import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_categories_badge_color" AS ENUM(
        'orange', 'red', 'purple', 'green', 'white', 'cream'
      );
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    ALTER TABLE "categories"
      ADD COLUMN IF NOT EXISTS "badge_color" "enum_categories_badge_color" DEFAULT 'orange';

    UPDATE "categories" SET "badge_color" = 'orange' WHERE "badge_color" IS NULL;

    ALTER TABLE "categories" ALTER COLUMN "badge_color" SET NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "categories" DROP COLUMN IF EXISTS "badge_color";
    DROP TYPE IF EXISTS "public"."enum_categories_badge_color";
  `)
}
