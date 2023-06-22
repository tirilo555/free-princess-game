import Location from '../../db/models/location.model';
import BasePlayerActionStrategy from './base-player-action.strategy';
import BaseThing from '../../things/base-thing';
import NumberUtil from '../../utils/number.util';
import Player from '../../persons/player';
import Meal from '../../things/meal';
import TerminalUtil from '../../utils/terminal.util';

export default class MoveActionStrategy extends BasePlayerActionStrategy {
  private losingPowerBetweenLocations = 1;
  private weightMultiplier: number = 1 / 2;

  constructor(private location: Location) {
    super();
  }

  async doAction(player: Player): Promise<void> {

    player.setLocation(this.location);
    const things: BaseThing[] = player.inventory.getInventoryList();
    const weight: number = things
      .map((item: BaseThing) => item.weight)
      .reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);
    player.losePower(NumberUtil.roundNumber(this.losingPowerBetweenLocations * weight * this.weightMultiplier));
    if (player.health <= 0 && player.inventory.getInventoryList().filter(item => item instanceof Meal).length) {
      TerminalUtil.notificationTyping('У вас закінчилися сили. Вам потрібно поїсти, щоб продовжити шлях.');
    } else if (player.health <= 0) {
      TerminalUtil.notificationTyping('У вас закінчилися сили. Ви не можете рухатися і не маєте їжі, щоб поповнити силу.');
      await player.getGame().gameOver();
    }
  }
}