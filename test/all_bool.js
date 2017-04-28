var test = require('ava')
var parse = require('../')

test('flag boolean true (default all --args to boolean)', t => {
  var argv = parse(['moo', '--honk', 'cow'], {
    boolean: true,
  })

  t.deepEqual(argv, {
    honk: true,
    _: ['moo', 'cow'],
  })

  t.deepEqual(typeof argv.honk, 'boolean')
})

test('flag boolean true only affects double hyphen arguments without equals signs', t => {
  var argv = parse(['moo', '--honk', 'cow', '-p', '55', '--tacos=good'], {
    boolean: true,
  })

  t.deepEqual(argv, {
    honk: true,
    tacos: 'good',
    p: 55,
    _: ['moo', 'cow'],
  })

  t.deepEqual(typeof argv.honk, 'boolean')
})
