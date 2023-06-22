import { GameAction } from '../game';
import { diContainer } from '../di-container';

export default class GameActionFactory {
  static createGameAction(action: GameAction) {
    const actionToStrategy = {
      [GameAction.MOVE]: 'GameMoveActionStrategy',
      [GameAction.FIGHT]: 'GameFightActionStrategy',
      [GameAction.PICKUP]: 'GamePickupActionStrategy',
      [GameAction.USE]: 'GameUseActionStrategy',
      [GameAction.HIDE_WEAPON]: 'GameHideWeaponActionStrategy',
    };
    return diContainer.get(actionToStrategy[action]);
  }
}