var test = require('ava')
var parse = require('../')

test('boolean default true', t => {
  var argv = parse([], {
    boolean: 'sometrue',
    default: {sometrue: true},
  })
  t.true(argv.sometrue)
})

test('boolean default false', t => {
  var argv = parse([], {
    boolean: 'somefalse',
    default: {somefalse: false},
  })
  t.false(argv.somefalse)
})

test('boolean default to null', t => {
  var argv = parse([], {
    boolean: 'maybe',
    default: {maybe: null},
  })
  t.is(argv.maybe, null)

  var argv2 = parse(['--maybe'], {
    boolean: 'maybe',
    default: {maybe: null},
  })
  t.true(argv2.maybe)
})
