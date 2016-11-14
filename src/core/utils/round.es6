/* round.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

export function round(num, places) {
  return Math.round(num * Math.pow(10, places)) / Math.pow(10, places);
}
