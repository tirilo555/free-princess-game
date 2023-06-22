import BaseThing, { ThingAction } from './things/base-thing';
import Drug from './things/drug';

export default class Inventory {
  get actions(): ThingAction[] {
    return this._actions;
  }
  protected things: BaseThing[];
  protected maxInventorySize = 5;
  private _actions: ThingAction[];
  constructor() {
    this.things = [];
    this._actions = [];
  }

  addToInventory(thing: BaseThing): void {
    if (this.things.length < this.maxInventorySize) {
      this.things.push(thing);
    } else {
      throw new Error("Інвертар гравця повний!");
    }
  }

  getInventoryList(): BaseThing[] {
    return this.things;
  }

  removeInventory(thing: BaseThing): void{
    const index = this.things.findIndex((item) => item.name === thing.name);
    this.things.splice(index,1);
    if (!this.things.filter(item => item instanceof Drug).length)
      this.removeAction(ThingAction.USE_DRUG);
  }

  addAction(action: ThingAction): void{
    if (!this._actions.includes(action))
      this._actions.push(action);
  }
  removeAction(action: ThingAction): void {
    const actionIndex = this.actions.findIndex(item => item === action);
    this.actions.splice(actionIndex);
  }
}