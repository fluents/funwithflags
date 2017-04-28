var test = require('ava')
var parse = require('../')

test('whitespace should be whitespace', t => {
  t.plan(1)
  var x = parse(['-x', '\t']).x
  t.deepEqual(x, '\t')
})
