export interface ThingArgs {
  name: string;
  description: string;
  weight: number;
}

export enum ThingType {
  Meal = 1,
  Drug = 2,
  Weapon = 3,
}

export enum ThingAction {
  USE_MEAL = 1,
  USE_DRUG = 2,
  USE_WEAPON = 3,
}

export enum ThingActionTitle {
  'поїсти' = 1,
  'скористатись ліками' = 2,
  'дістати зброю' = 3,
}

export default abstract class BaseThing {
  public health: number;
  public power: number;
  public weight: number;
  public name: string;
  public description: string;
  public action: ThingAction;

  protected constructor() {
    this.health = 0;
    this.power = 0;
    this.weight = 0;
  }
}