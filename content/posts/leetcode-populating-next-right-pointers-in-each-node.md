---
title: LeetCode - Populating Next Right Pointers in Each Node
description: LeetCode - populate next sibling in a perfect binary tree using C++, Golang and Javascript.
date: 2021-12-05
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - populate next sibling in a perfect binary tree, c++, golang, javascript"
---

## Problem statement

We are given a **perfect binary tree** where all leaves are on the same level,
and every parent has two children. The binary tree has the following definition:

```
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```

Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.

Problem statement taken from: <a href='https://leetcode.com/problems/populating-next-right-pointers-in-each-node' target='_blank'>https://leetcode.com/problems/populating-next-right-pointers-in-each-node</a>

**Example 1:**

![Container](./../populate-tree-siblings.png)

```
Input: root = [1, 2, 3, 4, 5, 6, 7]
Output: [1, #, 2, 3, #, 4, 5, 6, 7, #]
Explanation: Given the above perfect binary tree (Figure A), our function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
```

**Example 2:**

```
Input: root = []
Output: []
```

**Constraints:**

```
- The number of nodes in the tree is in the range [0, 212 - 1].
- -1000 <= Node.val <= 1000
```

**Follow-up:**

```
- We may only use constant extra space.
- The recursive approach is fine. We may assume implicit stack space does not count as extra space for this problem.
```

### Explanation

If we see the problem statement, the tree is a **perfect binary tree**.
We see in the example, the next right pointer for each node is at one level.
We can do a level order traversal
(as per this blog [post](https://alkeshghorpade.me/post/leetcode-binary-tree-level-order-traversal))
and update the next right pointer for each node.

Let's check the algorithm.

```
- if root == NULL
  - return root

- initialize queue<Node*> q

- q.push(root)

- initialize Node* node
  initialize i, size

- loop while !q.empty()
  - set size = q.size()

  - loop for i = 0; i < size; i++
    - set node = q.front()

    - if node->left
      - q.push(node->left)

    - if node->right
      - q.push(node->right)

    - q.pop()

    - if i < size - 1
      - node->next = q.front()

- return root
```

#### C++ solution

```cpp
class Solution {
public:
    Node* connect(Node* root) {
        if(root == NULL)
            return root;

        queue<Node*> q;
        q.push(root);

        Node* node;
        int i, size;

        while(!q.empty()){
            size = q.size();

            for(i = 0; i < size; i++){
                node = q.front();
                if(node->left)
                    q.push(node->left);

                if(node->right)
                    q.push(node->right);

                q.pop();
                if(i < size - 1){
                    node->next = q.front();
                }
            }
        }

        return root;
    }
};
```

#### Golang solution

```go
func connect(root *Node) *Node {
    if root == nil {
        return root
    }

    queue := []*Node{root}

    for len(queue) != 0 {
        tmp := []int{}
        size := len(queue)

        for i := 0; i < size; i++ {
            node := queue[0]

            if queue[0] != nil {
                tmp = append(tmp, queue[0].Val)
                queue = append(queue, queue[0].Left)
                queue = append(queue, queue[0].Right)
            }

            queue = queue[1:]

            if i < size - 1 && queue[0] != nil {
                node.Next = queue[0]
            }
        }
    }

    return root
}
```

#### Javascript solution

```javascript
var connect = function(root) {
    let queue = [];

    if(root)
        queue.push(root);

    while(queue.length > 0) {
        tmp = [];
        let len = queue.length;

        for (let i = 0; i < len; i++) {
            let node = queue.shift();
            tmp.push(node.val);

            if(node.left) {
                queue.push(node.left);
            }

            if(node.right) {
                queue.push(node.right);
            }


            if( i < len - 1 ) {
               node.next = queue[0];
            }
        }
    }

    return root;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: root = [1, 2, 3, 4, 5, 6, 7]

Step 1: vector<vector<int>> result
        int size, i

Step 2: queue<Node*> q
        q.push(root)
        q = [1]

Step 3: Node* node
        int i, size

Step 4: loop while !q.empty()
        q = [1]
        q.empty() = false
        !false = true

        vector<int> tmp
        size = q.size()
             = 1

        for(i = 0; i < 1; i++)
          - 0 < 1
          - true

          node = q.front()
          node = 1

          if node->left
            - node->left = 2
            - q.push(node->left)
            - q = [1, 2]

          if node->right
            - node->right = 3
            - q.push(node->right)
            - q = [1, 2, 3]


          q.pop()
          q = [2, 3]

          if i < size - 1
            - 0 < 1 - 1
            - 0 < 0
            - false

Step 5: loop while !q.empty()
        q = [2, 3]
        q.empty() = false
        !false = true

        vector<int> tmp
        size = q.size()
             = 2

        for(i = 0; i < 2; i++)
          - 0 < 2
          - true

          node = q.front()
          node = 2

          if node->left
            - node->left = 4
            - q.push(node->left)
            - q = [2, 3, 4]

          if node->right
            - node->right = 5
            - q.push(node->right)
            - q = [2, 3, 4, 5]


          q.pop()
          q = [3, 4, 5]

          if i < size - 1
            - 0 < 2 - 1
            - 0 < 1
            - true

            - node.next = q.front()
              node = 2
              q.front = 3

          i++
          i = 1

        for(i < 2)
          - 1 < 2
          - true

          node = q.front()
          node = 3

          if node->left
            - node->left = 6
            - q.push(node->left)
            - q = [3, 4, 5, 6]

          if node->right
            - node->right = 7
            - q.push(node->right)
            - q = [3, 4, 5, 6, 7]


          q.pop()
          q = [4, 5, 6, 7]

          if i < size - 1
            - 1 < 2 - 1
            - 1 < 1
            - false

        for(i < 2)
          - 2 < 2
          - false

Step 6: loop while !q.empty()
        q = [4, 5, 6, 7]
        q.empty() = false
        !false = true

        vector<int> tmp
        size = q.size()
             = 4

        for(i = 0; i < 4; i++)
          - 0 < 4
          - true

          node = q.front()
          node = 4

          if node->left
             node->left is nil so false

          if node->right
             node->right is nil so false

          q.pop()
          q = [5, 6, 7]

          if i < size - 1
            - 0 < 4 - 1
            - 0 < 3
            - true
            - node->next = q.front()
              node = 4
              q.front() = 5

        i++
        i = 1

        for(i < 4)
          - 1 < 4
          - true

          node = q.front()
          node = 5

          if node->left
             node->left is nil so false

          if node->right
             node->right is nil so false

          q.pop()
          q = [6, 7]

          if i < size - 1
            - 1 < 4 - 1
            - 1 < 3
            - true
            - node->next = q.front()
              node = 5
              q.front() = 6

        i++
        i = 2

        for(i < 4)
          - 2 < 4
          - true

          node = q.front()
          node = 6

          if node->left
             node->left is nil so false

          if node->right
             node->right is nil so false

          q.pop()
          q = [7]

          if i < size - 1
            - 2 < 4 - 1
            - 2 < 3
            - true
            - node->next = q.front()
              node = 6
              q.front() = 7

        i++
        i = 3

        for(i < 4)
          - 3 < 4
          - true

          node = q.front()
          node = 7

          if node->left
             node->left is nil so false

          if node->right
             node->right is nil so false

          q.pop()
          q = []

          if i < size - 1
            - 3 < 4 - 1
            - 3 < 3
            - false

        i++
        i = 4

        for(i < 4)
          - 4 < 4
          - false

Step 7: return root

So we return the answer as

[1, #, 2, 3, #, 4, 5, 6, 7, #]
```
