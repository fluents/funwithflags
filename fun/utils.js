function hasKey(obj, keys) {
  var o = obj
  const sliced = keys.slice(0, -1)

  for (let i = 0; i < sliced.length; i++) {
    const key = sliced[i]
    o = o[key] || {}
  }

  var key = keys[keys.length - 1]

  return o[key] !== undefined
}

// function hasKey(obj, keys) {
//   let o = obj
//   keys.slice(0, -1).forEach(key => {
//     o = o[key] || {}
//   })
//
//   let key = keys[keys.length - 1]
//   return key in o
// }

function isNum(x) {
  if (typeof x === 'number') return true
  if (/^0x[0-9a-f]+$/i.test(x) === true) return true
  return (/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/).test(x)
}

module.exports = {hasKey, isNum}
