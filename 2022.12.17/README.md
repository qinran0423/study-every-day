## 2022.12.17

### 继承的多种方式&优缺点

#### 原型链继承

```js
function Parent() {
  this.name = "randy"
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child() {}

Child.prototype = new Parent()

var child1 = new Child()

child1.getName()
```

问题：引用类型的属性被所有的实例都共享

```js
function Parent() {
  this.names = ["randy", "mick"]
}

function Child() {}

Child.prototype = new Parent()

var child1 = new Child()

child1.names.push("hahah")

console.log(child1.names) //[ 'randy', 'mick', 'hahah' ]

var child2 = new Child()
console.log(child2.names) // [ 'randy', 'mick', 'hahah' ]
```

#### 借用构造函数

```js
function Parent() {
  this.names = ["randy", "mick"]
}

function Child() {
  Parent.call(this)
}

var child1 = new Child()

child1.names.push("hahah")
console.log(child1.names) // [ 'randy', 'mick', 'hahah' ]

var child2 = new Child()
console.log(child2.names) // [ 'randy', 'mick' ]
```

优点：

- 避免了引用类型的属性被所有实例共享
- 可以在 Child 中向 Parent 传参

```js
function Parent(name) {
  this.name = name
}

function Child(name) {
  Parent.call(this, name)
}

var child1 = new Child("randy")

console.log(child1.name) // randy

var child2 = new Child("mick")

console.log(child2.name) // mick
```

缺点：方法都在构造函数中定义，每次创建实例都会创建一遍方法

#### 组合继承

```js
function Parent(name) {
  this.name = name
  this.colors = ["red", "blue", "green"]
}

Parent.prototype.getName = function () {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

var child1 = new Child("randy", 18)

child1.colors.push("black")

console.log(child1.name) //randy
console.log(child1.age) // 18
console.log(child1.colors) //[ 'red', 'blue', 'green', 'black' ]

var child2 = new Child("mick", 20)

console.log(child2.name) //mick
console.log(child2.age) // 20
console.log(child2.colors) //[ 'red', 'blue', 'green']
```

优点：融合原型链继承和构造函数的优点

#### 原型继承

```js
function createObj(o) {
  function F() {}
  F.prototype = o
  return new F()
}
```

缺点：包含引用类型的属性值始终都会共享相应的值

```js
var person = {
  name: "randy",
  friends: ["mick", "qin"]
}

var person1 = createObj(person)
var person2 = createObj(person)

person1.name = "person1"
console.log(person2.name) // randy

person1.friends.push("ran")
console.log(person2.friends) // [ 'mick', 'qin', 'ran' ]
```

#### 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象

```js
function createObj(o) {
  var clone = Object.create(o)
  clone.sayName = function () {
    console.log("hi")
  }
  return clone
}
```
