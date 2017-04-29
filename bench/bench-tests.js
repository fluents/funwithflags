const {resolve} = require('path')
const log = require('fliplog')
const minimist = require('minimist')
const Fun = require('../index')
const Record = require('../../../package/bench-chain')

const {record} = Record.suite(__dirname, true)

function run(parse) {
  parse(['moo', '--honk', 'cow'], {boolean: true})
  parse(['moo', '--honk', 'cow', '-p', '55', '--tacos=good'], {boolean: true})
  parse(['-n', '-'])
  parse(['-'])
  parse(['-f-'])
  parse(['-b', '-'])
  parse(['-s', '-'])
  parse(['-a', '--', 'b'])
  parse(['--a', '--', 'b'])
  parse(['--a', '--', 'b'])
  parse(['--name', 'John', 'before', '--', 'after'], {'--': true})
  parse(['--a.b', '22'], {
    default: {'a.b': 11},
    alias: {'a.b': 'aa.bb'},
  })
  parse('', {default: {'a.b': 11}, alias: {'a.b': 'aa.bb'}})
  parse('', {default: {'a.b': 11}})
  parse(['-b=123'])
  parse(['-a=whatever', '-b=robots'])
  parse(['--pow', 'xixxle'])
  parse(['--pow=xixxle'])
  parse(['--host', 'localhost', '--port', '555'])
  parse(['--host=localhost', '--port=555'])
  parse([
    '-x',
    '1234',
    '-y',
    '5.67',
    '-z',
    '1e7',
    '-w',
    '10f',
    '--hex',
    '0xdeadbeef',
    '789',
  ])
  parse(['-x', 1234, 789])
  parse(['-b', '123'], {boolean: 'b'})
  parse(['-v', 'a', '-v', 'b', '-v', 'c'])
  parse([
    '--name=meowmers',
    'bare',
    '-cats',
    'woo',
    '-h',
    'awesome',
    '--multi=quux',
    '--key',
    'value',
    '-b',
    '--bool',
    '--no-meep',
    '--multi=baz',
    '--',
    '--not-a-flag',
    'eek',
  ])

  parse(['-f', '11', '--zoom', '55'], {
    alias: {z: ['zm', 'zoom']},
  })
  parse([
    '--foo.bar',
    '3',
    '--foo.baz',
    '4',
    '--foo.quux.quibble',
    '5',
    '--foo.quux.o_O',
    '--beep.boop',
  ])
}

const {runTimes} = Fun(process.argv.slice(2), {
  default: {
    runTimes: 1,
  },
  camel: true,
  unknown(arg, fun) {
    if (fun.i === 0) {
      fun.argv.runTimes = Number(arg)
    }
  },
})

console.log({runTimes})

// order doesn't matter, same result
record
  .tags('boolean-loop-minus-one')
  .tags('foreach-to-for-defaults')
  .tags('battery')
  .tags('1.0.1')
  .add('minimist - full', () => run(minimist))
  .add('Fun - full', () => run(Fun))
  .runTimes(runTimes)
