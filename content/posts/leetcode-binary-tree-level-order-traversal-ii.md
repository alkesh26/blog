---
title: LeetCode - Binary Tree Level Order Traversal II
description: LeetCode - return the bottom-up level order traversal of its nodes using C++, Golang and Javascript.
date: 2023-01-07
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - the bottom-up level order traversal of its nodes, c++, golang, javascript"
---

## Problem statement

Given the `root` of a binary tree, return *the bottom-up level order traversal of its nodes' values*.
(i.e., from left to right, level by level from leaf to root).

Problem statement taken from: <a href='https://leetcode.com/problems/binary-tree-level-order-traversal-ii/' target='_blank'>https://leetcode.com/problems/binary-tree-level-order-traversal-ii/</a>

**Example 1:**

![Container](./../binary-tree-level-ii.png)

```
Input: root = [3, 9, 20, null, null, 15, 7]
Output: [[15, 7], [9, 20], [3]]
```

**Example 2:**

```
Input: root = [1]
Output: [[1]]
```

**Example 3:**

```
Input: root = []
Output: []
```

**Constraints:**

```
- The number of nodes in the tree is in the range [0, 2000].
- -1000 <= Node.val <= 1000
```

### Explanation

The problem statement is similar to our old blog post
[LeetCode Binary Tree Level Order Traversal](https://alkeshghorpade.me/post/leetcode-binary-tree-level-order-traversal).
Instead of printing the levels row by row from top to bottom,
we need to print them in reverse order.

#### Recursive function

We can modify the Recursive Solution of
[LeetCode Binary Tree Level Order Traversal](https://alkeshghorpade.me/post/leetcode-binary-tree-level-order-traversal)
to print the tree level from bottom to top.

A C++ snippet of the solution will be as below.

```cpp
void reverseLevelOrder(node* root) {
    int h = height(root);
    int i;

    for(i = h; i >= 1; i--)
        printGivenLevel(root, i);
}

void printGivenLevel(node* root, int level) {
    if (root == NULL)
        return;

    if (level == 1)
        cout << root->data << ' ';
    else if (level > 1)
    {
        printGivenLevel(root->left, level - 1);
        printGivenLevel(root->right, level - 1);
    }
}

int height(node* node) {
    if (node == NULL)
        return 0;
    else
    {
        int lheight = height(node->left);
        int rheight = height(node->right);

        if (lheight > rheight)
            return(lheight + 1);
        else return(rheight + 1);
    }
}
```

The time-complexity of the above approach is **O(n^2)**, and the
space complexity is **O(n)**.

#### Queues: Iterative Solution

We can reduce the time complexity to **O(n)**, using an iterative approach
with Queues.

Let's check the algorithm.

```
- initialize 2D array as vector vector<vector<int>> result
- initialize size and i

- return result if root == null

- initialize queue<TreeNode*> q
  - push root to queue : q.push(root)

- initialize TreeNode* node for iterating on the tree

- loop while( !q.empty() ) // queue is not empty
  - initialize vector<int> tmp
  - set size = q.size()

  - loop for i = 0; i < size; i++
    - set node = q.front()

    - if node->left
      - push in queue: q.push(node->left)

    - if node->right
      - push in queue: q.push(node->right)

    - remove the front node: q.pop()
    - push node->val to tmp. tmp.push_back(node->val)

  - push the tmp to result: result.push_back(tmp)
- loop while end

- reverse result

- return result
```

The time complexity of the above approach is **O(n)**, and the space complexity is **O(n)**.

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    vector<vector<int>> levelOrderBottom(TreeNode* root) {
        vector<vector<int>> result;
        int size, i;

        if(root == NULL)
            return result;

        queue<TreeNode*> q;
        q.push(root);

        TreeNode* node;

        while(!q.empty()){
            vector<int> tmp;
            size = q.size();

            for(i = 0; i < size; i++){
                node = q.front();
                if(node->left)
                    q.push(node->left);

                if(node->right)
                    q.push(node->right);

                q.pop();
                tmp.push_back(node->val);
            }

            result.push_back(tmp);
        }

        reverse(result.begin(), result.end());

        return result;
    }
};
```

#### Golang solution

```go
func levelOrderBottom(root *TreeNode) [][]int {
    result := [][]int{}

    queue := []*TreeNode{root}

    for len(queue) != 0 {
        tmp := []int{}
        size := len(queue)

        for i := 0; i < size; i++ {
            if queue[0] != nil {
                tmp = append(tmp, queue[0].Val)
                queue = append(queue, queue[0].Left)
                queue = append(queue, queue[0].Right)
            }

            queue = queue[1:]
        }

        result = append(result, tmp)
    }

    result = reverse(result)

    return result[1:]
}

func reverse(input [][]int) [][]int {
    var output [][]int

    for i := len(input) - 1; i >= 0; i-- {
        output = append(output, input[i])
    }

    return output
}
```

#### Javascript solution

```javascript
var levelOrderBottom = function(root) {
    let result = [];
    let queue = [];

    if(root)
        queue.push(root);

    while(queue.length > 0) {
        tmp = [];
        let len = queue.length;

        for (let i = 0; i< len; i++) {
            let node = queue.shift();
            tmp.push(node.val);

            if(node.left) {
                queue.push(node.left);
            }

            if(node.right) {
                queue.push(node.right);
            }
        }

        result.push(tmp);
    }

    return result.reverse();
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: root = [3, 9, 20, null, null, 15, 7]

Step 1: vector<vector<int>> result;
        int size, i;

Step 2: root == null
        [3, 9..] == null
        false

Step 3: queue<TreeNode*> q;
        q.push(root);

        q = [3]

Step 4: loop !q.empty()
        q = [3]
        q.empty() = false
        !false = true

        vector<int> tmp
        size = q.size()
             = 1

        for(i = 0; i < 1; i++)
          - 0 < 1
          - true

          node = q.front()
          node = 3

          if node->left
            - node->left = 9
            - q.push(node->left)
            - q = [3, 9]

          if node->right
            - node->right = 20
            - q.push(node->right)
            - q = [3, 9, 20]


          q.pop()
          q = [9, 20]

          tmp.push_back(node->val)
          tmp.push_back(3)

          i++
          i = 1

        for(i < 1)
        1 < 1
        false

        result.push_back(tmp)
        result = [[3]]

Step 5: loop !q.empty()
        q = [9, 20]
        q.empty() = false
        !false = true

        vector<int> tmp
        size = q.size()
             = 2

        for(i = 0; i < 2; i++)
          - 0 < 2
          - true

          node = q.front()
          node = 9

          if node->left
            - node->left = nil
            - false

          if node->right
            - node->right = nil
            - false

          q.pop()
          q = [20]

          tmp.push_back(node->val)
          tmp.push_back(9)

          i++
          i = 1

        for(i < 2)
          - 1 < 2
          - true

          node = q.front()
          node = 20

          if node->left
            - node->left = 15
            - q.push(node->left)
            - q = [20, 15]

          if node->right
            - node->left = 7
            - q.push(node->right)
            - q = [20, 15, 7]

          q.pop()
          q = [15, 7]

          tmp.push_back(node->val)
          tmp.push_back(20)
          tmp = [9, 20]

          i++
          i = 2

        for(i < 2)
          - 2 < 2
          - false

        result.push_back(tmp)
        result = [[3], [9, 20]]

Step 6: loop !q.empty()
        q = [15, 7]
        q.empty() = false
        !false = true

        vector<int> tmp
        size = q.size()
             = 2

        for(i = 0; i < 2; i++)
          - 0 < 2
          - true

          node = q.front()
          node = 15

          if node->left
            - node->left = nil
            - false

          if node->right
            - node->right = nil
            - false

          q.pop()
          q = [7]

          tmp.push_back(node->val)
          tmp.push_back(15)

          i++
          i = 1

        for(i < 2)
          - 1 < 2
          - true

          node = q.front()
          node = 7

          if node->left
            - node->left = nil
            - false

          if node->right
            - node->right = nil
            - false

          q.pop()
          q = []

          tmp.push_back(node->val)
          tmp.push_back(7)
          tmp = [15, 7]

          i++
          i = 2

        for(i < 2)
          - 2 < 2
          - false

        result.push_back(tmp)
        result = [[3], [9, 20], [15, 7]]

Step 7: loop !q.empty()
        q = []
        q.empty() = true
        !true = false

Step 8: reverse(result.begin(), result.end())

Step 9: return result

So we return the result as [[15, 7], [9, 20], [3]].
```
