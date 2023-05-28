---
title: LeetCode Remove Nth Node From End of List
description: LeetCode remove Nth node from linked list in C++, Golang and Javascript
date: 2021-05-16
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - remove Nth node from linked list, c++, golang, javascript"
---

## Problem statement

Given the **head** of a linked list, remove the **nth** node from the end of the list
and return its head.

**Example 1:**

![Container](./../remove-nth-node.png)

```
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
```

**Example 2:**
```
Input: head = [1], n = 1
Output: []
```

**Example 3:**
```
Input: head = [1,2], n = 1
Output: [1]
```

**Constraints:**
```
- The number of nodes in the list is sz.
- 1 <= sz <= 30
- 0 <= Node.val <= 100
- 1 <= n <= sz
```

### Explanation

#### Single pointer

One of the approaches to solve this problem is use single pointer by following the below steps
  - Calculating the length of the linked list
  - Subtract n from the length
  - Start from the head and iterate to above (length-n)th node.

A C++ snippet for the above solution is as below:

```cpp
ListNode* first = head;

while (first != null) {
    length++;
    first = first.next;
}

length -= n;
first = dummy;

while (length > 0) {
    length--;
    first = first.next;
}

first.next = first.next.next;

// dummy next is pointing to the head of the list.
return dummy.next;
```

The above solution is fine, but the main concern here is the repeated iteration
on the linked list.

Consider a case where the list is very huge of length 1,000,000 and we need to remove
the 5th node from last.
With the above approach, we are iterating over the list twice.

#### Two pointer

We can use two pointers and remove the node from the list
in a single pass. Let's check the algorithm for this.

##### Algorithm

```
- Initialize two pointers slow and fast pointing to the head of the list.

- Loop while n > 0
  - fast = fast->next
  - decrement n--

// if fast is nil it means the first node is supposed to be removed
- if fast == nil
  - head = head->next
  - return head

- Loop while fast->next != nil
  - slow = slow->next
  - fast = fast->next

- if slow->next != nil && slow->next->next
  - slow->next = slow->next->next
- else
  - slow->next = nil
- end

return head
```

#### C++ solution

```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* fast;
        ListNode* slow;

        fast = head;
        slow = head;

        while(n){
            fast = fast->next;
            n--;
        }

        if(fast == NULL){
            head = head->next;
            return head;
        }

        while(fast->next){
            slow = slow->next;
            fast = fast->next;
        }

        if(slow->next && slow->next->next){
            slow->next = slow->next->next;
        } else {
            slow->next = NULL;
        }

        return head;
    }
};
```

#### Golang solution

```go
func removeNthFromEnd(head *ListNode, n int) *ListNode {
    node := &ListNode{}
	node.Next = head

	slow, fast := node, node

	for ; n > 0; n-- {
		fast = fast.Next
	}

	for ; fast.Next != nil; slow, fast = slow.Next, fast.Next {}

	slow.Next = slow.Next.Next

	return node.Next
}
```

#### Javascript solution

```javascript
var removeNthFromEnd = function(head, n) {
    let fast = head;
    let slow = head;

    while(n > 0) {
        fast = fast.next;
        n--;
    }

    if(fast === null) return head.next;

    while(fast.next !== null) {
        slow = slow.next;
        fast = fast.next;
    }

    slow.next = slow.next.next;

    return head;
};
```

#### Dry Run

Let's dry-run our algorithm.

```
head = [1, 2, 3, 4, 5]
n = 2

Step 1: fast = head, slow = head

        slow, fast -- [1, 2, 3, 4, 5]

Step 2: Loop while n > 0
        2 > 0 = true

        fast = fast->next

                   fast
                    |
        slow -- [1, 2, 3, 4, 5]

        n--
        n = 1

Step 3: Loop while n > 0
        1 > 0 = true

        fast = fast->next

                      fast
                       |
        slow -- [1, 2, 3, 4, 5]

        n--
        n = 0

Step 4: Loop while n > 0
        0 > 0 = false

Step 5: if fast == nil
        = false

Step 6: Loop while fast.next != nil
        = true
        // fast.next pointing to node 4 address

        slow = slow.next
        fast = fast.next

           slow  fast
            |     |
        [1, 2, 3, 4, 5]

Step 7: Loop while fast.next != nil
        = true
        // fast.next pointing to node 5 address

        slow = slow.next
        fast = fast.next

             slow  fast
               |     |
        [1, 2, 3, 4, 5]

Step 8: while fast.next != nil
        = false

Step 9: if slow.next && slow.next.next
        slow is node 3
        slow.next is node 4
        slow.next is node 5

        slow.next = slow.next.next
        // so node 3 next is now pointing to 5

Step 10: return head

         [1, 2, 3, 5]
```

![Container](./../code-flow.png)
