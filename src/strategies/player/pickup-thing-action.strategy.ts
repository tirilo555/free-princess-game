import BasePlayerActionStrategy from './base-player-action.strategy';
import BaseThing from '../../things/base-thing';
import { GameAction } from '../../game';
import Player from '../../persons/player';

export default class PickupThingActionStrategy extends BasePlayerActionStrategy {
  constructor(private thing: BaseThing) {
    super();
  }

  async doAction(player: Player): Promise<void> {
    player.inventory.addToInventory(this.thing);
    player.inventory.addAction(this.thing.action);
    player.addAction(GameAction.USE);
  }
}