---
title: LeetCode - Path Sum
description: LeetCode - return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum using C++, Golang, and Javascript.
date: 2022-09-03
hashtags: ["leetcode", "geeksforgeeks", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum, c++, golang, javascript, geeksforgeeks."
---

### Problem statement

Given the *root* of a binary tree and an integer *targetSum*,
return *true* if the tree has a **root-to-leaf** path such that adding up
all the values along the path equal *targetSum*.

A **leaf** is a node with no children.

Problem statement taken from: <a href="https://leetcode.com/problems/path-sum" target="_blank">https://leetcode.com/problems/path-sum</a>

**Example 1:**

![Container](./../path-sum-1.png)

```
Input: root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown.
```

**Example 2:**

![Container](./../path-sum-2.png)

```
Input: root = [1, 2, 3], targetSum = 5
Output: false
Explanation: There are two root-to-leaf paths in the tree:
(1 --> 2): The sum is 3.
(1 --> 3): The sum is 4.
There is no root-to-leaf path with a sum = 5.
```

**Example 3:**

```
Input: root = [], targetSum = 0
Output: false
Explanation: Since the tree is empty, there are no root-to-leaf paths.
```

**Constraints:**

```
- The number of nodes in the tree is in the range [0, 5000].
- -1000 <= Node.val <= 1000
- -1000 <= targetSum <= 1000
```

### Explanation

#### Recursion

For solving most of the tree-related problems,
the best ways are to go with the recursion approach or
using queues/stacks.

It is one of the easy problems which we will solve
using recursion. We follow the given steps to solve
the problem:

* Recursively move to the left and right subtree. At each recursive call,
decrease the sum by the value of the current node.

* At any recursive call, if the current node value is equal to the remaining sum return true.
This means a path exists with the given target.

Let's check the algorithm first.

```
- if root == null
  - return false

- if root->val == targetSum && root->left == null && root->right == null
  - return true

- remainingTarget = targetSum - root->val

- return hasPathSum(root->left, remainingTarget) || hasPathSum(root->right, remainingTarget)
```

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if(root == NULL) {
          return false;
        }

        if(root->val == targetSum && root->left == NULL && root->right == NULL) {
            return true;
        }

        int remainingTarget = targetSum - root->val;

        return hasPathSum(root->left, remainingTarget) || hasPathSum(root->right, remainingTarget);
    }
};
```

#### Golang solution

```go
func hasPathSum(root *TreeNode, targetSum int) bool {
    if root == nil {
        return false
    }

    if root.Val == targetSum && root.Left == nil && root.Right == nil {
        return true
    }

    remainingTargetSum := targetSum - root.Val

    return hasPathSum(root.Left, remainingTargetSum) || hasPathSum(root.Right, remainingTargetSum)
}
```

#### Javascript solution

```javascript
var hasPathSum = function(root, targetSum) {
    if(root == null) {
        return false;
    }

    if(root.val == targetSum && root.left == null && root.right == null) {
        return true;
    }

    let remainingTarget = targetSum - root.val;

    return hasPathSum(root.left, remainingTarget) || hasPathSum(root.right, remainingTarget);
};
```

Let's dry-run our algorithm for **Example 1**.

```
Input: root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]
       targetSum = 22

Step 1: if root == null
           the root is at 5
           false

Step 2: if root->val == targetSum && root->left == NULL && root->right == NULL
           5 == 22
           false

Step 3: remainingTarget = targetSum - root->val
                        = 22 - 5
                        = 17

Step 4: return hasPathSum(root->left, remainingTarget) ||
                 hasPathSum(root->right, remainingTarget)

        root->left = 4
        root->right = 8
        remainingTarget = 17

Step 5: if root == null
           the root is at 4
           false

Step 6: if root->val == targetSum && root->left == NULL && root->right == NULL
           4 == 17
           false

Step 7: remainingTarget = targetSum - root->val
                        = 17 - 4
                        = 13

Step 8: return hasPathSum(root->left, remainingTarget) ||
                 hasPathSum(root->right, remainingTarget)

        root->left = 11
        root->right = nil
        remainingTarget = 13

Step 9: if root == null
           the root is at 11
           false

Step 10: if root->val == targetSum && root->left == NULL && root->right == NULL
           11 == 13
           false

Step 11: remainingTarget = targetSum - root->val
                        = 13 - 11
                        = 2

Step 12: return hasPathSum(root->left, remainingTarget) ||
                 hasPathSum(root->right, remainingTarget)

        root->left = 7
        root->right = 2
        remainingTarget = 2

Step 13: if root == null
           the root is at 7
           false

Step 14: if root->val == targetSum && root->left == NULL && root->right == NULL
           7 == 2
           false

Step 15: remainingTarget = targetSum - root->val
                         = 2 - 7
                         = -5

Step 16: return hasPathSum(root->left, remainingTarget) ||
                 hasPathSum(root->right, remainingTarget)

        root->left = null
        root->right = null
        remainingTarget = -5

Step 17: if root == null
            the root is null
            true

          We backtrack to Step 16

Step 18: if root == null
            the root is null
            true

          We backtrack to Step 12

Step 19: if root == null
           the root is at 2
           false

Step 20: if root->val == targetSum && root->left == NULL && root->right == NULL
           2 == 2
           true

We return true here and backtrack for the rest of the tree.
In the end, we have OR condition and have found the path once
we return the answer as true.
```
