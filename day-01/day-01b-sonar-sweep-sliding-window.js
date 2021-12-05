// Adapted from https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js

const fs = require('fs');
const readline = require('readline');

const processSlidingWindow = async () => {
  const fileStream = fs.createReadStream('input.txt');

  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let rollingDepths = [];
  let increaseCount = 0;

  for await (const line of lines) {
    const currentDepth = parseInt(line);
    rollingDepths.push(currentDepth);

    if (rollingDepths.length === 4) {
      const previousWindow = rollingDepths
        .slice(0, 3)
        .reduce((a, b) => a + b, 0);
      const nextWindow = rollingDepths.slice(1, 4).reduce((a, b) => a + b, 0);

      if (previousWindow < nextWindow) {
        increaseCount++;
      }

      rollingDepths.shift();
    }
  }

  console.log(`Total increase count: ${increaseCount}`);
};

processSlidingWindow();
