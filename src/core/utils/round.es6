/* round.es6 */

export function round(num, places) {
  return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
}
