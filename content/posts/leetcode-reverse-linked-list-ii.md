---
title: LeetCode - Reverse Linked List II
description: LeetCode - reverse a sublist in a linked list using C++, Golang and Javascript.
date: 2022-02-10
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - reverse a sublist in a linked list, c++, golang, javascript"
---

## Problem statement

Given the head of a singly linked list and two integers *left* and *right* where *left <= right*,
reverse the nodes of the list from position *left* to position *right*, and return the reversed list.

Problem statement taken from: <a href='https://leetcode.com/problems/reverse-linked-list-ii' target='_blank'>https://leetcode.com/problems/reverse-linked-list-ii</a>

**Example 1:**

![Container](./../reverse-linked-list-ii.png)

```
Input: head = [1, 2, 3, 4, 5], left = 2, right = 4
Output: [1, 4, 3, 2, 5]
```

**Example 2:**

```
Input: head = [5], left = 1, right = 1
Output: [5]
```

**Constraints:**

```
- The number of nodes in the list is n.
- 1 <= n <= 500
- -500 <= Node.val <= 500
- 1 <= left <= right <= n
```

### Explanation

#### Iterative solution

The problem is similar to reverse a linked list but instead of a whole list we need to reverse
only a subset of this.
Let's say we consider a sublist **3 -> 4 -> 5** of the original list **1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7**
which we want to reverse. The sublist needs to be reversed as **3 <- 4 <- 5**.
Lets point our **current** node to **4** and **previous** node to **3**.
We can easily reverse the current next pointer to previous by setting

```
current->next = previous
```

But in this case we won't be able to navigate to node 5. Hence we need one more pointer
let's call that as **iterator** that will help continue the link reversal process.
So we need to do the following:

```
iterator = current->next
current->next = prev
prev = current
current = iterator
```

We continue doing the above steps till we reach the right node.
Let's check the algorithm now.

```
- return NUll if head == NULL

- return head if left == right

- set current = head, prev = NULL

- loop while left > 1
  - set prev = current
  - update current = current->next
  - decrement left--
  - decrement right--

- set tailPrev = prev, tail = current, iterator = NULL

- loop while right > 0
  - iterator = current->next
  - current->next = prev
  - prev = current
  - current = iterator
  - decrement right--

- if tailPrev != NULL
  - set tailPrev->next = prev
- else
  - head = prev

- set tail->next = current

- return head
```

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        if(head == NULL) {
            return NULL;
        }

        if(left == right) {
            return head;
        }

        ListNode *current = head, *prev = NULL;

        while(left > 1) {
            prev = current;
            current = current->next;
            left--;
            right--;
        }

        ListNode *tailPrev = prev, *tail = current, *iterator = NULL;

        while(right > 0) {
            iterator = current->next;
            current->next = prev;
            prev = current;
            current = iterator;
            right--;
        }

        if(tailPrev != NULL) {
            tailPrev->next = prev;
        } else {
            head = prev;
        }

        tail->next = current;

        return head;
    }
};
```

#### Golang solution

```go
func reverseBetween(head *ListNode, left int, right int) *ListNode {
    if head == nil {
        return nil
    }

    if left == right {
        return head
    }

    current := head
    var prev *ListNode

    for left > 1 {
        prev = current
        current = current.Next
        left--
        right--
    }

    tailPrev, tail := prev, current
    var iterator *ListNode

    for right > 0 {
        iterator = current.Next
        current.Next = prev
        prev = current
        current = iterator
        right--
    }

    if tailPrev != nil {
        tailPrev.Next = prev
    } else {
        head = prev
    }

    tail.Next = current

    return head;
}
```

#### Javascript solution

```
var reverseBetween = function(head, left, right) {
    if(head == null) {
        return null;
    }

    if(left == right) {
        return head;
    }

    let current = head, prev = null;

    while(left > 1) {
        prev = current;
        current = current.next;
        left--;
        right--;
    }

    let tailPrev = prev, tail = current, iterator = null;

    while(right > 0) {
        iterator = current.next;
        current.next = prev;
        prev = current;
        current = iterator;
        right--;
    }

    if(tailPrev != null) {
        tailPrev.next = prev;
    } else {
        head = prev;
    }

    tail.next = current;

    return head;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: head = [1, 2, 3, 4, 5], left = 2, right = 4

    head - [1, 2, 3, 4, 5]

Step 1: head == NULL
        false

Step 2: left == right
        2 == 4
        false

Step 3: current = head, prev = null
             current
               |
       head - [1, 2, 3, 4, 5]

Step 3: loop while left > 1
        2 > 1
        true

        prev = current
        current = current->next

                current
                   |
        prev - [1, 2, 3, 4, 5]

        left--
        left = 1

        right --
        right = 3

Step 4: loop while left > 1
        1 > 1
        false

Step 5: tailPrev = prev
                 = 1

        tail = current
             = 2

        iterator = NULL

Step 6: loop while right > 0
        3 > 0
        true

        iterator = current->next
                 = 3

                   iterator
                      |
        prev - [1, 2, 3, 4, 5]

        current->next = prev
        2->next = 1

        prev = current
        prev = 2

        current = iterator
                = 3

        right--
        right = 2

           prev  --    --- iterator
                   |  |
               [1, 2, 3, 4, 5]
                      |
                   current

Step 7: loop while right > 0
        2 > 0
        true

        iterator = current->next
                 = 4

                iterator
                     |
           [1, 2, 3, 4, 5]

        current->next = prev
        3->next = 2

        prev = current
        prev = 3

        current = iterator
                = 4

        right--
        right = 1

               prev  --   --- iterator
                      |  |
               [1, 2, 3, 4, 5]
                         |
                      current

Step 8: loop while right > 0
        1 > 0
        true

        iterator = current->next
                 = 5

                    iterator
                        |
           [1, 2, 3, 4, 5]

        current->next = prev
        4->next = 3

        prev = current
        prev = 4

        current = iterator
                = 5

        right--
        right = 0

                  prev  --  --- iterator
                         |  |
               [1, 2, 3, 4, 5]
                            |
                         current

Step 9: loop while right > 0
        0 > 0
        false

Step 10: tailPrev != NULL
           1 != NULL
           true

           tailPrev->next = prev
           1->next = 4

Step 11: tail->next = current
         2->next = 5

Step 12: return head

So we return the answer as [1, 4, 3, 2, 5].
```

