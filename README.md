# 🚩 funwithflags

![funwithflags]

[![Build Status][travis-image]][travis-url]
[![NPM version][funwithflags-npm-image]][funwithflags-npm-url]
[![MIT License][license-image]][license-url]
[![fliphub][gitter-badge]][gitter-url]
[![fluents][fluents-image]][fluents-url]

> parse argument options

This module is [minimist](https://github.com/substack/minimist) refactored as a fluent class ~125% faster.

[![browser support](https://ci.testling.com/substack/minimist.png)](http://ci.testling.com/substack/minimist)


### [📘 examples](https://github.com/aretecode/funwithflags/wiki/examples)

``` js
var argv = require('funwithflags')(process.argv.slice(2));
console.log(argv);
```

### [📦 install][funwithflags-npm-url]

```
yarn add funwithflags --dev
npm install funwithflags --save-dev
```

### ⚙ options

| Name | Type | Description | ?Default | Example  |
| ---- | ---- | ----------- | -------- | -------- |
| [string][examples-string] | <code>string &#124; Array&lt;string&gt;</code> | names to always treat as strings | `null` |
| [boolean][examples-boolean] | <code>boolean &#124; string &#124; Array&lt;string&gt;</code> | always treat as booleans. if `true` will treat all double hyphenated arguments without equal signs. (e.g. affects `--foo`, not `-f` or `--foo=bar`) | `null` |
| [alias][examples-alias] | `Object` | an object mapping string names to strings or arrays of string names to use as aliases | `{}` |
| [default][examples-default] | `Object` | an object mapping string argument names to default values| `{}` |
| [`['--']`][examples-dd] | `boolean` | populate `argv._` with everything before the `--` and `argv['--']` with everything after the `--` | `null` |
| [stopEarly][examples-stop-early] | `boolean` | when true, populate `argv._` with everything after the first non-option| `null` |
| [unknown][examples-unknown] | `Function` | a function which is invoked with a command line parameter not defined in the `opts` configuration object. If the function returns `false`, the unknown option is not added to `argv` | `null` |
| [obj][examples-obj] | `boolean` | when true, returns the object instance of FunWithFlags | `null` |
| [vars][examples-vars] | `boolean` | when true, allows args without dashes to be used as flags | `null` |
| camel | `boolean` | when true, camelCases object keys on argv | `null` |
| underscore | `boolean` | when false, object is returned with no `_` (for looping over object keys or values or the like) | `null` |


### [extending the class][examples-extending]

[examples-vars]: https://github.com/aretecode/funwithflags/wiki/examples#vars
[examples-obj]: https://github.com/aretecode/funwithflags/wiki/examples#obj
[examples-alias]: https://github.com/aretecode/funwithflags/wiki/examples#alias
[examples-default]: https://github.com/aretecode/funwithflags/wiki/examples#default
[examples-unknown]: https://github.com/aretecode/funwithflags/wiki/examples#unknown
[examples-string]: https://github.com/aretecode/funwithflags/wiki/examples#types
[examples-boolean]: https://github.com/aretecode/funwithflags/wiki/examples#types
[examples-dd]: https://github.com/aretecode/funwithflags/wiki/examples#double-dash
[examples-stop-early]: https://github.com/aretecode/funwithflags/wiki/examples#stop-early
[examples-extending]:  https://github.com/aretecode/funwithflags/wiki/examples#extending
[examples-verbose]:  https://github.com/aretecode/funwithflags/wiki/examples-verbose

# [🔬 tests](./test)
- tests use [ava](https://github.com/avajs/ava)

# [🏋️ benchmarks](./bench)
<!-- benchmark img -->
- benchmarks use [benchmark.js](benchmarkjs.com) with [bench-chain](https://github.com/aretecode/bench-chain)


#### [verbose][examples-verbose]
```js

var unknown = []

// captures the unknown args, similar to how `vars` does
function unknownFn(arg) {
  unknown.push(arg)
  return true
}

var opts = {
  'default': {
    'moose.box': 11,
    'eh': true,
    'igloo': false,
  },
  'alias': {
    'moose.box': 'mooses.boxes',
    'rain': 'british-columbia',
  },
  'boolean': ['eh', 'igloo'],
  'string': ['country', 'nan', 'noflag'],
  'vars': true,
  '--': true,
  'obj': true, // will return the instance
  'unknown': unknownFn,
}

var args = [
  '--country=canada',

  // aliased to `rain` so it will have `rain: true, 'british-columbia': true`
  '--british-columbia',

  // no value is default a true boolean
  '--igloo',

  // dot notation
  '--a.b=100',

  // using `string: 'nan'` we ensure this stays as a string
  '--nan',
  '99',

  // first flag is boolean (t: true)
  // second flag assigned to following value (f: 555)
  '-tf',
  '555',

  // mooses and globbing are parsed only because `vars: true``
  'mooses.boxes=moozes',
  'globbing',
  `"**/*"`,

  // after double dash
  '--',
  'dis-little-piggy',
  'went-to-market',
]

var obj = require('../')(args, opts)
const argv = obj.argv

```



[fluents-image]: https://img.shields.io/badge/⛓-fluent-9659F7.svg
[fluents-url]: https://www.npmjs.com/package/flipchain


[funwithflags1]: http://funwithflags.info/img/funwhitflagLogo.png
[funwithflags]: https://68.media.tumblr.com/02297f01d9716cede3879e7e139e0cfc/tumblr_inline_o7p6oyQ6cT1r18apd_500.gif

[funwithflags-npm-image]: https://img.shields.io/npm/v/funwithflags.svg
[funwithflags-npm-url]: https://npmjs.org/package/funwithflags
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: https://spdx.org/licenses/MIT
[gitter-badge]: https://img.shields.io/gitter/room/fliphub/pink.svg
[gitter-url]: https://gitter.im/fliphub/Lobby
[travis-url]: http://travis-ci.org/substack/minimist
[travis-image]: https://travis-ci.org/substack/minimist.png
