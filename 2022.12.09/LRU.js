class LRUCache {
  constructor(limit) {
    this.limit = limit
    this.map = {}
    this.keys = []
  }

  get(key) {
    let r = -1
    if (typeof this.map[key] != "undefined") {
      r = this.map[key]
      this.update(key)
    }

    return r
  }

  // 切换key的位置
  update(key) {
    let idx = this.keys.indexOf(key)
    if (idx != this.keys.length - 1) {
      this.keys.splice(idx, 1)
      this.keys.push(key)
    }
  }

  set(key, val) {
    if (typeof key == "undefined" || typeof val == "undefined")
      throw new Error("key or value is undefined")

    if (typeof this.map[key] != "undefined") {
      this.update(key)
      this.map[key] = val
    } else {
      if (this.keys.length === this.limit) {
        delete this.map[this.keys[0]]
        this.keys.splice(0, 1)
      }

      this.keys.push(key)
      this.map[key] = val
    }
  }
}

class LRUMapCache {
  constructor(capacity) {
    this.cache = new Map()
    this.capacity = capacity
  }

  get(key) {
    if (this.cache.has(key)) {
      let temp = this.cache.get(key)
      this.cache.delete(key)
      this.cache.set(key, temp)
    } else {
      return -1
    }
  }

  put(key, val) {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value)
    }

    this.cache.set(key, val)
  }
}
