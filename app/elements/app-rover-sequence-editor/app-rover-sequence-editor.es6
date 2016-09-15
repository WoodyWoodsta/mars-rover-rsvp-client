/* app-rover-sequence-editor.es6 */

import { sequenceBehavior } from 'app-behaviors';
import { controlIOClientTranslator, store } from 'app-core';

Polymer({
  is: 'app-rover-sequence-editor',

  properties: {
    sequence: {
      type: Array,
      // value: [
      //   new sequenceBehavior.DriveCmd({
      //     duration: 200,
      //     direction: 'fwd',
      //     velocity: 50,
      //   }),
      //   new sequenceBehavior.PauseCmd({
      //     duration: 50,
      //   }),
      //   new sequenceBehavior.DriveCmd({
      //     duration: 100,
      //     direction: 'fwd',
      //     velocity: 30,
      //   }),
      // ],
      value: [],
    },

    cmdTypeIsSelected: {
      type: Boolean,
      value: false,
      reflectToAttribute: true,
    },

    currentCmd: {
      type: Object,
    },

    frozen: {
      type: Boolean,
      value: false,
      observer: '_onFrozenChanged',
    },

    state: {
      type: String,
      value: 'editing',
      observer: '_onStateChange',
    },

    // === Private ===

    _cmdDefArray: {
      type: Array,
    },

    _cmdTypeSelection: {
      type: Object,
      observer: '_onCmdTypeSelectionChanged',
    },

    _cmdTypeName: {
      type: Object,
      value: {},
    },

    _newCmdDialogCommitButtonText: {
      type: String,
      value: 'Create',
    },

    _seqEmpty: {
      type: Boolean,
      reflectToAttribute: true,
      value: true,
    },

    _readyToPlayback: {
      type: Boolean,
      computed: '_computeReadyToPlayback(state)',
    },

    _statusText: {
      type: String,
      value: 'editing',
    },
  },

  listeners: {
    'addButton.tap': '_onAddButtonTap',
    'editButton.tap': '_onEditButtonTap',
    'cmdDialog.iron-overlay-closed': '_onNewCmdDialogIronOverlayClosed',
    'cmdDialogCancelButton.tap': '_onCmdDialogCancelButtonTap',
    'uploadButton.tap': '_onUploadButtonTap',
    'rover-sequence-item-delete': '_onRoverSequenceItemDelete',
    'rover-sequence-item-edit': '_onRoverSequenceItemDelete',
  },

  attached() {
    this._cmdDefArray = this._getCmdDefArray();
  },

  uploadSequence() {
    this.state = 'uploading';
    this.frozen = true;

    // Send sequence
    controlIOClientTranslator.sendSequence(this.sequence);
    store.control.on('currentSeq-changed', this._onControlCurrentSequenceChanged.bind(this));
  },

  // === Private ===
  _onControlCurrentSequenceChanged() {
    store.control.removeListener('currentSeq-changed', this._onControlCurrentSequenceChanged.bind(this));
    this.state = 'uploaded';
  },

  _onAddButtonTap() {
    this.$.cmdDialog.open();
  },

  _onEditButtonTap() {
    this.state = 'editing';

    if (this.frozen) {
      this.frozen = false;
    }
  },

  _sortCmdDefArray(a, b) {
    const aPos = this._getCmdDefPosition(a);
    const bPos = this._getCmdDefPosition(b);

    if (aPos < bPos) {
      return 1;
    }

    if (aPos > bPos) {
      return -1;
    }

    return 0;
  },

  _getCmdDefPosition(defObj) {
    switch (defObj.def.type) {
      case 'low':
        return 0;
      case 'high':
        return 1;
      case 'macro':
        return 2;
      default:
        return 3;
    }
  },

  /**
   * Create an array of *example* commands to use in selecting a type
   */
  _getCmdDefArray() {
    return Object.keys(sequenceBehavior.cmdDefinitions).map((val) => {
      return {
        def: sequenceBehavior.cmdDefinitions[val],
        key: val,
      };
    });
  },

  _onCmdTypeSelectionChanged(newValue) {
    this.cmdTypeIsSelected = (newValue !== null);
    this._cmdTypeName = {};
    if (newValue) {
      this.set(`_cmdTypeName.${newValue.item.key}`, {});

      const SelectedCmdClass = this._getCmdClassByKey(newValue.item.key);
      this.currentCmd = new SelectedCmdClass();
    }

    this.$.cmdDialog.notifyResize();
  },

  _onNewCmdDialogIronOverlayClosed(event) {
    if (event.detail.confirmed && !event.detail.canceled) {
      this._addNewCmd(this.currentCmd);
      this._resetCmdCreation();
    } else if (event.detail.canceled) {
      this._resetCmdCreation();
    }
  },

  _resetCmdCreation() {
    this.cmdTypeIsSelected = false;
    this.$.cmdTypeDropdown.contentElement.selected = null;
    this._cmdTypeName = {};
    this.currentCmd = {};
  },

  // TODO: This should be moved to the behavior
  _getCmdClassByKey(key) {
    let className;

    switch (key) {
      case 'pause':
        className = 'PauseCmd';
        break;
      case 'singleWheelRotate':
        className = 'SingleWheelRotateCmd';
        break;
      case 'singleWheelDrive':
        className = 'SingleWheelDriveCmd';
        break;
      case 'drive':
        className = 'DriveCmd';
        break;
      case 'wheelsRotate':
        className = 'WheelsRotateCmd';
        break;
      case 'roverRotate':
        className = 'RoverRotateCmd';
        break;
      default:
    }

    return sequenceBehavior[className];
  },

  _onCmdDialogCancelButtonTap() {
    this.$.cmdDialog.cancel();
  },

  _addNewCmd(cmd) {
    this.push('sequence', cmd);

    if (this._seqEmpty) {
      this._seqEmpty = false;
    }
  },

  _removeCmd(index) {
    this.splice('sequence', index, 1);

    if (!this._seqEmpty && this.sequence.length === 0) {
      this._seqEmpty = true;
    }
  },

  _onRoverSequenceItemDelete(event) {
    this._removeCmd(event.detail.index);
  },

  _onUploadButtonTap() {
    this.uploadSequence();
  },

  _onFrozenChanged(newValue) {
    if (newValue) {
      for (let i = 0; i < this.sequence.length; i += 1) {
        this.set(`sequence.${i}.uneditable`, true);
      }

      this.$.sequenceSortable.disabled = true;
    } else {
      for (let i = 0; i < this.sequence.length; i += 1) {
        this.set(`sequence.${i}.uneditable`, false);
      }

      this.$.sequenceSortable.disabled = false;
    }
  },

  _onStateChange(newValue) {
    switch (newValue) {
      case 'editing':
        this._statusText = 'editing';
        break;
      case 'uploading':
        this._statusText = 'uploading...';
        break;
      case 'standby':
        this._statusText = 'uploaded';
        break;
      case 'playing':
        this._statusText = 'playing';
        break;
      case 'paused':
        this._statusText = 'paused';
        break;
      default:

    }
  },

  _computeReadyToPlayback(newValue) {
    return newValue === 'playing' || newValue === 'paused' || newValue === 'uploaded';
  },
});
