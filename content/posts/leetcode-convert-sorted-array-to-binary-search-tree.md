---
title: LeetCode - Convert Sorted Array to Binary Search Tree
description: LeetCode - Convert a sorted array into a height-balanced binary search tree using C++, Golang and Javascript.
date: 2021-11-28
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - convert a sorted array into a height balanced binary search tree, c++, golang, javascript"
---

## Problem statement

Given an integer array *nums* where the elements are sorted in **ascending order**,
*convert it to a **height-balanced** binary search tree*.

A **height-balanced** binary tree is a binary tree in which the depth of the two
subtrees of every node never differ by more than one.

Problem statement taken from: <a href='https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/' target='_blank'>https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/</a>

**Example 1:**

![Container](./../balanced-search-tree1.png)

```
Input: nums = [-10, -3, 0, 5, 9]
Output: [0, -3, 9, -10, null, 5]
Explanation: [0, -10, 5, null, -3, null, 9] is also accepted:
```

![Container](./../balanced-search-tree2.png)

**Example 2:**

![Container](./../balanced-search-tree3.png)

```
Input: nums = [1,3]
Output: [3,1]
Explanation: [1,3] and [3,1] are both a height-balanced BSTs.
```

**Constraints:**

```
- 1 <= nums.length <= 10^4
- -10^4 <= nums[i] <= 10^4
- nums is sorted in a strictly increasing order.
```

### Explanation

Binary Search Tree is a node-based binary tree data structure that has the following properties:

- The left subtree of a node contains only nodes with keys lesser than the node’s key.
- The right subtree of a node contains only nodes with keys greater than the node’s key.
- The left and right subtree each must also be a binary search tree.

As mentioned in the problem statement,
the array is sorted in ascending order
the middle element will be the root element.
The left side of the middle element of the array will be the left subtree and similarly,
the right side of the middle element of the array will be its right subtree.

Let's check the algorithm.

```
// in sortedArrayToBST function
- if nums.size() == 0
  - return NULL

- return sortedArrayToBSTUtil(nums, 0, nums.size() - 1)

// in sortedArrayToBSTUtil function
- if( start > end )
  - return NULL

- set mid = ( start + end ) / 2

- set TreeNode* root = new TreeNode(nums[mid])

// call sortedArrayToBSTUtil recursively for the left and right sides of the array.
- set root->left = sortedArrayToBSTUtil(nums, start, mid - 1)
- set root->right = sortedArrayToBSTUtil(nums, mid + 1, end)

- return root
```

#### C++ solution

```cpp
class Solution {
public:
    TreeNode* sortedArrayToBSTUtil(vector<int>& nums, int start, int end){
        if(start > end)
            return NULL;

        int mid = (start + end)/2;

        TreeNode* root = new TreeNode(nums[mid]);

        root->left = sortedArrayToBSTUtil(nums, start, mid - 1);
        root->right = sortedArrayToBSTUtil(nums, mid + 1, end);

        return root;
    }

public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        if(nums.size() == 0)
            return NULL;

        return sortedArrayToBSTUtil(nums, 0, nums.size() - 1);
    }
};
```

#### Golang solution

```go
func sortedArrayToBSTUtil(nums []int, start, end int) *TreeNode {
    if start > end {
        return nil
    }

    mid := (start + end) / 2

    root := &TreeNode{Val: nums[mid]}
    root.Left = sortedArrayToBSTUtil(nums, start, mid - 1)
    root.Right = sortedArrayToBSTUtil(nums, mid + 1, end)

    return root
}

func sortedArrayToBST(nums []int) *TreeNode {
    if len(nums) == 0 {
        return nil
    }

    return sortedArrayToBSTUtil(nums, 0, len(nums) - 1)
}
```

#### Javascript solution

```javascript
var sortedArrayToBST = function(nums) {
    return sortedArrayToBSTUtil(0, nums.length - 1);

    function sortedArrayToBSTUtil(start, end) {
        if (start > end) return null;
        const mid = start + Math.floor((end - start) / 2);

        const root = new TreeNode(nums[mid]);

        root.left = sortedArrayToBSTUtil(start, mid - 1);
        root.right = sortedArrayToBSTUtil(mid + 1, end);

        return root;
    }
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [-10, -3, 0, 5, 9]

Step 1: if nums.size() == 0
           5 == 0
           false

Step 2: return sortedArrayToBSTUtil(nums, 0, nums.size() - 1)

// in sortedArrayToBSTUtil

Step 3: if start > end
           0 > 4
           false

Step 4: mid = (start + end)/2
            = (0 + 4)/2
            = 4/2
            = 2

Step 5: TreeNode* root = new TreeNode(nums[mid])
                       = new TreeNode(nums[2])
                       = new TreeNode(0)

Step 6: root->left = sortedArrayToBSTUtil(nums, start, mid - 1)
                   = sortedArrayToBSTUtil(nums, 0, 2 - 1)
                   = sortedArrayToBSTUtil(nums, 0, 1)

        root->right = sortedArrayToBSTUtil(nums, mid + 1, end)
                    = sortedArrayToBSTUtil(nums, 2 + 1, 4)
                    = sortedArrayToBSTUtil(nums, 3, 4)

// sortedArrayToBSTUtil(nums, 0, 1)
Step 7: if start > end
           0 > 1
           false

Step 8: mid = (start + end)/2
            = (0 + 1)/2
            = 1/2
            = 0

Step 9: TreeNode* root = new TreeNode(nums[mid])
                       = new TreeNode(nums[0])
                       = new TreeNode(-10)

Step 10: root->left = sortedArrayToBSTUtil(nums, start, mid - 1)
                    = sortedArrayToBSTUtil(nums, 0, 0 - 1)
                    = sortedArrayToBSTUtil(nums, 0, -1)

         root->right = sortedArrayToBSTUtil(nums, mid + 1, end)
                     = sortedArrayToBSTUtil(nums, 0 + 1, 1)
                     = sortedArrayToBSTUtil(nums, 1, 1)

        // for sortedArrayToBSTUtil(nums, 0, -1)
        // start > end evaluates to true so it return nil. Hence the tree looks like

// sortedArrayToBSTUtil(nums, 1, 1)
Step 11: if start > end
           1 > 1
           false

Step 12: mid = (start + end)/2
             = (1 + 1)/2
             = 2/2
             = 1

Step 13: TreeNode* root = new TreeNode(nums[mid])
                        = new TreeNode(nums[1])
                        = new TreeNode(-3)

Step 14: root->left = sortedArrayToBSTUtil(nums, start, mid - 1)
                    = sortedArrayToBSTUtil(nums, 1, 1 - 1)
                    = sortedArrayToBSTUtil(nums, 1, 0)

         root->right = sortedArrayToBSTUtil(nums, mid + 1, end)
                     = sortedArrayToBSTUtil(nums, 1 + 1, 1)
                     = sortedArrayToBSTUtil(nums, 2, 1)

        // for sortedArrayToBSTUtil(nums, 1, 0) and sortedArrayToBSTUtil(nums, 2, 1)
        // start > end evaluates to true so it return nil. Hence the tree looks like

Step 15: We backtrack to Step 10 and -3 is set to right subtree of -10 node.

Step 16: We backtrack to Step 6 and the above subtree is set as left subtree of 0 node.

// sortedArrayToBSTUtil(nums, 3, 4)
Step 17: if start > end
            3 > 4
            false

Step 18: mid = (start + end)/2
             = (3 + 4)/2
             = 7/2
             = 3

Step 19: TreeNode* root = new TreeNode(nums[mid])
                        = new TreeNode(nums[3])
                        = new TreeNode(5)

Step 20: root->left = sortedArrayToBSTUtil(nums, start, mid - 1)
                    = sortedArrayToBSTUtil(nums, 3, 3 - 1)
                    = sortedArrayToBSTUtil(nums, 3, 2)

         root->right = sortedArrayToBSTUtil(nums, mid + 1, end)
                     = sortedArrayToBSTUtil(nums, 3 + 1, 4)
                     = sortedArrayToBSTUtil(nums, 4, 4)

        // for sortedArrayToBSTUtil(nums, 3, 3)
        // start > end evaluates to true so it return nil. Hence the tree looks like

// sortedArrayToBSTUtil(nums, 4, 4)
Step 21: if start > end
            4 > 4
            false

Step 22: mid = (start + end)/2
             = (4 + 4)/2
             = 8/2
             = 4

Step 23: TreeNode* root = new TreeNode(nums[mid])
                        = new TreeNode(nums[4])
                        = new TreeNode(9)

Step 24: root->left = sortedArrayToBSTUtil(nums, start, mid - 1)
                    = sortedArrayToBSTUtil(nums, 4, 4 - 1)
                    = sortedArrayToBSTUtil(nums, 4, 3)

         root->right = sortedArrayToBSTUtil(nums, mid + 1, end)
                     = sortedArrayToBSTUtil(nums, 4 + 1, 4)
                     = sortedArrayToBSTUtil(nums, 5, 4)

        // for sortedArrayToBSTUtil(nums, 4, 3) and sortedArrayToBSTUtil(nums, 5, 4)
        // start > end evaluates to true so it return nil. Hence the tree looks like

Step 25: We backtrack to Step 20 and the above subtree is set as right subtree of 5 node.

Step 26: We backtrack to Step 16 and the tree is as below

So the output we return is [0, -3, 9, -10, null, 5]
```
