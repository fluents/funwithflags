var test = require('ava')
var parse = require('../')

test('boolean and alias is not unknown', t => {
  var unknown = []
  function unknownFn(arg) {
    unknown.push(arg)
    return false
  }
  var aliased = ['-h', 'true', '--derp', 'true']
  var regular = ['--herp', 'true', '-d', 'true']
  var opts = {
    alias: {h: 'herp'},
    boolean: 'h',
    unknown: unknownFn,
  }
  var aliasedArgv = parse(aliased, opts)
  var propertyArgv = parse(regular, opts)

  t.deepEqual(unknown, ['--derp', '-d'])
})

test('flag boolean true any double hyphen argument is not unknown', t => {
  var unknown = []
  function unknownFn(arg) {
    unknown.push(arg)
    return false
  }
  var argv = parse(['--honk', '--tacos=good', 'cow', '-p', '55'], {
    boolean: true,
    unknown: unknownFn,
  })
  t.deepEqual(unknown, ['--tacos=good', 'cow', '-p'])
  t.deepEqual(argv, {
    honk: true,
    _: [],
  })
})

test('string and alias is not unknown', t => {
  var unknown = []
  function unknownFn(arg) {
    unknown.push(arg)
    return false
  }
  var aliased = ['-h', 'hello', '--derp', 'goodbye']
  var regular = ['--herp', 'hello', '-d', 'moon']
  var opts = {
    alias: {h: 'herp'},
    string: 'h',
    unknown: unknownFn,
  }
  var aliasedArgv = parse(aliased, opts)
  var propertyArgv = parse(regular, opts)

  t.deepEqual(unknown, ['--derp', '-d'])
})

test('default and alias is not unknown', t => {
  var unknown = []
  function unknownFn(arg) {
    unknown.push(arg)
    return false
  }
  var aliased = ['-h', 'hello']
  var regular = ['--herp', 'hello']
  var opts = {
    default: {h: 'bar'},
    alias: {h: 'herp'},
    unknown: unknownFn,
  }
  var aliasedArgv = parse(aliased, opts)
  var propertyArgv = parse(regular, opts)

  t.deepEqual(unknown, [])
  t.false(unknownFn()) // exercise fn for 100% coverage
})

test('value following -- is not unknown', t => {
  var unknown = []
  function unknownFn(arg) {
    unknown.push(arg)
    return false
  }
  var aliased = ['--bad', '--', 'good', 'arg']
  var opts = {
    '--': true,
    'unknown': unknownFn,
  }
  var argv = parse(aliased, opts)

  t.deepEqual(unknown, ['--bad'])
  t.deepEqual(argv, {
    '--': ['good', 'arg'],
    '_': [],
  })
})
