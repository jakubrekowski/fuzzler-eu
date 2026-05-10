import * as migration_20260508_231608_initial from './20260508_231608_initial';
import * as migration_20260510_165012 from './20260510_165012';
import * as migration_20260510_165125_init from './20260510_165125_init';

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
    name: '20260510_165125_init'
  },
];
