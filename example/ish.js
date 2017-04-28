const min = require('../')
let ffn = min
// ffn = require('minimist')

// var unknown = []
// function unknownFn(arg) {
//   unknown.push(arg)
//   return false
// }
// var argv = ffn(['--honk', '--tacos=good', 'cow', '-p', '55'], {
//   boolean: true,
//   unknown: unknownFn,
// })
// require('fliplog').quick({argv, unknown})

// process.argv.slice(2)
// const res = ffn(['--a.b', '22'], {
//   string: 's',
//   alias: {'s': 'str', 'a.b': 'aa.bb'},
//   obj: true,
//   default: {'a.b': 11},
// })
const res = ffn(
  ['-x', '-z', 'one', 'two', 'three', 'noflag=eh', 'globbing', '\'ehoh ehoh\''],
  {
    boolean: ['x', 'y', 'z'],
    string: ['noflag'],
    vars: true,
  }
)

require('fliplog').quick({res})

console.log(res)

console.log(
  require('minimist')(process.argv.slice(2), {
    string: 's',
    alias: {s: 'str'},
  })
)
