Function.prototype.Mycall = function (context) {
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const res = context.fn(...args)
  delete context.fn
  return res
}

Function.prototype.Myapply = function (context, ...args) {
  context = context || window
  context.fn = this
  let res
  if (arr) {
    res = context.fn(args)
  } else {
    res = context.fn()
  }
  delete context.fn
  return res
}

Function.prototype.MyBind = function (context) {
  var self = this
  var args = [...arguments].slice(1)

  var fBind = function () {}

  const fBounf = function () {
    var argsBind = [...arguments].slice(1)
    self.apply(this instanceof fBind ? this : context, args.concat(argsBind))
  }

  fBind.prototype = this.prototype

  fBounf.prototype = new fBind()

  return fBounf
}
