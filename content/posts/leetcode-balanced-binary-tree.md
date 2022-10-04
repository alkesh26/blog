---
title: LeetCode - Balanced Binary Tree
description: LeetCode - determine if a binary tree is height-balanced using C++, Golang and Javascript.
date: 2022-01-22
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - determine if a binary tree is height-balanced, c++, golang, javascript"
---

### Problem statement

Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as:

```
a binary tree in which the left and right subtrees of every node differ in height by no more than 1.
```

Problem statement taken from: <a href='https://leetcode.com/problems/balanced-binary-tree' target='_blank'>https://leetcode.com/problems/balanced-binary-tree</a>

**Example 1:**

![Container](./../balanced-tree-1.png)

```
Input: root = [3, 9, 20, null, null, 15, 7]
Output: true
```

**Example 2:**

![Container](./../balanced-tree-2.png)

```
Input: root = [1, 2, 2, 3, 3, null, null, 4, 4]
Output: false
```

**Example 3:**

```
Input: root = []
Output: true
```

**Constraints:**

```
- The number of nodes in the tree is in the range [0, 5000]
- -10^4 <= Node.val <= 10^4
```

### Explanation

#### Brute force approach

The brute force approach to verify if the tree is balanced or not
is to get the height of left and right sub-trees.
If the difference is not more than 1, we return true else false.

A C++ snippet of the above approach looks as below:

```cpp
int height(node* node) {
    if (node == NULL)
        return 0;

    return 1 + max(height(node->left), height(node->right));
}

bool isBalanced(node* root) {
    int leftHeight, rightHeight;

    if (root == NULL)
        return 1;

    leftHeight = height(root->left);
    rightHeight = height(root->right);

    if (abs(leftHeight - rightHeight) <= 1 && isBalanced(root->left) && isBalanced(root->right))
        return 1;

    return 0;
}
```

The time complexity of the above approach is **O(N^2)**.

#### Optimized solution

If we observe the approach closely, we can calculate the difference in the left and right
sub-trees in the height recursion function.
If at any point of time the difference between left and right subtree is greater than 1
we return false.

Let's check the algorithm first.

```
// isBalanced function
1. - if root == nullptr
     - return true

2. - return height(root) != -1

// height function
3. - if root == nullptr
     - return 0

4. - set leftHeight = height(root->left)
5. - set rightHeight = height(root->right)

6. - if leftHeight == -1 || rightHeight == -1 || abs(leftHeight - rightHeight) > 1
     - return -1

7. - return 1 + max(leftHeight, rightHeight)
```

In the **isBalanced** function, we first check if the tree is empty or not.
If it's empty, we return true.
If not, we pass the root to the height function.

Inside the **height** function, we check if the root is empty.
We return 0 for the empty element.

At steps 4 and 5, we recursively call left and right sub-trees.
In step 6, we check if the leftHeight or rightHeight is -1 or the
absolute difference between left and right height is greater than 1.
If the difference is above 1, we are returning -1.
The flow fallback to step 2 and verify if *-1 != -1*.
That's false and indicates the tree is not balanced.
Else we return at step 7, *1 + max(leftHeight, rightHeight)*

#### C++ solution

```cpp
class Solution {
public:
    int height(TreeNode* root) {
        if(root == nullptr) {
            return 0;
        }

        int leftHeight = height(root->left);
        int rightHeight = height(root->right);

        if(leftHeight == -1 || rightHeight == -1 || abs(leftHeight - rightHeight) > 1) {
            return -1;
        }

        return 1 + max(leftHeight, rightHeight);
    }

    bool isBalanced(TreeNode* root) {
        if(root == nullptr) {
            return true;
        }

        return height(root) != -1;
    }
};
```

#### Golang solution

```go
func maximum(a, b int) int {
    if a > b {
        return a
    } else {
        return b
    }
}

func height(root *TreeNode) int {
    if root == nil {
        return 0;
    }

    leftHeight := height(root.Left)
    rightHeight := height(root.Right)

    if leftHeight == -1 || rightHeight == -1 || int(math.Abs(float64(leftHeight - rightHeight))) > 1 {
        return -1
    }

    return 1 + maximum(leftHeight, rightHeight)
}

func isBalanced(root *TreeNode) bool {
    if root == nil {
        return true
    }

    return height(root) != -1
}
```

#### Javascript solution

```javascript
var height = function(root) {
    if(root === null) {
        return 0;
    }

    let leftHeight = height(root.left);
    let rightHeight = height(root.right);

    if(leftHeight == -1 || rightHeight == -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
    }

    return 1 + Math.max(leftHeight, rightHeight);
};

var isBalanced = function(root) {
    if(root === null) {
        return true;
    }

    return height(root) != -1;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: root = [3, 9, 20, null, null, 15, 7]

      root
        |
       [3, 9, 20, null, null, 15, 7]

// In isBalanced function
Step 1: if root == nullptr
           false

Step 2: return height(root) != -1

// In height function

       root
        |
       [3, 9, 20, null, null, 15, 7]

Step 3: if root == nullptr
           false

Step 4: leftHeight = height(root->left)
        root->left points to 9

          root
           |
       [3, 9, 20, null, null, 15, 7]

Step 5: if root == nullptr
           false

Step 6: leftHeight = height(root->left)
        root->left points to null
        So we get back here with value as 0 and it calls the next step.

        rightHeight = height(root->right)
        root->right points to null
        So we get back here with a value of 0, and it calls the next step.

        leftHeight = 0
        rightHeight = 0
        abs(0 - 0) > 1
        false

        if(leftHeight == -1 || rightHeight == -1 || abs(leftHeight - rightHeight) > 1)
          false

        return 1 + max(leftHeight, rightHeight)
               1 + max(0, 0)
               1

Step 7: We fallback to Step 4 and execute the next line
        rightHeight = height(root->right)
        root->right points to 20

             root
              |
       [3, 9, 20, null, null, 15, 7]

Step 9: if root == nullptr
           false

Step 10: leftHeight = height(root->left)
         root->left points to 15

                              root
                               |
        [3, 9, 20, null, null, 15, 7]

Step 11: if root == nullptr
           false

Step 12: leftHeight = height(root->left)
         root->left points to null
         So we get back here with value as 0 and it calls the next step.

         rightHeight = height(root->right)
         root->right points to null
         So we get back here with a value of 0, and it calls the next step.

         leftHeight = 0
         rightHeight = 0
         abs(0 - 0) > 1
         false

         if(leftHeight == -1 || rightHeight == -1 || abs(leftHeight - rightHeight) > 1)
           false

         return 1 + max(leftHeight, rightHeight)
                1 + max(0, 0)
                1

Step 13: We fallback to step 10 and execute next line
         rightHeight = height(root->right)
         root->right points to 7

                                 root
                                   |
        [3, 9, 20, null, null, 15, 7]

Step 14: if root == nullptr
           false

Step 15: leftHeight = height(root->left)
         root->left points to null
         So we get back here with value as 0 and it calls the next step.

         rightHeight = height(root->right)
         root->right points to null
         So we get back here with a value of 0, and it calls the next step.

         leftHeight = 0
         rightHeight = 0
         abs(0 - 0) > 1
         false

         if(leftHeight == -1 || rightHeight == -1 || abs(leftHeight - rightHeight) > 1)
           false

         return 1 + max(leftHeight, rightHeight)
                1 + max(0, 0)
                1

Step 16: We fallback to Step 7 and execute next lines
         leftHeight = 1
         rightHeight = 1
         abs(1 - 1) > 1
         false

         if(leftHeight == -1 || rightHeight == -1 || abs(leftHeight - rightHeight) > 1)
           false

         return 1 + max(leftHeight, rightHeight)
                1 + max(1, 1)
                2

Step 17: We fallback to Step 2 and execute next lines
         leftHeight = 1
         rightHeight = 2
         abs(1 - 2) > 1
         false

         if(leftHeight == -1 || rightHeight == -1 || abs(leftHeight - rightHeight) > 1)
           false

         return 1 + max(leftHeight, rightHeight)
                1 + max(1, 2)
                3

Step 18: We return back to isBalanced function and execute the last return part
         return height(root) != -1
           3 != -1
           true

So we return the answer as true.
```
