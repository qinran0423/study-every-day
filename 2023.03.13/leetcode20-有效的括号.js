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
