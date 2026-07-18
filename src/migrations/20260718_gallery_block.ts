import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_gallery" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "layout" varchar DEFAULT 'grid',
      "autoplay" boolean DEFAULT false,
      "autoplay_interval" numeric DEFAULT 5,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_gallery_images" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_gallery" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "layout" varchar DEFAULT 'grid',
      "autoplay" boolean DEFAULT false,
      "autoplay_interval" numeric DEFAULT 5,
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_gallery_images" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL,
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_gallery_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_gallery_images_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_gallery_images_image_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE restrict ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "pages_v_gallery_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "pages_v_gallery_images_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "pages_v_gallery_images_image_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE restrict ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_gallery_images_image_idx" ON "pages_blocks_gallery_images" USING btree ("image_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_images_order_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_images_parent_id_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_gallery_images_image_idx" ON "_pages_v_blocks_gallery_images" USING btree ("image_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_pages_v_blocks_gallery_images" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_gallery" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_gallery_images" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_gallery" CASCADE;
  `)
}
