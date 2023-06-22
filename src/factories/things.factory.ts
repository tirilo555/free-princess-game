import BaseThing, { ThingArgs, ThingType } from '../things/base-thing';
import Weapon from '../things/weapon';
import Meal from '../things/meal';
import ThingModel from '../db/models/things.model';
import Drug from '../things/drug';

export default class ThingFactory {
  static create(options: ThingModel): BaseThing {
    let thing: BaseThing;
    let creatingArgs: ThingArgs = {
      name: options.name,
      description: options.description,
      weight: options.weight,
    };
    switch (options.type) {
      case ThingType.Meal:
        thing = new Meal({ ...creatingArgs, power: options.power});
        break;
      case ThingType.Drug:
        thing = new Drug({ ...creatingArgs, health: options.health});
        break;
      case ThingType.Weapon:
        thing = new Weapon({ ...creatingArgs, damageEfficiency: options.damageEfficiency});
        break;
      default:
    }
    return  thing;
  }
}