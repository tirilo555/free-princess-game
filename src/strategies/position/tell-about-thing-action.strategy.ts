import TerminalUtil from '../../utils/terminal.util';
import BasePositionActionStrategy from './base-position-action.strategy';
import BaseThing from '../../things/base-thing';

export default class TellAboutThingActionStrategy extends BasePositionActionStrategy {
  constructor(private thing: BaseThing) {
    super();
  }
  doAction(): void {
    TerminalUtil.regularTyping(`Ви знайшли ${this.thing.name}.\n ${this.thing.description}`);
  }
}