---
title: LeetCode Add Two Numbers
description: LeetCode Add Two Numbers represented using LinkedList in C++ and Golang.
date: 2021-03-21
hashtags: ["leetcode", "algorithms", "golang", "cpp"]
---

### Problem statement

You are given two **non-empty** linked lists representing two non-negative integers.
The digits are stored in **reverse order**, and each of their nodes contains a single digit.
Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Problem statement taken from: <a href="https://leetcode.com/problems/add-two-numbers" target="_blank">https://leetcode.com/problems/add-two-numbers</a>

**Example 1:**
```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
```

**Example 2:**
```
Input: l1 = [0], l2 = [0]
Output: [0]
```

**Example 3:**
```
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
```

**Constraints:**
```
  - The number of nodes in each linked list is in the range [1, 100].
  - 0 <= Node.val <= 9
  - It is guaranteed that the list represents a number that does not have leading zeros.
```


### Explanation

The numbers are represented in **reverse order** in LinkedList and hence
we do not have to worry about reversing the list.
The head of the LinkedList represent the least-significant digit
of the numbers.

Just like we add two numbers in Mathematics on a piece of paper,
we begin summing the least-significant digits.
As per the given constraint, each digit in the node is in the range
**0..9** so the sum may **overflow**.

For e.g., **4 + 9 = 13**. In this case, we set the current node digit to 3
and carry 1 to the next iteration.
The maximum sum can be **9 + 9 = 18**. So carry will be either 1 or 0.

##### Algorithm

```
- Initialize sum to 0.
- Initialize a current node which acts as a iterator and set the current sum as node val.
- Initialize pointer result which points to current node.
- Loop while(l1 != nil || l2 != nil)
  - if ( l1 != nil )
     - Add l1-> val to sum as sum += l1->val
     - Move l1 to point next node l1 = l1->next
  - if ( l2 != nil )
     - Add l2-> val to sum as sum += l2->val
     - Move l2 to point next node l2 = l2->next
  - Initialize new ListNode with last digit of sum new ListNode( sum % 10 )
    - Assign current node next to the new ListNode created above
      - current->next = new ListNode( sum % 10 )
  - Set current to current->next
  - Set sum = sum / 10. sum / 10 will be 0 for sum < 10 and 1 for sum >= 10
- Check if sum > 9, if so append a new node with digit 1 to current node.
- Return result->next since result is still pointing to current's first position.
```

##### C++ solution

```cpp
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        int sum = 0;
        ListNode result(0);
        ListNode *current = &result;

        while(l1 || l2){
            if(l1){
                sum += l1->val;
                l1 = l1->next;
            }

            if(l2){
                sum += l2->val;
                l2 = l2->next;
            }

            current->next = new ListNode(sum % 10);
            current = current->next;
            sum = sum / 10;
        }

        if(sum > 0){
            current->next = new ListNode(sum / 10);
        }

        return result.next;
    }
};
```

##### Golang solution

```go
func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
    sum := 0
    current := new(ListNode)
    result := current

    for l1 != nil || l2 != nil {
        if l1 != nil {
            sum = sum + l1.Val
            l1 = l1.Next
        }

        if l2 != nil {
            sum = sum + l2.Val
            l2 = l2.Next
        }

        current.Next = &ListNode{sum % 10, nil}
        current = current.Next
        sum = sum / 10
    }

    if sum > 0 {
        current.Next = &ListNode{sum, nil}
    }

    return result.Next
}
```
