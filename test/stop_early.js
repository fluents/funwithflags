var test = require('ava')
var parse = require('../')

test('stops parsing on the first non-option when stopEarly is set', t => {
  var argv = parse(['--aaa', 'bbb', 'ccc', '--ddd'], {
    stopEarly: true,
  })

  t.deepEqual(argv, {
    aaa: 'bbb',
    _: ['ccc', '--ddd'],
  })
})
