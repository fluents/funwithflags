const {resolve} = require('path')
const log = require('fliplog')
const minimist = require('minimist')
const Fun = require('../index')
const Record = require('../../../package/bench-chain')

const {record} = Record.suite(__dirname, true)

const argv = [
  // false,
  // false,

  '--a',
  'foo',
  '--b',
  '--no-c',
  '--d',
  '5',
  '--e',
  'foo',
  '--e',
  'bar',
  '--h',
  'with a space',
  '--i',
  `let's try quotes`,
  '--camel-case-camel',
  'some',
  'option',
  '--',
  'DOUBLEDASH',
  'dewit',
  '-shortend',
]

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
  .add('Fun!', () => Fun(argv))
  .add('minimist', () => minimist(argv))
  .runTimes(runTimes)
