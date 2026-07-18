import * as migration_20260508_231608_initial from './20260508_231608_initial';
import * as migration_20260510_165012 from './20260510_165012';
import * as migration_20260510_165125_init from './20260510_165125_init';
import * as migration_20260510_182919_image from './20260510_182919_image';
import * as migration_20260525_post_excerpts from './20260525_post_excerpts';
import * as migration_20260525_category_badge_color from './20260525_category_badge_color';
import * as migration_20260525_post_credit_note from './20260525_post_credit_note';
import * as migration_20260525_event_banner_block from './20260525_event_banner_block';
import * as migration_20260525_crew_list_block from './20260525_crew_list_block';
import * as migration_20260527_site_settings_global from './20260527_site_settings_global';
import * as migration_20260527_post_sidebar_and_header_cta from './20260527_post_sidebar_and_header_cta';
import * as migration_20260527_header_post_cta_link_appearance from './20260527_header_post_cta_link_appearance';
import * as migration_20260718_recommended_organizations_block from './20260718_recommended_organizations_block';

export const migrations = [
  {
    up: migration_20260508_231608_initial.up,
    down: migration_20260508_231608_initial.down,
    name: '20260508_231608_initial',
  },
  {
    up: migration_20260510_165012.up,
    down: migration_20260510_165012.down,
    name: '20260510_165012',
  },
  {
    up: migration_20260510_165125_init.up,
    down: migration_20260510_165125_init.down,
    name: '20260510_165125_init',
  },
  {
    up: migration_20260510_182919_image.up,
    down: migration_20260510_182919_image.down,
    name: '20260510_182919_image'
  },
  {
    up: migration_20260525_post_excerpts.up,
    down: migration_20260525_post_excerpts.down,
    name: '20260525_post_excerpts',
  },
  {
    up: migration_20260525_category_badge_color.up,
    down: migration_20260525_category_badge_color.down,
    name: '20260525_category_badge_color',
  },
  {
    up: migration_20260525_post_credit_note.up,
    down: migration_20260525_post_credit_note.down,
    name: '20260525_post_credit_note',
  },
  {
    up: migration_20260525_event_banner_block.up,
    down: migration_20260525_event_banner_block.down,
    name: '20260525_event_banner_block',
  },
  {
    up: migration_20260525_crew_list_block.up,
    down: migration_20260525_crew_list_block.down,
    name: '20260525_crew_list_block',
  },
  {
    up: migration_20260527_site_settings_global.up,
    down: migration_20260527_site_settings_global.down,
    name: '20260527_site_settings_global',
  },
  {
    up: migration_20260527_post_sidebar_and_header_cta.up,
    down: migration_20260527_post_sidebar_and_header_cta.down,
    name: '20260527_post_sidebar_and_header_cta',
  },
  {
    up: migration_20260527_header_post_cta_link_appearance.up,
    down: migration_20260527_header_post_cta_link_appearance.down,
    name: '20260527_header_post_cta_link_appearance',
  },
  {
    up: migration_20260718_recommended_organizations_block.up,
    down: migration_20260718_recommended_organizations_block.down,
    name: '20260718_recommended_organizations_block',
  },
];
