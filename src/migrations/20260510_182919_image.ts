import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_title_size" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og');
  CREATE TYPE "public"."enum_pages_hero_home_art_image_size" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og');
  CREATE TYPE "public"."enum_pages_hero_media_size" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og');
  CREATE TYPE "public"."enum__pages_v_version_hero_title_size" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og');
  CREATE TYPE "public"."enum__pages_v_version_hero_home_art_image_size" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og');
  CREATE TYPE "public"."enum__pages_v_version_hero_media_size" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og');
  CREATE TYPE "public"."enum_header_logo_size" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og');
  CREATE TYPE "public"."enum_footer_logo_size" AS ENUM('original', 'thumbnail', 'square', 'small', 'medium', 'large', 'xlarge', 'og');
  ALTER TABLE "pages" ADD COLUMN "hero_title_size" "enum_pages_hero_title_size" DEFAULT 'original';
  ALTER TABLE "pages" ADD COLUMN "hero_home_art_image_size" "enum_pages_hero_home_art_image_size" DEFAULT 'original';
  ALTER TABLE "pages" ADD COLUMN "hero_media_size" "enum_pages_hero_media_size" DEFAULT 'original';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_title_size" "enum__pages_v_version_hero_title_size" DEFAULT 'original';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_home_art_image_size" "enum__pages_v_version_hero_home_art_image_size" DEFAULT 'original';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_size" "enum__pages_v_version_hero_media_size" DEFAULT 'original';
  ALTER TABLE "header" ADD COLUMN "logo_size" "enum_header_logo_size" DEFAULT 'original';
  ALTER TABLE "footer" ADD COLUMN "logo_size" "enum_footer_logo_size" DEFAULT 'original';
  ALTER TABLE "pages" DROP COLUMN "hero_title_resolution";
  ALTER TABLE "pages" DROP COLUMN "hero_home_art_image_resolution";
  ALTER TABLE "pages" DROP COLUMN "hero_media_resolution";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_title_resolution";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_home_art_image_resolution";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_resolution";
  ALTER TABLE "header" DROP COLUMN "logo_resolution";
  ALTER TABLE "footer" DROP COLUMN "logo_resolution";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ADD COLUMN "hero_title_resolution" numeric DEFAULT 400;
  ALTER TABLE "pages" ADD COLUMN "hero_home_art_image_resolution" numeric DEFAULT 600;
  ALTER TABLE "pages" ADD COLUMN "hero_media_resolution" numeric DEFAULT 1200;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_title_resolution" numeric DEFAULT 400;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_home_art_image_resolution" numeric DEFAULT 600;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_resolution" numeric DEFAULT 1200;
  ALTER TABLE "header" ADD COLUMN "logo_resolution" numeric DEFAULT 150;
  ALTER TABLE "footer" ADD COLUMN "logo_resolution" numeric DEFAULT 150;
  ALTER TABLE "pages" DROP COLUMN "hero_title_size";
  ALTER TABLE "pages" DROP COLUMN "hero_home_art_image_size";
  ALTER TABLE "pages" DROP COLUMN "hero_media_size";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_title_size";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_home_art_image_size";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_media_size";
  ALTER TABLE "header" DROP COLUMN "logo_size";
  ALTER TABLE "footer" DROP COLUMN "logo_size";
  DROP TYPE "public"."enum_pages_hero_title_size";
  DROP TYPE "public"."enum_pages_hero_home_art_image_size";
  DROP TYPE "public"."enum_pages_hero_media_size";
  DROP TYPE "public"."enum__pages_v_version_hero_title_size";
  DROP TYPE "public"."enum__pages_v_version_hero_home_art_image_size";
  DROP TYPE "public"."enum__pages_v_version_hero_media_size";
  DROP TYPE "public"."enum_header_logo_size";
  DROP TYPE "public"."enum_footer_logo_size";`)
}
