## 2022.12.14

### 找到链表中倒数第 K 个节点

给定一个链表: 1->2->3->4->5, 和 k = 2。

返回链表 4->5。

链表结构：

```js
function ListNode(val) {
  this.val = val
  this.next = null
}
```

result:

```js
var getKthFromEnd = function (head, k) {
  const fast = head,
    slow = head

  for (let i = 0; i < k; i++) {
    fast = fast.next
  }

  while (fast) {
    fast = fast.next
    slow = slow.next
  }

  return slow
}
```
