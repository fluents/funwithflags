const fwf = require('../')
var argv = fwf(['--cow', '--honk=eh', '--meep=mahna'], {
  boolean: ['cow', 'honk'],
})
console.log({argv})
