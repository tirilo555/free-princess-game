import BaseThing, { ThingAction, ThingArgs } from './base-thing';

export interface DrugArgs extends ThingArgs {
  health: number;
}

export default class Drug extends BaseThing {
  constructor(args: DrugArgs) {
    super();
    this.weight = args.weight;
    this.health = args.health;
    this.name = args.name;
    this.description = args.description;
    this.action = ThingAction.USE_DRUG;
  }

  take(): number {
    return this.health;
  }
}