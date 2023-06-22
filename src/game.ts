import Location from './db/models/location.model';
import TerminalUtil, { SlowTypingColor } from './utils/terminal.util';
import MoveActionStrategy from './strategies/player/move-action.strategy';
import Position from './map-position';
import MapPosition from './map-position';
import ThingModel from './db/models/things.model';
import { Connection } from './db/connection';
import GameMap, { START_PLAYER_POSITION } from './game-map';
import PersonModel from './db/models/person.model';
import Player from './persons/player';
import BaseGameActionStrategy from './strategies/game/base-game-action.strategy';
import GameActionFactory from './factories/game-action.factory';
import BasePerson from './persons/base-person';

enum GameState {
  PROCESS,
  GAME_WON,
  GAME_OVER
}

export enum GameAction {
  MOVE = 'рухатися',
  FIGHT = 'битися',
  PICKUP = 'взяти в сумку',
  USE = 'скористатися предметом з сумки',
  HIDE_WEAPON = 'заховати зброю',
}

export default class Game {
  private gameState: GameState;
  public player: Player;

  constructor(public gameMap: GameMap) {
    this.gameState = GameState.PROCESS;
  }

  async start(): Promise<void> {
    try {
      await this.initDB();
      await this.initGame();
    } catch (error) {
      console.log(`Error game initial: ${error instanceof TypeError ? error.message : 'unknown error'}`);
      process.exit();
    }
    await TerminalUtil.clear();
    await this.intro();
    do {
      await this.process();
    } while (this.gameState === GameState.PROCESS);
  }

  private async initDB(): Promise<void> {
    try {
      await Connection.initialize();
    } catch (error) {
      throw new Error(`Error DB connect: ${error instanceof TypeError ? error.message : 'unknown error'}`);
    }
  }

  private async initGame(): Promise<void> {

    const locations: Location[] = await Connection.manager.getRepository(Location).find({ relations: ['paths'] });
    this.gameMap.fillPositions(locations);
    const things: ThingModel[] = await Connection.manager.getRepository(ThingModel).find();
    this.gameMap.addToPositions<ThingModel>(things);
    const persons: PersonModel[] = await Connection.manager.getRepository(PersonModel).find();
    this.gameMap.addToPositions<PersonModel>(persons);
    const startPosition: Position = this.gameMap.getPositionByIdOrRandom(START_PLAYER_POSITION);
    this.player = startPosition.getPlayer();
    if (!this.player) throw new Error('Помилка ініціалізації гравця');
    this.player.setGame(this);
    await this.player.doAction(new MoveActionStrategy(startPosition.location));
  }

  private async intro(): Promise<void> {
    await TerminalUtil.slowTyping(
      'Ви знаходитеся на старті гри. Ваша задача знайти принцесу, \n' +
      'яку перховує у великому маєтку в глибинці біля розбитої дороги авторитетний та сильний Мафіозі. \n' +
      'Попереду важкий шлях, де Вам можуть зустрітися різні негідники.\n' +
      'Ви можете вступити в бій з ними або уникнути сутички та обійти іншим шляхом. \n' +
      'Перемігши Ви можете заволодіти зброєю або іншими цінними або й ні речами. \n' +
      'На шляху також можуть трапитися корисні знахідки, пастки чи квести. \n' +
      'Але будте мужнім і зможете подолати ці випробовування.  \n',
      SlowTypingColor.Blue,
    );
  }

  private async process(): Promise<void> {
    await TerminalUtil.clear();
    this.player.displayPlayerState();
    const position: Position = this.getCurrentPosition();
    position.checkLocation();
    position.checkThings();
    position.checkPersons();

    let selectedAction: GameAction;
    const gameActions: GameAction[] = this.getGameActions(position);
    TerminalUtil.regularTyping(`Виберіть дію:`);
    const actionIndex: number = await TerminalUtil.singleColumnMenu(gameActions);
    selectedAction = gameActions[actionIndex];

    await this.doGameAction(GameActionFactory.createGameAction(selectedAction));
  }

  private getGameActions(position: MapPosition): GameAction[] {
    const actions: GameAction[] = [...position.getActions(), ...this.player.actions];
    if (position.persons.filter((person: BasePerson) => person.actions.includes(GameAction.FIGHT)).length) {
      const index: number = actions.findIndex((action: GameAction): boolean => action === GameAction.MOVE);
      actions.splice(index, 1);
    }
    return actions;
  }

  public async gameNotification(text) {
    TerminalUtil.nextLine(1);
    TerminalUtil.notificationTyping(text);
    await new Promise(resolve => setTimeout(() => resolve(true), 3000));
  }

  public async gameOver(): Promise<void> {
    this.gameState = GameState.GAME_OVER;
    TerminalUtil.nextLine(4);
    await TerminalUtil.slowTyping(
      '                                                                           GAME OVER!',
      SlowTypingColor.Red,
    );
  }

  public async gameWon(): Promise<void> {
    this.gameState = GameState.GAME_WON;
    await TerminalUtil.clear();
    TerminalUtil.nextLine(4);
    await TerminalUtil.slowTyping(
      '                                                                       CONGRATULATION! YOU HAVE WON THE GAME!',
      SlowTypingColor.Cyan,
    );
  }

  public getCurrentPosition(): Position {
    const location: Location = this.player.getLocation();
    return this.gameMap.getPositionByIdOrRandom(location.id);
  }

  private async doGameAction(gameActionStrategy: BaseGameActionStrategy): Promise<void> {
    return gameActionStrategy.doGameAction(this);
  }
}
