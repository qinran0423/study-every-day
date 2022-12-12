## 2022.12.12

### LFU 算法实现

LFU 也是一种常见的缓存算法。当空间满时，通过访问次数，淘汰访问次数最小的数据。

如果访问次数全部一样则默认淘汰最初添加的数据

```js
class LFUCache {
  constructor(capacity) {
    this.limit = capacity
    this.map = {}
    this.freqMap = {}
  }
}
```

get 函数跟 LRU 差不多，不过这里 this.map 里保存的对象格式为：

```js
// map
{
    value:"value", // 存值
    freq:1//<== 频率
}

// freqMap
{
  1: ['key1', 'key2']
  2: ['key3', 'key4']
}
```

```js
  get(key) {
    let r = -1
    if (typeof this.map[key] != "undefined") {
      let o = this.map[key]
      r = o.value

      this.updateL(key, o)
    }
  }
```

更新频率的时候通过对象保存的 freq 字段从频率记录 this.freqMap 中寻找，删除原始记录后重新追加到新的记录:

```js
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
```

setL 函数判断逻辑跟 LRU 类似，区别在容量满的时候，默认取 freqMap 中第一个索引对应的 keys 数组中第一个 key,删除 key 对应的数据

```js
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
```
