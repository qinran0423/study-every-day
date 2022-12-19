var arr = [1, [2, [3, 4]]]
// 递归
function flatten(arr) {
  var result = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }

  return result
}

console.log(flatten(arr))

function flatten1(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten1(next) : next)
  }, [])
}
console.log(flatten1(arr))

function flatten2(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
console.log(flatten2(arr))

var result = arr.flat(Infinity)
console.log(result)
