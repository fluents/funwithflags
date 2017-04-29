var test = require('ava')
var parse = require('../')

test('parses arguments as flags', t => {
  var argv = parse(['globbing', `"**/*"`], {vars: true})

  t.deepEqual(argv.globbing, '"**/*"')
})
