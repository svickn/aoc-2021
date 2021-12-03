const fs = require('fs');
const readline = require('readline');

const submarine = (start_position = 0, start_depth = 0, start_aim = 0) => { 
  let X = start_position;
  let Y = start_depth;
  let aim = start_aim;

  return {
    get position() { return X; },
    get depth() { return Y; },
    get aim() { return aim; },
    forward: (units) => {
      X += units;
      Y += units*aim;
    },
    down: (units) => aim += units,
    up: (units) => aim -= units,
    reset: () => {
      X = start_position;
      Y = start_depth;
      aim = start_aim;
    }
  }
}

const processDirections = async (directions, sub) => {
  for await (const direction of directions) {
    const command = direction.split(' ');

    sub[command[0]](parseInt(command[1]));
  }

  return sub;
}

const processDirectionsFromFile = async (filePath, sub) => {
  const fileStream = fs.createReadStream(filePath);

  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') as a single line break.
  const directions = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  return await processDirections(directions, sub);
}

exports.submarine = submarine;
exports.processDirections = processDirections;
exports.processDirectionsFromFile = processDirectionsFromFile;