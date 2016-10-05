/* app-drawer-controls.es6 */

import { kurentoBehavior } from 'app-behaviors';
import { store } from 'app-core';

Polymer({
  is: 'app-drawer-controls',
  properties: {
    isParentExpanded: {
      type: Boolean,
    },

    collapseButtonIcon: {
      type: String,
      computed: '_computeCollapseButtonIcon(isParentExpanded)',
    },

    controlTypeToggleChecked: {
      type: Boolean,
      value: false,
      observer: '_onControlTypeToggleCheckedChanged',
    },

    // === Private ===
  },

  listeners: {
    'viewer.tap': '_onViewerTap',
    'disconnect.tap': '_onDisconnectTap',
    'settingsRowButton.tap': '_onSettingsRowButtonTap',
    'controlTypeRowButton.tap': '_onControlTypeRowButtonTap',
  },

  attached() {
    this.controlTypeToggleChecked = store.client.control.type === 'rose';
    this._onControlTypeToggleCheckedChanged.initialised = true;
  },

  collapseAll() {
    this.setCollapse('settingsCollapse', false);
    this.setCollapse('controlTypeCollapse', false);
  },

  setCollapse(collapseName, state) {
    let row;

    switch (collapseName) {
      case 'settingsCollapse':
        row = 'settings';
        break;
      case 'controlTypeCollapse':
        row = 'controlType';
        break;
      default:
        console.log(`Invalid collapse name ${collapseName}`);
    }

    this.$[collapseName][(state === undefined) ? 'toggle' : ((state) ? 'show' : 'hide')]();
    if (this.$[collapseName].opened) {
      this.$[row].setAttribute('collapse-opened', '');
    } else {
      this.$[row].removeAttribute('collapse-opened');
    }
  },

  // === Private ===
  _computeCollapseButtonIcon(isParentExpandedValue) {
    return (isParentExpandedValue) ? 'icons:chevron-left' : 'icons:chevron-right';
  },

  _onViewerTap() {
    kurentoBehavior.viewer();
  },

  _onDisconnectTap() {
    kurentoBehavior.stop();
  },

  _onSettingsRowButtonTap() {
    this.setCollapse('settingsCollapse');
  },

  _onControlTypeRowButtonTap() {
    this.setCollapse('controlTypeCollapse');
  },

  _onControlTypeToggleCheckedChanged(newValue) {
    if (this._onControlTypeToggleCheckedChanged.initialised) {
      store.client.set('control.type', (newValue) ? 'rose' : 'interactive');
      store.control.set('type', (newValue) ? 'rose' : 'interactive');
    }
  },
});
