---
title: LeetCode - Rotate List
description: LeetCode - rotate the list to the right by k places using C++, Golang and Javascript.
date: 2022-01-27
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - rotate the list to the right by k places, c++, golang, javascript"
---

## Problem statement

Given the *head* of a linked list, rotate the list to the right by *k* places.

Problem statement taken from: <a href='https://leetcode.com/problems/rotate-list' target='_blank'>https://leetcode.com/problems/rotate-list</a>

**Example 1:**

![Container](./../rotate-list-1.png)

```
Input: head = [1, 2, 3, 4, 5], k = 2
Output: [4, 5, 1, 2, 3]
```

**Example 2:**

![Container](./../rotate-list-2.png)

```
Input: head = [0, 1, 2], k = 4
Output: [2, 0, 1]
```

**Constraints:**

```
- The number of nodes in the list is in the range [0, 500]
- -100 <= Node.val <= 100
- 0 <= k <= 2 * 10^9
```

### Explanation

The problem mentions rotating the list to the right.
We first have to get the total number of nodes in the list.
If k is greater than the list length, we first take the modulo of k
by list length and then subtract the value of k from the list length.
If k is smaller, we subtract the value of k from the list length.

**Note:**
If the problem mentioned left rotation, we won't subtract k by the length of the list.

Let's check the algorithm first:

```
// empty list
- if head == nil
  - return head

- set ListNode *p = head
  set listLength = 1

- loop while p->next != null
  - update p = p->next
  - increment listLength++

- if k > listLength
  - k = k % listLength

- k = listLength - k

- if k == 0 || k == listLength
  - return head

- set ListNode *current = head

- loop while k > 1 && current != null
  - update current = current->next
  - decrement k--

- if current == null
  - return head

- update p->next = head
  update head = current->next
  update current->next = null

- return head
```

#### C++ solution

```cpp
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if(!head){
            return head;
        }

        ListNode *p = head;
        int listLength = 1;

        while(p->next != NULL){
            p = p->next;
            listLength++;
        }

        if(k > listLength) {
            k = k % listLength;
        }

        k = listLength - k;

        if(k == 0 || k == listLength) {
            return head;
        }

        ListNode *current = head;

        while(k > 1 && current != NULL){
            current = current->next;
            k--;
        }

        if(current == NULL){
            return head;
        }

        p->next = head;
        head = current->next;
        current->next = NULL;

        return head;
    }
};
```

#### Golang solution

```go
func rotateRight(head *ListNode, k int) *ListNode {
    if head == nil {
        return head
    }

    p := head
    listLength := 1

    for p.Next != nil {
        p = p.Next
        listLength++
    }

    if k > listLength {
        k = k % listLength
    }

    k = listLength - k

    if k == 0 || k == listLength {
        return head
    }

    current := head
    for k > 1 && current != nil {
        current = current.Next
        k--
    }

    if current == nil {
        return head
    }

    p.Next = head
    head = current.Next
    current.Next = nil

    return head
}
```

#### Javascript solution

```javascript
var rotateRight = function(head, k) {
    if(!head) {
        return head;
    }

    let p = head;
    let listLength = 1;

    while(p.next != null) {
        p = p.next;
        listLength++;
    }

    if(k > listLength) {
        k = k % listLength;
    }

    k = listLength - k;

    if(k == 0 || k == listLength){
        return head;
    }

    let current = head;

    while(k > 1 && current != null) {
        current = current.next;
        k--;
    }

    if(current == null){
        return head;
    }

    p.next = head;
    head = current.next;
    current.next = null;

    return head;
};
```

Let's dry-run our algorithm to see how the solution works.

```
      head
        |
Input: [1, 2, 3, 4, 5], k = 2

Step 1: if !head
          head == nil
          false

Step 2: ListNode *p = head
        int listLength = 1

Step 3: loop while p->next != nil
          p = p->next
          listLength++

        The above loop reaches at the last node of the linked list.

        listLength = 5

        head         p
        |            |
        [1, 2, 3, 4, 5]

Step 4: if k > listLength
           2 > 5
           false

Step 5: k = listLength - k
          = 5 - 2
          = 3

Step 6: if k == 0 || k == listLength
           3 == 0 || 3 == 5
           false

Step 7: ListNode *current = head

          head         p
           |           |
current - [1, 2, 3, 4, 5]

Step 8: loop while k > 1 && current != NULL
          3 > 1 && current != NULL
            true

            current = current->next

            head         p
             |           |
            [1, 2, 3, 4, 5]
                |
              current

            k--
            k = 2

          2 > 1 && current != NULL
            true

            current = current->next

            head         p
             |           |
            [1, 2, 3, 4, 5]
                   |
                 current

            k--
            k = 1

          1 > 1 && current != NULL
            false

Step 9: if current == NULL
          false

Step 10: p->next = head

            head
             |
     p - [5, 1, 2, 3, 4]
                   |
                 current

         head = current->next

                    head
                      |
     p - [5, 1, 2, 3, 4]
                   |
                 current

         current->next = NULL

         head       current
          |           |
         [4, 5, 1, 2, 3]

Step 11: return head

So we return the answer as [4, 5, 1, 2, 3].
```
