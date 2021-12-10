function getRange(startAt, endAt) {
  if(startAt === endAt) {
    return [startAt]
  }

  const end = startAt < endAt ? endAt : startAt;
  const start = endAt < startAt ? endAt : startAt;

  const output = []
  for(let i = start; i <= end; i++) {
    output.push(i)
  }

  return output;
}

const getCoordinatesForLine = (line, includeDiagonals) => {
  const coordPair = getCoordinatePair(line);

  if(!includeDiagonals 
    && coordPair[0][0] !== coordPair[1][0] 
    && coordPair[0][1] !== coordPair[1][1]
    ){ 
      return [];
  }

  return coordPair[0][0] === coordPair[1][0]
    ? getRange(coordPair[0][1], coordPair[1][1]).map(y => [coordPair[0][0], y])
    : getRange(coordPair[0][0], coordPair[1][0]).map(x => [x, coordPair[0][1]])
}

const getCoordinatePair = (line) => {
  const firstComma = line.indexOf(',')
  const arrow = line.indexOf('->')
  const secondComma = line.indexOf(',', arrow)

  return [
    [
      parseInt(line.substring(0, firstComma)),
      parseInt(line.substring(firstComma+1, arrow))
    ],
    [
      parseInt(line.substring(arrow+2, secondComma)),
      parseInt(line.substring(secondComma+1))
    ]
  ]
}

const detectHotSpots = (lines) => {
  const coordLines = lines.map(l => getCoordinatesForLine(l, false));
  const coordCounts = []
  for (const coordSet of coordLines) {
    for (const coord of coordSet) {
      const found = coordCounts.find(cc => cc[0][0] === coord[0] && cc[0][1] === coord[1])

      if(found) {
        found[1]++
      } else {
        coordCounts.push([coord, 1])
      }
    }
  }
  console.log(coordCounts)
  return coordCounts.filter(cc => cc[1] >= 2).map(cc => cc[0])
}

exports.getCoordinatesForLine = getCoordinatesForLine;
exports.getRange = getRange;
exports.detectHotSpots = detectHotSpots;