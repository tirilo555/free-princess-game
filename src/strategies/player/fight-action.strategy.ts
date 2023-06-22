import BasePlayerActionStrategy from './base-player-action.strategy';
import Player from '../../persons/player';
import BasePerson from '../../persons/base-person';
import Fighting from '../../fighting';
import Boss from '../../persons/boss';

export default class FightActionStrategy extends BasePlayerActionStrategy {
  private person: BasePerson;
  private fighting: Fighting;

  constructor(person: BasePerson, fighting: Fighting) {
    super();
    this.person = person;
    this.fighting = fighting;
  }

  async doAction(player: Player): Promise<void> {
    this.fighting.setFighters(player as Player, this.person);
    await this.fighting.fight();
    if (!player.health) {
      await player.getGame().gameNotification(`Ваші життєві сили закінчились. ${this.person.name} переміг вас.`);
      await player.getGame().gameOver();
    } else if (this.person instanceof Boss) {
      await player.getGame().gameNotification('Ваші життєві сили закінчились. Ви програли поєдинок.');
      await player.getGame().gameWon();
    } else {
      await player.getGame().gameNotification(`Ви перемогли ${this.person.name}. Але він також завдав вам поранень, тож варто пошукати ліки, для відновлення життєвих сил.`);
      player.getGame().getCurrentPosition().removePerson(this.person);
    }
    await new Promise(resolve => setTimeout(() => resolve(true), 2000));
    this.fighting.finish();
  }
}