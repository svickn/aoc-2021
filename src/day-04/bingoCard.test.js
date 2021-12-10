const {getNumbersFromString, getLinesFromFileAsArray} = require('../utils');
const {
  bingoCard,
  findBingoWinner,
  findLastBingoWinner,
} = require('./bingoCard');

const lines = [
  '22 13 17 11  0',
  '8  2 23  4 24',
  '21  9 14 16  7',
  '6 10  3 18  5',
  '1 12 20 15 19',
];

test('Creates grid from lines input', () => {
  const expected = [
    [22, 13, 17, 11, 0],
    [8, 2, 23, 4, 24],
    [21, 9, 14, 16, 7],
    [6, 10, 3, 18, 5],
    [1, 12, 20, 15, 19],
  ];

  const card = bingoCard(lines);

  expect(card.grid).toStrictEqual(expected);
});

test('Can mark number that is present', () => {
  const card = bingoCard(lines);

  const wasMarked = card.mark(14);

  expect(wasMarked).toBe(true);
  expect(card.isMarked(14)).toBe(true);
});

test(`Can't mark number that isn't present`, () => {
  const card = bingoCard(lines);

  const wasMarked = card.mark(100);

  expect(wasMarked).toBe(false);
  expect(card.isMarked(100)).toBe(false);
});

test.each([
  ['22,13,17,11,0', 'row 1', true],
  ['8,2,23,4,24', 'row 2', true],
  ['21,9,14,16,7', 'row 3', true],
  ['6,10,3,18,5', 'row 4', true],
  ['1,12,20,15,19', 'row 5', true],

  ['22,8,21,6,1', 'col 1', true],
  ['13,2,9,10,12', 'col 2', true],
  ['17,23,14,3,20', 'col 3', true],
  ['11,4,16,18,15', 'col 4', true],
  ['0,24,7,5,19', 'col 5', true],

  ['22,2,14,18,19', 'diag 1', false],
  ['1,10,14,4,0', 'diag 2', false],

  ['', 'nothing', false],
  ['22,13,17,11', 'incomplete line', false],
  ['22,13,17,11,8,2,23,4,21,9,14,16,6,10,3,19', 'incomplete lines', false],
])(
  'When marking %s (%s) isWinner returns %p',
  (numbersCalled, name, expected) => {
    const card = bingoCard(lines);

    getNumbersFromString(numbersCalled).map(card.mark);

    expect(card.isWinner).toBe(expected);
  },
);

test('Can get unmarked numbers', () => {
  const card = bingoCard(lines);
  const expected = [0, 24, 7, 18, 5, 1, 12, 20, 15];

  getNumbersFromString('22,13,17,11,8,2,23,4,21,9,14,16,6,10,3,19').map(
    card.mark,
  );

  expect(card.unmarkedNumbers).toStrictEqual(expected);
});

test('Day 4: Part 1 Example Input', async () => {
  const lines = await getLinesFromFileAsArray('./src/day-04/input_example.txt');

  const {card, finalNumber} = findBingoWinner(lines);

  expect(card.isWinner).toBe(true);
  expect(finalNumber).toBe(24);
  expect(
    card.unmarkedNumbers.reduce((prev, current) => prev + current, 0),
  ).toBe(188);
});

test('Day 4: Part 1 Solution', async () => {
  const lines = await getLinesFromFileAsArray('./src/day-04/input.txt');

  const {card, finalNumber} = findBingoWinner(lines);

  expect(card.isWinner).toBe(true);
  expect(
    card.unmarkedNumbers.reduce((prev, current) => prev + current, 0) *
      finalNumber,
  ).toMatchInlineSnapshot(`32844`);
});

test('Day 4: Part 2 Example Input', async () => {
  const lines = await getLinesFromFileAsArray('./src/day-04/input_example.txt');

  const {card, finalNumber} = findLastBingoWinner(lines);

  expect(card.isWinner).toBe(true);
  expect(finalNumber).toBe(13);
  expect(
    card.unmarkedNumbers.reduce((prev, current) => prev + current, 0),
  ).toBe(148);
});

test('Day 4: Part 2 Solution', async () => {
  const lines = await getLinesFromFileAsArray('./src/day-04/input.txt');

  const {card, finalNumber} = findLastBingoWinner(lines);

  expect(card.isWinner).toBe(true);
  expect(
    card.unmarkedNumbers.reduce((prev, current) => prev + current, 0) *
      finalNumber,
  ).toMatchInlineSnapshot(`4920`);
});
