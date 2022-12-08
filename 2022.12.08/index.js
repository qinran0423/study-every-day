class EventEmitter {
  constructor() {
    this.events = {}
  }

  // 订阅事件
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [callback]
    } else {
      this.events[eventName].push(callback)
    }
  }

  emit(eventName, ...args) {
    this.events[eventName] &&
      this.events[eventName].forEach((event) => {
        event.apply(this, args)
      })
  }

  remove(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (event) => event != callback
      )
    }
  }

  once(eventName, callback) {
    const fn = (...args) => {
      callback.apply(this, args)
      this.remove(eventName, fn)
    }

    this.on(eventName, fn)
  }
}
