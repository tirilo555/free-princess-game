import BaseGameActionStrategy from './base-game-action.strategy';
import terminalUtil from '../../utils/terminal.util';
import Game from '../../game';
import BasePerson from '../../persons/base-person';
import FightActionStrategy from '../player/fight-action.strategy';
import { diContainer } from '../../di-container';
import MapPosition from '../../map-position';

export default class GameFightActionStrategy extends BaseGameActionStrategy {
  async doGameAction(game: Game): Promise<void> {
    const position: MapPosition = game.getCurrentPosition();
    let person: BasePerson = position.persons[0];
    if (position.persons.length > 1) {
      terminalUtil.regularTyping('Кому першому бажаєте надерти зад?:');
      const personIndex: number = await terminalUtil.singleColumnMenu(
        position.persons.map((person: BasePerson) => person.name)
      );
      person = position.persons[personIndex];
    }
    await terminalUtil.clear();
    terminalUtil.regularTyping('Поєдинок:');
    await game.player.doAction(new FightActionStrategy(person, diContainer.get('Fighting')));
  }

}