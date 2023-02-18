---
title: LeetCode - Difference Between Ones and Zeros in Row and Column
description: LeetCode - calculate the differene of ones and zeros for every cell in the matrix using C++, Golang, and JavaScript.
date: 2023-02-18
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - calculate the differene of ones and zeros for every cell in the matrix, c++, golang, javascript"
---

### Problem statement

You are given a **0-indexed** `m x n` binary matrix `grid`.

A **0-indexed** `m x n` difference matrix `diff` is created with the following procedure:

* Let the number of ones in the `ith` row be `onesRowi`.

* Let the number of ones in the `jth` column be `onesColj`.

* Let the number of zeros in the `ith` row be `zerosRowi`.

* Let the number of zeros in the `jth` column be `zerosColj`.

* `diff[i][j] = onesRowi + onesColj - zerosRowi - zerosColj`

Return *the difference matrix diff.*

Problem statement taken from: <a href='https://leetcode.com/problems/difference-between-ones-and-zeros-in-row-and-column' target='_blank'>https://leetcode.com/problems/difference-between-ones-and-zeros-in-row-and-column</a>

**Example 1:**

![Container](./../zero-one-diff-1.png)

```
Input: grid = [[0, 1, 1], [1, 0, 1], [0, 0, 1]]
Output: [[0, 0, 4], [0, 0, 4], [-2, -2, 2]]
Explanation:
- diff[0][0] = onesRow0 + onesCol0 - zerosRow0 - zerosCol0 = 2 + 1 - 1 - 2 = 0
- diff[0][1] = onesRow0 + onesCol1 - zerosRow0 - zerosCol1 = 2 + 1 - 1 - 2 = 0
- diff[0][2] = onesRow0 + onesCol2 - zerosRow0 - zerosCol2 = 2 + 3 - 1 - 0 = 4
- diff[1][0] = onesRow1 + onesCol0 - zerosRow1 - zerosCol0 = 2 + 1 - 1 - 2 = 0
- diff[1][1] = onesRow1 + onesCol1 - zerosRow1 - zerosCol1 = 2 + 1 - 1 - 2 = 0
- diff[1][2] = onesRow1 + onesCol2 - zerosRow1 - zerosCol2 = 2 + 3 - 1 - 0 = 4
- diff[2][0] = onesRow2 + onesCol0 - zerosRow2 - zerosCol0 = 1 + 1 - 2 - 2 = -2
- diff[2][1] = onesRow2 + onesCol1 - zerosRow2 - zerosCol1 = 1 + 1 - 2 - 2 = -2
- diff[2][2] = onesRow2 + onesCol2 - zerosRow2 - zerosCol2 = 1 + 3 - 2 - 0 = 2
```

**Example 2:**

![Container](./../zero-one-diff-2.png)

```
Input: grid = [[1, 1, 1], [1, 1, 1]]
Output: [[5, 5, 5], [5, 5, 5]]
Explanation:
- diff[0][0] = onesRow0 + onesCol0 - zerosRow0 - zerosCol0 = 3 + 2 - 0 - 0 = 5
- diff[0][1] = onesRow0 + onesCol1 - zerosRow0 - zerosCol1 = 3 + 2 - 0 - 0 = 5
- diff[0][2] = onesRow0 + onesCol2 - zerosRow0 - zerosCol2 = 3 + 2 - 0 - 0 = 5
- diff[1][0] = onesRow1 + onesCol0 - zerosRow1 - zerosCol0 = 3 + 2 - 0 - 0 = 5
- diff[1][1] = onesRow1 + onesCol1 - zerosRow1 - zerosCol1 = 3 + 2 - 0 - 0 = 5
- diff[1][2] = onesRow1 + onesCol2 - zerosRow1 - zerosCol2 = 3 + 2 - 0 - 0 = 5
```

**Constraints:**

```
- m == grid.length
- n == grid[i].length
- 1 <= m, n <= 10^5
- 1 <= m * n <= 10^5
- grid[i][j] is either 0 or 1
```

### Explanation

#### Brute force approach

For every cell, we calculate the difference of zeros and ones. The two nested for-loops will iterate over the array and we calculate the sum as below

```
diff[i][j] = onesRowi + onesColj - zerosRowi - zerosColj
```

The time-complexity of this approach is **O(n^3)**.

#### Using extra space

We can reduce the time-complexity to **O(n^2)** by using additional two 1D array's. We calculate the count of ones for every row and store it in `onesRow` array. We do the same for every column and store it in `onesCol` array.
We then compute the difference using the below approach

```
diff[i][j] = onesRowi + onesColj - (m - onesRowi) - (n - zerosColj)
```

Let's explore the algorithm.

```
- set m = grid.size()
      n = grid[0].size()
  initialize vector<int> onesRow(m, 0)
             vector<int> onesCol(n, 0)
             i, j

- loop for i = 0; i < m; i++
    loop for j = 0; j < n; j++
      - if grid[i][j] == 1
        - update onesRow[i]++
      - if end
    - inner for end
- outer for end

- loop for i = 0; i < n; i++
    loop for j = 0; j < m; j++
      - if grid[j][i] == 1
        - update onesCol[i]++
      - if end
    - inner for end
- outer for end

- initialize vector<vector<int>> diff(m, vector<int>(n))

- loop for i = 0; i < m; i++
    loop for j = 0; j < n; j++
      - set diff[i][j] = onesRow[i] + onesCol[j] - (m - onesRow[i]) - (n - onesCol[j])
    - inner for end
- outer for end
```

Let's check our algorithm in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
class Solution {
public:
    vector<vector<int>> onesMinusZeros(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        vector<int> onesRow(m, 0);
        vector<int> onesCol(n, 0);
        int i, j;

        for(i = 0; i < m; i++) {
            for(j = 0; j < n; j++) {
                if(grid[i][j] == 1) {
                    onesRow[i]++;
                }
            }
        }

        for(i = 0; i < n; i++) {
            for(j = 0; j < m; j++) {
                if(grid[j][i] == 1) {
                    onesCol[i]++;
                }
            }
        }

        vector<vector<int>> diff(m, vector<int>(n));

        for(i = 0; i < m; i++) {
            for(j = 0; j < n; j++) {
                diff[i][j] = onesRow[i] + onesCol[j] - (m - onesRow[i]) - (n - onesCol[j]);
            }
        }

        return diff;
    }
};
```

#### Golang solution

```go
func onesMinusZeros(grid [][]int) [][]int {
    m, n := len(grid), len(grid[0])
    onesRow := make([]int, m)
    onesCol := make([]int, n)
    i, j := 0, 0

    for i = 0; i < m; i++ {
        for j = 0; j < n; j++ {
            if grid[i][j] == 1 {
                onesRow[i]++
            }
        }
    }

    for i = 0; i < n; i++ {
        for j = 0; j < m; j++ {
            if grid[j][i] == 1 {
                onesCol[i]++
            }
        }
    }

    diff := make([][]int, m)
    for i = 0; i < m; i++ {
        diff[i] = make([]int, n)
    }

    for i = 0; i < m; i++ {
        for j = 0; j < n; j++ {
            diff[i][j] = onesRow[i] + onesCol[j] - (m - onesRow[i]) - (n - onesCol[j])
        }
    }

    return diff
}
```

#### JavaScript solution

```javascript
var onesMinusZeros = function(grid) {
    let m = grid.length, n = grid[0].length;
    let onesRow = new Array(m).fill(0);
    let onesCol = new Array(n).fill(0);
    let i, j;

    for(i = 0; i < m; i++) {
        for(j = 0; j < n; j++) {
            if(grid[i][j] === 1) {
                onesRow[i]++;
            }
        }
    }

    for(i = 0; i < n; i++) {
        for(j = 0; j < m; j++) {
            if(grid[j][i] === 1) {
                onesCol[i]++;
            }
        }
    }

    let diff = new Array(m);
    for(i = 0; i < m; i++) {
        diff[i] = new Array(n);
    }

    for(i = 0; i < m; i++) {
        for(j = 0; j < n; j++) {
            diff[i][j] = onesRow[i] + onesCol[j] - (m - onesRow[i]) - (n - onesCol[j]);
        }
    }

    return diff;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: grid = [[0, 1, 1], [1, 0, 1], [0, 0, 1]]

Step 1: m = grid.length
          = 3
        n = grid[0].length
          = 3

        onesRow(m, 0)
        onesRow = [0, 0, 0]

        onesCol(n, 0)
        onesCol = [0, 0, 0]
        i, j

Step 2: loop for i = 0; i < m; i++
          loop for j = 0; j < n; j++
            if grid[i][j] == 1
               onesRow[i]++

        This function will count the number of 1's in each row and set the value in onesRow array.
        onesRow = [2, 2, 1]

Step 3: loop for i = 0; i < n; i++
          loop for j = 0; j < m; j++
            if grid[j][i] == 1
               onesCol[i]++

        This function will count the number of 1's in each row and set the value in onesRow array.
        onesCol = [1, 1, 3]

Step 4: initialize diff(m, vector<int>(n))
        diff = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]


Step 5: loop for i = 0; i < m; i++
          loop for j = 0; j < n; j++

          i = 0, j = 0
          i < m, j < n
          0 < 3, j < 3
          true

          diff[i][j] = onesRow[i] + onesCol[j] - (m - onesRow[i]) - (n - onesCol[j])
          diff[0][0] = onesRow[0] + onesCol[0] - (3 - onesRow[0]) - (3 - onesCol[0])
                     = 2 + 1 - (3 - 2) - (3 - 1)
                     = 3 - 1 - 2
                     = 0

          j++
          j = 1

Step 6: loop for i = 0; i < m; i++
          loop for j = 0; j < n; j++

          i < m, j < n
          0 < 3, 1 < 3
          true

          diff[i][j] = onesRow[i] + onesCol[j] - (m - onesRow[i]) - (n - onesCol[j])
          diff[0][1] = onesRow[0] + onesCol[1] - (3 - onesRow[0]) - (3 - onesCol[1])
                     = 2 + 1 - (3 - 2) - (3 - 1)
                     = 3 - 1 - 2
                     = 0

          j++
          j = 2

Step 7: loop for i = 0; i < m; i++
          loop for j = 0; j < n; j++

          i < m, j < n
          0 < 3, 2 < 3
          true

          diff[i][j] = onesRow[i] + onesCol[j] - (m - onesRow[i]) - (n - onesCol[j])
          diff[0][2] = onesRow[0] + onesCol[2] - (3 - onesRow[0]) - (3 - onesCol[2])
                     = 2 + 3 - (3 - 2) - (3 - 3)
                     = 5 - 1 - 0
                     = 4

          j++
          j = 3

Step 8: loop for i = 0; i < m; i++
          loop for j = 0; j < n; j++

          i < m, j < n
          0 < 3, 3 < 3
          false

          i++
          i = 1

Step 9: loop for i = 0; i < m; i++
          loop for j = 0; j < n; j++

          i < m, j < n
          1 < 3, 0 < 3
          true

          diff[i][j] = onesRow[i] + onesCol[j] - (m - onesRow[i]) - (n - onesCol[j])
          diff[1][0] = onesRow[1] + onesCol[0] - (3 - onesRow[1]) - (3 - onesCol[0])
                     = 2 + 1 - (3 - 2) - (3 - 1)
                     = 3 - 1 - 2
                     = 0

We similarly evaluate for the rest of the cells and return the diff as
[
  [0, 0, 4],
  [0, 0, 4],
  [-2, -2, 2],
]
```
