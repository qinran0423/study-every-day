/*
 * @lc app=leetcode.cn id=921 lang=javascript
 *
 * [921] 使括号有效的最少添加
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
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
// @lc code=end
