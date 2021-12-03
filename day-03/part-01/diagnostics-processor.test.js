const {processDiagnostics, processDiagnosticsFromFile} = require('./diagnostics-processor')

test('processDiagnostics - Given a single character string, gives proper gamma and epsilon rates', async () => {
  const lines = ['0','0','1'];

  const actual = await processDiagnostics(lines);

  expect(actual.gamma).toBe(0b0);
  expect(actual.epsilon).toBe(0b1);
})

test('processDiagnostics - Given a multi-character string, gives proper gamma and epsilon rates', async () => {
  const lines = ['010', '010', '101'];

  const actual = await processDiagnostics(lines);

  expect(actual.gamma).toBe(0b010);
  expect(actual.epsilon).toBe(0b101);
})

test('processDiagnosticsFromFile - Given example file, gives proper output', async () => {
  const actual = await processDiagnosticsFromFile('./day-03/input_example.txt')

  expect(actual.gamma).toBe(0b10110);
  expect(actual.epsilon).toBe(0b01001);
})

test('Day 03a - Solution', async () => {
  const actual = await processDiagnosticsFromFile('./day-03/input.txt')

  expect(actual.gamma * actual.epsilon).toMatchInlineSnapshot(`1071734`);
})