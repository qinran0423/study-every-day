// (()))
// 一种括号的有效判断
function isValid(str) {
  let left = 0;
  for (let i = 0; i < str.length; i++) {
    if (s[i] === "(") {
      left++;
    } else {
      left--;
    }
    if (left == -1) {
      return false;
    }
  }
  return left == 0;
}
