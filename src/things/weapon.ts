import BaseThing, { ThingAction, ThingArgs } from './base-thing';

export interface WeaponArgs extends ThingArgs {
  damageEfficiency: number;
}

export default class Weapon extends BaseThing {
  get damageEfficiency(): number {
    return this._damageEfficiency;
  }
  set damageEfficiency(value: number) {
    this._damageEfficiency = value;
  }
  private _damageEfficiency: number;
  constructor(args: WeaponArgs) {
    super();
    this.weight = args.weight;
    this.damageEfficiency = args.damageEfficiency;
    this.name = args.name;
    this.description = args.description;
    this.action = ThingAction.USE_WEAPON;
  }
}