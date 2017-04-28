var unknown = []
function unknownFn(arg) {
  unknown.push(arg)
  return true
}
require('../')(['--proper', 'globbing', `"**/*"`], {
  unknown: unknownFn,
  boolean: 'proper',
})
console.dir(unknown)
