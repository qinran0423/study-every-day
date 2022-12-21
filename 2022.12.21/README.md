## 2022.12.21

## 前端模块化

### 什么是模块？

- 将一个复杂的程序依据一定的规则（规范）封装成几个块（文件），并进行组合在一起
- 块的内部数据与实现是私有的，只是向外暴露一些接口（方法）与外部其他模块通信

### 模块化的进化过程

#### 全局 funtion 模式

将不同的功能封装成不同的全局函数

- 编码：将不同的功能封装成不同的全局函数
- 问题：污染全局命名空间，容易引起命名冲突或数据不安全，而且模块成员之间看不出直接关系

#### namespace 模式

简单对象封装

- 作用：减少全局变量，解决命名冲突
- 问题：数据不安全（外部可以直接修改模块内部的数据）

```js
let myModule = {
  data: "www.baidu.com",
  foo() {
    console.log(`foo() ${this.data}`)
  },
  bar() {
    console.log(`bar() ${this.data}`)
  }
}
myModule.data = "other data" //能直接修改模块内部的数据
myModule.foo() // foo() other data
```

#### IIFE 模式

匿名函数自调用（闭包）

- 作用：数据是私有的，外部只能通过暴露方法操作
- 编码：将数据和行为封装到一个函数内部，通过给 window 添加属性来向外暴露接口
- 问题：如果当前这个模块依赖另一个模块怎么办？

```html
<script src="./index.js"></script>
<script>
  myModule.foo()
  myModule.bar()
  console.log(myModule.data) //undefined 不能访问模块内部数据
  myModule.data = "xxxx" //不是修改的模块内部的data
  myModule.foo()
</script>
```

```js
;(function (window) {
  let data = "www.xianzao.com"
  //操作数据的函数
  function foo() {
    //⽤于暴露有函数
    console.log(`foo() ${data}`)
  }
  function bar() {
    //⽤于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调⽤
  }
  function otherFun() {
    //内部私有的函数
    console.log("otherFun()")
  }
  //暴露⾏为
  window.myModule = { foo, bar } //ES6写法
})(window)
```

结果

```js
foo() www.xianzao.com
bar() www.xianzao.com
otehrFun()
undefined
foo() www.xianzao.com
```

### 模块化的好处

- 避免命名冲突（减少命名空间污染）
- 更好的分离，按需加载
- 更高的复用性
- 高可维护性

### 引入多个`<script>`后出现问题

- 请求过多
  我们要依赖多个模块，那样就会发送多个请求，
- 依赖模糊
  我们不知道他们的具体依赖关系是什么，也就是说很容易因为不了解他们之间的依赖关系导致加载先后顺序问题
- 难以维护
  以上两种情况就导致了很难维护，很可能出现牵一发而动全身的情况导致项目出现严重的问题。

模块化固然有多个好处，然而一个页面需要引入多个 js 文件，就会出现以上这些问题。而这些问题可以通过模块化规范来解决，因此有了后续的 commonjs,AMD，ES6,CMD 规范。

### 模块化规范

#### CommonJS

Node 应⽤由模块组成，采⽤ CommonJS 模块规范。每个⽂件就是⼀个模块，有⾃⼰的作⽤域。在⼀个 ⽂件⾥⾯定义的变量、函数、类，都是私有的，对其他⽂件不可⻅。在服务器端，模块的加载是运⾏时 同步加载的；在浏览器端，模块需要提前编译打包处理

##### 特点

- 所有代码都运行在模块作用域，不会污染全局作用域
- 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果就被缓存了，以后再加载，就直接读取缓存结果。要想让模块再次运行，必须清除缓存
- 模块加载的顺序，按照其在代码中出现的顺序

```js
// example.js
var x = 5
var addX = function (value) {
  return value + x
}
module.exports.x = x
module.exports.addX = addX
```

```js
var example = require("./example.js") //如果参数字符串以“./”开头，则表示加载的是 ⼀个位于相对路径
console.log(example.x) // 5
console.log(example.addX(1)) // 6
```

##### commonjs 模块加载的机制

输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。

```js
// lib.js
var counter = 3
function incCounter() {
  counter++
}
module.exports = {
  counter: counter,
  incCounter: incCounter
}
```

```js
var counter = require("./lib").counter
var incCounter = require("./lib").incCounter
console.log(counter) // 3
incCounter()
console.log(counter) // 3
```

counter 输出以后，lib.js 模块内部的变化就影响不到 counter 了。这是因为 counter 是⼀个 原始类型的值，会被缓存。除⾮写成⼀个函数，才能得到内部变动后的值。
