import BaseThing, { ThingAction, ThingArgs } from './base-thing';
export interface MealArgs extends ThingArgs {
  power: number;
}

export default class Meal extends BaseThing {
  public name: string;
  public description: string;

  constructor(args: MealArgs) {
    super();
    this.weight = args.weight;
    this.power = args.power;
    this.name = args.name;
    this.description = args.description;
    this.action = ThingAction.USE_MEAL;
  }
  eat(){
    return this.power;
  }
}