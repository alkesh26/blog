---
title: LeetCode - Binary Tree Zigzag Level Order Traversal
description: LeetCode - Return the zigzag level order traversal of binary tree nodes values using C++, Golang and Javascript.
date: 2021-12-02
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the zigzag level order traversal of binary tree nodes, c++, golang, javascript"
---

### Problem statement

Given the `root` of a binary tree,
return *the zigzag level order traversal of its nodes' values.*
(i.e., from left to right, then right to left for the next level and alternate between).

Problem statement taken from: <a href='https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/' target='_blank'>https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/</a>

**Example 1:**

![Container](./../binary-tree-zigzag.png)

```
Input: root = [3, 9, 20, null, null, 15, 7]
Output: [[3], [20, 9], [15, 7]]
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
- -100 <= Node.val <= 100
```

### Explanation

To traverse binary tree level by level we can refer our previous blog post
[here](https://alkeshghorpade.me/post/leetcode-binary-tree-level-order-traversal).

As per the problem statement,
we need to traverse in zigzag fashion.
We can achieve this by reversing the `tmp` array we create
when a level is traversed completely.

Let's check the algorithm:

```
- initialize 2D array as vector vector<vector<int>> result
- initialize size and i
- set left to true

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

  - left is false: if(!left)
    - reverse(tmp.begin(), tmp.end())

  - push the tmp to result: result.push_back(tmp)
  - toggle left: left = !left

- return result
```

#### C++ solution

```cpp
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> result;
        int size, i;
        bool left = true;

        if(root == NULL)
            return result;

        queue<TreeNode* > q;
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

            if(!left){
                reverse(tmp.begin(), tmp.end());
            }

            result.push_back(tmp);
            left = !left;
        }

        return result;
    }
};
```

#### Golang solution

```go
func reverse(array []int) []int {
    for i, j := 0, len(array) - 1; i < j; i, j = i+1, j-1 {
        array[i], array[j] = array[j], array[i]
    }

    return array
}

func zigzagLevelOrder(root *TreeNode) [][]int {
    result := [][]int{}
    left := true

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

        if !left {
            tmp = reverse(tmp)
        }

        result = append(result, tmp)
        left = !left
    }

    return result[:len(result)-1]
}
```

#### Javascript solution

```javascript
var zigzagLevelOrder = function(root) {
    let result = [];
    let queue = [];
    let left = true;

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

        if( !left ) {
            tmp = tmp.reverse();
        }

        result.push(tmp);
        left = !left;
    }

    return result;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: root = [3, 9, 20, null, null, 15, 7]

Step 1: vector<vector<int>> result
        int size, i
        left = true

Step 2: root == null
        [3, 9..] == null
        false

Step 3: queue<TreeNode*> q
        q.push(root)

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

        if !left
           !left = false

        result.push_back(tmp)
        result = [[3]]
        left = !left
             = false

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

        if !left
           !left = true

        reverse(tmp.begin(), tmp.end())
        tmp = [20, 9]

        result.push_back(tmp)
        result = [[3], [20, 9]]
        left = !left
             = true

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

        if !left
           !left = false

        result.push_back(tmp)
        result = [[3], [20, 9], [15, 7]]

Step 7: loop !q.empty()
        q = []
        q.empty() = true
        !true = false

Step 8: return result

So we return the result as [[3], [20, 9], [15, 7]].
```
