import BaseGameActionStrategy from './base-game-action.strategy';
import terminalUtil from '../../utils/terminal.util';
import Game from '../../game';
import BaseThing, { ThingAction, ThingActionTitle } from '../../things/base-thing';
import Meal from '../../things/meal';
import MealEatStrategy from '../thing/meal-eat.strategy';
import Drug from '../../things/drug';
import DrugUseStrategy from '../thing/drug-use.strategy';
import Weapon from '../../things/weapon';
import WeaponUseStrategy from '../thing/weapon-use.strategy';

export default class GameUseActionStrategy extends BaseGameActionStrategy {
  async doGameAction(game: Game): Promise<void> {
    const actions: ThingAction[] = game.player.inventory.actions;
    const thingActionIndex: number = await terminalUtil.singleColumnMenu(actions.map((action: ThingAction) => ThingActionTitle[action]));
    const selectedThingAction: ThingAction = actions[thingActionIndex];
    switch (selectedThingAction) {
      case ThingAction.USE_MEAL: {
        const meals: BaseThing[] = game.player.inventory.getInventoryList()
          .filter((thing: BaseThing): boolean => thing instanceof Meal);
        const mealIndex: number = await terminalUtil.singleColumnMenu(meals.map((thing: Meal) => thing.name));
        const selectedMeal: Meal = meals[mealIndex] as Meal;
        await game.player.useThing(new MealEatStrategy(selectedMeal));
        break;
      }
      case ThingAction.USE_DRUG: {
        const drugs: BaseThing[] = game.player.inventory.getInventoryList()
          .filter((thing: BaseThing): boolean => thing instanceof Drug);
        const drugIndex: number = await terminalUtil.singleColumnMenu(drugs.map((thing: Drug) => thing.name));
        const selectedDrug: Drug = drugs[drugIndex] as Drug;
        await game.player.useThing(new DrugUseStrategy(selectedDrug));
        break;
      }
      case ThingAction.USE_WEAPON: {
        terminalUtil.regularTyping('Виберіть зброю:');
        const weapons: BaseThing[] = game.player.inventory.getInventoryList()
          .filter((thing: BaseThing): boolean => thing instanceof Weapon);
        const weaponIndex: number = await terminalUtil.singleColumnMenu(weapons.map((thing: Drug) => thing.name));
        const selectedWeapon: Weapon = weapons[weaponIndex] as Weapon;
        await game.player.useThing(new WeaponUseStrategy(selectedWeapon));
        break;
      }
      default:
        terminalUtil.errorTyping(`Дія над предметом ${selectedThingAction} не реалізована в грі.`);
        break;
    }
  }
}