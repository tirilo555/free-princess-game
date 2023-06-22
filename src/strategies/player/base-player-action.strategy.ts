import Player from '../../persons/player';

export default abstract class BasePlayerActionStrategy {
  abstract doAction(person: Player): Promise<void>;
}