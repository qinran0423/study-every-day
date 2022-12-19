## 2022.12.19

### 数组扁平化

数组扁平化，就是将一个嵌套多层的数组 array(嵌套可以是任何层数)转换为只有一层的数组

举个例子，假设有个名为 flatten 的函数可以做到数组扁平化，效果就会如下：

```js
var arr = [1, [2, [3, 4]]]
console.log(flatten(arr)) // [1, 2, 3, 4]
```

#### 递归

```js
function flatten(arr) {
  var result = []
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }

  return result
}

console.log(flatten(arr))
```

#### reduce

```js
function flatten1(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(Array.isArray(next) ? flatten1(next) : next)
  }, [])
}
console.log(flatten1(arr))
```

#### 扩展运算符

```js
function flatten2(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
console.log(flatten2(arr))
```

#### flat

```js
var result = arr.flat(Infinity)
console.log(result)
```
