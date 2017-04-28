const {resolve} = require('path')
const log = require('fliplog')
const minimist = require('minimist')
const Minimist = require('../index')
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

// order doesn't matter, same result
record
  .tags('boolean-loop-minus-one')
  .tags('foreach-to-for-defaults')
  .tags('battery')
  .add('Minimist!', () => Minimist(argv))
  .add('minimist', () => minimist(argv))
  .run()
// .runTimes(10)
