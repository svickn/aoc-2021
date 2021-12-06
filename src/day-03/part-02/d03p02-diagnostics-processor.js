const comparator = {
  mostCommon: (onesCount, lineCount) => onesCount > lineCount / 2,
  leastCommon: (onesCount, lineCount) => onesCount < lineCount / 2,
};

const getBit = async (comparator, tiebreakWinner, input, position) => {
  let lineCount = 0;
  let onesCount = 0;

  for await (const line of input) {
    lineCount++;

    if (line[position] === '1') {
      onesCount++;
    }
  }

  return onesCount === lineCount / 2
    ? tiebreakWinner
    : comparator(onesCount, lineCount)
    ? '1'
    : '0';
};

const getMostProminentBit = (...args) =>
  getBit(comparator.mostCommon, '1', ...args);
const getLeastProminentBit = (...args) =>
  getBit(comparator.leastCommon, '0', ...args);

exports.getMostProminentBit = getMostProminentBit;
exports.getLeastProminentBit = getLeastProminentBit;
