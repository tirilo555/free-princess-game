import TerminalUtil from '../../utils/terminal.util';
import BasePositionActionStrategy from './base-position-action.strategy';
import BasePerson from '../../persons/base-person';

export default class TellAboutPersonActionStrategy extends BasePositionActionStrategy{
  constructor(private person: BasePerson) {
    super();
  }
  doAction(): void {
    TerminalUtil.regularTyping(`На вашому шляху трапився ${this.person.name}.\n${this.person.description}`);
  }
}