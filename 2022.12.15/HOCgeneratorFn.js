function fn(nums) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(nums * 2)
    }, 1000)
  })
}

function* gen() {
  const num1 = yield fn(1)
  const num2 = yield fn(num1)
  const num3 = yield fn(num2)
  return num3
}

function generatorToAsync(generatorFn) {
  return function () {
    return new Promise((resolve, reject) => {
      const g = gen()
      const next1 = g.next()
      next1.value.then((res1) => {
        console.log(next1) // 1s 后 输出 {value: Promise{ fulfilled :  2 }, done: false}
        console.log(res1) // 1s 后 输出 2
        const next2 = g.next(res1)
        next2.value.then((res2) => {
          console.log(next2) // 2s 后 输出 {value: Promise{ fulfilled :  4 }, done: false}
          console.log(res2) // 2s 后 输出 4
          const next3 = g.next(res2)
          next3.value.then((res3) => {
            console.log(next3) // 3s 后 输出 {value: Promise{ fulfilled :  8 }, done: false}
            console.log(res3) // 3s 后 输出8
            // console.log(g.next(res3)) // 3s后 输出 {value: 8, done: true}
            resolve(g.next(res3).value)
          })
        })
      })
    })
  }
}

const asyncFn = generatorToAsync(gen)

asyncFn().then((res) => console.log(res))
