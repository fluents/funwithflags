var test = require('ava')
var parse = require('../')

test('short -k=v', t => {
  t.plan(1)

  var argv = parse(['-b=123'])
  t.deepEqual(argv, {b: 123, _: []})
})

test('multi short -k=v', t => {
  t.plan(1)

  var argv = parse(['-a=whatever', '-b=robots'])
  t.deepEqual(argv, {a: 'whatever', b: 'robots', _: []})
})
