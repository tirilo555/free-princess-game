import BaseUseThingStrategy from './base-use-thing.strategy';
import Meal from '../../things/meal';
import Player from '../../persons/player';
import { ThingAction } from '../../things/base-thing';

export default class MealEatStrategy extends BaseUseThingStrategy {
  constructor(private meal: Meal) {
    super()
  }

  async use(player: Player): Promise<void> {
    player.addPower(this.meal.eat());
    player.inventory.removeInventory(this.meal);
    if (!player.inventory.getInventoryList().filter(item => item instanceof Meal).length) {
      const actionIndex: number = player.inventory.actions.findIndex((item: ThingAction) => item === ThingAction.USE_MEAL);
      player.inventory.actions.splice(actionIndex, 1);
    }
  }
}