---
title: LeetCode - Remove Duplicates from Sorted List II
description: LeetCode - delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list using C++, Golang, and Javascript.
date: 2022-08-20
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list, c++, golang, javascript"
---

## Problem statement

Given the *head* of a sorted linked list,
*delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list*. Return the linked list **sorted** as well.

Problem statement taken from: <a href='https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii' target='_blank'>https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii</a>

**Example 1:**

![Container](./../remove-duplicates-list-1.png)

```
Input: head = [1, 2, 3, 3, 4, 4, 5]
Output: [1, 2, 5]
```

**Example 2:**

![Container](./../remove-duplicates-list-2.png)

```
Input: head = [1, 1, 1, 2, 3]
Output: [2, 3]
```

**Constraints:**

```
- The number of nodes in the list is in the range [0, 300].
- -100 <= Node.val <= 100
- The list is guaranteed to be sorted in ascending order.
```

### Explanation

#### Using Hash Map

We can use a simple hash map to solve the problem.
We store the node value as the hash map key.
The value of each key will be the number of times a key appears
in the list.

We then iterate over this hash map and create a new list
for keys that appear only once.

A C++ snippet of this logic will look as below:

```cpp
ListNode* removeDuplicates(ListNode* head) {
    map<int, int> map;

    map<int, int> map;

    while(head != NULL) {
        map[head->val]++;
        head = head->next;
    }

    ListNode* prev = new ListNode(0);

    for(auto it: map) {
        if(it.second == 1) {
            ListNode* cur = new ListNode(it.first);
            prev->next = cur;
            prev = cur;
        }
    }
}
```

The time-complexity of the function is **O(N)**, and the space complexity is **O(N)**.

#### Using Sentinel

The **Example 1** can be solved by using two pointers.
Things become tricky for **Example 2**.
We do come across these cases a lot when dealing with linked lists.
To solve such kinds of issues, we use
[Sentinel Node](https://en.wikipedia.org/wiki/Sentinel_node).
These nodes are used as pseudo head or tail to deal with edge cases like
**Example 2**.

To solve this problem, we will use a sentinel head to ensure
the situation deletes the list head never happens.

The input list is sorted, and we should compare
the node value with its next node. We use a predecessor pointer
that points to the last node before the sub-list of duplicates.
Once the duplicate sub-list ends, we point predecessors next to
the non-duplicate node.

Let's check the algorithm:

```
- set sentinel = ListNode(0)
  point sentinel->next = head
  set predecessor = sentinel

- loop while head != NULL
    // if the sub-list is duplicate
  - if head->next != NULL && head->val == head->next->val

    loop while head->next != NULL && head->val == head->next->val
      - move head = head->next

    // point predecessor's next to the non-duplicate node
    - set predecessor->next = head->next

  - else
    - set predecessor = predecessor->next
  - end if

  - set head = head->next
- end while

// return the new head.
- return sentinel-next
```

The time-complexity of this function is **O(N)**, and the space complexity is **O(1)**.

Let's check our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* sentinel = new ListNode(0);
        sentinel->next = head;
        ListNode* predecessor = sentinel;

        while(head != NULL) {
            if(head->next != NULL && head->val == head->next->val) {
                while(head->next != NULL && head->val == head->next->val) {
                    head = head->next;
                }

                predecessor->next = head->next;
            } else {
                predecessor = predecessor->next;
            }

            head = head->next;
        }

        return sentinel->next;
    }
};
```

#### Golang solution

```go
func deleteDuplicates(head *ListNode) *ListNode {
    sentinel := &ListNode{
        Val: 0,
        Next: head,
    }

    predecessor := sentinel

    for head != nil {
        if head.Next != nil && head.Val == head.Next.Val {
            for head.Next != nil && head.Val == head.Next.Val {
                head = head.Next
            }

            predecessor.Next = head.Next
        } else {
            predecessor = predecessor.Next
        }

        head = head.Next
    }

    return sentinel.Next
}
```

#### Javascript solution

```javascript
var deleteDuplicates = function(head) {
    let sentinel = new ListNode(0, head);
    let predecessor = sentinel;

    while(head != null) {
        if(head.next != null && head.val == head.next.val) {
            while(head.next != null && head.val == head.next.val) {
                head = head.next;
            }

            predecessor.next = head.next;
        } else {
            predecessor = predecessor.next;
        }

        head = head.next;
    }

    return sentinel.next;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: head = [1, 1, 1, 2, 3]

Step 1: ListNode* sentinel = new ListNode(0)

        sentinel->next = head
        sentinel = [0, 1, 1, 1, 2, 3]

        ListNode* predecessor = sentinel
        predecessor = [1, 1, 1, 2, 3]

Step 2: loop while head != NULL
        1 != NULL
        true

        if head->next != NULL && head->val == head->next->val
           1 != NULL && 1 == 1
           true

           loop while head->next != NULL && head->val == head->next->val
                head = head->next

            head = [1, 2, 3]

            predecessor->next = head->next
            predecessor = [2, 3]

        head = head->next
        head = [2, 3]
        sentinel = [0, 2, 3]

Step 3: loop while head != NULL
        2 != NULL
        true

        if head->next != NULL && head->val == head->next->val
           2 != NULL && 2 == 3
           false

        else
           predecessor = predecessor->next
           predecessor = [3]

        head = head->next
        head = [3]
        sentinel = [0, 2, 3]

Step 4: loop while head != NULL
        3 != NULL
        true

        if head->next != NULL && head->val == head->next->val
           NULL != NULL
           false

        else
           predecessor = predecessor->next
           predecessor = NULL

        head = head->next
        head = NULL
        sentinel = [0, 2, 3]

Step 5: loop while head != NULL
        NULL != NULL
        false

Step 6: return sentinel->next
        sentinel = [0, 2, 3]
        sentinel->next = [2, 3]

We return the answer as [2, 3].
```
