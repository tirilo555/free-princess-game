import BaseGameActionStrategy from './base-game-action.strategy';
import terminalUtil from '../../utils/terminal.util';
import Path, { Direction } from '../../db/models/path.model';
import Position from '../../map-position';
import MoveActionStrategy from '../player/move-action.strategy';
import Game from '../../game';
import Location from '../../db/models/location.model';
import TerminalUtil from '../../utils/terminal.util';

export default class GameMoveActionStrategy extends BaseGameActionStrategy {
  async doGameAction(game: Game): Promise<void> {
    const location: Location = game.player.getLocation();
    TerminalUtil.regularTyping(`Ви можете рухатися на:`);
    const directions: Direction[] = location.paths.map((path: Path) => path.direction as Direction);
    const pathIndex: number = await terminalUtil.singleColumnMenu(directions);
    const selectedPath: Path = location.paths[pathIndex];
    const newPosition: Position = game.gameMap.getPositionByIdOrRandom(selectedPath.destinationId);
    await game.player.doAction(new MoveActionStrategy(newPosition.location));
  }
}