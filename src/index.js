const antennaCoverage = function(n, m, antennasData) {
  // for (let i = 0; i < antennasData.length; i += 2) {
  //   antennasData[i] -= 1;
  // }

  const coverage = getCoverage(m, antennasData);
  const toCover = m - coverage.reduce((count, isCovered) => count + isCovered, 0);
  if (!toCover) {
    return 0;
  }
  let isCovered = false;
  let cost = Math.floor(toCover / 2);
  while (!isCovered) {
    const combs = getCombinations(cost, n);
    for (let comb of combs) {
      for (let i = 0; i < antennasData.length; i += 2) {
        antennasData[i + 1] += comb[i];
      }
      if (!getCoverage(m, antennasData).includes(0)) {
        isCovered = true;
        break;
      }
    }
    if (!isCovered) {
      cost += 1;
    }
  }
  return cost;
}
const getCoverage = function(m, antennas) {

  const result = Array(m).fill(0);
  for (let i = 0; i < antennas.length; i += 2) {
    const x = antennas[i];
    const s = antennas[i + 1];
    const from = Math.max(0, x - s);
    const to = Math.min(m - 1, x + s);
    for (let j = from; j <= to; j++) {
      result[j] = 1;
    }
  }
  return result;
}

function getCombinations(n, m) {
  const combs = [];
  if (m === 2) {
    for (let i = 0; i <= n; i++) {
      combs.push([i, n - i]);
    }
  } else {
    for (let i = 0; i <= n; i++) {
      getCombinations(n - i, m - 1).forEach(a => combs.push([i, ...a]));
    }
  }
  return combs;
}

module.exports = antennaCoverage;
