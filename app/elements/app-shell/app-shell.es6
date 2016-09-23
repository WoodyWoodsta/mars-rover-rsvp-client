/* app-shell.es6 */
import { store } from 'app-core';

Polymer({
  is: 'app-shell',

  behaviors: [
    Polymer.IronResizableBehavior,
  ],

  properties: {
    /**
     * Whether or not the side bar is full or narrow
     */
    isExpanded: {
      type: Boolean,
      reflectToAttribute: true,
      observer: '_onIsExpandedChanged',
      value: false,
    },

    narrow: {
      type: Boolean,
      observer: '_onNarrowChanged',
    },

    mobile: {
      type: Boolean,
      observer: '_onMobileChanged',
    },

    // === Private ===
  },

  listeners: {
    'iron-resize': '_onIronResize',
    'hello': '_onHello',
  },

  _onHello() {
    console.log('Hello World');
  },

  attached() {
    this.listen(this.$.drawerControls.$.headingRow, 'tap', '_onExpandToggleableTap');
    this.listen(this.$.drawerControls.$.drawerSpacer, 'tap', '_onExpandToggleableTap');
    this._onIsExpandedChanged(this.$.layout.narrow);
  },

  detached() {
    this.unlisten(this.$.drawerControls.$.headingRow, 'tap', '_onExpandToggleableTap');
    this.unlisten(this.$.drawerControls.$.drawerSpacer, 'tap', '_onExpandToggleableTap');
  },

  expandDrawer() {
    this.set('isExpanded', true);
  },

  collapseDrawer() {
    this.set('isExpanded', false);
  },

  toggleDrawerExpand() {
    this.isExpanded = !this.isExpanded;
  },

  // === Private ===
  _onMobileChanged(newValue) {
    store.client.set('mobile', newValue);
  },

  _onExpandToggleableTap() {
    if (!this.$.layout.narrow) {
      this.toggleDrawerExpand();
    }
  },

  _onMainContentTap() {
    if (!this.$.layout.narrow) {
      this.collapseDrawer();
      this.unlisten(this.$.mainContent, 'tap', '_onMainContentTap');
    }
  },

  _onIsExpandedChanged(newValue) {
    if (newValue) {
      this.$.drawerWrapper.style.width = '256px';
      this.listen(this.$.mainContent, 'tap', '_onMainContentTap');
    } else {
      this.$.drawerControls.collapseAll();
      this.$.drawerWrapper.style.width = '60px';
      this.unlisten(this.$.mainContent, 'tap', '_onMainContentTap');
    }
  },

  _onNarrowChanged(value) {
    if (value) {
      this.expandDrawer();
      this.$.drawerWrapper.style.width = '256px';
      this.$.appDrawer.customStyle['--app-drawer-width'] = '256px';
      this.updateStyles();
    } else {
      this.collapseDrawer();
      this.$.drawerWrapper.style.width = '60px';
      this.$.appDrawer.customStyle['--app-drawer-width'] = '60px';
      this.updateStyles();
    }
  },

  _onIronResize() {
    // TODO: Check for the correct origin of the iron resize, fix this up
    // if (!this.narrow) {
    //   this.collapseDrawer();
    // }
  },
});
