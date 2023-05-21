---
title: Merge k Sorted Lists - LeetCode
description: Merge k sorted linked lists into a single list using C++, Golang, and JavaScript.
date: 2023-05-21
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - merge all the k sorted lists into one single linked-list and return it, c++, golang, javascript"
---

## Problem statement

You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.

*Merge all the linked-lists into one sorted linked-list and return it.*

Problem statement taken from: <a href='https://leetcode.com/problems/merge-k-sorted-lists' target='_blank'>https://leetcode.com/problems/merge-k-sorted-lists</a>

**Example 1:**

```
Input: lists = [[1, 4, 5], [1, 3, 4], [2, 6]]
Output: [1, 1, 2, 3, 4, 4, 5, 6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
```

**Example 2:**

```
Input: lists = []
Output: []
```

**Example 3:**

```
Input: lists = [[]]
Output: []
```

**Constraints:**

```
- k == lists.length
- 0 <= k <= 10^4
- 0 <= lists[i].length <= 500
- -10^4 <= lists[i][j] <= 10^4
- lists[i] is sorted in ascending order.
- The sum of lists[i].length will not exceed 10^4.
```

### Solutions for Merge k Sorted Lists Problem

#### Approach 1: Brute Force

In one of the previous blog posts, we discussed how to [Sort a single Linked List](https://alkeshghorpade.me/post/leetcode-sort-list). In this problem we need to merge K sorted Linked list.

A simple solution would be to connect all k linked lists into one list (in any order). Then use the merge sort algorithm discussed in [Sort List](https://alkeshghorpade.me/post/leetcode-sort-list) post. The worst-case time complexity of this approach is **O(n * log(n))**, where `n` is the total number of nodes present in all the k lists. This approach is inefficient as we are not taking advantage of the already sorted lists.

Let's check the C++ snippet of this approach below:

```cpp
ListNode* getLastNode(ListNode* head) {
    ListNode* current = head;
    ListNode* next = current->next;

    while(next != NULL) {
        current = next;
        next = current->next;
    }

    return current;
}

// Merge k sorted lists: main function
ListNode* mergeKSortedLists(vector<ListNode*>& lists) {
    if(lists.size() == 0) {
        return NULL;
    }

    // connect all k sorted linked lists into one list
    for(int i = 0; i < lists.size() - 1; i++) {
        // fetch the last node
        ListNode* last = getLastNode(lists[i]);

        last->next = lists[i + 1];
    }

    // perform merge sort on list[0]
    return sortList(lists[0]);
}

// merge sort the two list
ListNode* mergelist(ListNode *l1, ListNode *l2) {
    ListNode *ptr = new ListNode(0);
    ListNode *current = ptr;

    while(l1 != NULL && l2 != NULL) {
        if(l1->val <= l2->val) {
            current->next = l1;
            l1 = l1->next;
        } else {
            current->next = l2;
            l2 = l2->next;
        }

        current = current->next;
    }


    if(l1 != NULL) {
        current->next = l1;
        l1 = l1->next;
    }

    if(l2 != NULL) {
        current->next = l2;
        l2 = l2->next;
    }

    return ptr->next;
}

ListNode* sortList(ListNode* head) {
    if(head == NULL || head->next == NULL)
        return head;

    ListNode *temp = NULL;
    ListNode *slow = head;
    ListNode *fast = head;

    // split the list into two halves
    while(fast != NULL && fast->next != NULL) {
        temp = slow;
        slow = slow->next;
        fast = fast->next->next;
    }

    temp->next = NULL;

    // recursively call the sortList function for the two lists
    ListNode* l1 = sortList(head);
    ListNode* l2 = sortList(slow);

    // merge list l1 and l2
    return mergelist(l1, l2);
}
```

A second brute-force approach to solve the problem is by [merging two sorted lists](https://alkeshghorpade.me/post/leetcode-merge-two-sorted-lists) at a time. We merge the first two lists **lists[0]** with **lists[1]** and store the result. We merge the result with the third list **lists[2]** and repeat the process k - 1 time.

This method is relatively easy. But the time complexity of this approach is **O(n * k)**, where n is the number of elements to be merged.

A C++ snippet of this approach is as below:

```cpp
// Merge k sorted lists: main function
ListNode* mergeKSortedLists(vector<ListNode*>& lists) {
    if(lists.size() == 0) {
        return NULL;
    }

    return mergeKSortedListsHelper(lists);
}

// Helper function to merge k sorted lists
ListNode* mergeKSortedListsHelper(vector<ListNode*>& lists) {
    int size = lists.size();

    // Traverse from the second list to last
    for (int i = 1; i <= size; i++) {
        while(true) {
            ListNode head1 = lists[0], head2 = lists[i];

            // if the list has ended
            if(head1 == NULL) {
                break;
            }

            if(head1->val >= head2->val) {
                lists[i] = head2->next;
                head2->next = head1;
                lists[0] = head2;
            } else {
                // Traverse the first list
                while (head1->next != NULL) {
                    // find the node in the first list which is just
                    // greater than second list current node
                    if (head1->next->val >= head2->val) {
                        lists[i] = head2->next;
                        head2->next = head1->next;
                        head1->next = head2;
                        break;
                    }

                    head1 = head1->next;
                }

                if(head1->next == NULL) {
                    lists[i] = head2->next;
                    head2->next = NULL;
                    head1->next = head2;
                    head1->next->next = NULL;
                    break;
                }
            }
        }
    }

    return lists[0];
}
```

The time complexity of the above two approaches is very high, as we are not taking advantage of the sorted lists. We can optimize the approach using an additional data structure: Min Heap.

#### Approach 2: Using Min Heap

We can optimize the above approach by using a [Min Heap](https://en.wikipedia.org/wiki/Min-max_heap). The root of the Min Heap is always the smallest element.

As per the problem statement, all the linked lists are sorted. Therefore, the first element of the list will be the smallest. We add the first elements of all the linked lists into a Min Heap. We extract the smallest element, the Min Heap's root. After the root is removed, we increment the pointer of the list to which the root element belonged. The next node of this list is added to the Min Heap. We continue removing the root, and keep adding the next node from the lists to the heap until all the lists are traversed, and the heap is empty.

This algorithm can also be used to merge K sorted arrays. The time complexity of the algorithm is **O(n * log(k))**. Where n is the number of elements across all the lists and k is the number of linked lists. The space complexity is **O(k)** where k is the size of the Min Heap.

Let's check the algorithm for this approach.

```
- priority_queue<ListNode*, vector<ListNode*>, compare> pq

- for int i = 0; i < k; i++
  - if lists[i] != NULL
    - pq.push(arr[i])
  - if end
- for end

- if pq.empty()
  - return NULL
- if end

- ListNode* result = new ListNode(0)
  ListNode* last = dummp

- loop while !pq.empty()
  - ListNode* current = pq.top()
    pq.pop()

  - last->next = current
    last = last->next

  - if current->next != NULL
      pq.push(curr->next)
  - if end
- while end

- return result->next
```

Let's check the algorithm in C++ code.

```cpp
ListNode* mergeKSortedLists(vector<ListNode*>& lists) {
	priority_queue<ListNode*, vector<ListNode*>, compare> pq;
    int k = lists.size();

	// Push the first nodes of all the k lists in priority_queue 'pq'
	for (int i = 0; i < k; i++)
		if (lists[i] != NULL)
			pq.push(lists[i]);

	if (pq.empty())
		return NULL;

	ListNode *result = new ListNode(0);
	ListNode *last = result;

	// Loop till 'pq' is not empty
	while (!pq.empty()) {
		// Get the top element of 'pq'
		ListNode* current = pq.top();
		pq.pop();

		// Add the top element of 'pq' to the result list
		last->next = current;
		last = last->next;

		// If the current next node is not NULL, add it to the priority queue
		if (current->next != NULL) {
            pq.push(curr->next);
        }
	}

	// return the result
	return result->next;
}
```

#### Approach 3: Using Divide and Conquer

Using Min Heap, we reduced the time complexity to **O(n * log(k))**, but it takes **O(k)** extra space for the heap. We can solve this problem in constant space using Divide and Conquer technique.

As mentioned in our Brute force approach, we know how to [merge two sorted lists](https://alkeshghorpade.me/post/leetcode-merge-two-sorted-lists). The idea is to pair up k lists and merge each pair in linear time using the **O(1)** space. After the first iteration, k/2 lists of size 2 * n are left. After the second cycle, k/4 lists are left. We repeat the procedure until we have one list left.

Let's check the algorithm first.

```
// function mergeKLists(vector<ListNode*>& lists)
- if lists.size() == 0
  - return NULL
- if end

- return mergeKListsHelper(lists, lists.size() - 1)

// function mergeKListsHelper(vector<ListNode*>& lists, int last)
// Merge lists until one list is left
- loop while last != 0
  - initilaize i = 0, j = last

  - loop while i < j
    // merge list i with list j
    // store the merged result in list i
    - lists[i] = mergeLists(lists[i], lists[j])

    - increment i = i++
    - decrement j = j--

    - if i >= j
      - last = j
    - if end
  - while end
- while end

- return lists[0]

// function mergeLists(ListNode* l1, ListNode* l2)
- set ListNode* head = NULL

- if l1 == NULL
  - return l2
- else if l2 == NULL
  - return l1
- if end

- if l1->val < l2->val
  - set head = l1
  - set l1 = l1->next
- else
  - set head = l2
  - set l2 = l2->next
- if end

- set ListNode* p = head

- loop while l1 && l2
  - if l1->val < l2->val
    - set p->next = l1
    - set l1 = l1->next
  - else
    - set p->next = l2
    - set l2 = l2->next
  - if end

  - set p = p->next
- while end

- if l1 != NULL
  - p->next = l1
- else
  - p->next = l2
- if end

- return head
```

The time complexity of the above approach is **O(n * log(k))**, and the space complexity is **O(1)**.

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        if(lists.size() == 0) {
            return NULL;
        }

        return mergeKListsHelper(lists, lists.size() - 1);
    }

    ListNode* mergeKListsHelper(vector<ListNode*>& lists, int last) {
        // Merge lists until one list is left
        while(last != 0) {
            int i = 0, j = last;

            while(i < j) {
                // merge list i with list j
                // store the merged result in list i
                lists[i] = mergeLists(lists[i], lists[j]);

                i++;
                j--;

                // update last when all pairs are merged
                if(i >= j) {
                    last = j;
                }
            }
        }

        return lists[0];
    }

    ListNode* mergeLists(ListNode* l1, ListNode* l2) {
        ListNode* head = NULL;

        // if any one of the two lists is empty
        // return the other list.
        if(l1 == NULL) {
            return l2;
        } else if(l2 == NULL) {
            return l1;
        }

        // choose the head based on the smallest value of two lists.
        if(l1->val < l2->val){
            head = l1;
            l1 = l1->next;
        } else {
            head = l2;
            l2 = l2->next;
        }

        ListNode *p;
        p = head;

        while(l1 && l2){
            if(l1->val < l2->val){
                p->next = l1;
                l1 = l1->next;
            } else {
                p->next = l2;
                l2 = l2->next;
            }

            p = p->next;
        }

        if(l1 != NULL){
            p->next = l1;
        } else {
            p->next = l2;
        }

        return head;
    }
};
```

#### Golang solution

```go
func mergeKLists(lists []*ListNode) *ListNode {
    if len(lists) == 0 {
        return nil;
    }

    return mergeKListsHelper(lists, len(lists) - 1)
}

func mergeKListsHelper(lists []*ListNode, last int) *ListNode {
    // Merge lists until one list is left
    for last != 0 {
        i, j := 0, last

        for(i < j) {
            // merge list i with list j
            // store the merged result in list i
            lists[i] = mergeLists(lists[i], lists[j])

            i++;
            j--;

            // update last when all pairs are merged
            if i >= j {
                last = j
            }
        }
    }

    return lists[0]
}

func mergeLists(l1, l2 *ListNode) *ListNode {
    var head *ListNode
    head = nil

    // if any one of the two lists is empty
    // return the other list.
    if l1 == nil {
        return l2
    } else if l2 == nil {
        return l1
    }

    // choose the head based on the smallest value of the two lists.
    if(l1.Val < l2.Val){
        head = l1;
        l1 = l1.Next;
    } else {
        head = l2;
        l2 = l2.Next;
    }

    p := head

    for l1 != nil && l2 != nil {
        if l1.Val < l2.Val {
            p.Next = l1
            l1 = l1.Next
        } else {
            p.Next = l2
            l2 = l2.Next
        }

        p = p.Next
    }

    if l1 != nil {
        p.Next = l1
    } else {
        p.Next = l2
    }

    return head
}
```

#### JavaScript solution

```javascript
var mergeKLists = function(lists) {
    if(lists.length === 0) {
        return null;
    }

    return mergeKListsHelper(lists, lists.length - 1);
};

var mergeKListsHelper = function(lists, last) {
    // Merge lists until one list is left
    while(last != 0) {
        let i = 0, j = last;

        while(i < j) {
            // merge list i with list j
            // store the merged result in list i
            lists[i] = mergeLists(lists[i], lists[j]);

            i++;
            j--;

            // update last when all pairs are merged
            if(i >= j) {
                last = j;
            }
        }
    }

    return lists[0];
};

var mergeLists = function(l1, l2) {
    let head = null;

    // if any one of the two lists is empty
    // return the other list.
    if(l1 == null) {
        return l2;
    } else if(l2 == null) {
        return l1;
    }

    // choose the head based on the smallest value of the two lists.
    if(l1.val < l2.val){
        head = l1;
        l1 = l1.next;
    } else {
        head = l2;
        l2 = l2.next;
    }

    let p = head;

    while(l1 && l2){
        if(l1.val < l2.val){
            p.next = l1;
            l1 = l1.next;
        } else {
            p.next = l2;
            l2 = l2.next;
        }

        p = p.next;
    }

    if(l1 != null){
        p.next = l1;
    } else {
        p.next = l2;
    }

    return head;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: lists = [[1, 4, 5], [1, 3, 4], [2, 6]]

// mergeKLists function
Step 1: if lists.size() == 0
          3 == 0
          false

Step 2: return mergeKListsHelper(lists, lists.size() - 1)
               mergeKListsHelper(lists, 2)

// mergeKListsHelper
Step 3: loop while last != 0
          2 != 0
          true

          i = 0
          j = last
            = 2

          loop while i < j
            0 < 2
            true

            lists[i] = mergeLists(lists[i], lists[j])
            lists[0] = mergeLists(lists[0], lists[2])
                     = mergeLists([1, 4, 5], [2, 6])

// mergeLists([1, 4, 5], [2, 6])
Step 4: This function will merge the list and return
        [1, 2, 4, 5, 6]

// mergeKListsHelper
Step 5: i++
        i = 1

        j--
        j = 1

        if i >= j
           1 >= 1
           true

           last = j
           last = 1

        loop while i < j
          1 < 1
          false

// mergeKListsHelper
Step 6: loop while last != 0
          1 != 0
          true

          i = 0
          j = last
            = 1

          loop while i < j
            0 < 1
            true

            lists[i] = mergeLists(lists[i], lists[j])
            lists[0] = mergeLists(lists[0], lists[1])
                     = mergeLists([1, 2, 4, 5, 6], [1, 3, 4])

// mergeLists([1, 2, 4, 5, 6], [1, 3, 4])
Step 7: This function will merge the list and return
        [1, 1, 2, 3, 4, 4, 5, 6]

// mergeKListsHelper
Step 8: i++
        i = 1

        j--
        j = 0

        if i >= j
           1 >= 0
           true

           last = j
           last = 0

        loop while i < j
          1 < 0
          false

Step 9: loop while last != 0
          0 != 0
          false

Step 10: return lists[0]
         [1, 1, 2, 3, 4, 4, 5, 6]
```
