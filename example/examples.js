const fwf = require('../')

function same(obj1, obj2) {
  return JSON.stringify(obj1, null, 2) === JSON.stringify(obj2, null, 2)
}

var argv = fwf(['--unlesstrue'], {
  boolean: ['sometrue', 'somefalse'],
  default: {
    sometrue: true,
    somefalse: false,
    unlesstrue: false,
    maybe: null,
  },
})

// console.log('defaults:', argv)
console.assert(
  same(argv, {
    _: [],
    unlesstrue: true,
    sometrue: true,
    somefalse: false,
    maybe: null,
  })
)

var unknown = []
function unknownFn(arg) {
  unknown.push(arg)
  return false
}
var argv = fwf(['--honk', '--tacos=good', 'cow', '-p', '55'], {
  boolean: true,
  unknown: unknownFn,
})
console.log('unknowns & boolean:', argv)

var argv = fwf(['--a.b', '22'], {
  string: 's',
  alias: {'s': 'str', 'a.b': 'aa.bb'},
  // obj: true,
  default: {'a.b': 11},
})

console.log('alias, default', argv)

var aliased = ['-h', 'herpde', '--derp', 'derpde']
var opts = {
  alias: {h: 'herp'},
}
var argv = fwf(aliased, opts)
console.log('alias, simple', argv)

console.log('all boolean', fwf(['-mo', '--honk', 'cow'], {boolean: true}))

console.log(
  'dd',
  fwf('one two three -- four five --six'.split(' '), {'--': true})
)
