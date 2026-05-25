import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_event_banner_button_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_event_banner_button_appearance" AS ENUM('default', 'outline', 'disabled');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_event_banner_button_type" AS ENUM('reference', 'custom');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum__pages_v_blocks_event_banner_button_appearance" AS ENUM('default', 'outline', 'disabled');
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE TABLE IF NOT EXISTS "pages_blocks_event_banner" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "meta_line" varchar DEFAULT '04-06.09.2026 · HOTEL AMELIÓWKA',
      "heading" varchar NOT NULL DEFAULT 'WPADNIJ NA [[FURR MEETUP.]]',
      "show_capacity" boolean DEFAULT true,
      "capacity_limit" numeric DEFAULT 120,
      "spots_remaining" numeric DEFAULT 47,
      "show_check_icon" boolean DEFAULT true,
      "button_type" "enum_pages_blocks_event_banner_button_type" DEFAULT 'reference',
      "button_new_tab" boolean,
      "button_url" varchar,
      "button_label" varchar,
      "button_appearance" "enum_pages_blocks_event_banner_button_appearance" DEFAULT 'default',
      "block_name" varchar
    );

    CREATE TABLE IF NOT EXISTS "_pages_v_blocks_event_banner" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "meta_line" varchar DEFAULT '04-06.09.2026 · HOTEL AMELIÓWKA',
      "heading" varchar NOT NULL DEFAULT 'WPADNIJ NA [[FURR MEETUP.]]',
      "show_capacity" boolean DEFAULT true,
      "capacity_limit" numeric DEFAULT 120,
      "spots_remaining" numeric DEFAULT 47,
      "show_check_icon" boolean DEFAULT true,
      "button_type" "enum__pages_v_blocks_event_banner_button_type" DEFAULT 'reference',
      "button_new_tab" boolean,
      "button_url" varchar,
      "button_label" varchar,
      "button_appearance" "enum__pages_v_blocks_event_banner_button_appearance" DEFAULT 'default',
      "_uuid" varchar,
      "block_name" varchar
    );

    DO $$ BEGIN
      ALTER TABLE "pages_blocks_event_banner" ADD CONSTRAINT "pages_blocks_event_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "_pages_v_blocks_event_banner" ADD CONSTRAINT "_pages_v_blocks_event_banner_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END $$;

    CREATE INDEX IF NOT EXISTS "pages_blocks_event_banner_order_idx" ON "pages_blocks_event_banner" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_event_banner_parent_id_idx" ON "pages_blocks_event_banner" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_event_banner_path_idx" ON "pages_blocks_event_banner" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_event_banner_order_idx" ON "_pages_v_blocks_event_banner" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_event_banner_parent_id_idx" ON "_pages_v_blocks_event_banner" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "_pages_v_blocks_event_banner_path_idx" ON "_pages_v_blocks_event_banner" USING btree ("_path");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "_pages_v_blocks_event_banner" CASCADE;
    DROP TABLE IF EXISTS "pages_blocks_event_banner" CASCADE;
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_event_banner_button_appearance";
    DROP TYPE IF EXISTS "public"."enum__pages_v_blocks_event_banner_button_type";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_event_banner_button_appearance";
    DROP TYPE IF EXISTS "public"."enum_pages_blocks_event_banner_button_type";
  `)
}
