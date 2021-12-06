const {getLinesFromFileAsArray} = require('../../utils');
const {
  getMostProminentBit,
  getLeastProminentBit,
  getLinesWithBitInPosition,
  getOxygenGeneratorRating,
  getC02ScrubberRating,
} = require('./d03p02-diagnostics-processor');

test.each([
  [['1', '1', '1', '0'], 0, '1'],
  [['1', '0', '0', '0'], 0, '0'],
  [['1', '1', '0', '0'], 0, '1'],
  [['01', '01', '00', '00'], 1, '1'],
  [['01010', '01010', '00010', '00010'], 1, '1'],
  [['11111', '11110', '11110', '11110'], 4, '0'],
])(
  'getMostProminentBit( %p, %p) returns %p',
  async (input, position, expected) => {
    const result = await getMostProminentBit(input, position);

    expect(result).toBe(expected);
  },
);

test.each([
  [['1', '1', '1', '0'], 0, '0'],
  [['1', '0', '0', '0'], 0, '1'],
  [['1', '1', '0', '0'], 0, '0'],
  [['11', '11', '10', '10'], 1, '0'],
  [['11010', '11010', '10010', '10010'], 1, '0'],
  [['11111', '11110', '11110', '11110'], 4, '1'],
])(
  'getLeastProminentBit( %p, %p) returns %p',
  async (input, position, expected) => {
    const result = await getLeastProminentBit(input, position);

    expect(result).toBe(expected);
  },
);

test.each([
  [['1', '1', '1', '0'], 0, '0', ['0']],
  [['1', '1', '1', '0'], 0, '1', ['1']],
  [['1101', '1111', '1111', '1010', '1001'], 3, '1', ['1101', '1111', '1001']],
])(
  'getLinesWithBitInPosition( %p, %p, %p) returns %p',
  async (input, position, bit, expected) => {
    const result = await getLinesWithBitInPosition(input, position, bit);

    expect(result).toStrictEqual(expected);
  },
);

test('getOxygenGeneratorRating - Example file gives correct result', async () => {
  const lines = await getLinesFromFileAsArray('./src/day-03/input_example.txt');

  const result = await getOxygenGeneratorRating(lines);

  expect(result).toBe('10111');
});

test('getC02ScrubberRating - Example file gives correct result', async () => {
  const lines = await getLinesFromFileAsArray('./src/day-03/input_example.txt');

  const result = await getC02ScrubberRating(lines);

  expect(result).toBe('01010');
});
