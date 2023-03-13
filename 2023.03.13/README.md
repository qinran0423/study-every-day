## 2023.03.13

### lc20 —— 有效的括号

```js
var isValid = function (s) {
  const map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  let queue = [];
  for (let i = 0; i < s.length; i++) {
    const str = s[i];
    if (str in map && queue[queue.length - 1] === map[str]) {
      queue.pop();
    } else {
      queue.push(str);
    }
  }

  return queue.length === 0;
};
```

利用栈，首先定义一个 map，存放对应的键值对。遍历 s,当 s[i]不是 map 的 key 的时候，说明 s[i]是'( [ {'中的一个。此时就直接存入栈中即可，当 s[i]是 map 的 key 的时候，说明 s[i]是') ] }'中的一个，但是还需要判断栈中的最后一个值是否和 map[str]的值匹配，如果匹配则出栈。最后判断栈是否没空即可。

### lc921 —— 使括号有效的最少添加

```js
var minAddToMakeValid = function (s) {
  let res = 0;
  let need = 0;
  for (let i = 0; i < s.length; i++) {
    const str = s[i];
    if (str === "(") {
      need++;
    } else if (str === ")") {
      need--;
      if (need === -1) {
        need = 0;
        res++;
      }
    }
  }
  return need + res;
};
```

这里我们需要定义两个变量 res 和 need。遍历 s 当碰到 '('的时候 `need ++`，当碰到`)`的时候`need--`。此时我们的工作还没有做完，我们现在只是计算当先出现'('的时候，')'的数量不够，需要的'('的数量。比如：'(()',此时 need 就为 1。但是当先出现')'。比如')','(()))',此时 need 就为-1, 所以我们用 res 来表示需要'('的数量，最后`need+res`即可。

### lc1541——平衡括号字符串的最少插入次数

```js
var minInsertions = function (s) {
  let res = 0,
    need = 0;
  for (let i = 0; i < s.length; i++) {
    const str = s[i];
    if (str === "(") {
      need += 2;
      if (need % 2 === 1) {
        res++;
        need--;
      }
    } else if (str === ")") {
      need--;
      if (need === -1) {
        res++;
        need = 1;
      }
    }
  }

  return res + need;
};
```

这题的核心思路和上题差不多。需要定义两个变量 res 和 need。由于左括号 '(' 必须对应两个连续的右括号 '))'，所以遍历 s 当碰到 '('的时候 `need += 2`，当碰到`)`的时候`need--`。当 need 为-1 的时候，（比如：'()))'）说明右括号太多了，需要插入一个'('，所以`res++`。这样的话，就少了一个')'，所以`need = 1`。

还有一种情况，当遇到'('的时候，若对于')'的需求量为奇数，需要插入一个')'。因为一个左括号需要两个右括号，右括号必须为偶数

```js
if (str === "(") {
  need += 2;
  if (need % 2 === 1) {
    res++;
    need--;
  }
}
```
