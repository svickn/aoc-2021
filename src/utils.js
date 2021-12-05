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

exports.readLinesFromFile = readLinesFromFile;
