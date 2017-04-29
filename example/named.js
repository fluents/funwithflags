var parse = require('../')

function unknown(arg, fun) {
  switch (fun.i) {
    case 0:
      fun.argv.shugabush = Boolean(arg)
      return true
    case 1:
      fun.argv.entry = arg
      return true
    default:
      if (/\.js/.test(arg)) fun.argv.entry = arg
      return false
  }
}
var argv = parse(['1', 'entry.js', 3], {unknown})
var argv = parse(['1', 3, 'entry.js'], {unknown})

require('fliplog').quick(argv)
