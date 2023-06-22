export default class NumberUtil {
  static getRandomInt(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }

  static roundNumber(num: number, decimalPlaces = 2): number {
    const p = 10 ** decimalPlaces;
    const n = num * p * (1 + Number.EPSILON);
    return Math.round(n) / p;
  }
}