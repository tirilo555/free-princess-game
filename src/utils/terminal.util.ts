import { Terminal, terminal } from 'terminal-kit';
import { CTerminal, ProgressBarOptions } from 'terminal-kit/Terminal';

export interface SlowTypingOptions {
  style?: CTerminal | undefined;
  flashStyle?: CTerminal | undefined;
  delay?: number | undefined;
  flashDelay?: number | undefined;
}

export enum SlowTypingColor {
  'Red',
  'Green',
  'Gray',
  'Cyan',
  'Blue'
}

const terminalColor: Terminal.CTerminal[] = [terminal.red, terminal.green, terminal.gray, terminal.cyan, terminal.blue];

export default class TerminalUtil {
  static terminal = terminal;

  static async clear(): Promise<void> {
    terminal.clear();
    await new Promise(resolve => setTimeout(() => resolve(true), 700));
  }

  static async slowTyping(text, color: SlowTypingColor): Promise<void> {
    const options: SlowTypingOptions = {
      style: terminalColor[color],
      delay: 50,
      flashDelay: 20,
    };
    await new Promise((resolve, reject) => {
      terminal.slowTyping(`${text}\n`, options, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  static async singleColumnMenu(items: string[]): Promise<number> {
    const index: number =  await new Promise((resolve, reject) => {
      terminal.singleColumnMenu(items, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response.selectedIndex);
        }
      });
    });
    await new Promise(resolve => setTimeout(() => resolve(true), 700));
    return index;
  }

  static errorTyping(text: string): void{
    terminal.red(`${text}\n`);
  }

  static regularTyping(text: string): void{
    terminal.green(`${text}\n`);
  }

  static notificationTyping(text: string): void{
    terminal.gray(`${text}\n`);
  }

  static extraTyping(text: string): void{
    terminal.cyan(`${text}\n`);
  }

  static nextLine(lines: number): void {
    terminal.nextLine(lines);
  }

  static progressBar(options: ProgressBarOptions) {
    return terminal.progressBar(options);
  }
}