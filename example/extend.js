const FunWithFlags = require('../')

class Eh extends FunWithFlags {
  constructor() {
    super()
    require('fliplog').verbose().data(this).blue('funwithflags eh').echo()
  }
}

const eh = new Eh()
const f = new FunWithFlags()
require('fliplog').quick(f)
