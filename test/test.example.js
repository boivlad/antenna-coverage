const assert = require('assert');
const { performance } = require('perf_hooks');
const antennaCoverage = require('../src/index');

describe('Test basic case', function() {
  let sumTime = 0;
  it('1) common antennas count 3, coverage 595, antennas array [43, 2, 300, 4, 554, 10]',
    function() {
      let start = performance.now()
      const result = antennaCoverage(3, 595, [43, 2, 300, 4, 554, 10]);
      let end = performance.now()
      sumTime += end - start
      assert.strictEqual(result, 281);
    });
  it('2) common antennas count 1, coverage 1, antennas array [1, 1, 1, 1]',
    function() {
      let start = performance.now()
      const result = antennaCoverage(1, 1, [1, 1, 1, 1]);
      let end = performance.now()
      sumTime += end - start
      assert.strictEqual(result, 0);
    });
  it('3) common antennas count 2, coverage 50, antennas array [20, 0, 3, 1]',
    function() {
      let start = performance.now()
      const result = antennaCoverage(2, 50, [20, 0, 3, 1]);
      let end = performance.now()
      sumTime += end - start
      assert.strictEqual(result, 30);
    });
  it(
    '4) common antennas count 5, coverage 240, antennas array [13, 0, 50, 25, 60, 5, 155, 70, 165, 70]',
    function() {
      let start = performance.now()
      const result = antennaCoverage(5, 240, [13, 0, 50, 25, 60, 5, 155, 70, 165, 70]);
      let end = performance.now()
      sumTime += end - start
      assert.strictEqual(result, 26);
    });

  after(function() {
    console.log('Test basic case = ' + sumTime)
  });
});
