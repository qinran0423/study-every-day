## 2022.12.15

### 实现 async/await

首先看下 generator 的作用

```js
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

// 初始化
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

      console.log(g.next(res3)) // 3s后 输出 {value: 8, done: true}
    })
  })
})
```

上方的 generator 函数的 Promise/next 传参，就很像 async/await 区别在于:

- gen 函数执行返回值不是 Promise， asyncFn 执行返回值是 Promise
- gen 函数需要执行相应的操作，才能等同于 asyncFn 的排队效果
- gen 函数执行的操作是不完善的，因为不确定有几个 yield，不确定会嵌套几层

针对这种情况，可以通过高阶函数(HOC)封装：
高阶函数：参数是函数，返回值也可以是函数

封装一个高阶函数，接收一个 generator 函数，并经过处理，返回一个具有 async 函数功能的函数

```js
function generatorToAsync(generatoFn) {
  // 经过一系列处理

  return 具有async函数功能的函数
}
```

```js
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
        const next2 = g.next(res1)
        next2.value.then((res2) => {
          const next3 = g.next(res2)
          next3.value.then((res3) => {
            resolve(g.next(res3).value)
          })
        })
      })
    })
  }
}

const asyncFn = generatorToAsync(gen)

asyncFn().then((res) => console.log(res))
```
