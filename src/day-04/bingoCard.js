const {getNumbersFromString} = require('../utils');

const winningCombos = [
  [[0,0],[0,1],[0,2],[0,3],[0,4]], // row 1
  [[1,0],[1,1],[1,2],[1,3],[1,4]], // row 2
  [[2,0],[2,1],[2,2],[2,3],[2,4]], // row 3
  [[3,0],[3,1],[3,2],[3,3],[3,4]], // row 4
  [[4,0],[4,1],[4,2],[4,3],[4,4]], // row 5
  [[0,0],[1,0],[2,0],[3,0],[4,0]], // col 1
  [[0,1],[1,1],[2,1],[3,1],[4,1]], // col 2
  [[0,2],[1,2],[2,2],[3,2],[4,2]], // col 3
  [[0,3],[1,3],[2,3],[3,3],[4,3]], // col 4
  [[0,4],[1,4],[2,4],[3,4],[4,4]], // col 5
]

const bingoCard = input => {
  const grid = input.map(getNumbersFromString);
  const markedNumbers = [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ]

  const findNumberOnGrid = (input) => {
    for(let row = 0; row < 5; row++) {
      for(let col = 0; col < 5; col++) {
        if(grid[row][col] === input) {
          return {row, col};
        }
      }
    }

    return null;
  }

  const mark = (input) => {
    const gridLocation = findNumberOnGrid(input)

    if(gridLocation) {
      markedNumbers[gridLocation.row][gridLocation.col] = true;
      return true;
    }

    return false;
  }

  const isMarked = (input) => {
    return findNumberOnGrid(input) !== null;
  }

  const isWinner = () => {
    for(let i = 0; i < winningCombos.length; i++) {
      if(markedNumbers[winningCombos[i][0][0]][winningCombos[i][0][1]]
        && markedNumbers[winningCombos[i][1][0]][winningCombos[i][1][1]]
        && markedNumbers[winningCombos[i][2][0]][winningCombos[i][2][1]]
        && markedNumbers[winningCombos[i][3][0]][winningCombos[i][3][1]]
        && markedNumbers[winningCombos[i][4][0]][winningCombos[i][4][1]]) {
          return true;
        }
    }

    return false;
  }

  const getUnmarkedNumbers = () => {
    const output = [];

    for(let row = 0; row < 5; row++) {
      for(let col = 0; col < 5; col++) {
        if(!markedNumbers[row][col]) {
          output.push(grid[row][col])
        }
      }
    }

    return output;
  }

  return {
    grid,
    get isWinner() {
      return isWinner();
    },
    get unmarkedNumbers() {
      return getUnmarkedNumbers();
    },
    lines: input,
    mark,
    isMarked,
  };
};

const findBingoWinner = (input) => {
  const numbersToCall = getNumbersFromString(input[0])
  const cards = []

  for(let i=2; i < input.length; i = i + 6) {
    console.log(input.slice(i,i+5))
    cards.push(bingoCard(input.slice(i, i+5)))
  }

  for(let currentNumber of numbersToCall) {
    cards.map(c => c.mark(currentNumber))
    
    const winners = cards.filter(c => c.isWinner)

    if(winners.length > 0) {
      return { card: winners[0], finalNumber: currentNumber }
    }
  }

  return { card: bingoCard([]), finalNumber: 0 }
}

const findLastBingoWinner = (input) => {
  const numbersToCall = getNumbersFromString(input[0])
  let cards = []
  let lastWinner = null

  for(let i=2; i < input.length; i = i + 6) {
    console.log(input.slice(i,i+5))
    cards.push(bingoCard(input.slice(i, i+5)))
  }

  for(let currentNumber of numbersToCall) {
    
    if(!lastWinner) {
      cards.map(c => c.mark(currentNumber))
      
      cards = cards.filter(c => !c.isWinner)
  
      if(cards.length === 1) {
        lastWinner = cards[0]
      }
    }
    else {
      lastWinner.mark(currentNumber)

      if(lastWinner.isWinner) {
        return { card: lastWinner, finalNumber: currentNumber }
      }
    }
  }

  return { card: bingoCard([]), finalNumber: 0 }
}

exports.bingoCard = bingoCard;
exports.findBingoWinner = findBingoWinner;
exports.findLastBingoWinner = findLastBingoWinner;
