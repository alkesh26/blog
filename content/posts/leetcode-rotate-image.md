---
title: LeetCode - Rotate Image
description: LeetCode - Rotate Image represented as 2D array using C++, Golang and Javascript.
date: 2021-06-20
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "rotate image represented as 2D array, c++, golang, javascript"
---

![Container](./../rotate-image.png)

## Problem statement

You are given an **n x n** 2D **matrix** representing an image,
rotate the image by **90** degrees (clockwise).

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly.
**DO NOT** allocate another 2D matrix and do the rotation.

Problem statement taken from: <a href='https://leetcode.com/problems/rotate-image' target='_blank'>https://leetcode.com/problems/rotate-image</a>

**Example 1:**

```
Input: matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
Output: [[7, 4, 1], [8, 5, 2], [9, 6, 3]]
```

**Example 2:**

```
Input: matrix = [[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]
Output: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]]
```

**Example 3:**

```
Input: matrix = [[1]]
Output: [[1]]
```

**Example 4:**

```
Input: matrix = [[1, 2], [3, 4]]
Output: [[3, 1], [4, 2]]
```

**Constraints:**

```
- matrix.length == n
- matrix[i].length == n
- 1 <= n <= 20
- -1000 <= matrix[i][j] <= 1000
```

### Explanation

#### Rotate Groups of Four Cells

The first solution we can think of is to rotate
the four corners of the matrix.
We repeat this of the subsequent cells too.

![Container](./../rotate-cells.png)

Let's check the algorithm.

```
- initialize m = matrix.size, tmp

- loop for i = 0; i < m / 2; i++
    - loop for j = i; j < m - 1 - i; j++
      - tmp = matrix[i][j]
      - matrix[i][j] = matrix[m - 1 - j][i]
      - matrix[m - 1 - j][i] = matrix[m - 1 - i][m - 1 - j]
      - matrix[m - 1 - i][m - 1 - j] = matrix[j][m - 1 - i]
      - matrix[j][m - 1 - i] = tmp
```

The time complexity of the program is **O(M)** as each cell is getting read once and written once.
Space complexity is **O(1)** because we do not use any other additional data structures.

#### C++ solution

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int m = matrix.size(), tmp;
        int j = 0;

        for(int i = 0; i < m/2; i++){
            for(int j = i; j < m - 1 - i; j++){
                tmp = matrix[i][j];
                matrix[i][j] = matrix[m - 1 - j][i];
                matrix[m - 1 - j][i] = matrix[m - 1 - i][m - 1 - j];
                matrix[m - 1 - i][m - 1 - j] = matrix[j][m - 1 - i];
                matrix[j][m - 1 - i] = tmp;
            }
        }
    }
};
```

#### Golang solution

```go
func rotate(matrix [][]int)  {
    m := len(matrix)
    tmp := 0

    for i := 0; i < m / 2; i++ {
        for j := i; j < m - 1 - i; j++ {
            tmp = matrix[i][j];
            matrix[i][j] = matrix[m - 1 - j][i];
            matrix[m - 1 - j][i] = matrix[m - 1 - i][m - 1 - j];
            matrix[m - 1 - i][m - 1 - j] = matrix[j][m - 1 - i];
            matrix[j][m - 1 - i] = tmp;
        }
    }
}
```

#### Javascript solution

```javascript
var rotate = function(matrix) {
    let m = matrix.length;
    let tmp = 0;
    let i, j;

    for(i = 0; i < m/2; i++){
        for(j = i; j < m - 1 - i; j++){
            tmp = matrix[i][j];
            matrix[i][j] = matrix[m - 1 - j][i];
            matrix[m - 1 - j][i] = matrix[m - 1 - i][m - 1 - j];
            matrix[m - 1 - i][m - 1 - j] = matrix[j][m - 1 - i];
            matrix[j][m - 1 - i] = tmp;
        }
    }
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input:
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

Step 1: m = matrix.length
        m = 3

Step 2: tmp = 0

Step 3: loop i = 0; i < 3/2
        0 < 3/2
        0 < 1
        true

        j = i; j < 3 - 1 - 0
        0 < 2
        true

        tmp = matrix[i][j]
        tmp = 1

        matrix[i][j] = matrix[m - 1 - j][i]
        matrix[0][0] = matrix[3 - 1 - 0][0]
        matrix[0][0] = matrix[2][0]
        matrix[0][0] = 7

        matrix[m - 1 - j][i] = matrix[m - 1 - i][m - 1 - j]
        matrix[3 - 1 - 0][0] = matrix[3 - 1 - 0][3 - 1 - 0]
        matrix[2][0] = matrix[2][2]
        matrix[2][0] = 9

        matrix[m - 1 - i][m - 1 - j] = matrix[j][m - 1 - i]
        matrix[3 - 1 - 0][3 - 1 - 0] = matrix[0][3 - 1 - 0]
        matrix[2][2] = matrix[0][2]
        matrix[2][2] = 3

        matrix[j][m - 1 - i] = tmp
        matrix[0][3 - 1 - 0] = 1
        matrix[0][2] = 1

        j++
        j = 1

Step 4: j < 2
        1 < 2
        true

        tmp = matrix[0][1]
        tmp = 2

        matrix[i][1] = matrix[m - 1 - j][i]
        matrix[0][1] = matrix[3 - 1 - 1][0]
        matrix[0][1] = matrix[1][0]
        matrix[0][1] = 4

        matrix[m - 1 - j][i] = matrix[m - 1 - i][m - 1 - 1]
        matrix[3 - 1 - 1][0] = matrix[3 - 1 - 0][3 - 1 - 1]
        matrix[1][0] = matrix[2][1]
        matrix[1][0] = 8

        matrix[m - 1 - i][m - 1 - j] = matrix[j][m - 1 - i]
        matrix[3 - 1 - 0][3 - 1 - 1] = matrix[1][3 - 1 - 0]
        matrix[2][1] = matrix[1][2]
        matrix[2][1] = 6

        matrix[1][m - 1 - i] = tmp
        matrix[1][3 - 1 - 0] = 1
        matrix[1][2] = 2

        j++
        j = 2

Step 5: j < 2
        2 < 2
        false

Step 6: i++
        i = 1

        1 < 3/2
        1 < 1
        false

Output:
[[7, 4, 1], [8, 5, 2], [9, 6, 3]]
```
