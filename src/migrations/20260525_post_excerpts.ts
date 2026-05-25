import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "description" varchar;
    ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "lead" varchar;
    ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_description" varchar;
    ALTER TABLE "_posts_v" ADD COLUMN IF NOT EXISTS "version_lead" varchar;

    UPDATE "posts"
    SET
      "description" = COALESCE("description", "meta_description"),
      "lead" = COALESCE("lead", "meta_description")
    WHERE "meta_description" IS NOT NULL;

    UPDATE "_posts_v"
    SET
      "version_description" = COALESCE("version_description", "version_meta_description"),
      "version_lead" = COALESCE("version_lead", "version_meta_description")
    WHERE "version_meta_description" IS NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "description";
    ALTER TABLE "posts" DROP COLUMN IF EXISTS "lead";
    ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_description";
    ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_lead";
  `)
}
