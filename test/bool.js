var test = require('ava')
var parse = require('../')

test('flag boolean default false', t => {
  var argv = parse(['moo'], {
    boolean: ['t', 'verbose'],
    default: {verbose: false, t: false},
  })

  t.deepEqual(argv, {
    verbose: false,
    t: false,
    _: ['moo'],
  })

  t.deepEqual(typeof argv.verbose, 'boolean')
  t.deepEqual(typeof argv.t, 'boolean')
})

test('boolean groups', t => {
  var argv = parse(['-x', '-z', 'one', 'two', 'three'], {
    boolean: ['x', 'y', 'z'],
  })

  t.deepEqual(argv, {
    x: true,
    y: false,
    z: true,
    _: ['one', 'two', 'three'],
  })

  t.deepEqual(typeof argv.x, 'boolean')
  t.deepEqual(typeof argv.y, 'boolean')
  t.deepEqual(typeof argv.z, 'boolean')
})
test('boolean and alias with chainable api', t => {
  var aliased = ['-h', 'derp']
  var regular = ['--herp', 'derp']
  var opts = {
    herp: {alias: 'h', boolean: true},
  }
  var aliasedArgv = parse(aliased, {
    boolean: 'herp',
    alias: {h: 'herp'},
  })
  var propertyArgv = parse(regular, {
    boolean: 'herp',
    alias: {h: 'herp'},
  })
  var expected = {
    herp: true,
    h: true,
    _: ['derp'],
  }

  t.deepEqual(aliasedArgv, expected)
  t.deepEqual(propertyArgv, expected)
})

test('boolean and alias with options hash', t => {
  var aliased = ['-h', 'derp']
  var regular = ['--herp', 'derp']
  var opts = {
    alias: {h: 'herp'},
    boolean: 'herp',
  }
  var aliasedArgv = parse(aliased, opts)
  var propertyArgv = parse(regular, opts)
  var expected = {
    herp: true,
    h: true,
    _: ['derp'],
  }
  t.deepEqual(aliasedArgv, expected)
  t.deepEqual(propertyArgv, expected)
})

test('boolean and alias array with options hash', t => {
  var aliased = ['-h', 'derp']
  var regular = ['--herp', 'derp']
  var alt = ['--harp', 'derp']
  var opts = {
    alias: {h: ['herp', 'harp']},
    boolean: 'h',
  }
  var aliasedArgv = parse(aliased, opts)
  var propertyArgv = parse(regular, opts)
  var altPropertyArgv = parse(alt, opts)
  var expected = {
    harp: true,
    herp: true,
    h: true,
    _: ['derp'],
  }
  t.deepEqual(aliasedArgv, expected)
  t.deepEqual(propertyArgv, expected)
  t.deepEqual(altPropertyArgv, expected)
})

test('boolean and alias using explicit true', t => {
  var aliased = ['-h', 'true']
  var regular = ['--herp', 'true']
  var opts = {
    alias: {h: 'herp'},
    boolean: 'h',
  }
  var aliasedArgv = parse(aliased, opts)
  var propertyArgv = parse(regular, opts)
  var expected = {
    herp: true,
    h: true,
    _: [],
  }

  t.deepEqual(aliasedArgv, expected)
  t.deepEqual(propertyArgv, expected)
})

// regression, see https://github.com/substack/node-optimist/issues/71
test('boolean and --x=true', t => {
  var parsed = parse(['--boool', '--other=true'], {
    boolean: 'boool',
  })

  t.true(parsed.boool)
  t.deepEqual(parsed.other, 'true')

  parsed = parse(['--boool', '--other=false'], {
    boolean: 'boool',
  })

  t.true(parsed.boool)
  t.deepEqual(parsed.other, 'false')
})

test('boolean --boool=true', t => {
  var parsed = parse(['--boool=true'], {
    default: {
      boool: false,
    },
    boolean: ['boool'],
  })

  t.true(parsed.boool)
})

test('boolean --boool=false', t => {
  var parsed = parse(['--boool=false'], {
    default: {
      boool: true,
    },
    boolean: ['boool'],
  })

  t.false(parsed.boool)
})
