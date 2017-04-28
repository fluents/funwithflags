var test = require('ava')
var parse = require('../')

test('-', t => {
  t.plan(5)
  t.deepEqual(parse(['-n', '-']), {n: '-', _: []})
  t.deepEqual(parse(['-']), {_: ['-']})
  t.deepEqual(parse(['-f-']), {f: '-', _: []})
  t.deepEqual(parse(['-b', '-'], {boolean: 'b'}), {b: true, _: ['-']})
  t.deepEqual(parse(['-s', '-'], {string: 's'}), {s: '-', _: []})
})

test('-a -- b', t => {
  t.plan(3)
  t.deepEqual(parse(['-a', '--', 'b']), {a: true, _: ['b']})
  t.deepEqual(parse(['--a', '--', 'b']), {a: true, _: ['b']})
  t.deepEqual(parse(['--a', '--', 'b']), {a: true, _: ['b']})
})

test('move arguments after the -- into their own `--` array', t => {
  t.plan(1)
  t.deepEqual(
    parse(['--name', 'John', 'before', '--', 'after'], {'--': true}),
    {'name': 'John', '_': ['before'], '--': ['after']}
  )
})
