/* sequence-behavior */

export const seqDefinitions = {
  // Low Level (Commands)
  pause: {
    name: 'Pause',
    type: 'low',
    params: {
      duration: Number,
    },
  },

  wheelRotate: {
    name: 'Wheel Rotate',
    type: 'low',
    params: {
      wheel: ['fl', 'fr', 'rl', 'rr'],
      angle: Number,
      velocity: Number,
    },
  },

  wheelDrive: {
    name: 'Wheel Drive',
    type: 'low',
    params: {
      wheel: ['fl', 'fr', 'rl', 'rr'],
      duration: Number,
      velocity: Number,
    },
  },

  // High Level (Commands)
  drive: {
    name: 'Drive',
    type: 'high',
    params: {
      duration: Number,
      velocity: Number,
      direction: Number,
    },
  },

  wheelsRotate: {
    name: 'Wheels Rotate',
    type: 'high',
    params: {
      percentage: Number,
      velocity: Number,
    },
  },

  // Macros
  roverRotate: {
    name: 'Rover Rotate',
    type: 'macro',
    params: {
      direction: ['cw', 'ccw'],
      duration: Number,
      velocity: Number,
    },
  },
};
