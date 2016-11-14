/* app-drawer-controls.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

import { kurentoBehavior } from 'app-behaviors';
import { store, controlIOClientTranslator } from 'app-core';

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

    lowGraphicsModeToggleChecked: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
      observer: '_onLowGraphicsModeToggleCheckedChanged',
    },

    // === Private ===
  },

  listeners: {
    'viewer.tap': '_onViewerTap',
    'disconnect.tap': '_onDisconnectTap',
    'settingsRowButton.tap': '_onSettingsRowButtonTap',
    'controlTypeRowButton.tap': '_onControlTypeRowButtonTap',
    'openTrimsButton.tap': '_onOpenTrimsButtonTap',
    'changeIpAddressButton.tap': '_onChangeIpAddressButtonTap',
    'restartServerButton.tap': '_onRestartServerButtonTap',
    'runDiagnosticsButton.tap': '_onRunDiagnosticsButtonTap',
  },

  attached() {
    this.controlTypeToggleChecked = store.client.control.type === 'rose';
    this._onControlTypeToggleCheckedChanged.initialised = true;

    this.lowGraphicsModeToggleChecked = store.client.lowGraphicsMode;
    this._onLowGraphicsModeToggleCheckedChanged.initialised = true;
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

  _onOpenTrimsButtonTap() {
    this.fire('open-app-trims-dialog');
  },

  _onChangeIpAddressButtonTap() {
    controlIOClientTranslator.updateIpAddress(this.$.ipAddressInput.value);
  },

  _onRestartServerButtonTap() {
    controlIOClientTranslator.restartServer();
  },

  _onLowGraphicsModeToggleCheckedChanged(newValue) {
    if (this._onLowGraphicsModeToggleCheckedChanged.initialised) {
      store.client.set('lowGraphicsMode', newValue);
    }
  },

  _onRunDiagnosticsButtonTap() {
    controlIOClientTranslator.runSelfDiagnostics();
  },
});
