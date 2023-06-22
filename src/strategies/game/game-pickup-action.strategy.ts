import BaseGameActionStrategy from './base-game-action.strategy';
import terminalUtil from '../../utils/terminal.util';
import Position from '../../map-position';
import Game from '../../game';
import BaseThing from '../../things/base-thing';
import PickupThingActionStrategy from '../player/pickup-thing-action.strategy';

export default class GamePickupActionStrategy extends BaseGameActionStrategy {
  async doGameAction(game: Game): Promise<void> {
    const position: Position = game.getCurrentPosition();
    const { things } = position;
    const thingIndex: number = await terminalUtil.singleColumnMenu(things.map((thing: BaseThing) => thing.name));
    const selectedThing: BaseThing = things[thingIndex];
    try {
      await game.player.doAction(new PickupThingActionStrategy(selectedThing));
      position.removeThing(selectedThing);
    } catch (error) {
      await game.gameNotification(error.message);
    }
  }
}