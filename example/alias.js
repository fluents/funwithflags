var fwf = require('../')
var aliased = ['-h', 'herpde', '--derp', 'derpde']
var opts = {
  alias: {h: 'herp'},
}
var argv = fwf(aliased, opts)
console.log(argv)

const eh = {
  _: [],
  h: 'herpde',
  herp: 'herpde',
  derp: 'derpde',
}
