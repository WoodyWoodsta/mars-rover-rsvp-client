/* rover-tele-progress-bubble.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

Polymer({
  is: 'rover-tele-progress-bubble',
  properties: {
    value: {
      type: Number,
      value: 0,
    },

    unit: {
      type: String,
      value: '%',
    },

    max: {
      type: Number,
      value: 100,
    },
  },
});
