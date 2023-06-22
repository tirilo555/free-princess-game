import BasePerson from './base-person';
import Inventory from '../inventory';
import Game, { GameAction } from '../game';
import PersonModel from '../db/models/person.model';
import BaseUseThingStrategy from '../strategies/thing/base-use-thing.strategy';
import Weapon from '../things/weapon';
import BaseActionStrategy from '../strategies/player/base-player-action.strategy';
import { ThingAction } from '../things/base-thing';
import TerminalUtil from '../utils/terminal.util';

export default class Player extends BasePerson {
  protected game: Game;
  protected weapon: Weapon;

  constructor(person: PersonModel, public inventory: Inventory) {
    super(person);
    this.addAction(GameAction.MOVE);
  }

  setGame(game: Game): void {
    this.game = game;
  }

  getGame(): Game {
    return this.game;
  }

  takeWeapon(weapon: Weapon): void {
    this.weapon = weapon;
  }

  hideWeapon(): void {
    this.inventory.addToInventory(this.weapon);
    this.removeAction(GameAction.HIDE_WEAPON);
    this.inventory.actions.push(ThingAction.USE_WEAPON);
    this.weapon = undefined;
  }

  getDamageEfficiency(): number {
    let damageEfficiency = this.damageEfficiency;
    if (this.weapon) damageEfficiency += this.weapon.damageEfficiency;
    return damageEfficiency;
  }

  async doAction(strategy: BaseActionStrategy): Promise<void> {
    return strategy.doAction(this);
  }

  async useThing(strategy: BaseUseThingStrategy): Promise<void> {
    return strategy.use(this);
  }

  public displayPlayerState(): void {
    const things = this.inventory.getInventoryList();
    let bug: string = '';
    if (things.length)
      bug = things.map(item => item.name).join(', ');
    TerminalUtil.extraTyping(`Стан Гравця: Життя: ${this.health} Сили: ${this.power} Ураження: ${this.getDamageEfficiency()}`);
    TerminalUtil.extraTyping(`Сумка: [${bug}]`);
  }
}
