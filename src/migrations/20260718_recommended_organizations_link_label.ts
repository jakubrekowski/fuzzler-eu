import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_recommendations_organizations"
      ADD COLUMN IF NOT EXISTS "link_label" varchar DEFAULT 'Poznaj organizację';

    ALTER TABLE "_pages_v_blocks_recommendations_organizations"
      ADD COLUMN IF NOT EXISTS "link_label" varchar DEFAULT 'Poznaj organizację';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages_blocks_recommendations_organizations"
      DROP COLUMN IF EXISTS "link_label";

    ALTER TABLE "_pages_v_blocks_recommendations_organizations"
      DROP COLUMN IF EXISTS "link_label";
  `)
}
