# monkerware
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

Imports [MonkerWare](https://monkerware.com/) ranges, a proprietary directory structure used by [MonkerViewer](https://monkerware.com/viewer.html).

Useful for tinkering with MonkerViewer ranges (`.rng` files) downloaded from [RangeConverter](https://rangeconverter.com).

### Usage
Install the library with `npm install monkerware`

```javascript
import { RangeImporter } from 'monkerware';

// Import a single .rng file (single branch)
// Returns a Map from hand representations (e.g. 'AA', 'AKs', 'AKo') to { p, ev } objects
// p = probability of playing the hand in this range as part of the GTO mixed strategy
// ev = expected value (in small blinds) when playing the hand in this range
const range = RangeImporter.importFile({ path: '/some/path/0.rng' });

// Import a directory with .rng files (full strategy)
// Returns a Map from branch names (e.g. '0', '5.3.1.0' to ranges (as returned from importFile)
const ranges = RangeImporter.importDirectory({ path: '/some/path/' });
```

[downloads-image]: https://img.shields.io/npm/dm/monkerware.svg

[npm-url]: https://npmjs.org/package/monkerware
[npm-image]: https://img.shields.io/npm/v/monkerware.svg
