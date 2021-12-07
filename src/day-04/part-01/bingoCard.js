const {getNumbersFromString} = require('../../utils');

const bingoCard = input => {
  const grid = [];

  for (const line in input) {
    grid.push(getNumbersFromString(line));
  }

  return {
    get grid() {
      return grid;
    },
    isWinner: true,
    lines: input,
  };
};

exports.bingoCard = bingoCard;
