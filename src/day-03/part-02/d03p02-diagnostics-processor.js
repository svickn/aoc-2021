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

const getMostProminentBit = (input, position) =>
  getBit(comparator.mostCommon, '1', input, position);
const getLeastProminentBit = (input, position) =>
  getBit(comparator.leastCommon, '0', input, position);

const getLinesWithBitInPosition = async (input, position, bit) => {
  const output = [];

  for await (const line of input) {
    if (line[position] === bit && !output.includes(line)) {
      output.push(line);
    }
  }

  return output;
};

const getRating = async (input, getBit) => {
  let currentList = input;
  let i = 0;
  while (currentList.length !== 1) {
    const bit = await getBit(currentList, i);
    currentList = await getLinesWithBitInPosition(currentList, i, bit);

    i++;
  }

  return currentList[0];
};

const getOxygenGeneratorRating = async input =>
  await getRating(input, getMostProminentBit);

const getC02ScrubberRating = async input =>
  await getRating(input, getLeastProminentBit);

exports.getMostProminentBit = getMostProminentBit;
exports.getLeastProminentBit = getLeastProminentBit;
exports.getLinesWithBitInPosition = getLinesWithBitInPosition;
exports.getOxygenGeneratorRating = getOxygenGeneratorRating;
exports.getC02ScrubberRating = getC02ScrubberRating;
