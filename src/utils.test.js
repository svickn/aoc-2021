const {getNumberFromBinaryString, getNumbersFromString} = require('./utils');

test.each([
  ['101', 0b101],
  ['10111', 0b10111],
  ['10111', 0b10111],
  ['01010', 0b01010],
])('getNumberFromBinaryString - Calculates correctly', (input, expected) => {
  const result = getNumberFromBinaryString(input);

  expect(result).toBe(expected);
});

test.each([
  ['22 13 17 11  0', [22, 13, 17, 11, 0]],
  ['8  2 23  4 24', [8, 2, 23, 4, 24]],
  ['21  9 14 16  7', [21, 9, 14, 16, 7]],
  ['6 10  3 18  5', [6, 10, 3, 18, 5]],
  [' 1 12 20 15 19', [1, 12, 20, 15, 19]],
])('getNumbersFromString(%p) returns %p', (input, expected) => {
  console.log(input, expected);
  const result = getNumbersFromString(input);

  expect(result).toStrictEqual(expected);
});
