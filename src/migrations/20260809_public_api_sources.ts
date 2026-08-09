import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_pages_blocks_schedule_data_source" AS ENUM('file', 'api');
    CREATE TYPE "public"."enum_pages_blocks_schedule_api_protocol" AS ENUM('http', 'https');
    CREATE TYPE "public"."enum__pages_v_blocks_schedule_data_source" AS ENUM('file', 'api');
    CREATE TYPE "public"."enum__pages_v_blocks_schedule_api_protocol" AS ENUM('http', 'https');
    CREATE TYPE "public"."enum_pages_blocks_event_banner_capacity_source" AS ENUM('static', 'api');
    CREATE TYPE "public"."enum_pages_blocks_event_banner_capacity_api_protocol" AS ENUM('http', 'https');
    CREATE TYPE "public"."enum_pages_blocks_event_banner_capacity_scope" AS ENUM('overall', 'selectedHotels');
    CREATE TYPE "public"."enum__pages_v_blocks_event_banner_capacity_source" AS ENUM('static', 'api');
    CREATE TYPE "public"."enum__pages_v_blocks_event_banner_capacity_api_protocol" AS ENUM('http', 'https');
    CREATE TYPE "public"."enum__pages_v_blocks_event_banner_capacity_scope" AS ENUM('overall', 'selectedHotels');

    ALTER TABLE "pages_blocks_schedule"
      ADD COLUMN "data_source" "enum_pages_blocks_schedule_data_source" DEFAULT 'file',
      ADD COLUMN "api_protocol" "enum_pages_blocks_schedule_api_protocol" DEFAULT 'https',
      ADD COLUMN "api_domain" varchar;
    ALTER TABLE "_pages_v_blocks_schedule"
      ADD COLUMN "data_source" "enum__pages_v_blocks_schedule_data_source" DEFAULT 'file',
      ADD COLUMN "api_protocol" "enum__pages_v_blocks_schedule_api_protocol" DEFAULT 'https',
      ADD COLUMN "api_domain" varchar;

    ALTER TABLE "pages_blocks_event_banner"
      ADD COLUMN "capacity_source" "enum_pages_blocks_event_banner_capacity_source" DEFAULT 'static',
      ADD COLUMN "capacity_api_protocol" "enum_pages_blocks_event_banner_capacity_api_protocol" DEFAULT 'https',
      ADD COLUMN "capacity_api_domain" varchar,
      ADD COLUMN "capacity_scope" "enum_pages_blocks_event_banner_capacity_scope" DEFAULT 'overall',
      ADD COLUMN "selected_hotel_ids" text;
    ALTER TABLE "_pages_v_blocks_event_banner"
      ADD COLUMN "capacity_source" "enum__pages_v_blocks_event_banner_capacity_source" DEFAULT 'static',
      ADD COLUMN "capacity_api_protocol" "enum__pages_v_blocks_event_banner_capacity_api_protocol" DEFAULT 'https',
      ADD COLUMN "capacity_api_domain" varchar,
      ADD COLUMN "capacity_scope" "enum__pages_v_blocks_event_banner_capacity_scope" DEFAULT 'overall',
      ADD COLUMN "selected_hotel_ids" text;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_schedule"
      DROP COLUMN "data_source",
      DROP COLUMN "api_protocol",
      DROP COLUMN "api_domain";
    ALTER TABLE "_pages_v_blocks_schedule"
      DROP COLUMN "data_source",
      DROP COLUMN "api_protocol",
      DROP COLUMN "api_domain";
    ALTER TABLE "pages_blocks_event_banner"
      DROP COLUMN "capacity_source",
      DROP COLUMN "capacity_api_protocol",
      DROP COLUMN "capacity_api_domain",
      DROP COLUMN "capacity_scope",
      DROP COLUMN "selected_hotel_ids";
    ALTER TABLE "_pages_v_blocks_event_banner"
      DROP COLUMN "capacity_source",
      DROP COLUMN "capacity_api_protocol",
      DROP COLUMN "capacity_api_domain",
      DROP COLUMN "capacity_scope",
      DROP COLUMN "selected_hotel_ids";

    DROP TYPE "public"."enum_pages_blocks_schedule_data_source";
    DROP TYPE "public"."enum_pages_blocks_schedule_api_protocol";
    DROP TYPE "public"."enum__pages_v_blocks_schedule_data_source";
    DROP TYPE "public"."enum__pages_v_blocks_schedule_api_protocol";
    DROP TYPE "public"."enum_pages_blocks_event_banner_capacity_source";
    DROP TYPE "public"."enum_pages_blocks_event_banner_capacity_api_protocol";
    DROP TYPE "public"."enum_pages_blocks_event_banner_capacity_scope";
    DROP TYPE "public"."enum__pages_v_blocks_event_banner_capacity_source";
    DROP TYPE "public"."enum__pages_v_blocks_event_banner_capacity_api_protocol";
    DROP TYPE "public"."enum__pages_v_blocks_event_banner_capacity_scope";
  `)
}
