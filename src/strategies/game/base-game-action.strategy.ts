import Game from '../../game';

export default abstract class BaseGameActionStrategy {
  abstract doGameAction(game: Game): Promise<void>;
}