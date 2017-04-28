var test = require('ava')
var parse = require('../')

test('parse args', t => {
  t.deepEqual(parse(['--no-moo']), {moo: false, _: []}, 'no')
  t.deepEqual(
    parse(['-v', 'a', '-v', 'b', '-v', 'c']),
    {v: ['a', 'b', 'c'], _: []},
    'multi'
  )
})

test('comprehensive', t => {
  t.deepEqual(
    parse([
      '--name=meowmers',
      'bare',
      '-cats',
      'woo',
      '-h',
      'awesome',
      '--multi=quux',
      '--key',
      'value',
      '-b',
      '--bool',
      '--no-meep',
      '--multi=baz',
      '--',
      '--not-a-flag',
      'eek',
    ]),
    {
      c: true,
      a: true,
      t: true,
      s: 'woo',
      h: 'awesome',
      b: true,
      bool: true,
      key: 'value',
      multi: ['quux', 'baz'],
      meep: false,
      name: 'meowmers',
      _: ['bare', '--not-a-flag', 'eek'],
    }
  )
})

test('flag boolean', t => {
  var argv = parse(['-t', 'moo'], {boolean: 't'})
  t.deepEqual(argv, {t: true, _: ['moo']})
  t.deepEqual(typeof argv.t, 'boolean')
})

test('flag boolean value', t => {
  var argv = parse(['--verbose', 'false', 'moo', '-t', 'true'], {
    boolean: ['t', 'verbose'],
    default: {verbose: true},
  })

  t.deepEqual(argv, {
    verbose: false,
    t: true,
    _: ['moo'],
  })

  t.deepEqual(typeof argv.verbose, 'boolean')
  t.deepEqual(typeof argv.t, 'boolean')
})

test('newlines in params', t => {
  var args = parse(['-s', 'X\nX'])
  t.deepEqual(args, {_: [], s: 'X\nX'})

  // reproduce in bash:
  // VALUE="new
  // line"
  // node program.js --s="$VALUE"
  args = parse(['--s=X\nX'])
  t.deepEqual(args, {_: [], s: 'X\nX'})
})

test('strings', t => {
  var s = parse(['-s', '0001234'], {string: 's'}).s
  t.deepEqual(s, '0001234')
  t.deepEqual(typeof s, 'string')

  var x = parse(['-x', '56'], {string: 'x'}).x
  t.deepEqual(x, '56')
  t.deepEqual(typeof x, 'string')
})

test('stringArgs', t => {
  var s = parse(['  ', '  '], {string: '_'})._
  t.deepEqual(s.length, 2)
  t.deepEqual(typeof s[0], 'string')
  t.deepEqual(s[0], '  ')
  t.deepEqual(typeof s[1], 'string')
  t.deepEqual(s[1], '  ')
})

test('empty strings', t => {
  var s = parse(['-s'], {string: 's'}).s
  t.deepEqual(s, '')
  t.deepEqual(typeof s, 'string')

  var str = parse(['--str'], {string: 'str'}).str
  t.deepEqual(str, '')
  t.deepEqual(typeof str, 'string')

  var letters = parse(['-art'], {
    string: ['a', 't'],
  })

  t.deepEqual(letters.a, '')
  t.deepEqual(letters.r, true)
  t.deepEqual(letters.t, '')
})

test('string and alias', t => {
  var x = parse(['--str', '000123'], {
    string: 's',
    alias: {s: 'str'},
  })

  t.deepEqual(x.str, '000123')
  t.deepEqual(typeof x.str, 'string')
  t.deepEqual(x.s, '000123')
  t.deepEqual(typeof x.s, 'string')

  var y = parse(['-s', '000123'], {
    string: 'str',
    alias: {str: 's'},
  })

  t.deepEqual(y.str, '000123')
  t.deepEqual(typeof y.str, 'string')
  t.deepEqual(y.s, '000123')
  t.deepEqual(typeof y.s, 'string')
})

test('slashBreak', t => {
  t.deepEqual(parse(['-I/foo/bar/baz']), {I: '/foo/bar/baz', _: []})
  t.deepEqual(parse(['-xyz/foo/bar/baz']), {
    x: true,
    y: true,
    z: '/foo/bar/baz',
    _: [],
  })
})

test('alias', t => {
  var argv = parse(['-f', '11', '--zoom', '55'], {
    alias: {z: 'zoom'},
  })
  t.deepEqual(argv.zoom, 55)
  t.deepEqual(argv.z, argv.zoom)
  t.deepEqual(argv.f, 11)
})

test('multiAlias', t => {
  var argv = parse(['-f', '11', '--zoom', '55'], {
    alias: {z: ['zm', 'zoom']},
  })
  t.deepEqual(argv.zoom, 55)
  t.deepEqual(argv.z, argv.zoom)
  t.deepEqual(argv.z, argv.zm)
  t.deepEqual(argv.f, 11)
})

test('nested dotted objects', t => {
  var argv = parse([
    '--foo.bar',
    '3',
    '--foo.baz',
    '4',
    '--foo.quux.quibble',
    '5',
    '--foo.quux.o_O',
    '--beep.boop',
  ])

  t.deepEqual(argv.foo, {
    bar: 3,
    baz: 4,
    quux: {
      quibble: 5,
      o_O: true,
    },
  })
  t.deepEqual(argv.beep, {boop: true})
})
