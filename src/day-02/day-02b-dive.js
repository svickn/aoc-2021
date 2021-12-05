const submarine = (start_position = 0, start_depth = 0, start_aim = 0) => {
  let X = start_position;
  let Y = start_depth;
  let aim = start_aim;

  return {
    get position() {
      return X;
    },
    get depth() {
      return Y;
    },
    get aim() {
      return aim;
    },
    forward: units => {
      X += units;
      Y += units * aim;
    },
    down: units => (aim += units),
    up: units => (aim -= units),
    reset: () => {
      X = start_position;
      Y = start_depth;
      aim = start_aim;
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
