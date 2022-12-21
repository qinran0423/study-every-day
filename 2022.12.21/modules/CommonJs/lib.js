// lib.js
var counter = 3
function incCounter() {
  counter++
  return counter
}
module.exports = {
  counter: counter,
  incCounter: incCounter
}
