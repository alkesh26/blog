---
title: LeetCode - Swap Nodes in Pairs
description: LeetCode - Swap Nodes in Pairs using C++, Golang and Javascript.
date: 2021-09-19
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - swap nodes in pairs, c++, golang, javascript"
---

![Container](./../swap-nodes-in-pairs.png)

## Problem statement

Given a linked list,
swap every two adjacent nodes and return its head.
You must solve the problem without modifying the
values in the list's nodes (i.e., only nodes themselves may be changed.)

Problem statement taken from: <a href='https://leetcode.com/problems/swap-nodes-in-pairs' target='_blank'>https://leetcode.com/problems/swap-nodes-in-pairs</a>

**Example 1:**

```
Input: head = [1, 2, 3, 4]
Output: [2, 1, 4, 3]
```

**Example 2:**

```
Input: head = []
Output: []
```

**Example 3:**

```
Input: head = [1]
Output: [1]
```

**Constraints:**

```
- The number of nodes in the list is in the range [0, 100].
- 0 <= Node.val <= 100
```

### Explanation

#### Swapping links

Since the node values cannot be swapped,
changing links is a better idea in general.

##### Algorithm

```
- if head == NULL || head->next == NULL
  - return head

- set ListNode* prev = head
      ListNode* curr = head->next

- set head = curr and initialize ListNode* next

- loop while true
  - set next = curr->next
  - point curr->next = prev

  - if next == NULL || next->next == NULL
    - set prev->next = next
    - break // break the loop

  - point prev->next = next->next

  - set prev = next

  - set curr = prev->next

- return head
```

The time complexity of the above program is **O(N)**
where N is the number of nodes in a given linked list.

#### C++ solution

```cpp
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        if(head == NULL || head->next == NULL){
            return head;
        }

        ListNode* prev = head;
        ListNode* curr = head->next;

        head = curr;

        ListNode* next;
        while(true){
            next = curr->next;
            curr->next = prev;

            if(next == NULL || next->next == NULL){
                prev->next = next;
                break;
            }

            prev->next = next->next;

            prev = next;

            curr = prev->next;
        }

        return head;
    }
};
```

#### Golang solution

```go
func swapPairs(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }

    prev := head
    curr := head.Next

    head = curr

    for true {
        next := curr.Next
        curr.Next = prev

        if next == nil || next.Next == nil {
            prev.Next = next;
            break;
        }

        prev.Next = next.Next;

        prev = next;

        curr = prev.Next;
    }

    return head
}
```

#### Javascript solution

```javascript
var swapPairs = function(head) {
    if( head == null || head.next == null ){
        return head;
    }

    let prev = head;
    let curr = head.next;

    head = curr;

    while(true){
        let next = curr.next;
        curr.next = prev;

        if(next == null || next.next == null){
            prev.next = next;
            break;
        }

        prev.next = next.next;

        prev = next;

        curr = prev.next;
    }

    return head;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: head = [1, 2, 3, 4]

Step 1: if (head == NULL || head->next == NULL )
          - false

Step 2: ListNode* prev = head
        ListNode* curr = head->next

                prev
                 |
        head -- [1, 2, 3, 4]
                    |
                   curr

Step 3: head = curr

        prev
         |
        [1, 2, 3, 4]
            |
           curr,
           head

Step 4: ListNode* next

Step 5: loop while true
        - next = curr->next
          - next = 3
        - curr->next = prev
          - curr->next = 1

        - if next == null || next->next == null
          - false

        - prev->next = next->next
          - prev->next = 4

        - prev = next
          - prev = 3

        - curr = prev->next
          - curr = 4

Step 6: loop while true
        - next = curr->next
          - next = nil

        - curr->next = prev
          - curr->next = 3

        - if next == null || next->next == null
          - true
          - break

So the answer is 2 -> 1 -> 4 -> 3
```
