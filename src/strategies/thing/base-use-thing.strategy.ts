import Player from '../../persons/player';

export default abstract class BaseUseThingStrategy {
  abstract use(player: Player): Promise<void>;
}