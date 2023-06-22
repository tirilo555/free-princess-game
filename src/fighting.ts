import TerminalUtil from './utils/terminal.util';
import { Terminal } from 'terminal-kit';
import Player from './persons/player';
import BasePerson from './persons/base-person';

export default class Fighting {
  private playerBar;
  private personBar;
  player: Player;
  person: BasePerson;

  public setFighters(player: Player, person: BasePerson) {
    this.player = player;
    this.person = person;
  }

  public async fight(): Promise<void> {
    this.personBar = this.createProgressBar(this.person.name);
    TerminalUtil.nextLine(1);
    await new Promise(resolve => {
      setTimeout(() => {
        this.playerBar = this.createProgressBar(this.player.name);
        TerminalUtil.nextLine(1);
        resolve(true);
      }, 1000);
    });
    do {
      await new Promise(resolve => setTimeout(() => resolve(true), 100 + Math.random() * 400));
      await this.progress();
    } while (this.player.health && this.person.health);
    await new Promise(resolve => setTimeout(() => resolve(true), 6000));
    // this.finish();
  }

  private async progress(): Promise<void> {
    this.playerBar.update(this.getProgressAndCalculateHealth(this.player, this.person));
    this.personBar.update(this.getProgressAndCalculateHealth(this.person, this.player));
  }

  private getProgressAndCalculateHealth(fighter1: Player | BasePerson, fighter2: Player | BasePerson): number {
    let progress: number;
    const pr = fighter1.health - fighter2.getDamageEfficiency();
    if (pr > 0) {
      progress = pr / 100;
      fighter1.health -= fighter2.getDamageEfficiency();
    } else {
      progress = 0;
      fighter1.health = 0;
    }
    return progress;
  }

  private createProgressBar(title: string): Terminal.ProgressBarController {
    return TerminalUtil.progressBar({
      width: 80,
      title,
      eta: false,
      percent: false,
      barChar: 'x',
      barHeadChar: ' ',
    });
  }

  public finish(){
    this.playerBar.stop();
    this.personBar.stop();
  }
}