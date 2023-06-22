import Location from '../db/models/location.model';
import Inventory from '../inventory';
import { GameAction } from '../game';
import NumberUtil from '../utils/number.util';
import PersonModel from '../db/models/person.model';

export enum PersonType {
  'Player' = 1, // гравець
  'Vagrant' = 2, // волоцюга
  'Robber' = 3, // розбійник
  'Boss' = 4,
}

export default abstract class BasePerson {
  get power(): number {
    return this._power;
  }
  get actions(): GameAction[] {
    return this._actions;
  }
  get health(): number {
    return this._health;
  }
  set health(value: number) {
    this._health = value;
  }
  public name: string;
  public description?: string;
  public inventory: Inventory;
  private _actions: GameAction[];
  private _health: number;
  private _power: number;
  protected damageEfficiency: number;
  protected currentLocation: Location;

  protected constructor(person: PersonModel) {
    this.name = person.name;
    this.description = person.description;
    this._power = person.power;
    this.damageEfficiency = person.damageEfficiency;
    this._health = person.health;
    this._actions = [];
  }

  setLocation(location: Location): void {
    this.currentLocation = location;
  }

  getLocation(): Location {
    return this.currentLocation;
  }

  addAction(action: GameAction): void {
    if (!this._actions.includes(action))
      this._actions.push(action);
  }

  removeAction(action: GameAction): void {
    const actionIndex = this.actions.findIndex(item => item === action);
    this._actions.splice(actionIndex);
  }

  losePower(level: number): void {
    const power: number = this.power - level;
    this._power = NumberUtil.roundNumber(power > 0 ? power : 0);
  }

  addPower(level: number):void {
    this._power = NumberUtil.roundNumber(this.power + level);
  }
  addHealth(level: number):void {
    const health = NumberUtil.roundNumber(this.health + level);
    this._health = health > 0 ? health : 0;
  }

  getDamageEfficiency(): number {
    return this.damageEfficiency;

  }
}