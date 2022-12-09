## FIFO 算法实现

FIFO(First Input First Output) 最简单的缓存算法，通过设置缓存上限，当达到了缓存上限的时候，按照先进先出的策略进行淘汰，再增加进新的 key-value

创建一个 map 对象来保存键值信息，创建数组进行淘汰判断

```js
class FIFOCache {
  constructor(limit) {
    this.limit = limit
    this.map = {}
    this.keys = []
  }
}
```

实现 get 函数通过 map 返回对应值
在 set 函数中,先 keys 长度是否达到限制，没达到限制直接追加，如果达到限制判断 key 是否已经存在，存在将 key 删除，否则默认删除 keys 的第一个数据与对应 map 中的值

```js
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
```

## LRU 算法

LRU 的核心思想是如果数据最近被访问过，那么将来被访问的几率也更高。

```js
class LRUCache {
  constructor(limit) {
    this.limit = limit
    this.map = {}
    this.keys = []
  }
}
```

需要添加 get 方法，当访问了这个值的时候 就说明这个值的优先级被高了，所以还需要一个 update 方法把这个值移动到最后

```js
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
}
```

set 方法判断 map 中的 key 是否存在，存在就直接修改值并更新 key 的位置
如果不存在就要判断 keys 是否已满，满了就删除 keys 的第一个值把位置腾出来 然后将值塞到最后

```js
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
```

### map 实现

```js
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
```
