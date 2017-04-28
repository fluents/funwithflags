var test = require('ava')
var parse = require('../')

test('parse with modifier functions', t => {
  t.plan(1)

  var argv = parse(['-b', '123'], {boolean: 'b'})
  t.deepEqual(argv, {b: true, _: [123]})
})
