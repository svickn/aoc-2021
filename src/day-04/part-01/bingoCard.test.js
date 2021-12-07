const {bingoCard} = require('./bingoCard');

test('Creates grid from lines input', () => {
  const lines = [
    '22 13 17 11  0',
    '8  2 23  4 24',
    '21  9 14 16  7',
    '6 10  3 18  5',
    '1 12 20 15 19',
  ];

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
