---
title: LeetCode - Reverse Nodes in k-Group
description: LeetCode - reverse the nodes of the list k at a time, and return the modified list using C++, Golang, and JavaScript.
date: 2023-03-23
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - reverse the nodes of the list k at a time and return the modified list, c++, golang, javascript"
---

## Problem statement

Given the `head` of a linked list, reverse the nodes of the list `k` at a time, and return *the modified list*.

`k` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of `k` then left-out nodes, in the end, should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

Problem statement taken from: <a href='https://leetcode.com/problems/reverse-nodes-in-k-group' target='_blank'>https://leetcode.com/problems/reverse-nodes-in-k-group</a>

**Example 1:**

![Container](./../reverse_ex1.png)

```
Input: head = [1, 2, 3, 4, 5], k = 2
Output: [2, 1, 4, 3, 5]
```

**Example 2:**

![Container](./../reverse_ex2.png)

```
Input: head = [1, 2, 3, 4, 5], k = 3
Output: [3, 2, 1, 4, 5]
```

**Constraints:**

```
- The number of nodes in the list is n.
- 1 <= k <= n <= 5000
- <= Node.val <= 1000
```

**Follow-up:** Can you solve the problem in `O(1)` extra memory space?

### Explanation

#### Reverse a linked list

We can use the standard Reverse linked list code with a slight modification. We pass the count `k` to the method, which reverses the sublist of size `k`. We should keep the track of the next node and the previous node. These are required to point the pointers of the current sublist correctly to our previous sublist.

A C++ snippet of this approach is as follows:

```cpp
ListNode* reverse(ListNode* head, int k) {
    if (!head)
        return NULL;

    ListNode* current = head;
    ListNode* next = NULL;
    ListNode* prev = NULL;
    int count = 0;

    while (current != NULL && count < k) {
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
        count++;
    }

    if (next != NULL)
        head->next = reverse(next, k);

    return prev;
}
```

The time complexity of this approach is **O(n)**. The space complexity is **O(n / k)**. For a linked list of size n, we make `n/k` or `n/k + 1` calls during recursion.

#### Optimized solution: Iterative

We can optimize the space by using the above approach without recursion. We keep track of the previous, current, and next nodes while reversing the linked list in a set of size `k`. Once the sublist of size `k` is reversed we update the previous, current, and next node correctly. We repeat this approach till the list is traversed or the last sublist is less than size `k`.

Let's check the algorithm

#### Algorithm

```
- if !head || k == 1
  - return head

- set ListNode *temp = new ListNode(1)
    temp->next = head

- set ListNode *prev, *current, *next = temp
  set count = 0
  initialize index and i variables

// count the size of the list
- loop while current
  - current = current->next
  - count++
- while end

- loop while next
  - set current = prev->next
  - set next = current->next

  // if the last sublist is less than size k
  // we keep the list as it is.
  // Hence setting index = 0.
  - index = count > k ? k : 0

  - loop for i = 1; i < index; i++
    - set current->next = next->next
      next->next = prev->next
      prev->next = next
      next = current->next
  - for end

  - set prev = current

  - update count = count - k
- for end

- return temp->next
```

The time complexity of the above approach is **O(n)**. The space complexity is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        if(!head || k == 1) {
            return head;
        }

        ListNode *temp = new ListNode(1);
        temp->next = head;

        ListNode *prev = temp, *current = temp, *next = temp;

        int count = 0, index, i;

        while(current) {
            current = current->next;
            count++;
        }

        while(next) {
            current = prev->next;
            next = current->next;

            index = count > k ? k : 0;

            for(i = 1; i < index; i++) {
                current->next = next->next;
                next->next = prev->next;
                prev->next = next;
                next = current->next;
            }

            prev = current;

            count -= k;
        }

        return temp->next;
    }
};
```

#### Golang solution

```go
func reverseKGroup(head *ListNode, k int) *ListNode {
    if head == nil || k == 1 {
        return head
    }

    temp := &ListNode{1, nil}
    temp.Next = head

    prev, current, next := temp, temp, temp
    count, index, i := 0, 0, 0

    for current != nil {
        current = current.Next
        count++
    }

    for next != nil {
        current = prev.Next
        next = current.Next

        if count > k {
            index = k
        } else {
            index = 0
        }

        for i = 1; i < index; i++ {
            current.Next = next.Next
            next.Next = prev.Next
            prev.Next = next
            next = current.Next
        }

        prev = current
        count -= k
    }

    return temp.Next
}
```

#### JavaScript solution

```javascript
var reverseKGroup = function(head, k) {
    if(!head || k == 1) {
        return head;
    }

    let temp = new ListNode(1, null);
    temp.next = head;

    let prev = temp, current = temp, next = temp;
    let count = 0, index, i;

    while(current) {
        current = current.next;
        count++;
    }

    while(next) {
        current = prev.next;
        next = current.next;

        index = count > k ? k : 0;

        for(i = 1; i < index; i++) {
            current.next = next.next;
            next.next = prev.next;
            prev.next = next;
            next = current.next;
        }

        prev = current;

        count -= k;
    }

    return temp.next;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: head = [1, 2, 3, 4, 5]
       k = 2

Step 1: if !head || k == 1
          head -> [1, 2, 3, 4, 5] || 3 == 1
          false

Step 2: temp = new ListNode(1)
             -> [1]

        temp->next = head

        temp -> [1, 1, 2, 3, 4, 5]
        head -> [1, 2, 3, 4, 5]

Step 3: ListNode *prev = temp, *current = temp, *next = temp
        count = 0
        index, i

Step 4: loop while current
          current = current->next
          count++

        This will count the size of linked list.
        count = 5

Step 5: loop while next
          current = prev->next
                  = [1, 2, 3, 4, 5]

          next = current->next
               = [2, 3, 4, 5]

          index = count > k ? k : 0
                = 5 > 2 ? 2 : 0
                = 2

          loop for i = 1; i < 2
            1 < 2
            true

            current->next = next->next
                          = [3, 4, 5]

            next->next = prev->next
                       = [1, 3, 4, 5]

            prev->next = next
                       = [2, 1, 3, 4, 5]

            next = current->next
                 = [3, 4, 5]

            i++
            i = 2

          loop for i < 2
            2 < 2
            false

          prev = current
               = [1, 3, 4, 5]

          count = count - k
                = 5 - 2
                = 3

Step 6: loop while next
          next = [3, 4, 5]

          current = prev->next
                  = [3, 4, 5]

          next = current->next
               = [4, 5]

          index = count > k ? k : 0
                = 3 > 2 ? 2 : 0
                = 2

          loop for i = 1; i < 2
            1 < 2
            true

            current->next = next->next
                          = [3, 5]

            next->next = prev->next
                       = [1, 4, 5]

            prev->next = next
                       = [4, 3, 5]

            next = current->next
                 = [5]

            i++
            i = 2

          loop for i < 2
            2 < 2
            false

          prev = current
               = [5]

          count = count - k
                = 3 - 2
                = 1

          temp = [2, 1, 4, 3, 5]

Step 7: loop while next
          next = [5]

          current = prev->next
                  = [5]

          next = current->next
               = nil

          index = count > k ? k : 0
                = 1 > 2 ? 2 : 0
                = 0

          loop for i = 1; i < 0
            1 < 0
            false

          prev = current
               = [5]

          count = count - k
                = 1 - 2
                = -1

Step 8: loop while next
          next = nil
          false

Step 9: return temp->next
        temp = [1, 2, 1, 4, 3, 5]
        temp->next = [2, 1, 4, 3, 5]

We return the answer as [2, 1, 4, 3, 5].
```
