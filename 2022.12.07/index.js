/*
  结论：
  1. 执行了resolve promise 状态变成了 fulfilled
  2. 执行了reject promise 状态变成了 rejected
  3. Promise状态不可逆，第一次成功就永久为fulfilled 第一次失败就永久状态为rejected
  4. Promise 有throw的话，就相当于执行了reject
 */

// 1. 基础resolve与reject
const PENDING = "PENDING",
  FULFILLED = "FULFILLED",
  REJECTED = "REJECTED"

class MyPromise {
  constructor(executor) {
    // 初始化
    this.initValue()
    this.initBind()

    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  initValue() {
    this.PromiseResult = null
    this.PromiseState = PENDING
    this.onFulfilledCallbacks = [] // 保存成功的回调
    this.onRejectedCallbacks = [] // 保存失败的回调
  }

  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  resolve(value) {
    // state的状态是不可变的
    if (this.PromiseState !== PENDING) return

    this.PromiseState = FULFILLED
    this.PromiseResult = value

    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult)
    }
  }

  reject(resaon) {
    // state的状态是不可变的
    if (this.PromiseState !== PENDING) return
    this.PromiseState = REJECTED
    this.PromiseResult = resaon
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult)
    }
  }

  // 接收两个回调
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (val) => val
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason
          }

    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        try {
          const x = cb(this.PromiseResult)

          if (x === thenPromise && x) {
            throw new Error("不能返回自身")
          }

          if (x instanceof MyPromise) {
            // 如果返回值是promise对象，返回值为成功，新promise就是成功
            // 如果返回值是promise对象，返回值为失败，新promise就是失败
            x.then(resolve, reject)
          } else {
            // 如果返回值是非promise对象，新promise对象就是成功，值为此返回值
            resolve(x)
          }
        } catch (error) {
          reject(error)
          throw new Error(error)
        }
      }

      if (this.PromiseState === FULFILLED) {
        resolvePromise(onFulfilled)
      } else if (this.PromiseState === REJECTED) {
        resolvePromise(onRejected)
      } else if (this.PromiseState === PENDING) {
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
      }
    })

    return thenPromise
  }

  // all
  all(promiseList) {
    const result = []
    let count = 0
    return new MyPromise((resolve, reject) => {
      const addData = (index, val) => {
        result[index] = val
        count++

        if (count === promiseList.length) {
          resolve(result)
        }
      }

      promiseList.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData(index, res)
            },
            (err) => reject(err)
          )
        } else {
          addData(index, promise)
        }
      })
    })
  }

  // race
  race(promiseList) {
    return new MyPromise((resolve, reject) => {
      promiseList.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              resolve(res)
            },
            (err) => {
              reject(err)
            }
          )
        } else {
          resolve(promise)
        }
      })
    })
  }

  allSettled(promiseList) {
    const result = []
    let count = 0
    return new MyPromise((resolve, reject) => {
      const addData = (state, val, i) => {
        result[i] = {
          state,
          val
        }
        count++
        if (count === promiseList.length) {
          resolve(result)
        }
      }

      promiseList.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData("fulfilled", res, index)
            },
            (err) => {
              addData("rejected", err, index)
            }
          )
        } else {
          addData("fulfilled", promise, index)
        }
      })
    })
  }

  any(promiseList) {
    let count = 0
    return new MyPromise((resolve, reject) => {
      promiseList.forEach((promise) => {
        promise.then(
          (res) => {
            resolve(res)
          },
          (err) => {
            count++
            if (count === promiseList.length) {
              reject("fail")
            }
          }
        )
      })
    })
  }
}

// all

// const test1 = new MyPromise((resolve, reject) => {
//   resolve(1)
// })

// const test2 = new MyPromise((resolve, reject) => {
//   resolve(2)
// })

// Promise.all([test1, 2]).then((res) => console.log(res))
