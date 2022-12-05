## 使用JS实现带并发的异步任务调度器

### 问题
实现一个带并发限制的异步调度器 Scheduler，保证同时运行的任务最多有N个。完善下面代码中的 Scheduler 类，使得以下程序能正确输出：

```js
class Scheduler {
  add(promiseCreator) { ... }
  // ...
}

const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler(n)
const addTask = (time, order) => {
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')

// 打印顺序是：2 3 1 4
```