var test = require('ava')
var parse = require('../')

test('spaces', t => {
  var argv = parse(['with a space'])
  t.true(argv._.includes('with a space'))
})

test('camel case', t => {
  var argv = parse(['--camel-case-camel', '--run-times', '10'], {
    camel: true,
  })
  t.deepEqual(argv.runTimes, 10)
  t.true(argv.camelCaseCamel)
})

test('camel case types - both options', t => {
  var argv = parse(['--camel-case-camel', '--camelCaseFlag', '010'], {
    boolean: ['camelCaseCamel', 'camelCaseFlag', '--camel-case-camel'],
    camel: true,
  })
  t.true(argv.camelCaseCamel)
  t.true(argv.camelCaseFlag)
})

test.failing('lowercase types', t => {
  var argv = parse(['--lowerCaseFlag', '010'], {
    boolean: ['lowercaseflag'],
    camel: true,
  })
  t.true(argv.lowerCaseFlag)
})

test.failing('camel case types - would mean camel-casing args first', t => {
  var argv = parse(['--camel-case-camel', '010', '--camelCaseFlag', '010'], {
    boolean: ['camelCaseCamel', 'camelCaseFlag'],
    camel: true,
  })
  t.true(argv.camelCaseCamel)
  t.true(argv.camelCaseFlag)
})

test.todo(`parse(['moo=', 'null'])`)
