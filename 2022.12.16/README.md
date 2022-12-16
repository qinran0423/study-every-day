## 2022.12.16

### 创建对象的多种方式&优缺点

#### 工厂模式

```js
function createPersn(name) {
  var o = new Object()
  o.name = name
  o.getName = function () {
    console.log(this.name)
  }
  return o
}

var person1 = createPerson("randy")
```

- 优点：简单
- 缺点：对象无法识别，因为所有的实例都指向一个原型

#### 构造函数模式

```js
function Person(name) {
  this.name = name
  this.getName = function () {
    console.log(this.name)
  }
}

var person1 = new Person("randy")
```

- 优点：实例可以识别为一个特定的类型
- 缺点：每次创建实例时，每个方法都要被创建一次

##### 构造函数优化

```js
function Person(name) {
  this.name = name
  this.getName = getName
}

function getName() {
  console.log(this.name)
}

var person1 = new Person("randy")
```

解决了每个方法都要被重新创建的问题

#### 原型模式

```js
function Person(name) {}

Person.prototype.name = "randy"
Person.prototype.getName = function () {
  console.log(this.name)
}

var person1 = new Person()
```

- 优点：方法不会被重新创建
- 缺点：
  - 所有的属性和方法都共享
  - 不能初始化参数

##### 原型模式优化 1

```js
function Person(name) {}

Person.prototype = {
  name: "randy",
  getName: function () {
    console.log(this.name)
  }
}
var person = new Person()
```

- 优点：封装了清晰点
- 缺点：重写了原型，丢失了 constructor 属性

##### 原型模式优化 2

```js
function Person(name) {}

Person.prototype = {
  constructor: Person,
  name: "randy",
  getName: function () {
    console.log(this.name)
  }
}
var person = new Person()
```

- 优点：实例可以通过 constructor 属性找到所属构造函数
- 缺点：
  - 所有的属性和方法都共享
  - 不能初始化参数

#### 组合模式

```js
function Person(name) {
  this.name = name
}

Person.prototype = {
  constructor: Person,
  getName: function () {
    console.log(this.name)
  }
}

var person = new Person()
```

- 优点：该共享的共享，该私有的私有，使用最广泛的方式
- 缺点：希望写在一个地方，即更好的封装性

##### 动态原型模式

```js
function Person(name) {
  this.name = name
  if (typeof this.getName != "function") {
    Person.prototype.getName = function () {
      console.log(this.name)
    }
  }
}

var person = new Person()
```

注意： 使用动态原型模式时，不能用对象字面量重写原型

```js
function Person(name) {
  this.name = name
  if (typeof this.getName != "function") {
    Person.prototype = {
      constructor: Person,
      getName: function () {
        console.log(this.name)
      }
    }
  }
}

var person1 = new Person("randy")
var person2 = new Person("mick")

person1.getName() // 报错，并没有该方法
```

new 的执行步骤：

1. 首先创建一个对象
2. 将对象的原型指向 Person.prototype
3. Person.apply(obj)
4. return 对象
   执行 apply 的时候，会执行 obj.Person,if 判断的时候，构造函数的 prototype 属性指向了实例的原型，使用字面量方式覆盖 Person.prototype 并不会更改实例的原型的值，person1 依然指向了以前的原型
