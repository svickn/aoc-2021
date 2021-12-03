const {submarine, processDirections, processDirectionsFromFile} = require('./day-02b-dive')

test('Going up in the submarine decreases aim', () => {
  const mySub = submarine();

  mySub.up(5);
  mySub.up(3);

  expect(mySub.aim).toBe(-8);
})

test('Going down in the submarine increases aim', () => {
  const mySub = submarine();

  mySub.down(5);
  mySub.down(3);

  expect(mySub.aim).toBe(8);
})

test('Going forward in the submarine increases position by aim and depth by aim * forward units', () => {
  const aim = 5;
  const mySub = submarine(0,0,aim);

  mySub.forward(2);

  expect(mySub.position).toBe(2);
  expect(mySub.depth).toBe(10);
})

test('Can initialize starting values.', () => {
  const mySub = submarine(2,-3, 4);

  expect(mySub.position).toBe(2);
  expect(mySub.depth).toBe(-3);
  expect(mySub.aim).toBe(4);
})

test('Can reset to starting values.', () => {
  const mySub = submarine(2,3);

  mySub.down(2);
  mySub.forward(4);

  expect(mySub.position).toBe(6);
  expect(mySub.depth).toBe(11);
  expect(mySub.aim).toBe(2);

  mySub.reset();

  expect(mySub.position).toBe(2);
  expect(mySub.depth).toBe(3);
  expect(mySub.aim).toBe(0);
})

test('processDirections - Directions translated to sub', async () => {
  const mySub = submarine();
  const directions = [
    'forward 5',
    'down 5',
    'forward 8',
    'up 3',
    'down 8',
    'forward 2',
  ];

  await processDirections(directions, mySub);

  expect(mySub.position).toBe(15);
  expect(mySub.depth).toBe(60);
  expect(mySub.aim).toBe(10);
})

test('processDirectionsFromFile - Directions translated to sub', async () => {
  const mySub = submarine();

  await processDirectionsFromFile('./day-02/input_example.txt', mySub);

  expect(mySub.position).toBe(15);
  expect(mySub.depth).toBe(60);
  expect(mySub.aim).toBe(10);
})

test('Day 02a - Solution', async () => {
  const mySub = submarine();

  await processDirectionsFromFile('./day-02/input.txt', mySub);

  expect(mySub.position * mySub.depth).toMatchInlineSnapshot(`1594785890`);
})