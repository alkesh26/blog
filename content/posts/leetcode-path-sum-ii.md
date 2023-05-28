---
title: LeetCode - Path Sum II
description: LeetCode - return all root-to-leaf paths where the sum of the node values in the path equals targetSum using C++, Golang, and Javascript.
date: 2022-09-04
hashtags: ["leetcode", "geeksforgeeks", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return all root-to-leaf paths where the sum of the node values in the path equals targetSum, c++, golang, javascript, geeksforgeeks."
---

## Problem statement

Given the *root* of a binary tree and an integer *targetSum*, return
*all **root-to-leaf** paths where the sum of the node values in the path equals targetSum*.
*Each path should be returned as a list of the node **values**, not node references*.

A **root-to-leaf** path is a path starting from the root and ending at any leaf node.
A **leaf** is a node with no children.

Problem statement taken from: <a href='https://leetcode.com/problems/path-sum-ii' target='_blank'>https://leetcode.com/problems/path-sum-ii</a>

**Example 1:**

![Container](./../path-sum-ii-1.png)

```
Input: root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], targetSum = 22
Output: [[5, 4, 11, 2], [5, 8, 4, 5]]
Explanation: There are two paths whose sum equals targetSum:
5 + 4 + 11 + 2 = 22
5 + 8 + 4 + 5 = 22
```

**Example 2:**

![Container](./../path-sum-2.png)

```
Input: root = [1, 2, 3], targetSum = 5
Output: []
```

**Example 3:**

```
Input: root = [1, 2], targetSum = 0
Output: []
```

**Constraints:**

```
- The number of nodes in the tree is in the range [0, 5000]
- -1000 <= Node.val <= 1000
- -1000 <= targetSum <= 1000
```

### Explanation

The problem is similar to our previous blog post
[Path Sum](https://alkeshghorpade.me/post/leetcode-path-sum).
We will use the same algorithm flow here,
but we will also store the tree node values in an array.

Let's check the algorithm first.

```
- set 2D array vector<vector<int>> result
      1D array vector<int> current

- getPathSum(root, result, current, targetSum)

- return result

// getPathSum function
- if root == NULL
  - return

- if root->val == targetSum && root->left == NULL && root->right == NULL
  - current.push_back(root->val)
  - result.push_back(current)
  - return

- set remainingTargetSum = targetSum - root->val
- current.push_back(root->val)

- getPathSum(root->left, result, current, remainingTargetSum)
- getPathSum(root->right, result, current, remainingTargetSum)

- return
```

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    void getPathSum(TreeNode* root, vector<vector<int>> &result, vector<int> current, int targetSum) {
        if(root == NULL) {
            return;
        }

        if(root->val == targetSum && root->left == NULL && root->right == NULL) {
            current.push_back(root->val);
            result.push_back(current);
            return;
        }

        int remainingTargetSum = targetSum - root->val;
        current.push_back(root->val);

        getPathSum(root->left, result, current, remainingTargetSum);
        getPathSum(root->right, result, current, remainingTargetSum);

        return;
    }

    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> result;
        vector<int> current;

        getPathSum(root, result, current, targetSum);

        return result;
    }
};
```

#### Golang solution

```go
func getPathSum(root *TreeNode, result *[][]int, current []int, targetSum int) {
    if root == nil {
        return
    }

    if root.Val == targetSum && root.Left == nil && root.Right == nil {
        current = append(current, root.Val)
        *result = append(*result, append([]int(nil),current...))
        return
    }

    remainingTargetSum := targetSum - root.Val

    current = append(current, root.Val)

    getPathSum(root.Left, result, current, remainingTargetSum)
    getPathSum(root.Right, result, current, remainingTargetSum)

    return
}

func pathSum(root *TreeNode, targetSum int) [][]int {
    result := [][]int{}
    current := []int{}

    getPathSum(root, &result, current, targetSum)

    return result
}
```

#### Javascript solution

```javascript
var pathSum = function(root, targetSum) {
    let result = [];

    var getPathSum = function(root, current, targetSum) {
        if(root === null) {
            return;
        }

        if(root.val === targetSum && root.left === null && root.right === null) {
            result.push([...current, root.val]);
            return;
        }

        let remainingTargetSum = targetSum - root.val;

        getPathSum(root.left, [...current, root.val], remainingTargetSum);
        getPathSum(root.right, [...current, root.val], remainingTargetSum);

        return;
    }

    getPathSum(root, [], targetSum);

    return result;
};
```

#### Dry Run

Let's dry-run our algorithm for **Example 1**.

```
Input: root = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]
       targetSum = 22

Step 1: initialize vector<vector<int>> result;
        vector<int> current;

Step 2: getPathSum(root, result, current, targetSum)
        getPathSum(root, [[]], [], 22)
        the root is at 5

// getPathSum
Step 3: if root == NULL
          false

        if root->val == targetSum && root->left == NULL && root->right == NULL
           5 == 22
           false

           remainingTargetSum = targetSum - root->val
                              = 22 - 5
                              = 17

           current.push_back(root->val)
           current = [5]

           getPathSum(root->left, result, current, remainingTargetSum)
           getPathSum(4, [[]], [5], 17)

Step 4: if root == NULL
          the root is at 4
          false

        if root->val == targetSum && root->left == NULL && root->right == NULL
           4 == 17
           false

           remainingTargetSum = targetSum - root->val
                              = 17 - 4
                              = 13

           current.push_back(root->val)
           current = [5, 4]

           getPathSum(root->left, result, current, remainingTargetSum)
           getPathSum(11, [[]], [5, 4], 13)

Step 5: if root == NULL
          the root is at 11
          false

        if root->val == targetSum && root->left == NULL && root->right == NULL
           11 == 13
           false

           remainingTargetSum = targetSum - root->val
                              = 13 - 11
                              = 2

           current.push_back(root->val)
           current = [5, 4, 11]

           getPathSum(root->left, result, current, remainingTargetSum)
           getPathSum(7, [[]], [5, 4, 11], 2)

Step 6: if root == NULL
          the root is at 7
          false

        if root->val == targetSum && root->left == NULL && root->right == NULL
           7 == 2
           false

           remainingTargetSum = targetSum - root->val
                              = 2 - 7
                              = -5

           current.push_back(root->val)
           current = [5, 4, 11, 7]

           getPathSum(root->left, result, current, remainingTargetSum)
           getPathSum(NULL, [[]], [5, 4, 11, 7], -5)

Step 7: if root == NULL
          the root is NULL
          true

          We backtrack to step 6 and continue

Step 8: getPathSum(root->right, result, current, remainingTargetSum)
        getPathSum(2, [[]], [5, 4, 11], 2)

Step 9: if root == NULL
          the root is at 2
          false

        if root->val == targetSum && root->left == NULL && root->right == NULL
           2 == 2 && root->left == NULL && root->right == NULL
           true

           current.push_back(root->val)
           current = [5, 4, 11, 2]

           result.push_back(current)
           result = [[5, 4, 11, 2]]

           return

        We backtrack to step 4 and continue

Step 10: getPathSum(root->right, result, current, remainingTargetSum)
         getPathSum(NULL, [[5, 4, 11, 2]], [5, 4], 13)

Step 11: if root == NULL
          the root is NULL
          true

          We backtrack to step 3 and continue

Step 12: getPathSum(root->right, result, current, remainingTargetSum)
         getPathSum(8, [[5, 4, 11, 2]], [5], 17)

Step 13: if root == NULL
          the root is at 8
          false

         if root->val == targetSum && root->left == NULL && root->right == NULL
            8 == 17
            false

         remainingTargetSum = targetSum - root->val
                              = 17 - 8
                              = 9

         current.push_back(root->val)
         current = [5, 8]

         getPathSum(root->left, result, current, remainingTargetSum)
         getPathSum(13, [[5, 4, 11, 2]], [5, 8], 9)

Step 14: if root == NULL
          the root is at 13
          false

         if root->val == targetSum && root->left == NULL && root->right == NULL
            13 == 9
            false

         remainingTargetSum = targetSum - root->val
                              = 9 - 13
                              = -4

         current.push_back(root->val)
         current = [5, 8, 13]

         getPathSum(root->left, result, current, remainingTargetSum)
         getPathSum(NULL, [[5, 4, 11, 2]], [5, 8, 13], -4)

Step 15: if root == NULL
          the root is NULL
          true

          We backtrack to step 14 and continue

Step 16: getPathSum(root->right, result, current, remainingTargetSum)
         getPathSum(NULL, [[5, 4, 11, 2]], [5, 8, 13], -4)

Step 17: if root == NULL
          the root is NULL
          true

          We backtrack to step 13 and continue

Step 18: getPathSum(root->right, result, current, remainingTargetSum)
         getPathSum(4, [[5, 4, 11, 2]], [5, 8], 9)

Step 19: if root == NULL
          the root is at 4
          false

         if root->val == targetSum && root->left == NULL && root->right == NULL
            4 == 9
            false

         remainingTargetSum = targetSum - root->val
                              = 9 - 4
                              = 5

         current.push_back(root->val)
         current = [5, 8, 4]

         getPathSum(root->left, result, current, remainingTargetSum)
         getPathSum(5, [[5, 4, 11, 2]], [5, 8, 4], 5)

Step 20: if root == NULL
          the root is at 5
          false

         if root->val == targetSum && root->left == NULL && root->right == NULL
            5 == 5
            true

            current.push_back(root->val)
            current = [5, 8, 4, 5]

            result.push_back(current)
            result = [[5, 4, 11, 2], [5, 8, 4, 5]]

            return

        We backtrack to step 19 and continue

Once the last rightmost lead node is processed
we return the result

The answer is [[5, 4, 11, 2], [5, 8, 4, 5]].
```
