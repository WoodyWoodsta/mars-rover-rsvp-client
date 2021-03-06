/* app-drawer-collapse.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

Polymer({
  is: 'app-drawer-collapse',
  properties: {
    opened: {
      type: Boolean,
      reflectToAttribute: true,
    },
  },

  show() {
    this.$.collapse.show();
  },

  hide() {
    this.$.collapse.hide();
  },

  toggle() {
    this.$.collapse.toggle();
  },
});
