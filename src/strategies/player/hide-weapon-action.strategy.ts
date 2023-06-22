import BasePlayerActionStrategy from './base-player-action.strategy';
import Player from '../../persons/player';

export default class HideWeaponActionStrategy extends BasePlayerActionStrategy {
  constructor() {
    super();
  }

  async doAction(player: Player): Promise<void> {
    player.hideWeapon();
  }
}