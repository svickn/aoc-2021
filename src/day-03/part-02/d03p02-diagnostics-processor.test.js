const {
  getMostProminentBit,
  getLeastProminentBit,
} = require('./d03p02-diagnostics-processor');

test.each([
  [['1', '1', '1', '0'], 0, '1'],
  [['1', '0', '0', '0'], 0, '0'],
  [['1', '1', '0', '0'], 0, '1'],
  [['01', '01', '00', '00'], 1, '1'],
  [['01010', '01010', '00010', '00010'], 1, '1'],
  [['11111', '11110', '11110', '11110'], 4, '0'],
])(
  'getMostProminentBit(%p,%p,%p) returns %p',
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
  'getLeastProminentBit(%p,%p,%p) returns %p',
  async (input, position, expected) => {
    const result = await getLeastProminentBit(input, position);

    expect(result).toBe(expected);
  },
);