# decent-unit

Decent conversion of measurement units.

[![Build Status](https://travis-ci.org/lakca/decent-unit.svg?branch=master)](https://travis-ci.org/lakca/decent-unit)
[![codecov](https://codecov.io/gh/lakca/decent-unit/branch/master/graph/badge.svg)](https://codecov.io/gh/lakca/decent-unit)

## Usage

```js
const decentUnit = require('@lakca/decent-unit')
```

## Example

```js
decentUnit(2 * 1024 ** 3) // decent result: { value: 2, unit: 'G' }

decentUnit(2 * 1024 ** 3, { fromUnit: 'G' }) // decent result: { value: 2, unit: 'E' }

decentUnit(2 * 1000 ** 3, { fromUnit: 'G', radix: 1000 }) // decent result { value: 2, unit: 'E' }

decentUnit(20000, { fromUnit: '', radix: [100, 20, 10, 2], units: ['', 'K', 'M', 'G', 'T'] }) // decent result { value: 1, unit: 'G' }
 *

decentUnit(2 * 1024 ** 3, { fromUnit: 'G', toUnit: 'P' }) // expected result { value: 2048, unit: 'P' }
```

More in [test](test/main.js).

## API

### `decentUnit(num: number, options?: object)`

#### `{T} [options.fromUnit='']`

> unit of `num`.

#### `{T} [options.toUnit]`

> target unit.

#### `{number|number[]} [options.radix=1024]`

> conversion radix.
  If is an `array`, element is radix between every nearby units,
  and filled with the last array element if length is more than 1 less than `options.units`.

#### `@param {T[]} [options.units=['', 'K', 'M', 'G', 'T', 'P', 'E']]`

> available units

See [decentUnit](index.js#L28)

## LICENSE

MIT
