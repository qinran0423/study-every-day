## 2022.12.20

## 使用 babel 实现 js 可选链

### 可选链运算符（?.）

**可选链运算符（?.）**允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。`?.`运算符的功能类似于`.`链式运算符，不同之处在于，在引用为空 (nullish ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。

当尝试访问可能不存在的对象属性时，可选链运算符将会使表达式更短、更简明。在探索一个对象的内容时，如果不能确定哪些属性必定存在，可选链运算符也是很有帮助的。

```js
const adventurer = {
  name: "Alice",
  cat: {
    name: "Dinah"
  }
}

const dogName = adventurer.dog?.name
console.log(dogName)
// expected output: undefined

console.log(adventurer.someNonExistentMethod?.())
// expected output: undefined
```

### 使用 babel 编译

```js
const x = {}
const y = x?.a?.b
```

转义成

```js
"use strict"

var _x$a
const x = {}
const y =
  x === null || x === void 0
    ? void 0
    : (_x$a = x.a) === null || _x$a === void 0
    ? void 0
    : _x$a.b
```

babel 针对`?.`转换成了三元表达式

如果被取值的对象全等于 null 或者全等于 void 0, 那么三元表达式直接返回 void 0（也就是 undefined), 否则就返回从这个被取值对象上取到的值。

为了使用 babel 解析 optional chaining，使用@babel/parser 将源码字符转换成 AST，@babel/generator 将 AST 转换成源码字符。

#### 将源码转为 AST

```js
const { parse } = require("@babel/parser")

const code = `
const x = null
const y = x?.a
`
const ast = parse(code)
```

得到的 ast 就是 code 代表的源代码转换后的 ast 对象，通过断点调试可以看到 ast 是一个结构比较规律的对象：

<img src="https://user-images.githubusercontent.com/112499828/204997963-f70bcb36-d8b0-4e24-a45d-b3f15d86b2e2.png"/>

接下来，遍历这个 ast 对象，使用@babel/traverse 获取 AST 上我们想要的节点：

因为我们这里只关心 js 可选链的转换，而 js 可选链在 babel 中的节点类型 type 是 OptionalMemberExpression：

```js
const { parse } = require("@babel/parser")
const traverse = require("@babel/traverse").default

const code = `
const x = null
const y = x?.a
`
const ast = parse(code)
traverse(ast, {
  OptionalMemberExpression(path) {
    console.log(path)
  }
})
```

其中，path 存储了遍历到的节点所在 AST 结构的信息，也就是 x?.a 转换成 ast 的一些结构信息。
接下来只需要把这个结构改成三元表达式的结构就行了

我们看下三元表达式最终 AST 的格式 注意：可以使用在线编译 AST 的网站：[astexplorer](https://astexplorer.net/) 测试

```js
x === null || x === void 0 ? void 0 : x.a
```

<img src="https://user-images.githubusercontent.com/112499828/204999456-c13c017f-f85d-4862-af23-f12e22dea66d.png" />

`?.`的 type 是 `OptionalMemberExpression`，转换成三元表达式对应了三个 `Expression`: `LogicalExpression`、`UnaryExpression`、`MemberExpression`，这三个 `Expression` 分别对应了三元表达式的三个 `expression`

`LogicalExpression` 及其子 `Expression` 加起来对应三元表达式的第一个 `expression`：`x === null || x === void 0`；`UnaryExpression`及其子 `Expression` 加起来对应三元表达式的第二个 `expression`： `void 0`；`MemberExpression` 对应三元表达式的第三个 `expression`：`x.a`

三元表达式的 type 是`ConditionalExpression`， 所以顶层 ast 就是一个`ConditionalExpression`节点

```js
const transCondition = (node) => {
  return t.conditionalExpression()
}
```

<img src="https://user-images.githubusercontent.com/112499828/205000039-ea343900-0f45-40ff-9620-ffbbcb5277c8.png" />

三个参数都是 Expression 类型，正好对应上面我们说的三元表达式的三个 Expression，于是代码可以写成：

```js
const transCondition = (node) => {
  return t.conditionalExpression(
    t.logicalExpression(),
    t.unaryExpression(),
    t.memberExpression()
  )
}
```

继续根据文档完善：(这里需要根据每个 expression 的文档)

```js
const transCondition = (node) => {
  return t.conditionalExpression(
    t.logicalExpression(
      "||",
      t.binaryExpression("===", node.object, t.nullLiteral()),
      t.binaryExpression(
        "===",
        node.object,
        t.unaryExpression("void", t.numericLiteral(0))
      )
    ),
    t.unaryExpression("void", t.numericLiteral(0)),
    t.memberExpression(node.object, node.property, node.computed, node.optional)
  )
}
```

经过 transCondition 方法处理后的 AST 结构就是一个三元表达式的结构，接下来需要用这个三元表达式的 AST 替换掉 可选链的 AST，之后再根据 @babel/types 提供的 conditionalexpression 的方法文档，得知此方法所接收的三个参数。

```js
const { parse } = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generator = require("@babel/generator").default
const t = require("@babel/types")

const code = `
const x = null
const y = x?.a
`

const transCondition = (node) => {
  return t.conditionalExpression(
    t.logicalExpression(
      "||",
      t.binaryExpression("===", node.object, t.nullLiteral()),
      t.binaryExpression(
        "===",
        node.object,
        t.unaryExpression("void", t.numericLiteral(0))
      )
    ),
    t.unaryExpression("void", t.numericLiteral(0)),
    t.memberExpression(node.object, node.property, node.computed, node.optional)
  )
}

const ast = parse(code)
traverse(ast, {
  OptionalMemberExpression(path) {
    path.replaceWith(transCondition(path.node))
  }
})

console.log(generator(ast).code)
// const x = null;
// const y = x === null || x === void 0 ? void 0 : x.a;
```

接下来还需要对多次可选链式进行处理。

```js
const x = {}
const y = x?.a?.b?.c
```

babel 转成了

```js
"use strict"

var _x$a, _x$a$b
const x = {}
const y =
  x === null || x === void 0
    ? void 0
    : (_x$a = x.a) === null || _x$a === void 0
    ? void 0
    : (_x$a$b = _x$a.b) === null || _x$a$b === void 0
    ? void 0
    : _x$a$b.c
```
