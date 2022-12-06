class Scheduler {
  constructor(max) {
    this.max = max
    this.count = 0
    this.queue = new Array()
  }
  async add(promiseCreator) {
    //此时count 已满 不能执行本次add需要阻塞在这里，将resolve放入队列中 等待唤醒
    // 等到 count < max 从队列中取出执行resolve执行， await 执行完毕 本次add 继续
    if (this.count >= this.max) {
      await new Promise((resolve, reject) => this.queue.push(resolve))
    }

    this.count++
    await promiseCreator()
    this.count--
    if (this.queue.length) {
      this.queue.shift()()
    }
    // return res
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time)
  })

const scheduler = new Scheduler(2)
const addTask = (time, order) => {
  // add 返回一个promise 参数也是一个promise
  scheduler.add(() => timeout(time)).then(() => console.log(order))
}

addTask(1000, "1")
addTask(500, "2")
addTask(300, "3")
addTask(400, "4")

// 假设同时运行的任务有2个
// 流程
// 1. 1 2 两个任务同时执行
// 2. 第一个任务还没执行完， 第二个任务就执行完了，那第三个任务开始执行
// 3. 第一个任务还没执行完，第三个任务执行完了，第四个任务开始执行
// 4. 第一个任务执行完了，第四个任务也执行完了

// 需要一个队列 queue 表示等待队列
// 首先 我们只是假设任务有2个 这里我们需要动态
// max 表示我们的允许同时运行的任务的数量
// count 表示当前正在执行的任务数量

// 当资源不足的时候 将任务加入等待队列中， 当资源充足时，从等待队列中取出执行
