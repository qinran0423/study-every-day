## 手写Promise

### 实现Promise的基本功能及常见方法
- resolve
- reject
- then
- all
- race
- allSettled
- any



### 实现
#### resolve reject
```js
let p1 = new Promise((resolve, reject) => {
  resolve("success")
  reject("fail")
})

console.log("p1", p1)

let p2 = new Promise((resolve, reject) => {
  reject("success")
  resolve("fail")
})
console.log("p2", p2)

let p3 = new Promise((resolve, reject) => {
  throw "error"
})

console.log("p3", p3)
```
1. 执行了resolve promise 状态变成了 fulfilled
2. 执行了reject promise 状态变成了 rejected
3. Promise状态不可逆，第一次成功就永久为fulfilled 第一次失败就永久状态为rejected
4. Promise 有throw的话，就相当于执行了reject

#### then 
```js

let p1 = new Promise((resolve, reject) => {
  resolve("success")
}).then(
  (res) => console.log(res),
  (err) => console.log(err)
)

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("fail")
  }, 1000)
}).then(
  (res) => console.log(res),
  (err) => console.log(err)
)

let p3 = new Promise((resolve, reject) => {
  resolve(100)
})
  .then(
    (res) => console.log(res * 2),
    (err) => console.log(err)
  )
  .then(
    (res) => console.log(res),
    (err) => console.log(err)
  )
```
1. then 接收两个回调 一个是成功的回调， 一个是失败的回调
2. 当Promise 状态为fulfilled执行成功回调， 为 rejected 执行失败回调
3. 如resolve 或 reject 在定时器里面，则定时器结束后再执行then
4. then 支持链式调用 下一次then执行受上一次then返回值的影响

##### 链式调用
1. then 方法本身会返回一个新的Promise对象
2. 如果返回值是promise对象 返回值为成功 新promise就是成功
3. 如果返回值是promise对象 返回值为失败，新promise就是失败
4. 如果返回值非promise对象 新promise对象就是成功，值为此返回值