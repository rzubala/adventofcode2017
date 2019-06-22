import { Sound } from './sound';
import { Sync } from './sync';

new Sound().start();

const sync0: Sync = new Sync(0);
const sync1: Sync = new Sync(1);

sync0.setSync(sync1);
sync1.setSync(sync0);

sync0.start();
sync1.start();