const fs = require('fs');
const readline = require('readline');

const submarine = (start_position = 0, start_depth = 0) => { 
  let X = start_position;
  let Y = start_depth;
  return {
    get position() { return X; },
    get depth() { return Y; },
    forward: (units) => X += units,
    down: (units) => Y += units,
    up: (units) => Y -= units,
    reset: () => {
      this.X = start_X;
      this.Y = start_Y;
    }
  }
}

const processDirections = async (directions, sub) => {
  for await (const direction of directions) {
    const command = direction.split(' ');

    console.log(direction)

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

  await processDirections(directions, sub);
}

exports.submarine = submarine;
exports.processDirections = processDirections;
exports.processDirectionsFromFile = processDirectionsFromFile;