import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_crew_list_members_accent_color" AS ENUM('orange', 'green', 'white');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_crew_list_members_button_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_crew_list_members_button_appearance" AS ENUM('default', 'outline');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_crew_list_members_accent_color" AS ENUM('orange', 'green', 'white');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_crew_list_members_button_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_crew_list_members_button_appearance" AS ENUM('default', 'outline');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_crew_list" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "anchor" varchar,
      "tagline" varchar,
      "title" varchar NOT NULL,
      "description" varchar DEFAULT 'Made by chill people and a lot of paws',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "pages_blocks_crew_list_members" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "photo_id" integer,
      "name" varchar,
      "role" varchar,
      "accent_color" "enum_pages_blocks_crew_list_members_accent_color" DEFAULT 'orange',
      "description" varchar,
      "note" varchar,
      "button_type" "enum_pages_blocks_crew_list_members_button_type" DEFAULT 'reference',
      "button_new_tab" boolean,
      "button_url" varchar,
      "button_label" varchar,
      "button_appearance" "enum_pages_blocks_crew_list_members_button_appearance" DEFAULT 'default'
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_crew_list" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "anchor" varchar,
      "tagline" varchar,
      "title" varchar,
      "description" varchar DEFAULT 'Made by chill people and a lot of paws',
      "_uuid" varchar,
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_crew_list_members" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "photo_id" integer,
      "name" varchar,
      "role" varchar,
      "accent_color" "enum__pages_v_blocks_crew_list_members_accent_color" DEFAULT 'orange',
      "description" varchar,
      "note" varchar,
      "button_type" "enum__pages_v_blocks_crew_list_members_button_type" DEFAULT 'reference',
      "button_new_tab" boolean,
      "button_url" varchar,
      "button_label" varchar,
      "button_appearance" "enum__pages_v_blocks_crew_list_members_button_appearance" DEFAULT 'default',
      "_uuid" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_crew_list" ADD CONSTRAINT "pages_blocks_crew_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_crew_list_members" ADD CONSTRAINT "pages_blocks_crew_list_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_crew_list"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_crew_list_members" ADD CONSTRAINT "pages_blocks_crew_list_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_crew_list" ADD CONSTRAINT "_pages_v_blocks_crew_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_crew_list_members" ADD CONSTRAINT "_pages_v_blocks_crew_list_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_crew_list"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_crew_list_members" ADD CONSTRAINT "_pages_v_blocks_crew_list_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_crew_list_order_idx" ON "pages_blocks_crew_list" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_crew_list_parent_id_idx" ON "pages_blocks_crew_list" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_crew_list_path_idx" ON "pages_blocks_crew_list" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_crew_list_members_order_idx" ON "pages_blocks_crew_list_members" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_crew_list_members_parent_id_idx" ON "pages_blocks_crew_list_members" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_crew_list_members_photo_idx" ON "pages_blocks_crew_list_members" USING btree ("photo_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_crew_list_order_idx" ON "_pages_v_blocks_crew_list" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_crew_list_parent_id_idx" ON "_pages_v_blocks_crew_list" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_crew_list_path_idx" ON "_pages_v_blocks_crew_list" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_crew_list_members_order_idx" ON "_pages_v_blocks_crew_list_members" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_crew_list_members_parent_id_idx" ON "_pages_v_blocks_crew_list_members" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_crew_list_members_photo_idx" ON "_pages_v_blocks_crew_list_members" USING btree ("photo_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_pages_v_blocks_crew_list_members" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_crew_list" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_crew_list_members" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_crew_list" CASCADE;
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_crew_list_members_button_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_crew_list_members_button_type";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_crew_list_members_accent_color";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_crew_list_members_button_appearance";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_crew_list_members_button_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_crew_list_members_accent_color";
  `)
}
