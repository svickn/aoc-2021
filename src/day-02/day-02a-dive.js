const submarine = (start_position = 0, start_depth = 0) => {
  let X = start_position;
  let Y = start_depth;
  return {
    get position() {
      return X;
    },
    get depth() {
      return Y;
    },
    forward: units => (X += units),
    down: units => (Y += units),
    up: units => (Y -= units),
    reset: () => {
      X = start_position;
      Y = start_depth;
    },
  };
};

const processDirections = async (directions, sub) => {
  for await (const direction of directions) {
    const command = direction.split(' ');

    sub[command[0]](parseInt(command[1]));
  }

  return sub;
};

exports.submarine = submarine;
exports.processDirections = processDirections;
