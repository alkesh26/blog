---
title: LeetCode - House Robber III
description: LeetCode - return the maximum amount of money you can rob when houses in this place form a binary tree using C++, Golang, and Javascript.
date: 2022-09-11
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the maximum amount of money you can rob when houses  in this place form a binary tree, c++, golang, javascript"
---

## Problem statement

The thief has found himself a new place for his thievery again. There is only one entrance to this area, called *root*.

Besides the *root*, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if **two directly-linked houses were broken into on the same night**.

Given the *root* of the binary tree, return *the maximum amount of money the thief can rob **without alerting the police***.

Problem statement taken from: <a href='https://leetcode.com/problems/house-robber-iii/' target='_blank'>https://leetcode.com/problems/house-robber-iii/</a>

**Example 1:**

![Container](./../rob1-tree.png)

```
Input: root = [3, 2, 3, null, 3, null, 1]
Output: 7
Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.
```

**Example 2:**

![Container](./../rob2-tree.png)

```
Input: root = [3, 4, 5, 1, 3, null, 1]
Output: 9
Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.
```

**Constraints:**

```
- The number of nodes in the tree is in the range [1, 10^4].
- 0 <= Node.val <= 10^4
```

### Explanation

This problem is similar to our previous two blog posts
[House Robber](https://alkeshghorpade.me/post/leetcode-house-robber) and
[House Robber II](https://alkeshghorpade.me/post/leetcode-house-robber-ii).
The houses are arranged in a binary tree fashion, and they are neither in a straight line
nor in a circle.

We can use the Dynamic Programming approach here. We need to change how our DP array will be set
and consumed. The problem approach should be:

* We create a helper function to traverse the tree from the root.

* Recursively travel the root's left and right subtree.

* **Two directly-linked houses** should be robbed. If the root node is considered, we should consider the grandchild nodes and leave out the child nodes.

* If the root is excluded, and we consider the child nodes, then leave its immediate child nodes and
consider its grandchild nodes.

* Return the result as the maximum of root and its grandchild or the immediate child level summation.

Let's check the algorithm first.

```
// function rob(TreeNode* root)
- set array result = robHelper(root)

- return max(result[0], result[1])

// function robHelper(root)
- if root == NULL
  - return [0, 0]

- initialize left and right array

- left = robHelper(root->left)
  right = robHelper(root->right)

- totalIncludingRoot = root->val + left[1] + right[1]
  totalExcludingRoot = max(left[0], left[1]) + max(right[0], right[1])

- return [totalIncludingRoot, totalExcludingRoot]
```

Let's check our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    pair<int, int> robHelper(TreeNode* root) {
        if(root == NULL){
            return {0, 0};
        }

        pair<int, int> left, right;

        left = robHelper(root->left);
        right = robHelper(root->right);

        int rootExcluded = max(left.first, left.second) + max(right.first, right.second);
        int rootIncluded = root->val + left.second + right.second;

        return {rootIncluded, rootExcluded};
    }

    int rob(TreeNode* root) {
        pair<int, int> result = robHelper(root);

        return max(result.first, result.second);
    }
};
```

#### Golang solution

```go
func max(a, b int) int {
    if a > b {
        return a
    }

    return b
}

func robHelper(root *TreeNode) []int {
    if root == nil {
        return []int{0, 0}
    }

    left, right := robHelper(root.Left), robHelper(root.Right)

    rootExcluded := max(left[0], left[1]) + max(right[0], right[1])
    rootIncluded := root.Val + left[1] + right[1]

    return []int{rootIncluded, rootExcluded}
}

func rob(root *TreeNode) int {
    result := robHelper(root)

    return max(result[0], result[1])
}
```

#### Javascript solution

```javascript
var robHelper = function(root) {
    if(root === null) {
        return [0, 0];
    }

    let left = robHelper(root.left);
    let right = robHelper(root.right);

    let rootExcluded = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    let rootIncluded = root.val + left[1] + right[1];

    return [rootIncluded, rootExcluded];
}

var rob = function(root) {
    let result = robHelper(root);

    return Math.max(result[0], result[1]);
};
```

Let's dry run our algorithm for a given input.

```
Input: root = [3, 2, 3, null, 3, null, 1]

// function rob(TreeNode* root)
Step 1: pair<int, int> result = robHelper(root)

// function robHelper(root)
Step 2: root == NULL
        the root is pointing at 3
        false

        pair<int, int> left, right

        left = robHelper(root->left)
        root->left is pointing at 2

Step 3: root == NULL
        the root is pointing at 2
        false

        pair<int, int> left, right

        left = robHelper(root->left)
        root->left is pointing at null

Step 4: root == NULL
        the root is pointing at null
        true
        return [0, 0]

        We backtrack to step 3 and move forward.

        left = [0, 0]
        right = robHelper(root->right)
        the root is 2, and root->right is pointing to 3

Step 5: root == NULL
        the root is pointing at 3
        false

        pair<int, int> left, right

        left = robHelper(root->left)
        root->left is pointing at null

Step 6: root == NULL
        the root is pointing at null
        true
        return [0, 0]

        We backtrack to step 5 and move forward.

        left = [0, 0]
        right = [0, 0]
        the root is 3, and root->right is pointing to null

        rootExcluded = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
                     = Math.max(0, 0) + Math.max(0, 0)
                     = 0

        rootIncluded = root.val + left[1] + right[1]
                     = 3 + 0 + 0
                     = 3

        return [rootIncluded, rootExcluded]
               [3, 0]

        We backtrack to step 4

Step 7: left = [0, 0]
        right = robHelper(root->right)
              = [3, 0]

        the root is 2, and root->right is pointing to 3
        rootExcluded = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
                     = Math.max(0, 0) + Math.max(3, 0)
                     = 3

        rootIncluded = root.val + left[1] + right[1]
                     = 2 + 0 + 0
                     = 2

        return [rootIncluded, rootExcluded]
               [2, 3]

        We backtrack to step 2, where the root is pointing to 3.

Step 8: left = robHelper(root->left)
             = [2, 3]

        right = robHelper(root->right)
        root->right is pointing at 3

Step 9: root == NULL
        the root is pointing at 3
        false

        pair<int, int> left, right

        left = robHelper(root->left)
        root->left is pointing at null

Step 10: root == NULL
         the root is pointing at null
         true
         return [0, 0]

         We backtrack to step 9 and move forward.

         left = [0, 0]
         right = robHelper(root->right)
         root->right is pointing at 1

Step 11: root == NULL
         the root is pointing at 1
         false

         pair<int, int> left, right

         left = robHelper(root->left)
         root->left is pointing at null

Step 12: root == NULL
         the root is pointing at null
         true
         return [0, 0]

         We backtrack to step 11 and move forward.

         left = [0, 0]
         right = robHelper(root->right)

Step 13: root == NULL
         the root is pointing at null
         true
         return [0, 0]

         We backtrack to step 12 and move forward.

         left = [0, 0]
         right = [0, 0]

         rootExcluded = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
                      = Math.max(0, 0) + Math.max(0, 0)
                      = 0

         rootIncluded = root.val + left[1] + right[1]
                      = 1 + 0 + 0
                      = 1

         return [rootIncluded, rootExcluded]
                [1, 0]

         We return to step 10 and continue.

Step 14: left = [0, 0]
         right = [1, 0]

         rootExcluded = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
                      = Math.max(0, 0) + Math.max(1, 0)
                      = 1

         rootIncluded = root.val + left[1] + right[1]
                      = 3 + 0 + 0
                      = 3

         return [rootIncluded, rootExcluded]
                [3, 1]

         We backtrack to step 8, where the root is 3

Step 15: left = [2, 3]
         right = [3, 1]

         rootExcluded = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
                      = Math.max(2, 3) + Math.max(3, 1)
                      = 3 + 3
                      = 6

         rootIncluded = root.val + left[1] + right[1]
                      = 3 + 3 + 1
                      = 7

         return [rootIncluded, rootExcluded]
                [6, 7]

         We backtrack to step 1 in the rob function and continue.

// func rob(root)
Step 16: return max(result[0], result[1])
                max(6, 7)

We return the result as 7.
```
