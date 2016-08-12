/* app-shell.es6 */

Polymer({
  is: 'app-shell',

  properties: {
    isExpanded: {
      type: Boolean,
      reflectToAttribute: true,
      value: false,
    },
    // === Private ===
  },

  listeners: {
    'drawerWrapper.mouseenter': '_onDrawerWrapperMouseenter',
    'drawerWrapper.mouseleave': '_onDrawerWrapperMouseleave',
  },

  // === Private ===
  _onDrawerWrapperMouseenter() {
    if (!this.isExpanded && !this.$.layout.narrow) {
      this.isExpanded = true;
      this.$.appDrawer.customStyle['--app-drawer-width'] = '256px';
      this.updateStyles();
    }
  },

  _onDrawerWrapperMouseleave() {
    if (this.isExpanded && !this.$.layout.narrow) {
      this.$.appDrawer.customStyle['--app-drawer-width'] = '80px';
      this.updateStyles();
      this.isExpanded = false;
    }
  },
});
