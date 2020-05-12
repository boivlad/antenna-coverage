const antennaCoverageCost = function(n, m, antennasData) {
  const antennas = [];
  for (let i = 0; i < antennasData.length; i += 2) {
    antennas.push({
      x: antennasData[i] - 1,
      s: antennasData[i + 1],
    })
  }

  const coverage = getCoverage(m, antennas);
  const left = m - coverage.reduce((count, isCovered) => count + isCovered, 0);
  if (!left) {
    return 0;
  }
  let unCovered = true;
  let cost = Math.floor(left / 2);
  while (unCovered) {
    const combinations = getCombinations(cost, n);
    for (let combination of combinations) {
      const ants = antennas.map((item, i) => ({
        x: item.x,
        s: item.s + combination[i]
      }));
      if (!getCoverage(m, ants).includes(0)) {
        unCovered = false;
        break;
      }
    }
    if (unCovered) {
      cost += 1;
    }
  }
  return cost;
}
const getCoverage = function(m, antennas) {
  const dp = Array(m).fill(0);
  for (let i = 0; i < antennas.length; i++) {
    const min = Math.max(0, antennas[i].x - antennas[i].s);
    const max = Math.min(m - 1, antennas[i].x + antennas[i].s);
    for (let j = min; j <= max; j++) {
      dp[j] = 1;
    }
  }
  return dp;
}

function getCombinations(n, m) {
  const combinations = [];
  if (m === 2) {
    for (let i = 0; i <= n; i++) {
      combinations.push([i, n - i]);
    }
  } else {
    for (let i = 0; i <= n; i++) {
      getCombinations(n - i, m - 1).forEach(item => combinations.push([i, ...item]));
    }
  }
  return combinations;
}

module.exports = antennaCoverageCost;
