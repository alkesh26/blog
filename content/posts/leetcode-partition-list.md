---
title: LeetCode - Partition List
description: LeetCode - return the list such that all nodes less than x come before nodes greater than or equal to x using C++, Golang and Javascript.
date: 2023-01-14
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the list such that all nodes less than x come before nodes greater than or equal to x, c++, golang, javascript"
---

### Problem statement

Given the `head` of a linked list and a value `x`, partition it such that all nodes **less than x come before nodes greater than or equal to x**.

You should **preserve** the original relative order of the nodes in each of the two partitions.

Problem statement taken from: <a href='https://leetcode.com/problems/partition-list' target='_blank'>https://leetcode.com/problems/partition-list</a>

**Example 1:**

![Container](./../partition.png)

```
Input: head = [1, 4, 3, 2, 5, 2], x = 3
Output: [1, 2, 2, 4, 3, 5]
```

**Example 2:**

```
Input: head = [2, 1], x = 2
Output: [1, 2]
```

**Constraints:**

```
- The number of nodes in the list is in the range [0, 200].
- -100 <= Node.val <= 100
- -200 <= x <= 200
```

### Explanation

#### One pass solution

We can solve the problem in a single iteration using two linked lists.
Let's jump to the algorithm directly how it works.

```
- if head == null || head->next == null
  - return head

- set smallElements, largeElements = new ListNode()

- set smallerIterator, largerIterator = smallElements, largeElements

- loop while head
  - if head->val < x
    - smallerIterator->next = head
    - smallerIterator = smallerIterator->next
  - else
    - largerIterator->next = head
    - largerIterator = largerIterator->next
  - if end

  - head = head->next
- while end

- largerIterator->next = null
  smallerIterator->next = largeElements->next

- return smallElements->next
```

The time-complexity of the above approach is **O(n)**, and the
space complexity is **O(n)**.

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        if(head == NULL || head->next == NULL) {
            return head;
        }

        ListNode *smallElements = new ListNode();
        ListNode *largeElements = new ListNode();

        ListNode *smallerIterator = smallElements;
        ListNode *largerIterator = largeElements;

        while(head) {
            if(head->val < x) {
                smallerIterator->next = head;
                smallerIterator = smallerIterator->next;
            } else {
                largerIterator->next = head;
                largerIterator = largerIterator->next;
            }
            head = head->next;
        }

        largerIterator->next = NULL;
        smallerIterator->next = largeElements->next;

        return smallElements->next;
    }
};
```

#### Golang solution

```go
func partition(head *ListNode, x int) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }

    smallElements, largeElements := &ListNode{}, &ListNode{}
    smallerIterator, largerIteractor := smallElements, largeElements

    for head != nil {
        if head.Val < x {
            smallerIterator.Next = head
            smallerIterator = smallerIterator.Next
        } else {
            largerIteractor.Next = head
            largerIteractor = largerIteractor.Next
        }
        head = head.Next
    }

    largerIteractor.Next = nil
    smallerIterator.Next = largeElements.Next

    return smallElements.Next
}
```

#### Javascript solution

```javascript
var partition = function(head, x) {
    if(head == null || head.next == null) {
        return head;
    }

    let smallElements = new ListNode(0, null);
    let largeElements = new ListNode(0, null);

    let smallerIterator = smallElements;
    let largerIterator = largeElements;

    while(head) {
        if(head.val < x) {
            smallerIterator.next = head;
            smallerIterator = smallerIterator.next;
        } else {
            largerIterator.next = head;
            largerIterator = largerIterator.next;
        }
        head = head.next;
    }

    largerIterator.next = null;
    smallerIterator.next = largeElements.next;

    return smallElements.next;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: head = [1, 4, 3, 2, 5, 2], x = 3

Step 1: if head == null || head->next == null
           head = 1
           head->next = 4
           false

Step 2: ListNode *smallElements = new ListNode()
        ListNode *largeElements = new ListNode()

        ListNode *smallerIterator = smallElements
        ListNode *largerIterator = largeElements

Step 3: loop while(head)
          head = 1

          if head->val < x
             1 < 3
             true

             smallerIterator->next = head
             smallerIterator->next = 1

             smallerIterator = smallerIterator->next
                             = 1

          head = head->next
               = 4

          smallerIterator = 1
          largerIterator = nil

Step 4: loop while(head)
          head = 4

          if head->val < x
             4 < 3
             false
          else

             largerIterator->next = head
             largerIterator->next = 4

             largerIterator = largerIterator->next
                            = 4

          head = head->next
               = 3

          smallerIterator = 1
          largerIterator = 4

Step 5: loop while(head)
          head = 3

          if head->val < x
             3 < 3
             false
          else

             largerIterator->next = head
             largerIterator->next = 3

             largerIterator = largerIterator->next
                            = 3

          head = head->next
               = 2

          smallerIterator = 1
          largerIterator = 4 -> 3

Step 6: loop while(head)
          head = 2

          if head->val < x
             2 < 3
             true

             smallerIterator->next = head
             smallerIterator->next = 2

             smallerIterator = smallerIterator->next
                             = 2

          head = head->next
               = 5

          smallerIterator = 1 -> 2
          largerIterator = 4 -> 3

Step 7: loop while(head)
          head = 5

          if head->val < x
             5 < 3
             false
          else

            largerIterator->next = head
            largerIterator->next = 5

            largerIterator = largerIterator->next
                           = 5

          head = head->next
               = 2

          smallerIterator = 1 -> 2
          largerIterator = 4 -> 3 -> 5

Step 8: loop while(head)
          head = 2

          if head->val < x
             2 < 3
             true

             smallerIterator->next = head
             smallerIterator->next = 2

             smallerIterator = smallerIterator->next
                             = 2

          head = head->next
               = nil

          smallerIterator = 1 -> 2 -> 2
          largerIterator = 4 -> 3 -> 5

Step 9: loop while(head)
          head = nil


Step 10: largerIterator->next = nil
         4 -> 3 -> 5 -> nil

         smallerIterator->next = largeElements->next
                               = 4 -> 3 -> 5 -> nil

         so the complete list is
         1 -> 2 -> 2 -> 4 -> 3 -> 5 -> nil

Step 11: return smallElements->next

We return the answer as [1, 2, 2, 4, 3, 5].
```
