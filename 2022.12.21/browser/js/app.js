let uniq = require("uniq")
let module1 = require("./modules/module1")
let module2 = require("./modules/module2")
let module3 = require("./modules/module3")
module1.foo() //module1
module2() //module2
module3.foo() //foo() module3
console.log(uniq(module3.arr)) //[ 1, 2, 3 ]
