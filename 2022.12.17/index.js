// 原型链继承
// function Parent() {
//   this.name = "randy"
// }

// Parent.prototype.getName = function () {
//   console.log(this.name)
// }

// function Child() {}

// Child.prototype = new Parent()

// var child1 = new Child()

// child1.getName()

// function Parent() {
//   this.names = ["randy", "mick"]
// }

// function Child() {}

// Child.prototype = new Parent()

// var child1 = new Child()

// child1.names.push("hahah")

// console.log(child1.names) //[ 'randy', 'mick', 'hahah' ]

// var child2 = new Child()
// console.log(child2.names) // [ 'randy', 'mick', 'hahah' ]

// ---------------借用构造函数
// function Parent() {
//   this.names = ["randy", "mick"]
// }

// function Child() {
//   Parent.call(this)
// }

// var child1 = new Child()

// child1.names.push("hahah")
// console.log(child1.names) // [ 'randy', 'mick', 'hahah' ]

// var child2 = new Child()
// console.log(child2.names) // [ 'randy', 'mick' ]

// function Parent(name) {
//   this.name = name
// }

// function Child(name) {
//   Parent.call(this, name)
// }

// var child1 = new Child("randy")

// console.log(child1.name) // randy

// var child2 = new Child("mick")

// console.log(child2.name) // mick

// -----------------组合继承
// function Parent(name) {
//   this.name = name
//   this.colors = ["red", "blue", "green"]
// }

// Parent.prototype.getName = function () {
//   console.log(this.name)
// }

// function Child(name, age) {
//   Parent.call(this, name)
//   this.age = age
// }

// Child.prototype = new Parent()
// Child.prototype.constructor = Child

// var child1 = new Child("randy", 18)

// child1.colors.push("black")

// console.log(child1.name) //randy
// console.log(child1.age) // 18
// console.log(child1.colors) //[ 'red', 'blue', 'green', 'black' ]

// var child2 = new Child("mick", 20)

// console.log(child2.name) //mick
// console.log(child2.age) // 20
// console.log(child2.colors) //[ 'red', 'blue', 'green']

// --------------原型继承
function createObj(o) {
  function F() {}
  F.prototype = o
  return new F()
}

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
