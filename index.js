const UNITS = ['', 'K', 'M', 'G', 'T', 'P', 'E']
/**
 * Convert number from one to another with particular radix (and unit).
 *
 * - When no target unit provided, a decent target unit will be applied.
 *
 * - `Decent target unit`: the number after converted is greater than `1` and less than `radix`, as possible.
 *
 * @example
 *
 * decentUnit(2 * 1024 ** 3) // decent result: { value: 2, unit: 'G' }
 * decentUnit(2 * 1024 ** 3, { fromUnit: 'G' }) // decent result: { value: 2, unit: 'E' }
 * decentUnit(2 * 1000 ** 3, { fromUnit: 'G', radix: 1000 }) // decent result { value: 2, unit: 'E' }
 * decentUnit(20000, { fromUnit: '', radix: [100, 20, 10, 2], units: ['', 'K', 'M', 'G', 'T'] }) // decent result { value: 1, unit: 'G' }
 *
 * decentUnit(2 * 1000 ** 3, { fromUnit: 'G', toUnit: 'P' }) // expected result { value: 2000, unit: 'P' }
 *
 * @template {string} T
 * @param {number} num source number.
 * @param {object} [options]
 * @param {T} [options.fromUnit=''] unit of `num`.
 * @param {T} [options.toUnit] target unit.
 * @param {number|number[]} [options.radix=1024] conversion radix.
 *  - If is an `array`, element is radix between every nearby units,
 *  and filled with the last array element if length is more than 1 less than `options.units`.
 * @param {T[]} [options.units=['', 'K', 'M', 'G', 'T', 'P', 'E']]
 */
module.exports = function decentUnit(num, options) {
  options = Object.assign({ fromUnit: '', radix: 1024, units: UNITS }, options)
  const radix = Array.isArray(options.radix)
    ? options.radix.length > options.units.length - 2
      ? options.radix
      : options.radix.concat(new Array(options.units.length - 1 - options.radix.length).fill(options.radix[options.radix.length - 1]))
    : new Array(options.units.length - 1).fill(options.radix)
  const j = options.units.indexOf(options.toUnit)
  let i = options.units.indexOf(options.fromUnit)
  if (i < 0) throw new Error('Unknown fromUnit: ' + options.fromUnit)
  if (options.toUnit !== undefined && j < 0) throw new Error('Unknown toUnit: ' + options.toUnit)
  if (j < 0) {
    if (num >= radix[i]) {
      while (num >= radix[i] && i < options.units.length - 1) {
        num /= radix[i]
        i++
      }
    } else if (num < 1) {
      while (num < 1 && i > 0) {
        i--
        num *= radix[i]
      }
    }
  } else {
    if (i > j) {
      while (i > j) {
        i--
        num *= radix[i]
      }
    } else {
      while (i < j) {
        num /= radix[i]
        i++
      }
    }
  }
  return {
    value: num,
    unit: options.units[i]
  }
}
