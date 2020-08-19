const assert = require('assert')
const decentUnit = require('../index')

describe('', function() {
  describe('decent', function() {
    it('> radix', function(done) {
      assert.deepEqual(decentUnit(2 * Math.pow(1024, 3)), { value: 2, unit: 'G' }, 'default options')
      assert.deepEqual(decentUnit(2 * Math.pow(1024, 3), { fromUnit: 'K' }), { value: 2, unit: 'T' }, 'custom fromUnit')
      assert.deepEqual(decentUnit(2 * Math.pow(1000, 3), { fromUnit: 'K', radix: 1000 }), { value: 2, unit: 'T' }, 'custom radix')
      assert.deepEqual(decentUnit(2 * Math.pow(1000, 3), { fromUnit: 'K', radix: [1000, 100] }), { value: 20, unit: 'P' }, 'custom array radix')
      assert.deepEqual(decentUnit(20000, { fromUnit: '', radix: [100, 10, 2], units: ['', 'K', 'M', 'G'] }), { value: 10, unit: 'G' }, 'custom array radix')
      done()
    })
    it('> 1, < radix', function(done) {
      assert.deepEqual(decentUnit(256), { value: 256, unit: '' }, 'default options')
      assert.deepEqual(decentUnit(100, { fromUnit: 'K' }), { value: 100, unit: 'K' }, 'custom fromUnit')
      assert.deepEqual(decentUnit(100, { fromUnit: 'E', radix: 1000 }), { value: 100, unit: 'E' }, 'custom radix')
      assert.deepEqual(decentUnit(100, { fromUnit: 'E', radix: [1000, 200] }), { value: 100, unit: 'E' }, 'custom array radix')
      assert.deepEqual(decentUnit(50, { fromUnit: 'K', radix: [100, 10, 2], units: ['', 'K', 'M', 'G'] }), { value: 2.5, unit: 'G' }, 'custom array radix')
      done()
    })
    it('< 1', function(done) {
      assert.deepEqual(decentUnit(0.1), { value: 0.1, unit: '' }, 'default options')
      assert.deepEqual(decentUnit(0.1, { fromUnit: 'G' }), { value: 102.4, unit: 'M' }, 'custom fromUnit')
      assert.deepEqual(decentUnit(0.1, { fromUnit: 'T', radix: 1000 }), { value: 100, unit: 'G' }, 'custom radix')
      assert.deepEqual(decentUnit(0.1, { fromUnit: 'T', radix: [1000, 100] }), { value: 10, unit: 'G' }, 'custom array radix')
      assert.deepEqual(decentUnit(0.01, { fromUnit: 'G', radix: [100, 10, 2], units: ['', 'K', 'M', 'G'] }), { value: 20, unit: '' }, 'custom array radix')
      done()
    })
    it('out range', function(done) {
      assert.deepEqual(decentUnit(0.1), { value: 0.1, unit: '' }, 'default options')
      assert.deepEqual(decentUnit(0.1, { fromUnit: 'a', units: ['a', 'b', 'c'] }), { value: 0.1, unit: 'a' }, 'custom fromUnit')
      assert.deepEqual(decentUnit(2 * 1000, { fromUnit: 'E', radix: [1000, 100] }), { value: 2000, unit: 'E' }, 'custom radix')
      done()
    })
  })
  describe('fixed toUnit', function() {
    it('in range', function(done) {
      assert.deepEqual(decentUnit(2 * Math.pow(1024, 3), { toUnit: 'T' }), { value: 2/1024, unit: 'T' }, 'default options')
      assert.deepEqual(decentUnit(2 * Math.pow(1024, 3), { toUnit: 'T', fromUnit: 'K' }), { value: 2, unit: 'T' }, 'custom fromUnit')
      assert.deepEqual(decentUnit(0.01, { toUnit: 'K', fromUnit: 'G' }), { value: 0.01 * Math.pow(1024, 2), unit: 'K' }, 'custom fromUnit, greater than toUnit')
      assert.deepEqual(decentUnit(2 * Math.pow(1000, 3), { toUnit: 'G', fromUnit: 'K', radix: 1000 }), { value: 2000, unit: 'G' }, 'custom radix')
      assert.deepEqual(decentUnit(2 * Math.pow(1000, 3), { toUnit: 'G', fromUnit: 'K', radix: [1000, 100] }), { value: 200000, unit: 'G' }, 'custom array radix')
      done()
    })
  })
  describe('throw', function() {
    it('out range', function(done) {
      assert.throws(() => decentUnit(2, { fromUnit: 'x' }), 'default options')
      assert.throws(() => decentUnit(2, { toUnit: 'x' }), 'default options')
      done()
    })
  })
})
