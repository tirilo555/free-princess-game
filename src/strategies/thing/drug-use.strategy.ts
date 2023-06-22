import BaseUseThingStrategy from './base-use-thing.strategy';
import Drug from '../../things/drug';
import Player from '../../persons/player';
import { GameAction } from '../../game';

export default class DrugUseStrategy extends BaseUseThingStrategy {
  constructor(private drug: Drug) {
    super();
  }

  async use(player: Player): Promise<void> {
    player.addHealth(this.drug.take());
    player.inventory.removeInventory(this.drug);
    if (!player.inventory.getInventoryList().length) {
      player.removeAction(GameAction.USE);
    }
    if (player.health <= 0) {
      await player.getGame().gameNotification('Вам не пощастило. Протерміновані ліки діють як отрута');
      await player.getGame().gameOver();
    }
  }
}