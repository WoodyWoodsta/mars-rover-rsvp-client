/* sequence-behavior.es6 */
/**
 * @author Sean Wood (WoodyWoodsta)
 */

 /**
  * The base class for a command
  */
export class SeqCmd {
  constructor(name, type, params = {}) {
    this.name = name;
    this._name = this.constructor.name;
    this.type = type;
    this.params = params;
  }
}

/**
 * Command the rover to "do nothing" for a specified duration
 */
export class PauseCmd extends SeqCmd {
  constructor(params = {}) {
    super('Pause', 'low');

    this.params = {
      duration: {
        type: 'Number',
        unit: 'sec',
        icon: 'rsvp:access-time',
        value: params.duration || null,
      },
    };
  }
}

/**
 * Command to rotate a single wheel about its pivot
 */
export class SingleWheelRotateCmd extends SeqCmd {
  constructor(params = {}) {
    super('Single Wheel Rotate', 'low');

    this.params = {
      wheel: {
        type: 'String',
        values: ['fl', 'fr', 'rl', 'rr'],
        unit: null,
        icon: 'rsvp:wheel',
        value: params.wheel || null,
      },
      angle: {
        type: 'Number',
        unit: 'deg',
        icon: 'rsvp:angle',
        value: (params.angle !== undefined) ? params.angle : null,
      },
      velocity: {
        type: 'Number',
        unit: '%',
        icon: 'rsvp:velocity',
        value: (params.velocity !== undefined) ? params.velocity : null,
      },
      waitForComplete: {
        type: 'Boolean',
        unit: null,
        icon: 'rsvp:wait-for-complete',
        value: (params.waitForComplete !== undefined) ? params.waitForComplete : true,
      },
    };
  }
}

/**
 * Command to drive a specified wheel
 */
export class SingleWheelDriveCmd extends SeqCmd {
  constructor(params = {}) {
    super('Single Wheel Drive', 'low');

    this.params = {
      duration: {
        type: 'Number',
        unit: 'sec',
        icon: 'rsvp:access-time',
        value: params.duration || null,
      },
      wheel: {
        type: 'String',
        values: ['fl', 'fr', 'rl', 'rr'],
        unit: null,
        icon: 'rsvp:wheel',
        value: params.wheel || null,
      },
      velocity: {
        type: 'Number',
        unit: '%',
        icon: 'rsvp:velocity',
        value: (params.velocity !== undefined) ? params.velocity : null,
      },
      direction: {
        type: 'String',
        values: ['fwd', 'rev'],
        unit: null,
        icon: 'rsvp:near-me',
        value: params.direction || null,
      },
    };
  }
}

/**
 * Commands the rover to traverse at a specified velocity, pivoting the wheels for a specified arc factor
 */
export class DriveCmd extends SeqCmd {
  constructor(params = {}) {
    super('Drive', 'high');

    this.params = {
      duration: {
        type: 'Number',
        unit: 'sec',
        icon: 'rsvp:access-time',
        value: params.duration || null,
      },
      velocity: {
        type: 'Number',
        unit: '%',
        icon: 'rsvp:velocity',
        value: (params.velocity !== undefined) ? params.velocity : null,
      },
      direction: {
        type: 'String',
        values: ['fwd', 'rev'],
        unit: null,
        icon: 'rsvp:near-me',
        value: params.direction || null,
      },
      arc: {
        type: 'Number',
        unit: null,
        icon: 'rsvp:angle',
        value: params.arc || null,
      },
    };
  }
}

/**
 * Command to pivot the wheels given an arc factor
 */
export class WheelsRotateCmd extends SeqCmd {
  constructor(params = {}) {
    super('Wheels Rotate', 'high');

    this.params = {
      arc: {
        type: 'Number',
        unit: null,
        icon: 'rsvp:angle',
        value: params.arc || null,
      },
      velocity: {
        type: 'Number',
        unit: '%',
        icon: 'rsvp:velocity',
        value: (params.velocity !== undefined) ? params.velocity : null,
      },
    };
  }
}

/**
 * Command to rotate the rover in-place for a specified duration
 */
export class RoverRotateCmd extends SeqCmd {
  constructor(params = {}) {
    super('Rover Rotate', 'macro');

    this.params = {
      duration: {
        type: 'Number',
        unit: 'sec',
        icon: 'rsvp:access-time',
        value: params.duration || null,
      },
      velocity: {
        type: 'Number',
        unit: '%',
        icon: 'rsvp:velocity',
        value: (params.velocity !== undefined) ? params.velocity : null,
      },
      direction: {
        type: 'String',
        values: ['cw', 'ccw'],
        unit: null,
        icon: 'rsvp:near-me',
        value: params.direction || null,
      },
    };
  }
}

/**
 * Command to pan the head component of the rover to result in a certain anglular position
 */
export class HeadPanCmd extends SeqCmd {
  constructor(params = {}) {
    super('Head Pan', 'low');

    this.params = {
      angle: {
        type: 'Number',
        unit: 'deg',
        icon: 'rsvp:angle',
        value: params.angle || null,
      },
      velocity: {
        type: 'Number',
        unit: '%',
        icon: 'rsvp:velocity',
        value: (params.velocity !== undefined) ? params.velocity : null,
      },
      waitForComplete: {
        type: 'Boolean',
        unit: null,
        icon: 'rsvp:wait-for-complete',
        value: (params.waitForComplete !== undefined) ? params.waitForComplete : true,
      },
    };
  }
}

/**
 * Command to pitch the head component of the rover to result in a certain angular position
 */
export class HeadPitchCmd extends SeqCmd {
  constructor(params = {}) {
    super('Head Pitch', 'low');

    this.params = {
      angle: {
        type: 'Number',
        unit: 'deg',
        icon: 'rsvp:angle',
        value: params.angle || null,
      },
      velocity: {
        type: 'Number',
        unit: '%',
        icon: 'rsvp:velocity',
        value: (params.velocity !== undefined) ? params.velocity : null,
      },
      waitForComplete: {
        type: 'Boolean',
        unit: null,
        icon: 'rsvp:wait-for-complete',
        value: (params.waitForComplete !== undefined) ? params.waitForComplete : true,
      },
    };
  }
}

/**
 * Command to position the head component of the rover at a specified pan and pitch angle
 */
export class HeadPositionCmd extends SeqCmd {
  constructor(params = {}) {
    super('Head Position', 'macro');

    this.params = {
      panAngle: {
        type: 'Number',
        unit: 'deg',
        icon: 'rsvp:angle',
        value: params.panAngle || null,
      },
      pitchAngle: {
        type: 'Number',
        unit: 'deg',
        icon: 'rsvp:angle',
        value: params.pitchAngle || null,
      },
      velocity: {
        type: 'Number',
        unit: '%',
        icon: 'rsvp:velocity',
        value: (params.velocity !== undefined) ? params.velocity : null,
      },
      waitForComplete: {
        type: 'Boolean',
        unit: null,
        icon: 'rsvp:wait-for-complete',
        value: (params.waitForComplete !== undefined) ? params.waitForComplete : true,
      },
    };
  }
}

export const cmdDefinitions = {
  pause: new PauseCmd(),
  singleWheelRotate: new SingleWheelRotateCmd(),
  singleWheelDrive: new SingleWheelDriveCmd(),
  drive: new DriveCmd(),
  wheelsRotate: new WheelsRotateCmd(),
  roverRotate: new RoverRotateCmd(),
  headPan: new HeadPanCmd(),
  headPitch: new HeadPitchCmd(),
  headPosition: new HeadPositionCmd(),
};
