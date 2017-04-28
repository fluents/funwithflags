var test = require('ava')
var parse = require('../')

test('dotted alias', t => {
  var argv = parse(['--a.b', '22'], {
    default: {'a.b': 11},
    alias: {'a.b': 'aa.bb'},
  })

  t.is(argv.a.b, 22)
  t.is(argv.aa.bb, 22)
})

test('dotted default', t => {
  var argv = parse('', {default: {'a.b': 11}, alias: {'a.b': 'aa.bb'}})
  t.is(argv.a.b, 11)
  t.is(argv.aa.bb, 11)
})

test('dotted default with no alias', t => {
  var argv = parse('', {default: {'a.b': 11}})
  t.is(argv.a.b, 11)
})
