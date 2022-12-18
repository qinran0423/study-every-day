// 标志法

var hasCycle = function (head) {
  while (head) {
    if (head.tag) return true
    head.tag = true
    head = head.next
  }

  return false
}

// JSON.stringify()

var hasCycle = function (head) {
  try {
    JSON.stringify(head)
    return false
  } catch (error) {
    return true
  }
}

// 快慢指针
var hasCycle = function (head) {
  if (!head || !head.next) return false

  let fast = head,
    slow = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
    if (fast === slow) {
      return true
    }
  }

  return false
}
