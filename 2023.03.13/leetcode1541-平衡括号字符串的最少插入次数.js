/*
 * @lc app=leetcode.cn id=1541 lang=javascript
 *
 * [1541] 平衡括号字符串的最少插入次数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
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

minInsertions("(()))(()))()())))");
// (()))(
// @lc code=end
