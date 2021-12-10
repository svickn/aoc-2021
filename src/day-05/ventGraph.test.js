const {getLinesFromFileAsArray} = require('../utils');
const {
  getCoordinatesForLine,
  getRange,
  detectHotSpots,
} = require('./ventGraph');

test.each([
  [0, 5, [0, 1, 2, 3, 4, 5]],
  [5, 0, [0, 1, 2, 3, 4, 5]],
  [0, 0, [0]],
])('getRange(%p, %p) returns %p', (start, end, expected) => {
  const actual = getRange(start, end, expected);

  expect(actual).toStrictEqual(expected);
});

test.each([
  [
    '0,9 -> 5,9',
    [
      [0, 9],
      [1, 9],
      [2, 9],
      [3, 9],
      [4, 9],
      [5, 9],
    ],
  ],
  [
    '5,9 -> 0,9',
    [
      [0, 9],
      [1, 9],
      [2, 9],
      [3, 9],
      [4, 9],
      [5, 9],
    ],
  ],
  ['5,9 -> 7,2', []],
])('getCoordinatesOnLine(%p) returns %p', (line, expected) => {
  const actual = getCoordinatesForLine(line);

  expect(actual).toStrictEqual(expected);
});

test('detectHotSpots - Can detect hotspots', () => {
  const lines = ['0,3 -> 0,7', '0,0 -> 0,4', '0,6 -> 5,6'];
  const expected = [
    [0, 3],
    [0, 4],
    [0, 6],
  ];

  const actual = detectHotSpots(lines);

  expect(actual).toStrictEqual(expected);
});

test('Day 5: Part 1 Example Input', async () => {
  const lines = await getLinesFromFileAsArray('./src/day-05/input_example.txt');

  const actual = detectHotSpots(lines);

  expect(actual.length).toBe(5);
});

test.skip('Day 5: Part 1 Solution', async () => {
  const lines = await getLinesFromFileAsArray('./src/day-05/input.txt');

  const actual = detectHotSpots(lines);

  expect(actual.length).toMatchInlineSnapshot(`8350`);
});
