class FIFOCache {
  constructor(limit) {
    this.limit = limit
    this.map = {}
    this.keys = []
  }

  get(key) {
    return this.map[key]
  }

  set(key, value) {
    if (this.keys.length >= this.limit) {
      const i = this.keys.indexOf(key)
      if (i !== -1) {
        delete this.map[this.keys.shift()]
      } else {
        this.keys.splice(i, 1)
      }
    }
    this.keys.push(key)
    this.map[key] = value
  }
}
