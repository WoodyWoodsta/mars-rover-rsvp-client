/* sequence-behavior */
// REVIEW: Consider making these classes

export class SeqCmd {
  constructor(name, type, params = {}) {
    this.name = name;
    this.type = type;
    this.params = params;
  }
}

export class PauseCmd extends SeqCmd {
  constructor(params = {}) {
    super('Pause', 'low');

    this.params = {
      duration: {
        type: Number,
        unit: 'sec',
        value: params.duration || null,
      },
    };
  }
}

export class SingleWheelRotateCmd extends SeqCmd {
  constructor(params = {}) {
    super('Single Wheel Rotate', 'low');

    this.params = {
      wheel: {
        type: String,
        values: ['fl', 'fr', 'rl', 'rr'],
        unit: null,
        value: params.wheel || null,
      },
      angle: {
        type: Number,
        unit: 'deg',
        value: params.angle || null,
      },
      velocity: {
        type: Number,
        unit: 'units',
        value: params.velocity || null,
      },
    };
  }
}

export class SingleWheelDriveCmd extends SeqCmd {
  constructor(params = {}) {
    super('Single Wheel Drive', 'low');

    this.params = {
      wheel: {
        type: String,
        values: ['fl', 'fr', 'rl', 'rr'],
        unit: null,
        value: params.wheel || null,
      },
      duration: {
        type: Number,
        unit: 'sec',
        value: params.duration || null,
      },
      velocity: {
        type: Number,
        unit: 'units',
        value: params.velocity || null,
      },
    };
  }
}

export class DriveCmd extends SeqCmd {
  constructor(params = {}) {
    super('Drive', 'high');

    this.params = {
      duration: {
        type: Number,
        unit: 'sec',
        value: params.duration || null,
      },
      velocity: {
        type: Number,
        unit: 'units',
        value: params.velocity || null,
      },
      direction: {
        type: String,
        values: ['fwd', 'rev'],
        unit: null,
        value: params.direction || null,
      },
    };
  }
}

export class WheelsRotateCmd extends SeqCmd {
  constructor(params = {}) {
    super('Wheels Rotate', 'high');

    this.params = {
      duration: {
        type: Number,
        unit: 'sec',
        value: params.duration || null,
      },
      velocity: {
        type: Number,
        unit: 'units',
        value: params.velocity || null,
      },
      direction: {
        type: String,
        values: ['fwd', 'rev'],
        unit: null,
        value: params.direction || null,
      },
    };
  }
}

export class RoverRotateCmd extends SeqCmd {
  constructor(params = {}) {
    super('Rover Rotate', 'macro');

    this.params = {
      direction: {
        type: String,
        values: ['cw', 'ccw'],
        unit: null,
        value: params.direction || null,
      },
      duration: {
        type: Number,
        unit: 'sec',
        value: params.duration || null,
      },
      velocity: {
        type: Number,
        unit: 'units',
        value: params.velocity || null,
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
};
