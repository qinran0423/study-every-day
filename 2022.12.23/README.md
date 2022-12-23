## 2022.12.23

## AMD

### 概念

CommonJS 规范加载模块是同步的，也就是说，只有加载完成，才能执行后面的操作。AMD 规范则是非同步加载模块，允许执行回调函数。由于 Node.js 主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以 CommonJS 规范比较适用。但是如果是浏览器环境，要从服务器加载模块，这时就必须采用非同步模式，因此浏览器端一般采用 AMD 规范。此外 AMD 规范比 CommonJS 规范在浏览器端实现要早。

### 基本语法

定义暴露模块：

```js
//定义没有依赖的模块
define(function () {
  return 模块
})
//定义有依赖的模块
define(["module1", "module2"], function (m1, m2) {
  return 模块
})
```

引入使用模块

```js
require(['module1', 'module2'], function(m1, m2){
 使⽤m1/m2
})
```

## AMD 实现

通过比较是否实用 AMD，来说明使用 AMD 实际使用的效果

### 未使用 AMD 规范

```js
// dataService.js⽂件 (function (window) {
 let msg = 'www.xianzao.com'
 function getMsg() {
 return msg.toUpperCase()
 }
 window.dataService = {getMsg} })(window)
// alerter.js⽂件 (function (window, dataService) {
 let name = 'xianzao'
 function showMsg() {
 alert(dataService.getMsg() + ', ' + name)
 }
 window.alerter = {showMsg} })(window, dataService)
// main.js⽂件 (function (alerter) {
 alerter.showMsg() })(alerter)
// index.html⽂件 <div><h1>Modular Demo 1: 未使⽤AMD(require.js)</h1></div> <script type="text/javascript" src="js/modules/dataService.js"></script>
<script type="text/javascript" src="js/modules/alerter.js"></script>
<script type="text/javascript" src="js/main.js"></script>
```

这种⽅式缺点很明显：⾸先会发送多个请求，其次引⼊的 js ⽂件顺序不能搞错，否则会报错

### 使用 require.js

RequireJS 是⼀个⼯具库，主要⽤于客户端的模块管理。它的模块管理遵守 AMD 规范，RequireJS 的基本 思想是，通过 define ⽅法，将代码定义为模块；通过 require ⽅法，实现代码的模块加载。

```js
// dataService.js⽂件
// 定义没有依赖的模块
define(function() {
 let msg = 'www.xianzao.com'
 function getMsg() {
  return msg.toUpperCase()
 }
 return { getMsg } // 暴露模块
})
//alerter.js⽂件
// 定义有依赖的模块
define(['dataService'], function(dataService) {
 let name = 'xianzao'
 function showMsg() {
 alert(dataService.getMsg() + ', ' + name)
 }
 // 暴露模块
 return { showMsg }
})
// main.js⽂件
(function() {
 require.config({
    baseUrl: 'js/', //基本路径 出发点在根⽬录下
    paths: {
    //映射: 模块标识名: 路径
    alerter: './modules/alerter', //此处不能写成alerter.js,会报错
    dataService: './modules/dataService'
  }
 })
 require(['alerter'], function(alerter) {
  alerter.showMsg()
 })
})()
// index.html⽂件
<!DOCTYPE html> <html>
 <head>
 <title>Modular Demo</title>
 </head>
 <body>
 <!-- 引⼊require.js并指定js主⽂件的⼊⼝ -->
 <script data-main="js/main" src="js/libs/require.js"></script>
 </body>
</html>
```

通过两者的⽐较，可以得出 AMD 模块定义的⽅法⾮常清晰，不会污染全局环境，能够清楚地显示依赖关 系。AMD 模式可以⽤于浏览器环境，并且允许⾮同步加载模块，也可以根据需要动态加载模块。

## CMD

### 概念

CMD 规范专⻔⽤于浏览器端，模块的加载是异步的，模块使⽤时才会加载执⾏。CMD 规范整合了 CommonJS 和 AMD 规范的特点。在 Sea.js 中，所有 JavaScript 模块都遵循 CMD 模块定义规范。

### 基本语法

```js
//定义没有依赖的模块
define(function (require, exports, module) {
  exports.xxx = value
  module.exports = value
})
```

```js
//定义有依赖的模块
define(function (require, exports, module) {
  //引⼊依赖模块(同步)
  var module2 = require("./module2")
  //引⼊依赖模块(异步)
  require.async("./module3", function (m3) {})
  //暴露模块
  exports.xxx = value
})
```

```js
// 引⼊使⽤的模块
define(function (require) {
  var m1 = require("./module1")
  var m4 = require("./module4")
  m1.show()
  m4.show()
})
```

### CMD 实现

```js
// module1.js⽂件
define(function (require, exports, module) {
  //内部变量数据
  var data = "xianzao.com"
  //内部函数
  function show() {
    console.log("module1 show() " + data)
  }
  //向外暴露
  exports.show = show
})
// module2.js⽂件
define(function (require, exports, module) {
  module.exports = {
    msg: "I am xianzao"
  }
})
// module3.js⽂件
define(function (require, exports, module) {
  const API_KEY = "abc123"
  exports.API_KEY = API_KEY
})
// module4.js⽂件
define(function (require, exports, module) {
  //引⼊依赖模块(同步)
  var module2 = require("./module2")
  function show() {
    console.log("module4 show() " + module2.msg)
  }
  exports.show = show
  //引⼊依赖模块(异步)
  require.async("./module3", function (m3) {
    console.log("异步引⼊依赖模块3 " + m3.API_KEY)
  })
})
// main.js⽂件
define(function (require) {
  var m1 = require("./module1")
  var m4 = require("./module4")
  m1.show()
  m4.show()
})
```

```html
<script type="text/javascript" src="js/libs/sea.js"></script>
<script type="text/javascript">
  seajs.use("./js/modules/main")
</script>
```

结果

```js
module1 show(), xianzao
module4 show() I am xianzao
异步引⼊依赖模块3 abc123
```

###

AMD 与 CMD 区别

```js
// CMD
define(function (requie, exports, module) {
  //依赖就近书写
  var module1 = require("Module1")
  var result1 = module1.exec()
  module.exports = {
    result1: result1
  }
})
// AMD
define(["Module1"], function (module1) {
  var result1 = module1.exec()
  return {
    result1: result1
  }
})
```

从上面的代码比较中我们可以看出 AMD 规范和 CMD 规范的区别

1. 对依赖的处理：

- AMD 推崇依赖前置，即通过依赖数组的方式提前声明当前模块的依赖
- CMD 推崇依赖就近，在编程需要用到的时候通过调用 require 方法动态引入

2. 在本模块的对外输出：

- AMD 推崇通过返回值的方式对外输出
- CMD 通过 module.exports 赋值的方式对外输出

## ES6 模块化

### 概念

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输⼊和输出的变量。
CommonJS 和 AMD 模块，都只能在运⾏时确定这些东⻄。⽐如，CommonJS 模块就是对象，输⼊ 时必须查找对象属性

### 基本使用

export 命令⽤于规定模块的对外接⼝，import 命令⽤于输⼊其他模块提供的功能。

```js
/** 定义模块 math.js **/
var basicNum = 0
var add = function (a, b) {
  return a + b
}
export { basicNum, add }
/** 引⽤模块 **/
import { basicNum, add } from "./math"
function test(ele) {
  ele.textContent = add(99 + basicNum)
}
```

如上例所示，使⽤ import 命令的时候，⽤户需要知道所要加载的变量名或函数名，否则⽆法加载。为了
给⽤户提供⽅便，让他们不⽤阅读⽂档就能加载模块，就要⽤到 export default 命令，为模块指定默认输出。

```js
// export-default.js
export default function () {
  console.log("foo")
}
// import-default.js
import customName from "./export-default"
customName() // 'foo'
```

### ES6 模块与 CommonJs 模块的差异

1. CommonJS 模块输出的是一个值得拷贝，ES6 模块输出的值的引用
2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

第⼆个差异是因为 CommonJS 加载的是⼀个对象（即 module.exports 属性），该对象只有在脚本运⾏ 完才会⽣成。⽽ ES6 模块不是对象，它的对外接⼝只是⼀种静态定义，在代码静态解析阶段就会⽣成

下⾯重点解释第⼀个差异，我们还是举上⾯那个 CommonJS 模块的加载机制例⼦:

```js
// lib.js
export let counter = 3
export function incCounter() {
  counter++
}
// main.js
import { counter, incCounter } from "./lib"
console.log(counter) // 3
incCounter()
console.log(counter) // 4
```

ES6 模块的运⾏机制与 CommonJS 不⼀样。ES6 模块是动态引⽤，并且不会缓存值，模块⾥⾯的变量 绑定其所在的模块。
