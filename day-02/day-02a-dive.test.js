import { submarine } from './day-02a-dive'

test('Can run tests', () => {})

test('Going forward in the submarine adds to X coordinate', () => {
  const mySub = submarine();

  mySub.forward(5);
  mySub.forward(3);

  expect(mySub.X).toBe(8);
})

test('Going up in the submarine subtracts from Y coordinate', () => {
  const mySub = submarine();

  mySub.up(5);
  mySub.up(3);

  expect(mySub.Y).toBe(-8);
})

test('Going down in the submarine adds to Y coordinate', () => {
  const mySub = submarine();

  mySub.down(5);
  mySub.down(3);

  expect(mySub.Y).toBe(8);
})