import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "hero_title_resolution" numeric DEFAULT 400;
  ALTER TABLE "pages" ADD COLUMN "hero_home_art_image_resolution" numeric DEFAULT 600;
  ALTER TABLE "pages" ADD COLUMN "hero_media_resolution" numeric DEFAULT 1200;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_title_resolution" numeric DEFAULT 400;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_home_art_image_resolution" numeric DEFAULT 600;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_resolution" numeric DEFAULT 1200;
  ALTER TABLE "header" ADD COLUMN "logo_resolution" numeric DEFAULT 150;
  ALTER TABLE "footer" ADD COLUMN "logo_resolution" numeric DEFAULT 150;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" DROP COLUMN "hero_title_resolution";
  ALTER TABLE "pages" DROP COLUMN "hero_home_art_image_resolution";
  ALTER TABLE "pages" DROP COLUMN "hero_media_resolution";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_title_resolution";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_home_art_image_resolution";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_resolution";
  ALTER TABLE "header" DROP COLUMN "logo_resolution";
  ALTER TABLE "footer" DROP COLUMN "logo_resolution";`)
}
