---
title: LeetCode - Remove Nodes From Linked List
description: LeetCode - delete nodes which have a greater value on right side using C++, Golang and Javascript.
date: 2023-01-15
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - delete nodes which have a greater value on right side, c++, golang, javascript"
---

## Problem statement

You are given the `head` of a linked list.

Remove every node which has a node with a **strictly greater** value anywhere to the right side of it.

Return the `head` *of the modified linked list*.

Problem statement taken from: <a href='https://leetcode.com/problems/remove-nodes-from-linked-list' target='_blank'>https://leetcode.com/problems/remove-nodes-from-linked-list</a>

**Example 1:**

![Container](./../remove-nodes.png)

```
Input: head = [5, 2, 13, 3, 8]
Output: [13, 8]
Explanation: The nodes that should be removed are 5, 2 and 3.
- Node 13 is to the right of node 5.
- Node 13 is to the right of node 2.
- Node 8 is to the right of node 3.
```

**Example 2:**

```
Input: head = [1, 1, 1, 1]
Output: [1, 1, 1, 1]
Explanation: Every node has value 1, so no nodes are removed.
```

**Constraints:**

```
- The number of the nodes in the given list is in the range [1, 10^5].
- 1 <= Node.val <= 10^5
```

### Explanation

#### Brute Force

The easiest approach is to run two loops. The outer loop picks one node at a time. The inner loop
check if there exists a node greater than the current node. If it exists, we delete the current node.

The time-complexity of the above approach is **O(n^2)**, and the
space complexity is **O(1)**.

#### Using Reverse

The time-complexity can be reduced to **O(n)** by reversing the linked list.

The algorithm looks as below:

```
// reverse linked list method
- set ListNode* previous = null
      ListNode* current = head

- loop while current != null
  - set temp = current->next
        current->next = previous
        previous = current
        current = temp
- loop end

- return previous

// removeNodes method
- if head == null || head->next == null
  - return head

- set ListNode* current = reverse(head)
      ListNode* answer = current
      int val = current->val

- loop while current != null && current->next != null
  - loop while current != null && current->next != null && current->next->val < val
    - set current->next = current->next->next
  - while end

  - if current != null && current->next != null
    - set val = max(val, current->next->val)
          current = current->next
  - if end
- while end

- return reverse(answer)
```

The time-complexity of the above approach is **O(n)**, and the
space complexity is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    ListNode* reverse(ListNode* head){
        ListNode* previous = NULL;
        ListNode* current = head;

        while(current != NULL){
            ListNode* temp = current->next;
            current->next = previous;
            previous = current;
            current = temp;
        }

        return previous;
    }

    ListNode* removeNodes(ListNode* head) {
        if(head == NULL || head->next == NULL) {
            return head;
        }

        ListNode* current = reverse(head);
        ListNode* answer = current;

        int val = current->val;

        while(current != NULL && current->next != NULL){
            while(current != NULL && current->next != NULL && current->next->val < val){
                current->next = current->next->next;
            }

            if(current != NULL && current->next != NULL){
                val = max(val, current->next->val);
                current = current->next;
            }

        }

        return reverse(answer);
    }
};
```

#### Golang solution

```go
func max(a, b int) int {
    if a > b {
        return a
    }

    return b
}

func reverse(head *ListNode) *ListNode {
    var previous *ListNode
    current := head

    for current != nil {
        temp := current.Next
        current.Next = previous
        previous = current
        current = temp
    }

    return previous
}

func removeNodes(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }

    current := reverse(head)
    answer := current

    val := current.Val

    for current != nil && current.Next != nil {
        for current != nil && current.Next != nil && current.Next.Val < val {
            current.Next = current.Next.Next
        }

        if current != nil && current.Next != nil {
            val = max(val, current.Next.Val)
            current = current.Next
        }
    }

    return reverse(answer)
}
```

#### Javascript solution

```javascript
var reverse = function(head) {
    let previous = null;
    let current = head;

    while(current) {
        let temp = current.next;
        current.next = previous;
        previous = current;
        current = temp;
    }

    return previous;
};

var removeNodes = function(head) {
    if(head == null || head.next == null) {
        return head;
    }

    let current = reverse(head);
    let answer = current;

    let val = current.val;

    while(current != null && current.next != null) {
        while(current != null && current.next != null && current.next.val < val){
            current.next = current.next.next;
        }

        if(current != null && current.next != null){
            val = Math.max(val, current.next.val);
            current = current.next;
        }
    }

    return reverse(answer);
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: head = [5, 2, 13, 3, 8]

Step 1: if head == NULL || head->next == NULL
           head = 5
           false

Step 2: ListNode* current = reverse(head)

        reverse will return the linked list as [8, 3, 13, 2, 5]
                  current = 8

        ListNode* answer = current
                         = 8

        int val = current->val
                = 8

Step 3: loop while current != NULL && current->next != NULL
            8 != NULL && 8->next != NULL
            8 != NULL && 3 != NULL
            true

            loop while current != NULL && current->next != NULL && current->next->val < val
              8 != NULL && 8->next != NULL && 8->next->val < 8
              8 != NULL && 3 != NULL && 3 < 8
              true

              current->next = current->next->next
              8->next = 8->next->next
              8->next = 3->next
                      = 13

              The updated linked list is [8, 13, 2, 5]

            loop while current != NULL && current->next != NULL && current->next->val < val
                 8 != NULL && 8->next != NULL && 8->next->val < 8
                 8 != NULL && 13 != NULL && 13 < 8
                 false

            if current != NULL && current->next != NULL
               8 != NULL && 13 != NULL
               true

               val = max(val, current->next->val)
                   = max(8, 8->next->val)
                   = max(8, 13)
                   = 13

               current = current->next
                       = 8->next
                       = 13

Step 4: loop while current != NULL && current->next != NULL
            13 != NULL && 13->next != NULL
            13 != NULL && 2 != NULL
            true

            loop while current != NULL && current->next != NULL && current->next->val < val
              13 != NULL && 13->next != NULL && 13->next->val < 13
              13 != NULL && 2 != NULL && 2 < 8
              true

              current->next = current->next->next
              13->next = 13->next->next
              13->next = 13->next
                       = 2

              The updated linked list is [8, 13, 5]

            loop while current != NULL && current->next != NULL && current->next->val < val
              13 != NULL && 13->next != NULL && 13->next->val < 13
              13 != NULL && 5 != NULL && 5 < 8
              true

              current->next = current->next->next
              13->next = 13->next->next
              13->next = 5->next
                       = NULL

              The updated linked list is [8, 13]

            loop while current != NULL && current->next != NULL && current->next->val < val
              13 != NULL && 13->next != NULL
              13 != NULL && NULL != NULL
              false

            if current != NULL && current->next != NULL
               13 != NULL && 13->next != NULL
               13 != NULL && NULL != NULL
               false

Step 5: loop while current != NULL && current->next != NULL
          13 != NULL && 13->next != NULL
          13 != NULL && NULL != NULL
          false

Step 6: return reverse(answer)
               reverse(answer)
               = [13, 8]
```
