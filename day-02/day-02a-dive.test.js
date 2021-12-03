const {submarine, processDirections, processDirectionsFromFile} = require('./day-02a-dive')

test('Can run tests', () => {})

test('Going forward in the submarine adds to position', () => {
  const mySub = submarine();

  mySub.forward(5);
  mySub.forward(3);

  expect(mySub.position).toBe(8);
})

test('Going up in the submarine subtracts from depth', () => {
  const mySub = submarine();

  mySub.up(5);
  mySub.up(3);

  expect(mySub.depth).toBe(-8);
})

test('Going down in the submarine adds to depth', () => {
  const mySub = submarine();

  mySub.down(5);
  mySub.down(3);

  expect(mySub.depth).toBe(8);
})

test('Can initialize starting values.', () => {
  const mySub = submarine(2,-3);

  expect(mySub.position).toBe(2);
  expect(mySub.depth).toBe(-3);
})

test('Can reset to starting values.', () => {
  const mySub = submarine(2,3);

  mySub.forward(4);
  mySub.up(2);

  expect(mySub.position).toBe(6);
  expect(mySub.depth).toBe(1);
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

  // using a set since it provides an iterator much like the filestream readline would.
  await processDirections(new Set(directions), mySub);

  expect(mySub.position).toBe(15);
  expect(mySub.depth).toBe(10);
})

test('processDirectionsFromFile - Directions translated to sub', async () => {
  jest.setTimeout(10000);
  
  const mySub = submarine();

  await processDirectionsFromFile('./input_example.txt', mySub);

  console.log(mySub.position, mySub.depth);
  expect(mySub.position).toBe(15);
  expect(mySub.depth).toBe(10);
})