---
title: LeetCode - Unique Path II
description: LeetCode - return the number of possible unique paths a robot can take to reach the bottom-right corner when paths have obstacles.
date: 2022-09-01
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "return the number of possible unique paths a robot can take to reach the bottom-right corner when paths have obstacles, c++, golang, javascript."
---

## Problem statement

You are given an *m x n* integer array grid. There is a robot initially located at the **top-left corner**
(i.e., *grid[0][0]*). The robot tries to move to the **bottom-right corner** (i.e., *grid[m - 1][n - 1]*).
The robot can only move either down or right at any point in time.

An obstacle and space are marked as *1* or *0* respectively in *grid*. A path that the robot takes cannot include
**any** square that is an obstacle.

Return *the number of possible unique paths that the robot can take to reach the bottom-right corner*.

The test cases are generated so that the answer will be less than or equal to *2 * 10^9*.

Problem statement taken from: <a href='https://leetcode.com/problems/unique-paths-ii' target='_blank'>https://leetcode.com/problems/unique-paths-ii</a>

**Example 1:**

![Container](./../unique-paths-ii-i.png)

```
Input: obstacleGrid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3 x 3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
```

**Example 2:**

![Container](./../unique-paths-ii-ii.png)

```
Input: obstacleGrid = [[0, 1], [0, 0]]
Output: 1
```

**Constraints:**

```
- m == obstacleGrid.length
- n == obstacleGrid[i].length
- 1 <= m, n <= 100
- obstacleGrid[i][j] is 0 or 1
```

### Explanation

The problem is similar to our previous blog post
[Unique Paths](https://alkeshghorpade.me/post/leetcode-unique-paths).
It can be solved using Brute force
or a Dynamic Programming approach.

But the only case we need to handle is obstacles in
the path.
If an obstacle is present in a cell *[i, j]*,
there is no way we can reach the following cells:

* **[i, j + 1]** // right cell
* **[i + 1, j]** // bottom cell

We can just mark the *[i, j]* cell path count as 0.
Which indicates there is no possible way to reach this cell.

#### Dynamic Programming

Based on the above approach,
let's jump to the algorithm directly.

```
- set m = obstacleGrid.size()
      n = obstacleGrid[0].size()

// if the top-left cell has an obstacle, the robot cannot be placed and
// start moving across the grid. We return 0 in such a case.
- if obstacleGrid[0][0] == 1
  - return 0

// set the number of ways to reach the top-left cell as 1
- obstacleGrid[0][0] = 1

// following loop sets the number of ways to reach any cell in the left-most column.
// if we have an obstacle, mark the number of ways to reach that cell
// and all its bottom-adjacent cells as 0.
- loop for i = 1; i < m; i++
  - if obstacleGrid[i][0] == 0
    - obstacleGrid[i][0] += obstacleGrid[i - 1][0]
  - else
    - obstacleGrid[i][0] = 0
- for end

// following loop sets the number of ways to reach any cell in the top-most row.
// if we have an obstacle, mark the number of ways to reach that cell
// and all its right-adjacent cells as 0.
- loop for j = 1; j < n; j++
  - if obstacleGrid[0][j] == 0
    - obstacleGrid[0][j] += obstacleGrid[0][j - 1]
  - else
    - obstacleGrid[0][j] = 0
- for end

// add the number of ways to reach any cell in the rest of the matrix
- loop for i = 1; i < m; i++
  - loop for j = 1; j < n; j++
    - if obstacleGrid[i][j] == 0
      - obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1]
    - else
      - obstacleGrid[i][j] = 0
    - if end
  - inner for end
- for end

- return obstacleGrid[m - 1][n - 1]
```

The time complexity of this approach is **O(M * N)**, and the space complexity is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();

        if(obstacleGrid[0][0] == 1) {
            return 0;
        }

        obstacleGrid[0][0] = 1;

        for(int i = 1; i < m; i++) {
            if(obstacleGrid[i][0] == 0) {
                obstacleGrid[i][0] += obstacleGrid[i - 1][0];
            } else {
                obstacleGrid[i][0] = 0;
            }
        }

        for(int j = 1; j < n; j++) {
            if(obstacleGrid[0][j] == 0) {
                obstacleGrid[0][j] += obstacleGrid[0][j - 1];
            } else {
                obstacleGrid[0][j] = 0;
            }
        }

        for(int i = 1; i < m; i++) {
            for(int j = 1; j < n; j++) {
                if(obstacleGrid[i][j] == 0) {
                    obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1];
                } else {
                    obstacleGrid[i][j] = 0;
                }
            }
        }

        return obstacleGrid[m - 1][n - 1];
    }
};
```

#### Golang solution

```go
func uniquePathsWithObstacles(obstacleGrid [][]int) int {
    m, n := len(obstacleGrid), len(obstacleGrid[0])

    if obstacleGrid[0][0] == 1 {
        return 0
    }

    obstacleGrid[0][0] = 1

    for i := 1; i < m; i++ {
        if obstacleGrid[i][0] == 0 {
            obstacleGrid[i][0] += obstacleGrid[i - 1][0]
        } else {
            obstacleGrid[i][0] = 0
        }
    }

    for j := 1; j < n; j++ {
        if obstacleGrid[0][j] == 0 {
            obstacleGrid[0][j] += obstacleGrid[0][j - 1]
        } else {
            obstacleGrid[0][j] = 0
        }
    }

    for i := 1; i < m; i++ {
        for j := 1; j < n; j++ {
            if obstacleGrid[i][j] == 0 {
                obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1]
            } else {
                obstacleGrid[i][j] = 0
            }
        }
    }

    return obstacleGrid[m - 1][n - 1]
}
```

#### Javascript solution

```javascript
var uniquePathsWithObstacles = function(obstacleGrid) {
    let m = obstacleGrid.length;
    let n = obstacleGrid[0].length;

    if(obstacleGrid[0][0] == 1) {
        return 0;
    }

    obstacleGrid[0][0] = 1;

    for(let i = 1; i < m; i++) {
        if(obstacleGrid[i][0] == 0) {
            obstacleGrid[i][0] += obstacleGrid[i - 1][0];
        } else {
            obstacleGrid[i][0] = 0;
        }
    }

    for(let j = 1; j < n; j++) {
        if(obstacleGrid[0][j] == 0) {
            obstacleGrid[0][j] += obstacleGrid[0][j - 1];
        } else {
            obstacleGrid[0][j] = 0;
        }
    }

    for(let i = 1; i < m; i++) {
        for(let j = 1; j < n; j++) {
            if(obstacleGrid[i][j] == 0) {
                obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1];
            } else {
                obstacleGrid[i][j] = 0;
            }
        }
    }

    return obstacleGrid[m - 1][n - 1];
};
```

#### Dry Run

Let's dry-run our algorithm for **Example 1**.

```
Input: obstacleGrid = [
         [0, 0, 0],
         [0, 1, 0],
         [0, 0, 0]
       ]

Step 1: m = obstacleGrid.size()
          = 3
        n = obstacleGrid[0].size()
          = 3

Step 2: if obstacleGrid[0][0] == 1
           0 == 1
           false

Step 3: obstacleGrid[0][0] = 1
        obstacleGrid = [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 0]
        ]

Step 4: loop for i = 1; i < m;
          1 < 3
          true

          if obstacleGrid[i][0] == 0
             obstacleGrid[1][0] == 0
             true

             obstacleGrid[i][0] += obstacleGrid[i - 1][0]
                                 = obstacleGrid[i][0] +  obstacleGrid[i - 1][0]
                                 = obstacleGrid[1][0] + obstacleGrid[0][0]
                                 = 0 + 1
                                 = 1

          i++
          i = 2

          for i < m
          2 < 3
          true

          if obstacleGrid[i][0] == 0
             obstacleGrid[2][0] == 0
             true

             obstacleGrid[i][0] += obstacleGrid[i - 1][0]
                                 = obstacleGrid[i][0] +  obstacleGrid[i - 1][0]
                                 = obstacleGrid[2][0] + obstacleGrid[1][0]
                                 = 0 + 1
                                 = 1

          i++
          i = 3

          for i < m
          3 < 3
          false

        obstacleGrid = [
          [1, 0, 0],
          [1, 1, 0],
          [1, 0, 0]
        ]

Step 5: loop for j = 1; j < n;
          1 < 3
          true

          if obstacleGrid[0][j] == 0
             obstacleGrid[0][1] == 0
             true

             obstacleGrid[0][j] += obstacleGrid[0][j - 1]
                                 = obstacleGrid[0][j] + obstacleGrid[0][j - 1]
                                 = obstacleGrid[0][1] + obstacleGrid[0][0]
                                 = 0 + 1
                                 = 1

          j++
          j = 2

          for j < n
          2 < 3
          true

          if obstacleGrid[0][j] == 0
             obstacleGrid[0][2] == 0
             true

             obstacleGrid[0][j] += obstacleGrid[0][j - 1]
                                 = obstacleGrid[0][j] + obstacleGrid[0][j - 1]
                                 = obstacleGrid[0][2] + obstacleGrid[0][1]
                                 = 0 + 1
                                 = 1

          j++
          j = 3

          for j < n
          3 < 3
          false

        obstacleGrid = [
          [1, 1, 1],
          [1, 1, 0],
          [1, 0, 0]
        ]

Step 6: loop for i = 1; i < m; i++
          loop for j = 1; j < n; j++

            if obstacleGrid[i][j] == 0
               obstacleGrid[1][1] == 0
               1 == 0
               false

            else
               obstacleGrid[i][j] = 0
               obstacleGrid[1][1] = 0

            obstacleGrid = [
              [1, 1, 1],
              [1, 0, 0],
              [1, 0, 0]
            ]

            j++
            j = 2

            for j < n
            2 < 3
            true

            if obstacleGrid[i][j] == 0
               obstacleGrid[1][2] == 0
               true

               obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1]
                                  = obstacleGrid[1 - 1][2] + obstacleGrid[1][2 - 1]
                                  = obstacleGrid[0][2] + obstacleGrid[1][1]
                                  = 1 + 0
                                  = 1

            obstacleGrid = [
              [1, 1, 1],
              [1, 0, 1],
              [1, 0, 0]
            ]

            j++
            j = 3

            for j < n
            3 < 3
            false

        i++
        i = 2

Step 7: loop for i < m
          2 < 3
          true

          loop for j = 1; j < n; j++

            if obstacleGrid[i][j] == 0
               obstacleGrid[2][1] == 0
               true

               obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1]
                                  = obstacleGrid[2 - 1][1] + obstacleGrid[2][1 - 1]
                                  = obstacleGrid[1][1] + obstacleGrid[2][0]
                                  = 0 + 1
                                  = 1

            obstacleGrid = [
              [1, 1, 1],
              [1, 0, 1],
              [1, 1, 0]
            ]

            j++
            j = 2

            for j < n
            2 < 3
            true

            if obstacleGrid[i][j] == 0
               obstacleGrid[2][2] == 0
               true

               obstacleGrid[i][j] = obstacleGrid[i - 1][j] + obstacleGrid[i][j - 1]
                                  = obstacleGrid[2 - 1][2] + obstacleGrid[2][2 - 1]
                                  = obstacleGrid[1][2] + obstacleGrid[2][1]
                                  = 1 + 1
                                  = 2

            obstacleGrid = [
              [1, 1, 1],
              [1, 0, 1],
              [1, 1, 2]
            ]

            j++
            j = 3

            for j < n
            3 < 3
            false

        i++
        i = 3

Step 8: loop for i < m
          3 < 3
          false

Step 9: return obstacleGrid[m - 1][n - 1]
               obstacleGrid[3 - 1][3 - 1]
               obstacleGrid[2][2]
               2

We return the answer as 2.
```

