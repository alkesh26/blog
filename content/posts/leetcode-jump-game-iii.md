---
title: LeetCode - Jump Game III
description: LeetCode - return if it's possible to reach any index with value 0 using C++, Golang, and Javascript.
date: 2022-09-18
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "return if it's possible to reach any index with value 0, c++, golang, javascript"
---

## Problem statement

Given an array of non-negative integers *arr*, you are initially positioned at *start* index of the array. When you are at index *i*, you can jump to *i + arr[i]* or *i - arr[i]*, check if you can reach to **any** index with value 0.

Notice that you can not jump outside of the array at any time.

Problem statement taken from: <a href='https://leetcode.com/problems/jump-game-iii/' target='_blank'>https://leetcode.com/problems/jump-game-iii/</a>

**Example 1:**

```
Input: arr = [4, 2, 3, 0, 3, 1, 2], start = 5
Output: true
Explanation:
All possible ways to reach at index 3 with value 0 are:
index 5 -> index 4 -> index 1 -> index 3
index 5 -> index 6 -> index 4 -> index 1 -> index 3
```

**Example 2:**

```
Input: arr = [4, 2, 3, 0, 3, 1, 2], start = 0
Output: true
Explanation:
One possible way to reach at index 3 with value 0 is:
index 0 -> index 4 -> index 1 -> index 3
```

**Example 3:**

```
Input: arr = [3, 0, 2, 1, 2], start = 2
Output: false
Explanation: There is no way to reach at index 1 with value 0.
```

**Constraints:**

```
- 1 <= arr.length <= 5 * 10^4
- 0 <= arr[i] < arr.length
- 0 <= start < arr.length
```

### Explanation

The problem is an extended version of [Jump Game](https://alkeshghorpade.me/post/leetcode-jump-game) and [Jump Game II](https://alkeshghorpade.me/post/leetcode-jump-game-ii). We can solve this using BFS or DFS approach.

In this post, we will explore the BFS way.

#### BFS way

We will push the starting position into a queue and start exploring its neighbors.
We need to maintain a boolean array to mark the nodes we visited.

Let's check the algorithm first:

```
// canReach(arr, start)

- set n = arr.size()
      queue q = [start]
      int visited[n]
      int node

- loop while !q.empty()
    node = q.start()
    q.pop()

    if arr[node] == 0
      return true

    if visited[node]
      continue

    if node - arr[node] >= 0
      q.push(node - arr[node])

    if node + arr[node] < 4
      q.push(node + arr[node])

    visited[node] = true
- while end

- return false
```

The time complexity of the above approach is **O(N)**, and the space complexity is
**O(n)**.

Let's check our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    bool canReach(vector<int>& arr, int start) {
        int n = arr.size();
        queue<int> q{{start}};
        int node;
        vector<bool> visited(n);

        while(!q.empty()) {
            node = q.front();
            q.pop();

            if(arr[node] == 0) {
                return true;
            }

            if(visited[node]) {
                continue;
            }

            if(node - arr[node] >= 0) {
                q.push(node - arr[node]);
            }

            if(node + arr[node] < n) {
                q.push(node + arr[node]);
            }

            visited[node] = true;
        }

        return false;
    }
};
```

#### Golang solution

```go
func canReach(arr []int, start int) bool {
    n := len(arr)
    queue := []int{start}
    visited := make([]bool, n)

    for len(queue) != 0 {
        node := queue[0]
        queue = queue[1:]

        if arr[node] == 0 {
            return true
        }

        if visited[node] {
            continue
        }

        if node - arr[node] >= 0 {
            queue = append(queue, node - arr[node])
        }

        if node + arr[node] < n {
            queue = append(queue, node + arr[node])
        }

        visited[node] = true
    }

    return false
}
```

#### Javascript solution

```javascript
var canReach = function(arr, start) {
    let n = arr.length;
    let queue = [start];
    let visited = [];
    let node;

    while(queue.length > 0) {
        node = queue[0];
        queue.shift();

        if(arr[node] == 0) {
            return true;
        }

        if(visited[node]) {
            continue;
        }

        if(node - arr[node] >= 0) {
            queue.push(node - arr[node]);
        }

        if(node + arr[node] < n) {
            queue.push(node + arr[node]);
        }

        visited[node] = true;
    }

    return false;
};
```

Let's dry run our algorithm for a given input.

```
Input: arr = [4, 2, 3, 0, 3, 1, 2]
       start = 5

Step 1: n = arr.size()
          = 7

        queue<int> q{{start}}
        q = [5]

        int node
        vector<bool> visited(n)

Step 2: loop while !q.empty()
        q = [5]
        true

        node = q.front()
             = 5

        q.pop()
        q = []

        if arr[node] == 0
           arr[5] == 0
           1 == 0
           false

        if visited[node]
           visited[5]
           false

        if node - arr[node] >= 0
           5 - arr[5] >= 0
           5 - 1 >= 0
           4 >= 0
           true

           q.push(node - arr[node])
           q.push(4)

           q = [4]

        if node + arr[node] < n
           5 + arr[5] < 7
           5 + 1 < 7
           6 < 7
           true

           q.push(node + arr[node])
           q.push(6)

           q = [4, 6]

        visited[node] = true
        visited[5] = true

Step 3: loop while !q.empty()
        q = [4, 6]
        true

        node = q.front()
             = 4

        q.pop()
        q = [6]

        if arr[node] == 0
           arr[4] == 0
           3 == 0
           false

        if visited[node]
           visited[4]
           false

        if node - arr[node] >= 0
           4 - arr[4] >= 0
           4 - 3 >= 0
           1 >= 0
           true

           q.push(node - arr[node])
           q.push(1)

           q = [6, 1]

        if node + arr[node] < n
           4 + arr[4] < 7
           4 + 3 < 7
           7 < 7
           false

        visited[node] = true
        visited[4] = true

Step 4: loop while !q.empty()
        q = [6, 1]
        true

        node = q.front()
             = 6

        q.pop()
        q = [1]

        if arr[node] == 0
           arr[6] == 0
           2 == 0
           false

        if visited[node]
           visited[6]
           false

        if node - arr[node] >= 0
           6 - arr[6] >= 0
           6 - 2 >= 0
           4 >= 0
           true

           q.push(node - arr[node])
           q.push(4)

           q = [1, 4]

        if node + arr[node] < n
           6 + arr[6] < 7
           6 + 2 < 7
           8 < 7
           false

        visited[node] = true
        visited[6] = true

Step 5: loop while !q.empty()
        q = [1, 4]
        true

        node = q.front()
             = 1

        q.pop()
        q = [4]

        if arr[node] == 0
           arr[1] == 0
           2 == 0
           false

        if visited[node]
           visited[1]
           false

        if node - arr[node] >= 0
           1 - arr[1] >= 0
           1 - 2 >= 0
           -1 >= 0
           false

        if node + arr[node] < n
           1 + arr[1] < 7
           1 + 2 < 7
           3 < 7
           true

           q.push(node + arr[node])
           q.push(3)

           q = [4, 3]

        visited[node] = true
        visited[1] = true

Step 6: loop while !q.empty()
        q = [4, 3]
        true

        node = q.front()
             = 4

        q.pop()
        q = [3]

        if arr[node] == 0
           arr[4] == 0
           0 == 0
           true

           return true

We return the answer as true.
```
