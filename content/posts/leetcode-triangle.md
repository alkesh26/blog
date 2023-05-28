---
title: LeetCode - Triangle
description: LeetCode - return the minimum path sum from top to bottom using C++, Golang and Javascript.
date: 2022-02-03
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the minimum path sum from top to bottom, c++, golang, javascript"
---

## Problem statement

Given a triangle array, return *the minimum path sum from top to bottom*.

For each step, you may move to an adjacent number of the row below. More formally, if you are on index i on the current row, you may move to either index i or index i + 1 on the next row.

Problem statement taken from: <a href='https://leetcode.com/problems/triangle' target='_blank'>https://leetcode.com/problems/triangle</a>.

**Example 1:**

```
Input: triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]
Output: 11
Explanation: The triangle looks like:
   2
  3 4
 6 5 7
4 1 8 3
The minimum path sum from top to bottom is 2 + 3 + 5 + 1 = 11 (underlined above).
```

**Example 2:**

```
Input: triangle = [[-10]]
Output: -10
```

**Constraints:**

```
- 1 <= triangle.length <= 200
- triangle[0].length == 1
- triangle[i].length == triangle[i - 1].length + 1
- -10^4 <= triangle[i][j] <= 10^4
```

### Explanation

#### Dynamic Programming

At first look, we might first think of DFS traversal. But if we observe it closely, we can solve the problem using Dynamic programming. We can only pick up index **i** or **i + 1** in the next vector set. This makes it easy to store solution of sub-problems and use these overlapping sub-problems to get the minimum sum path.

We can follow either a top-down approach or bottom-up approach to reach our required solution. Bottom-up approach is pretty straight forward. We store the nodes of the bottom most row in an array. We shift to the top most node row by row and the smaller number of the two numbers that below it.

Let's check the algorithm first.

```
- set n = triangle.size()

- set pathSums array size to bottom-most row size
  vector<int> pathSums(triangle.back())

- loop for layer = n - 2; layer >=0; layer--
  - loop for i = 0; i <= layer; i++
    - set pathSums[i] = min(pathSums[i], pathSums[i + 1]) + triangle[layer][i]

- return pathSums[0]
```

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> pathSums(triangle.back());

        for (int layer = n - 2; layer >= 0; layer--) {
            for (int i = 0; i <= layer; i++) {
                pathSums[i] = min(pathSums[i], pathSums[i + 1]) + triangle[layer][i];
            }
        }

        return pathSums[0];
    }
};
```

#### Golang solution

```go
func min(a, b int) int {
    if a < b {
        return a
    }

    return b
}

func minimumTotal(triangle [][]int) int {
    n := len(triangle)
    pathSums := triangle[n - 1]

    for layer := n - 2; layer >= 0; layer-- {
        for i := 0; i <= layer; i++ {
            pathSums[i] = min(pathSums[i], pathSums[i+1]) + triangle[layer][i]
        }
    }

    return pathSums[0]
}
```

#### Javascript solution

```javascript
var minimumTotal = function(triangle) {
    let n = triangle.length;
    let pathSums = triangle[n - 1];

    for (let layer = n - 2; layer >= 0; layer--) {
        for (let i = 0; i <= layer; i++) {
            pathSums[i] = Math.min(pathSums[i], pathSums[i + 1]) + triangle[layer][i];
        }
    }

    return pathSums[0];
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]

Step 1: n = triangle.size()
          = 4

        vector<int> pathSums(triangle.back())
        pathSums = [4, 1, 8, 3]

Step 2: loop for layer = n - 2; layer >= 0
          layer = 4 - 2
                = 2

          layer >= 0
          2 >= 0
          true

          loop i = 0; i <= layer
            0 <= 2
            true

            pathSums[i] = min(pathSums[i], pathSums[i + 1]) + triangle[layer][i]
            pathSums[0] = min(pathSums[0], pathSums[1]) + triangle[2][0]
                        = min(4, 1) + 6
                        = 1 + 6
                        = 7

            i++
            1 <= 2
            true

            pathSums[i] = min(pathSums[i], pathSums[i + 1]) + triangle[layer][i]
            pathSums[1] = min(pathSums[1], pathSums[2]) + triangle[2][1]
                        = min(1, 8) + 5
                        = 1 + 5
                        = 6

            i++
            i = 2
            2 <= 2
            true

            pathSums[i] = min(pathSums[i], pathSums[i + 1]) + triangle[layer][i]
            pathSums[2] = min(pathSums[2], pathSums[3]) + triangle[2][2]
                        = min(8, 3) + 7
                        = 3 + 7
                        = 10

            i++
            i = 3
            3 <= 2
            false

          layer--
          layer = 1

          pathSums = [7, 6, 10, 3]

Step 3: loop for layer >= 0
          1 >= 0
          true

          loop i = 0; i <= layer
            0 <= 1
            true

            pathSums[i] = min(pathSums[i], pathSums[i + 1]) + triangle[layer][i]
            pathSums[0] = min(pathSums[0], pathSums[1]) + triangle[1][0]
                        = min(7, 6) + 3
                        = 6 + 3
                        = 9

            i++
            i = 1
            i <= layer
            1 <= 1
            true

            pathSums[i] = min(pathSums[i], pathSums[i + 1]) + triangle[layer][i]
            pathSums[1] = min(pathSums[1], pathSums[2]) + triangle[1][1]
                        = min(6, 10) + 4
                        = 6 + 4
                        = 10

            i++
            i = 2
            i <= layer
            2 <= 1
            false

          layer--
          layer = 0

          pathSums = [9, 10, 10, 3]

Step 4: loop for layer >= 0
          0 >= 0
          true

          loop i = 0; i <= layer
            0 <= 0
            true

            pathSums[i] = min(pathSums[i], pathSums[i + 1]) + triangle[layer][i]
            pathSums[0] = min(pathSums[0], pathSums[1]) + triangle[0][0]
                        = min(9, 10) + 2
                        = 9 + 2
                        = 11

            i++
            i = 1
            i <= layer
            1 <= 0
            false

        layer--
        layer = -1

Step 5: loop for layer >= 0
          -1 >= 0
          false

Step 6: return pathSums[0]

So we return the answer as 11.
```
