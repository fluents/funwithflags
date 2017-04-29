var test = require('ava')
var FunWithFlags = require('../')

test('instantiating class', t => {
  var fwf = new FunWithFlags()
  t.true(typeof fwf === 'object')
})

test('extending class', t => {
  class Eh extends FunWithFlags {
    constructor() {
      super()
      t.pass()
    }
  }

  var fwf = new FunWithFlags()
  var eh = new Eh()
  t.deepEqual(eh, fwf)
})
