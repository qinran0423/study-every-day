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
