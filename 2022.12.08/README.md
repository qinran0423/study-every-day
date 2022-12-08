## 手写实现浏览器端的发布订阅模式

实现效果

```js
const event = new EventEmitter()
const handle = (...payload) => console.log(pyload)
event.on("click", handle)
event.emit("click", 100, 200, 300, 100)
event.remove("click", handle)
event.once("dbclick", function () {
  console.log("click")
})
event.emit("dbclick", 100)
```
