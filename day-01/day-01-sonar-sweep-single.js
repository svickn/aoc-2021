// Adapted from https://stackoverflow.com/questions/6156501/read-a-file-one-line-at-a-time-in-node-js

const fs = require('fs');
const readline = require('readline');

const processLineByLine = async () => {
  const fileStream = fs.createReadStream('input.txt');

  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.
  const lines = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lastDepth = null;
  let increaseCount = 0;

  for await (const line of lines) {
    currentDepth = parseInt(line);
    if(lastDepth && currentDepth > lastDepth) {
      increaseCount++;
    }

    lastDepth = currentDepth;
  }

  console.log(`Total increase count: ${increaseCount}`)
}

processLineByLine();