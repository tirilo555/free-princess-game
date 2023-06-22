import BasePerson from './base-person';
import PersonModel from '../db/models/person.model';

export default class Vagrant extends BasePerson {

  constructor(person: PersonModel) {
    super(person);
  }
}