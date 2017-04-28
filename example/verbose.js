var unknown = []

// captures the unknown args, similar to how `vars` does
function unknownFn(arg) {
  unknown.push(arg)
  return true
}

var opts = {
  'default': {
    'moose.box': 11,
    'eh': true,
    'igloo': false,
  },
  'alias': {
    'moose.box': 'mooses.boxes',
    'rain': 'british-columbia',
  },
  'boolean': ['eh', 'igloo'],
  'string': ['country', 'nan', 'noflag'],
  'vars': true,
  '--': true,
  'obj': true, // will return the instance
  'unknown': unknownFn,
}

var args = [
  '--country=canada',

  // aliased to `rain` so it will have `rain: true, 'british-columbia': true`
  '--british-columbia',

  // no value is default a true boolean
  '--igloo',

  // dot notation
  '--a.b=100',

  // using `string: 'nan'` we ensure this stays as a string
  '--nan',
  '99',

  // first flag is boolean (t: true)
  // second flag assigned to following value (f: 555)
  '-tf',
  '555',

  // mooses and globbing are parsed only because `vars: true``
  'mooses.boxes=moozes',
  'globbing',
  `"**/*"`,

  // after double dash
  '--',
  'dis-little-piggy',
  'went-to-market',
]

var obj = require('../')(args, opts)
const argv = obj.argv

require('fliplog').quick({argv, obj, unknown})
