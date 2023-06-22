import BaseGameActionStrategy from './base-game-action.strategy';
import Game from '../../game';
import { diContainer } from '../../di-container';

export default class GameHideWeaponActionStrategy extends BaseGameActionStrategy {
  async doGameAction(game: Game): Promise<void> {
    await game.player.doAction(diContainer.get('HideWeaponActionStrategy'));
  }

}