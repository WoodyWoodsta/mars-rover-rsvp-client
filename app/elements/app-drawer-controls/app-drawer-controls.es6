/* app-drawer-controls.es6 */

import { kurentoBehavior } from 'app-behaviors';

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

    // === Private ===
  },

  listeners: {
    'viewerButton.tap': '_onViewerButtonTap',
    'disconnectButton.tap': '_onDisconnectButtonTap',
    'settingsRowButton.tap': '_onSettingsRowButtonTap',
    'controlTypeRowButton.tap': '_onControlTypeRowButtonTap',
  },

  // === Private ===
  _computeCollapseButtonIcon(isParentExpandedValue) {
    return (isParentExpandedValue) ? 'icons:chevron-left' : 'icons:chevron-right';
  },

  _onPresenterButtonTap() {
    kurentoBehavior.presenter();
  },

  _onViewerButtonTap() {
    kurentoBehavior.viewer();
  },

  _onDisconnectButtonTap() {
    kurentoBehavior.stop();
  },

  _onSettingsRowButtonTap() {
    this.$.settingsCollapse.toggle();
    if (this.$.settingsCollapse.opened) {
      this.$.settings.setAttribute('collapse-opened', '');
    } else {
      this.$.settings.removeAttribute('collapse-opened');
    }
  },

  _onControlTypeRowButtonTap() {
    this.$.controlTypeCollapse.toggle();
    if (this.$.controlTypeCollapse.opened) {
      this.$.controlType.setAttribute('collapse-opened', '');
    } else {
      this.$.controlType.removeAttribute('collapse-opened');
    }
  },
});
