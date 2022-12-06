// 输入：nums = [2,7,11,15], target = 9
// 输出：[0,1]
// 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

// 返回的是索引

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const map = {}

  const n = nums.length

  for (let i = 0; i < n; i++) {
    const num = nums[i]
    const res = target - num
    if (res in map) {
      return [i, map[res]]
    } else {
      map[num] = i
    }
  }
}

const nums = [2, 7, 11, 15]
const res = twoSum(nums, 9)

console.log(res)
