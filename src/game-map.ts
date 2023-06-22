import MapPosition from './map-position';
import LocationModel from './db/models/location.model';
import BaseThing from './things/base-thing';
import ThingModel from './db/models/things.model';
import ThingFactory from './factories/things.factory';
import numberUtil from './utils/number.util';
import PersonModel from './db/models/person.model';
import BasePerson, { PersonType } from './persons/base-person';
import PersonFactory from './factories/person.factory';
import { diContainer } from './di-container';

export const START_PLAYER_POSITION = 1;
const START_BOSS_POSITION = 16;
export default class GameMap {
  protected positions: Map<number, MapPosition>;

  constructor() {
    this.positions = new Map<number, MapPosition>();
  }

  fillPositions(locations: LocationModel[]): void {
    locations.forEach((location: LocationModel) => {
      this.positions.set(location.id, new MapPosition(location));
    });
  }

  addToPositions<T>(data: T[]): void {
    const locationToPersonType = {
      [PersonType.Boss]: START_BOSS_POSITION,
      [PersonType.Player]: START_PLAYER_POSITION,
    };
    data.forEach((item: T) => {
      let position: MapPosition;
      if (item instanceof ThingModel) {
        position = this.getPositionByIdOrRandom();
        const someThing: BaseThing = ThingFactory.create(item);
        position.things.push(someThing);
      } else if (item instanceof PersonModel) {
        const type: PersonType = PersonType[PersonType[item.type]];
        position = this.getPositionByIdOrRandom(locationToPersonType[type]);
        const somePerson: BasePerson = PersonFactory.create(type, item, diContainer.get('Inventory'));
        position.persons.push(somePerson);
      }
      this.positions.set(position.location.id, position);
    });
  }

  public getPositionByIdOrRandom(locationId?: number): MapPosition {
    const id: number = locationId || numberUtil.getRandomInt(this.positions.size);
    return this.positions.get(id);
  }
}