const {getNumberFromBinaryString} = require('./utils');

test.each([
  ['101', 0b101],
  ['10111', 0b10111],
  ['10111', 0b10111],
  ['01010', 0b01010],
])('getNumberFromBinaryString - Calculates correctly', (input, expected) => {
  const result = getNumberFromBinaryString(input);

  expect(result).toBe(expected);
});
