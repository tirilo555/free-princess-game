import BasePerson, { PersonType } from '../persons/base-person';
import Player from '../persons/player';
import Vagrant from '../persons/vagrant';
import Inventory from '../inventory';
import PersonModel from '../db/models/person.model';
import Robber from '../persons/robber';
import Boss from '../persons/boss';

const personClasses =
  {
    [PersonType.Player]: Player,
    [PersonType.Vagrant]: Vagrant,
    [PersonType.Robber]: Robber,
    [PersonType.Boss]: Boss,
  };
export default class PersonFactory {
  static create(type: PersonType, model: PersonModel, inventory?: Inventory): BasePerson {
    const classPerson: BasePerson = personClasses[PersonType[PersonType[type]]];
    if (!classPerson)
      throw new Error(`Person ${PersonType[type]} type not implemented.`);
    return this.createPerson<typeof classPerson>(classPerson, model, inventory);
  }

  private static createPerson<T>(person: T, model: PersonModel, inventory?: Inventory): T {
    // @ts-ignore
    return new person(model, inventory);
  }
}