const fs = require('fs');
const readline = require('readline');

const readLinesFromFile = async filePath => {
  const fileStream = fs.createReadStream(filePath);

  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') as a single line break.
  const directions = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  return directions;
};

const getLinesFromFileAsArray = async filePath => {
  const lines = await readLinesFromFile(filePath);
  const output = [];

  for await (const line of lines) {
    output.push(line);
  }

  return output;
};

const getNumberFromBinaryString = input => {
  let output = 0;

  for (let i = input.length - 1; i >= 0; i--) {
    if (input[i] === '1') {
      output += 2 ** (input.length - i - 1);
    }
  }

  return output;
};

const getNumbersFromString = input => {
  return input.trim().split(/[ ,]+/).map(x => parseInt(x));
};

exports.readLinesFromFile = readLinesFromFile;
exports.getLinesFromFileAsArray = getLinesFromFileAsArray;
exports.getNumberFromBinaryString = getNumberFromBinaryString;
exports.getNumbersFromString = getNumbersFromString;
