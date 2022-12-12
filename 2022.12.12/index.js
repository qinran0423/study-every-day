class LFUCache {
  constructor(capacity) {
    this.limit = capacity
    this.map = {}
    this.freqMap = {}
  }

  get(key) {
    let r = -1
    if (typeof this.map[key] != "undefined") {
      let o = this.map[key]
      r = o.value

      this.updateL(key, o)
    }
  }

  updateL(key, obj) {
    let freq = obj.freq
    let arr = this.freqMap[freq]
    // 删除原频率记录
    this.freqMap[freq].splice(arr.indexOf(key), 1)

    if (this.freqMap[freq].length === 0) delete this.freqMap[freq]

    freq = obj.freq = obj.freq + 1
    if (!this.freqMap[freq]) this.freqMap[freq] = []

    this.freqMap[freq].push(key)
  }

  setL(key, value) {
    if (this.limit <= 0) return

    if (typeof key == "undefined" || typeof value == "undefined")
      throw new Error("key or value is undefined")

    if (typeof this.map[key] == "undefined") {
      if (Object.keys(this.map).length === this.limit) {
        let fkeys = Object.keys(this.freqMap)
        let freq = fkeys[0]
        let keys = this.freqMap[freq]
        delete this.map[keys.shift()]
        if (this.freqMap[freq].length == 0) delete this.freqMap[freq]
      }

      if (!this.freqMap[1]) this.freqMap[1] = []
      this.freqMap[1].push(key)
      this.map[key] = {
        value,
        freq: 1
      }
    } else {
      this.map[key].value = value

      this.updateL(key, this.map[key])
    }
  }
}
