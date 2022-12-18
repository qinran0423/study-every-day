## 2022.12.18

### 使用多种方式判断一个单链表是否有环

#### 标志法

给每个已遍历过得节点加标志位，遍历链表，当出现下一个节点已被标志时，证明单链表有环

```js
var hasCycle = function (head) {
  while (head) {
    if (head.tag) return true
    head.tag = true
    head = head.next
  }

  return false
}
```

时间复杂度：O(n) 空间复杂度：O(n)

#### 利用 JSON.stringify()不能序列化含有循环引用的结构

```js
var hasCycle = function (head) {
  try {
    JSON.stringify(head)
    return false
  } catch (error) {
    return true
  }
}
```

时间复杂度：O(n) 空间复杂度：O(n)

#### 快慢指针

```js
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
```

时间复杂度：O(n) 空间复杂度：O(1)
