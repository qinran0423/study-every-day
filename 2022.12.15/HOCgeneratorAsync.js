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
    const gen = generatorFn.apply(this, arguments)

    return new Promise((resolve, reject) => {
      function go(key, arg) {
        let res
        try {
          res = gen[key](arg)
        } catch (error) {
          return reject(error)
        }

        const { value, done } = res

        if (done) {
          // done为true 说明走完了
          return resolve(value)
        } else {
          // done为false 说明没走完还得继续走
          return Promise.resolve(value).then(
            (val) => go("next", val),
            (err) => go("throw", err)
          )
        }
      }

      go("next")
    })
  }
}

const asyncFn = generatorToAsync(gen)

asyncFn().then((res) => console.log(res))
