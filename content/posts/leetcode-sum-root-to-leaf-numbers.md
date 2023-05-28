---
title: LeetCode - Sum Root to Leaf Numbers
description: LeetCode - return the total sum of all root-to-leaf numbers using C++, Golang, and JavaScript.
date: 2023-02-04
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the total sum of all root-to-leaf numbers, c++, golang, javascript"
---

## Problem statement

You are given the `root` of a binary tree containing digits from `0` to `9` only.

Each root-to-leaf path in the tree represents a number.

* For example, the root-to-leaf path `1 -> 2 -> 3` represents the number `123`.

Return *the total sum of all root-to-leaf numbers*. Test cases are generated so that the answer will fit in a **32-bit** integer.

A **leaf** node is a node with no children.

Problem statement taken from: <a href='https://leetcode.com/problems/sum-root-to-leaf-numbers' target='_blank'>https://leetcode.com/problems/sum-root-to-leaf-numbers</a>

**Example 1:**

![Container](./../path-sum-2.png)

```
Input: root = [1, 2, 3]
Output: 25
Explanation:
The root-to-leaf path 1->2 represents the number 12.
The root-to-leaf path 1->3 represents the number 13.
Therefore, sum = 12 + 13 = 25.
```

**Example 2:**

![Container](./../sum-root-leaf.png)

```
Input: root = [4, 9, 0, 5, 1]
Output: 1026
Explanation:
The root-to-leaf path 4->9->5 represents the number 495.
The root-to-leaf path 4->9->1 represents the number 491.
The root-to-leaf path 4->0 represents the number 40.
Therefore, sum = 495 + 491 + 40 = 1026.
```

**Constraints:**

```
- The number of nodes in the tree is in the range [1, 1000].
- 0 <= Node.val <= 9
- The depth of the tree will not exceed 10.
```

### Explanation

#### Preorder Traversal

The idea is to use preorder traversal. We keep track of the value calculated till the current node. If the node is the leaf node we return the number generated. We traverse through all the tree paths from the root to the leaves
and update the sum.

Let's check the algorithm to understand it clearly.

```
- if root == null
  - return 0

- sum = sum * 10 + root->val

// if leaf node return the number
- if root->left == NULL && root->right == NULL
  - return sum

// if a non-leaf node, compute the number of its leaf
- return sumNumbersHelper(root->left, sum) +
    sumNumbersHelper(root->right, sum)
```

The time complexity and the space complexity of the above approach is **O(n)**.

Let's check our algorithm in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
class Solution {
public:
    int sumNumbersHelper(TreeNode* root, int sum) {
        if(root == NULL) {
            return 0;
        }

        sum = sum * 10 + root->val;

        if(root->left == NULL && root->right == NULL) {
            return sum;
        }

        return sumNumbersHelper(root->left, sum) +
            sumNumbersHelper(root->right, sum);
    }

    int sumNumbers(TreeNode* root) {
        return sumNumbersHelper(root, 0);
    }
};
```

#### Golang solution

```go
func sumNumbersHelper(root *TreeNode, sum int) int {
    if root == nil {
        return 0
    }

    sum = sum * 10 + root.Val

    if root.Left == nil && root.Right == nil {
        return sum
    }

    return sumNumbersHelper(root.Left, sum) +
        sumNumbersHelper(root.Right, sum)
}

func sumNumbers(root *TreeNode) int {
    return sumNumbersHelper(root, 0)
}
```

#### JavaScript solution

```javascript
var sumNumbersHelper = function(root, sum) {
    if(root == null) {
        return 0;
    }

    sum = sum * 10 + root.val;

    if(root.left == null && root.right == null) {
        return sum;
    }

    return sumNumbersHelper(root.left, sum) +
        sumNumbersHelper(root.right, sum);
}

var sumNumbers = function(root) {
    return sumNumbersHelper(root, 0)
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: root = [1, 2, 3]

// sumNumbers
Step 1: return sumNumbersHelper(root, 0)

// sumNumbersHelper
Step 2: if root == NULL
          root -> 1
          false

Step 3: sum = sum * 10 + root->val
            = 0 * 10 + 1
            = 1

Step 4: root->left == NULL && root->right == NULL
        root -> 1
        root->left = 2
        root->right = 3

        false

Step 5: return sumNumbersHelper(root->left, sum) +
            sumNumbersHelper(root->right, sum)

        return sumNumbersHelper(2, 1) +
            sumNumbersHelper(3, 1)

// We call the function sumNumbersHelper(2, 1)
Step 6: if root == NULL
          root -> 2
          false

Step 7: sum = sum * 10 + root->val
            = 1 * 10 + 2
            = 12

Step 8: root->left == NULL && root->right == NULL
        root -> 2
        root->left = NULL
        root->right = NULL

        true

        return sum

// We backtrack to Step 5
Step 9: return sumNumbersHelper(root->left, sum) +
            sumNumbersHelper(root->right, sum)

        return sumNumbersHelper(2, 1) +
            sumNumbersHelper(3, 1)

        return 12 + sumNumbersHelper(3, 1)

// We call the function sumNumbersHelper(3, 1)
Step 10: if root == NULL
          root -> 3
          false

Step 11: sum = sum * 10 + root->val
            = 1 * 10 + 3
            = 13

Step 12: root->left == NULL && root->right == NULL
        root -> 3
        root->left = NULL
        root->right = NULL

        true

        return sum

// We backtrack to Step 9
Step 13: return 12 + sumNumbersHelper(3, 1)
         return 12 + 13
         return 25

// We reach the main function Step 1
Step 14: return 25
```
