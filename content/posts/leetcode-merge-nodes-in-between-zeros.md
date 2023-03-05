---
title: LeetCode - Merge Nodes in Between Zeros
description: LeetCode - merge all the nodes lying in between them into a single node whose value is the sum of all the merged nodes using C++, Golang, and JavaScript.
date: 2023-02-11
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - merge all the nodes lying in between them into a single node whose value is the sum of all the merged nodes, c++, golang, javascript"
---

## Problem statement

You are given the `head` of a linked list, which contains a series of integers **separated** by 0's. The **beginning** and **end** of the linked list will have `Node.val == 0`.

For **every** two consecutive `0`'s, **merge** all the nodes lying in between them into a single node whose value is the **sum** of all the merged nodes. The modified list should not contain any `0`'s.

Return *the head of the modified linked list*.

Problem statement taken from: <a href='https://leetcode.com/problems/merge-nodes-in-between-zeros' target='_blank'>https://leetcode.com/problems/merge-nodes-in-between-zeros</a>

**Example 1:**

![Container](./../merge-nodes-0s-1.png)

```
Input: head = [0, 3, 1, 0, 4, 5, 2, 0]
Output: [4, 11]
Explanation:
The above figure represents the given linked list. The modified list contains
- The sum of the nodes marked in green: 3 + 1 = 4.
- The sum of the nodes marked in red: 4 + 5 + 2 = 11.
```

**Example 2:**

![Container](./../merge-nodes-0s-2.png)

```
Input: head = [0, 1, 0, 3, 0, 2, 2, 0]
Output: [1, 3, 4]
Explanation:
The above figure represents the given linked list. The modified list contains
- The sum of the nodes marked in green: 1 = 1.
- The sum of the nodes marked in red: 3 = 3.
- The sum of the nodes marked in yellow: 2 + 2 = 4.
```

**Constraints:**

```
- The number of nodes in the list is in the range [3, 2 * 10^5].
- 0 <= Node.val <= 1000
- There are no two consecutive nodes with Node.val == 0.
- The beginning and end of the linked list have Node.val == 0.
```

### Explanation

We can solve the problem using two-pointers. According to the problem statement, the list start and end nodes are zero. We can set one pointer **current** to **head->next** and another pointer **node** to **head**.

We keep moving the pointer **current** to the next node until the node value is not equal to zero. While iterating, we keep adding the value of these nodes and assign it to the **sum** variable. We create a node with this sum value and assign **node->next** to the new ListNode.

We keep iterating the above approach till we reach the end of the linked list.

Let's check the algorithm for this approach.

```
- if head == NULL
  - return NULL

- set ListNode* current = head->next
      ListNode* node = head
      sum = 0

- loop while current
  - loop while current->val != 0
    - update sum = sum + current->val
    - update current = current->val
  - while end

  - set node->next = new ListNode(sum)
  - node = node->next

  - update sum = 0
  - current = current->next
- while end

- return head->next
```

The time complexity of the above approach is **O(n)**, and the space complexity is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
class Solution {
public:
    ListNode* mergeNodes(ListNode* head) {
        if(head == NULL) {
            return NULL;
        }

        ListNode* current = head->next;
        ListNode* node = head;
        int sum = 0;

        while(current) {
            while(current->val != 0) {
                sum += current->val;
                current = current->next;
            }

            node->next = new ListNode(sum);
            node = node->next;

            sum = 0;
            current = current->next;
        }

        return head->next;
    }
};
```

#### Golang solution

```go
func mergeNodes(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    current := head.Next
    node := head
    sum := 0

    for current != nil {
        for current.Val != 0 {
            sum += current.Val
            current = current.Next
        }

        node.Next = &ListNode{Val: sum}
        node = node.Next

        sum = 0
        current = current.Next
    }

    return head.Next
}
```

#### JavaScript solution

```javascript
var mergeNodes = function(head) {
    if(head === null) {
        return null;
    }

    let current = head.next;
    let node = head;
    let sum = 0;

    while(current) {
        while(current.val != 0) {
            sum += current.val;
            current = current.next;
        }

        node.next = new ListNode(sum);
        node = node.next;

        sum = 0;
        current = current.next;
    }

    return head.next;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: head -> [0, 3, 1, 0, 4, 5, 2, 0]

Step 1: if head == NULL
           head -> 0
           false

Step 2: current = head->next
                -> 3
        node = head
             -> 0
        sum = 0

Step 3: while current
          true

          while current->val != 0
            3 != 0
            true

            sum = sum + current->val
                = 0 + 3
                = 3

            current = current->next
                    -> 1

          while current->val != 0
            1 != 0
            true

            sum = sum + current->val
                = 3 + 1
                = 4

            current = current->next
                    -> 0

          while current->val != 0
            0 != 0
            false

          node->next = new ListNode(sum)
                     = new ListNode(4)

          node is head
          The list is now
          [0, 4]

          node = node->next
               -> 4

          sum = 0
          current = current->next
                  -> 4

Step 4: while current
          true

          while current->val != 0
            4 != 0
            true

            sum = sum + current->val
                = 0 + 4
                = 4

            current = current->next
                    -> 5

          while current->val != 0
            5 != 0
            true

            sum = sum + current->val
                = 4 + 5
                = 9

            current = current->next
                    -> 2

          while current->val != 0
            2 != 0
            true

            sum = sum + current->val
                = 9 + 2
                = 11

            current = current->next
                    -> 0

          while current->val != 0
            0 != 0
            false

          node->next = new ListNode(sum)
                     = new ListNode(11)

          node is head
          The list is now
          [0, 4, 11]

          node = node->next
               -> 11

          sum = 0
          current = current->next
                  -> nil

Step 5: while current
          false

Step 6: return head->next

We return the answer as [4, 11].
```
