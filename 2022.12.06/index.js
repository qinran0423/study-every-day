function numSum(nums, n, m) {
  if (!nums.length || nums.length < n) return []

  nums.sort((a, b) => a - b)
  const result = []
  const stack = []

  const backtrace = (start) => {
    // 终止条件
    if (stack.length === n - 1) {
      //  假如是三数之和  我们只需要再stack中留最后一个位置  依次的替换
      let end = nums.length - 1 // 最后一个位置的索引

      while (start <= end) {
        // stack中前面数字的和
        const temp = stack.reduce((acc, cur) => acc + cur)
        if (temp + nums[start] === m) {
          result.push([...stack, nums[start]])
        }

        if (start !== end && temp + nums[end] === m) {
          result.push([...stack, nums[end]])
        }

        start++
        end--
      }

      return
    }
    for (let i = start; i < nums.length; i++) {
      stack.push(nums[i])
      backtrace(i + 1)
      stack.pop()
    }
  }

  backtrace(0)

  return result
}

var arr = [1, 4, 7, 11, 9, 8, 10, 6]
var N = 3
var M = 27
// 3数之和
console.log(numSum(arr, N, M))

// Result:
// [7, 11, 9], [11, 10, 6], [9, 8, 10]
