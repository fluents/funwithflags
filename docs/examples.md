# 📘 examples

- [verbose][examples-verbose]
- [types](#types)
- [defaults](#defaults)
- [obj](#obj)
- [alias](#alias)
- [dot-notation](#dot-notation)
- [shortflags](#shortflags)
- [extending](#extending)
- [vars](#vars)
- [unknown](#unknown)
- [double-dash](#double-dash)

[examples-verbose]:  https://github.com/aretecode/funwithflags/wiki/examples-verbose


## types
- Numeric-looking arguments will be returned as numbers unless `opts.string` or `opts.boolean` is set for that argument name.

### boolean

### 📘 examples

##### booleans
```js
var argv = fwf(['--cow', '--honk=eh', '--meep=mahna'], {boolean: ['cow', 'honk']})

// {
//   _: [],
//   cow: true,
//   honk: true,
//   meep: 'mahna'
// }
```

##### all boolean
```js
var argv = fwf(['-moo', '--honk', 'cow'], {boolean: true})

// {
//   honk: true,
//   _: ['moo', 'cow'],
// }
```


### string

ensure a value is a string, even when number-like

### 📘 example
```js
var argv = fwf(['--nan', '99'], {string: ['nan']})
// {nan: '99'}
```

## defaults
### 📘 example

```js
var argv = fwf(['--specificallytrue'], {
  boolean: ['eh', 'canada'],
  default: {
    eh: true,
    canada: false,
    unlesstrue: false,
    maybe: null,
  },
})

// {
//   _: [],
//   unlesstrue: true,
//   sometrue: true,
//   somefalse: false,
//   maybe: null
// }

```

## obj

returns the FunWithFlags instance rather than argv

### 📘 example

```js
var obj = fwf(['-a'], {obj: true})
```

## 🎯 alias
### 📘 example

### basic
```js
var aliased = ['-h', 'herpde', '--derp', 'derpde']
var opts = {
  alias: {h: 'herp'},
}
var argv = fwf(aliased, opts)

// {
//   _: [],
//   h: 'herpde',
//   herp: 'herpde',
//   derp: 'derpde',
// }
```

### dot-notation
```js
fwf(['--a.b', '22'], {
 string: 's',
 alias: {'s': 'str', 'a.b': 'aa.bb'},
 default: {'a.b': 11},
})
```

## shortflags
```js
fwf(['-mo', '--honk', 'cow'], {boolean: true})
// {m: true, o: true, honk: true}
```

## extending
```js
var FunWithFlags = require('funwithflags')

class Eh extends FunWithFlags {
  varructor() {
    super()
    console.log('eh!', this)
  }
}

var eh = new Eh()
var fwf = new FunWithFlags()
console.log(fwf)
```

## vars

> convert arguments without dashes to dashed

#### 📘 example

```js
fwf(['globbing', `"**/*"`], {vars: true})
// {globbing: `"**/*"`}
```


## unknown

> captures the unknown args, similar to how `vars` does automatically

#### 📘 example

```js
var unknown = []
function unknownFn(arg) {
  unknown.push(arg)
  return true
}
fwf(['--proper-flag', 'globbing', `"**/*"`], {
  unknown: unknownFn,
  boolean: 'proper-flag',
})

console.log(unknown) // ['globbing', `"**/*"`]
```

## double-dash

> Note that with `opts['--']` set, parsing for arguments still stops after the `--`.

- `argv._` contains all the arguments that didn't have an option associated with them.
- Any arguments after `'--'` will not be parsed and will end up in `argv._`.
- `opts['--']` - when true:
  - populate `argv._` with everything before the `--`
  - populate `argv['--']` with everything after the `--`.

#### 📘 example

```js
require('funwithflags')('one two three -- four five --six'.split(' '), { '--': true })
// { _: [ 'one', 'two', 'three' ], '--': [ 'four', 'five', '--six' ] }
```


#### 📘 example

#### minimal args
```
$ node example/parse.js -a beep -b boop
```
```js
var argv = require('funwithflags')(process.argv.slice(2))
argv === { _: [], a: 'beep', b: 'boop' }
```

#### lots of args
```
$ node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
```

```js
var argv = require('funwithflags')(process.argv.slice(2))

argv === {
  _: [ 'foo', 'bar', 'baz' ],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop'
}

```
