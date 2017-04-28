const dargs = require('dargs')
const Minimist = require('../index')

const parsed = Minimist(
  [
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
    '-f',
    '11',
    '--zoom',
    '55',
  ],
  {
    alias: {z: ['zm', 'zoom']},
  }
)

const d = dargs(parsed)
console.log(d)
