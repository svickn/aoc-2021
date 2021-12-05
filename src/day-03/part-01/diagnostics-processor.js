const processDiagnostics = async lines => {
  let lineCount = 0;
  const onesCount = [];

  for await (const line of lines) {
    lineCount++;

    for (let i = 0; i < line.length; i++) {
      if (line[i] === '1') {
        onesCount[i] = (onesCount[i] ?? 0) + 1;
      }
    }
  }

  console.log(lineCount, onesCount);

  return {
    gamma: getGammaRate(lineCount, onesCount),
    epsilon: getEpsilonRate(lineCount, onesCount),
  };
};

const getGammaRate = (lineCount, onesCount) => {
  let value = 0;

  for (let i = onesCount.length - 1; i >= 0; i--) {
    if (onesCount[i] > lineCount / 2) {
      value += 2 ** (onesCount.length - i - 1);
    }
  }

  return value;
};

const getEpsilonRate = (lineCount, onesCount) => {
  let value = 0;

  for (let i = onesCount.length - 1; i >= 0; i--) {
    if (onesCount[i] < lineCount / 2) {
      value += 2 ** (onesCount.length - i - 1);
    }
  }

  return value;
};

exports.processDiagnostics = processDiagnostics;
