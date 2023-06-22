import BasePerson from './base-person';
import { GameAction } from '../game';
import PersonModel from '../db/models/person.model';

export default class Boss extends BasePerson {
  constructor(person: PersonModel) {
    super(person);
    this.addAction(GameAction.FIGHT);
  }
}