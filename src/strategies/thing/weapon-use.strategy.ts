import BaseUseThingStrategy from './base-use-thing.strategy';
import Weapon from '../../things/weapon';
import Player from '../../persons/player';
import { ThingAction } from '../../things/base-thing';
import { GameAction } from '../../game';

export default class WeaponUseStrategy extends BaseUseThingStrategy {
  constructor(private weapon: Weapon) {
    super()
  }
  async use(player: Player): Promise<void> {
    player.takeWeapon(this.weapon);
    player.addAction(GameAction.HIDE_WEAPON);
    player.inventory.removeAction(ThingAction.USE_WEAPON);
  }
}