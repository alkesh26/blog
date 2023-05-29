---
title: LeetCode - Minimum Path Sum
description: LeetCode - find a path from top left to bottom right, which minimizes the sum of all numbers along its path using C++, Golang, and Javascript.
date: 2022-08-28
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "find a path from top left to bottom right, which minimizes the sum of all numbers along its path, c++, golang, javascript."
---

## Problem statement

Given a *m x n grid* filled with non-negative numbers,
find a path from the top left to the bottom right, which minimizes the sum of all numbers along its path.

**Note:** You can only move either down or right at any point in time.

Problem statement taken from: <a href='https://leetcode.com/problems/minimum-path-sum' target='_blank'>https://leetcode.com/problems/minimum-path-sum</a>

**Example 1:**

![Container](./../minimum-path-sum.png)

```
Input: grid = [[1, 3, 1], [1, 5, 1], [4, 2, 1]]
Output: 7
Explanation: Because the path 1 → 3 → 1 → 1 → 1 minimizes the sum.
```

**Example 2:**

```
Input: grid = [[1, 2, 3], [4, 5, 6]]
Output: 12
```

**Constraints:**

```
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 200
- 0 <= grid[i][j] <= 100
```

### Explanation

#### Brute force approach

The brute force approach is to generate all possible paths from top left to bottom right.
We calculate the sum of all these paths and find the minimum.
The solution works for small-sized arrays but will timeout for big-sized arrays.

#### Optimal Substructure

The path to reach (m, n) must be through one of the two cells: (m - 1, n) or (m, n - 1).
The minimum cost to reach (m, n) can be calculated as
'minimum of the two cells plus grid(m, n)'.

```
minimumCost(m, n) = min(minimumCost(m - 1, n), minimumCost(m, n - 1)) + grid(m, n)
```

```cpp
int minCost(int grid[R][C], int m, int n)
{
    if (n < 0 || m < 0)
        return INT_MAX;
    else if (m == 0 && n == 0)
        return grid[m][n];
    else
        return grid[m][n] +
        min(
           minCost(grid, m - 1, n),
           minCost(grid, m, n - 1)
        );
}
```

#### Dynamic Programming

The above optimal substructure is solved using a recursive approach.
But, if we note closely, the above approach computes the same sub-problems again and again.

We can avoid recomputing the same sub-problems using dynamic programming approach.
We create a 2D array and solve the problem in a bottom-up manner.

Let's jump to the algorithm to understand it better.

```
- set m = grid.size()
      n = grid[0].size()
      dp(m, vector<int>(n))

- loop for i = 0; i < m; i++
    loop for j = 0; j <n; j++

      if i == 0 && j == 0
        - set dp[i][j] = grid[i][j]
      else if i == 0
        - set dp[i][j] = dp[i][j - 1] + grid[i][j]
      else if j == 0
        - set dp[i][j] = dp[i - 1][j] + grid[i][j]
      else
        - set dp[i][j] = min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j]
- for end

- return dp[m - 1][n - 1]
```

The time complexity of this approach is **O(N^2)**, and the space complexity is **O(M*N)**.

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n));

        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                if(i == 0 && j == 0) {
                    dp[i][j] = grid[i][j];
                } else if(i == 0) {
                    dp[i][j] = dp[i][j - 1] + grid[i][j];
                } else if(j == 0) {
                    dp[i][j] = dp[i - 1][j] + grid[i][j];
                } else {
                    dp[i][j] = min(dp[i- 1][j], dp[i][j - 1]) + grid[i][j];
                }
            }
        }

        return dp[m - 1][n - 1];
    }
};
```

#### Golang solution

```go
func minPathSum(grid [][]int) int {
    m := len(grid)
    n := len(grid[0])
    dp := make([][]int, m)

    for k := range dp {
        dp[k] = make([]int, n)
    }

    for i := 0; i < m; i++ {
        for j := 0; j < n; j++ {
            if i == 0 && j == 0 {
                dp[i][j] = grid[i][j]
            } else if i == 0 {
                dp[i][j] = dp[i][j - 1] + grid[i][j]
            } else if j == 0 {
                dp[i][j] = dp[i - 1][j] + grid[i][j]
            } else {
                dp[i][j] = min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j]
            }
        }
    }

    return dp[m - 1][n - 1]
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

#### Javascript solution

```javascript
var minPathSum = function(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let dp = new Array(m);

    for(let k = 0; k < dp.length; k++) {
        dp[k] = new Array(n);
    }

    for(let i = 0; i < m; i++) {
        for(let j = 0; j < n; j++) {
            if(i == 0 && j == 0) {
                dp[i][j] = grid[i][j];
            } else if(i == 0) {
                dp[i][j] = dp[i][j - 1] + grid[i][j];
            } else if(j == 0) {
                dp[i][j] = dp[i - 1][j] + grid[i][j];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
            }
        }
    }

    return dp[m - 1][n - 1];
};
```

#### Dry Run

Let's dry-run our algorithm for **Example 2**.

```
Input: grid = [[1, 2, 3], [4, 5, 6]]

Step 1: m = grid.size()
          = 2
        n = grid[0].size()
          = 3

        dp(2, 3)

Step 2: loop for i = 0; i < m
          0 < 2
          true

          loop for j = 0; j < n
            0 < 3
            true

            if i == 0 && j == 0
               true

               dp[i][j] = grid[i][j]
                        = grid[0][0]
                        = 1

               dp = [[1, 0, 0], [0, 0, 0]]

            j++

            j = 1
            j < n
            1 < 3
            true

            if i == 0 && j == 0
               true
            else if i == 0
               true

               dp[i][j] = dp[i][j - 1] + grid[i][j]
                        = dp[0][1 - 1] + grid[0][1]
                        = dp[0][0] + grid[0][1]
                        = 1 + 2
                        = 3

               dp = [[1, 3, 0], [0, 0, 0]]

            j++
            j < n
            2 < 3
            true

            if i == 0 && j == 0
               true
            else if i == 0
               true

               dp[i][j] = dp[i][j - 1] + grid[i][j]
                        = dp[0][2 - 1] + grid[0][1]
                        = dp[0][1] + grid[0][2]
                        = 3 + 3
                        = 6

               dp = [[1, 3, 6], [0, 0, 0]]

            j++
            j < n
            3 < 3
            false

        i++
        i = 1

Step 3: loop for i < m
          1 < 2
          true

          loop for j = 0; j < n
            0 < 3
            true

            if i == 0 && j == 0
              false
            else if i == 0
              false
            else if j == 0
              true

              dp[i][j] = dp[i - 1][j] + grid[i][j]
                       = dp[1 - 1][0] + grid[1][0]
                       = dp[0][0] + grid[1][0]
                       = 1 + 4
                       = 5

              dp = [[1, 3, 6], [5, 0, 0]]

            j++
            j < n
            1 < 3
            true

            if i == 0 && j == 0
              false
            else if i == 0
              false
            else if j == 0
              false
            else

              dp[i][j] = min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j]
                       = min(dp[1][1 - 1], dp[1 - 1][1]) + grid[1][1]
                       = min(dp[1][0], dp[0][1]) + 5
                       = min(5, 3) + 5
                       = 3 + 5
                       = 8

              dp = [[1, 3, 6], [5, 8, 0]]

            j++
            j < n
            2 < 3
            true

            if i == 0 && j == 0
              false
            else if i == 0
              false
            else if j == 0
              false
            else

              dp[i][j] = min(dp[i][j - 1], dp[i - 1][j]) + grid[i][j]
                       = min(dp[1][2 - 1], dp[1 - 1][2]) + grid[1][2]
                       = min(dp[1][1], dp[0][2]) + 6
                       = min(8, 6) + 6
                       = 6 + 6
                       = 12

              dp = [[1, 3, 6], [5, 8, 12]]


            j++
            j < n
            3 < 3
            false

        i++
        i = 2

Step 4: loop for i < m
          2 < 2
          false

Step 5: return dp[m - 1][n - 1]
               dp[2 - 1][3 - 1]
               dp[1][2]
               12

We return the answer as 12.
```
