import BasePerson from './persons/base-person';
import BaseThing from './things/base-thing';
import { GameAction } from './game';
import BasePositionActionStrategy from './strategies/position/base-position-action.strategy';
import TellAboutThingActionStrategy from './strategies/position/tell-about-thing-action.strategy';
import TellAboutPersonActionStrategy from './strategies/position/tell-about-person-action.strategy';
import TerminalUtil from './utils/terminal.util';
import Player from './persons/player';
import LocationModel from './db/models/location.model';

export default class MapPosition {
  public key: number;
  get location(): LocationModel {
    return this._location;
  }

  get things(): BaseThing[] {
    return this._things;
  }

  set things(value: BaseThing[]) {
    this._things = value;
  }
  get persons(): BasePerson[] {
    return this._persons;
  }

  set persons(value: BasePerson[]) {
    this._persons = value;
  }
  private _persons: BasePerson[];
  private _things: BaseThing[];
  private _location: LocationModel;

  constructor(location: LocationModel) {
    this._persons = [];
    this._things = [];
    this._location = location;
  }
  getPlayer(): Player {
    let player: Player;
    const id: number = this._persons.findIndex(person => person instanceof Player);
    if (id !== null) {
      player = this._persons[id] as unknown as Player;
      this._persons.splice(id, 1);
    }
    return player;
  }

  getActions(): GameAction[] {
    const actions: GameAction[] = [];
    if (this._things.length) {
      actions.push(GameAction.PICKUP);
    }
    this._persons.forEach(person => {
      if(person.actions.length){
        person.actions.forEach(action => {
          if (!actions.includes(action))
            actions.push(action);
        });
      }
    });
    return actions;
  }

  checkThings(): void {
    if (this._things.length) {
      this._things.forEach((thing: BaseThing) => {
        this.doAction(new TellAboutThingActionStrategy(thing));
      });
    }
  }

  removeThing(thing: BaseThing): void {
    const index: number = this._things.findIndex((item) => item.name === thing.name);
    this._things.splice(index, 1);
  }

  removePerson(person: BasePerson): void {
    const index: number = this._persons.findIndex((item) => item.name === person.name);
    this._persons.splice(index, 1);
  }

  checkPersons(): void {
    if (this._persons.length) {
      this._persons.forEach((person: BasePerson) => {
        this.doAction(new TellAboutPersonActionStrategy(person));
      });
    }
  }

  checkLocation(): void {
    TerminalUtil.regularTyping(`${this.location.description}`);
  }

  private doAction(strategy: BasePositionActionStrategy): void {
    return strategy.doAction();
  }
}