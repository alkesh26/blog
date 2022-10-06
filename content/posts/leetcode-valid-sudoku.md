---
title: LeetCode - Valid Sudoku
description: LeetCode - determine if 9 x 9 Sudoku board is valid or not using C++, Golang and Javascript.
date: 2022-01-09
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - determine if 9 x 9 Sudoku board is valid or not, c++, golang, javascript"
---

### Problem statement

Determine if a *9 x 9* Sudoku board is valid. Only the filled cells need to be validated
**according to the following rules**:

Each row must contain the digits *1-9* without repetition.
Each column must contain the digits *1-9* without repetition.
Each of the nine *3 x 3* sub-boxes of the grid must contain the digits *1-9* without repetition.

**Note:**

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.

**Example 1:**

![Container](./../valid-sudoku.png)

```
Input: board =
[['5', '3', '.', '.', '7', '.', '.', '.', '.']
,['6', '.', '.', '1', '9', '5', '.', '.', '.']
,['.', '9', '8', '.', '.', '.', '.', '6', '.']
,['8', '.', '.', '.', '6', '.', '.', '.', '3']
,['4', '.', '.', '8', '.', '3', '.', '.', '1']
,['7', '.', '.', '.', '2', '.', '.', '.', '6']
,['.', '6', '.', '.', '.', '.', '2', '8', '.']
,['.', '.', '.', '4', '1', '9', '.', '.', '5']
,['.', '.', '.', '.', '8', '.', '.', '7', '9']]
Output: true
```

**Example 2:**

```
Input: board =
[['8', '3', '.', '.', '7', '.', '.', '.', '.']
,['6', '.', '.', '1', '9', '5', '.', '.', '.']
,['.', '9', '8', '.', '.', '.', '.', '6', '.']
,['8', '.', '.', '.', '6', '.', '.', '.', '3']
,['4', '.', '.', '8', '.', '3', '.', '.', '1']
,['7', '.', '.', '.', '2', '.', '.', '.', '6']
,['.', '6', '.', '.', '.', '.', '2', '8', '.']
,['.', '.', '.', '4', '1', '9', '.', '.', '5']
,['.', '.', '.', '.', '8', '.', '.', '7', '9']]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3 x 3 sub-box, it is invalid.
```

**Constraints:**

```
- board.length == 9
- board[i].length == 9
- board[i][j] is a digit 1-9 or '.'
```

### Explanation

The problem requires us to verify if the Sudoku
board is valid or not.
The approach to solving the problem will be similar to the way
we fill the Sudoku.
We check every row,
column
and
*3 x 3* cell to verify if they contain any duplicate numbers.

Let's check the algorithm directly.

```
// isValidSudoku function
- initialize i

- for every row verify if it's valid
  loop for i = 0; i < 9; i++
    - if !isValidRow(board[i])
      - return false

- for every column verify if it's valid
  loop for i = 0; i < 9; i++
    - if !isValidColumn(board, i)
      - return false

- for every cell in sudoku verify if it's valid
  loop for = 0; i < 9; i = i + 3
    for j = 0; j < 9; j = j + 3
      - if !isValidCell(board, i, j)
        - return false

// isValidRow function
- set checker = 0
  initialize num

- loop for i = 0; i < 9; i++
  - if row[i] != '.'
    - set num = row[i] - '0'
    - if checker & (1 << num) > 0
      - return false
    - checker = checker | (1 << num)

- return true

// isValidColumn function
- set checker = 0
  initialize num

- loop for i = 0; i < 9; i++
  - if board[i][j] != '.'
    - set num = board[i][j] - '0'
    - if checker & (1 << num) > 0
      - return false
    - checker = checker | (1 << num)

- return true

// isValidCell function
- set checker = 0
  initialize num

- loop for i = n; i < n + 3; i++
  - loop for j = m; j < m + 3; j++
    - if board[i][j] != '.'
      - set num = board[i][j] - '0'
      - if checker & (1 << num) > 0
        - return false
      - checker = checker | (1 << num)

- return true
```

#### C++ solution

```cpp
class Solution {
static bool isValidRow(vector<char>& row){
    int checker = 0, num;

    for(int i = 0; i < 9; i++){
        if(row[i] != '.'){
            num = row[i] - '0';
            if((checker & (1 << num)) > 0)
                return false;
            checker = (checker | (1 << num));
        }
    }

    return true;
};

static bool isValidColumn(vector<vector<char>>& board, int j){
    int checker = 0, num;

    for(int i = 0; i < 9; i++){
        if(board[i][j] != '.'){
            num = board[i][j] - '0';
            if((checker & (1 << num)) > 0)
                return false;
            checker = (checker | (1 << num));
        }
    }

    return true;
};

static bool isValidCell(vector<vector<char>>& board, int n, int m){
    int checker = 0, num;

    for(int i = n; i < n + 3; i++){
        for(int j = m; j < m + 3; j++){
            if(board[i][j] != '.'){
                num = board[i][j] - '0';
                if((checker & (1 << num)) > 0)
                    return false;
                checker = (checker | (1 << num));
            }
        }
    }

    return true;
};

public:
    bool isValidSudoku(vector<vector<char>>& board) {
        int i;

        for(i = 0; i < 9; i++){
            if(!isValidRow(board[i])){
                return false;
            }
        }

        for(i = 0; i < 9; i++){
            if(!isValidColumn(board, i)){
                return false;
            }
        }

        for(i = 0; i < 9; i += 3){
            for(int j = 0; j < 9; j += 3){
               if(!isValidCell(board, i, j)){
                    return false;
                }
            }
        }

        return true;
    }
};
```

#### Golang solution

```go
func isValidRow(board []byte) bool {
    checker, num := 0, 0

    for i := 0; i < 9; i++ {
        if board[i] != '.' {
            num = int(board[i] - '0')
            if checker & (1 << num) != 0 {
                return false
            }

            checker = checker | (1 << num)
        }
    }

    return true
}

func isValidColumn(board [][]byte, j int) bool {
    checker, num := 0, 0

    for i := 0; i < 9; i++ {
        if board[i][j] != '.' {
            num = int(board[i][j] - '0')
            if checker & (1 << num) != 0 {
                return false
            }

            checker = checker | (1 << num)
        }
    }

    return true
}

func isValidCell(board [][]byte, n, m int) bool {
    checker, num := 0, 0

    for i := n; i < n + 3; i++ {
        for j := m; j < m + 3; j++ {
            if board[i][j] != '.' {
                num = int(board[i][j] - '0')
                if checker & (1 << num) != 0 {
                    return false
                }

                checker = checker | (1 << num)
            }
        }
    }

    return true
}

func isValidSudoku(board [][]byte) bool {
    for i := 0; i < 9; i++ {
        if !isValidRow(board[i]) {
            return false
        }
    }

    for i := 0; i < 9; i++ {
        if !isValidColumn(board, i) {
            return false
        }
    }

    for i := 0; i < 9; i += 3 {
        for j := 0; j < 9; j += 3 {
            if !isValidCell(board, i, j) {
                return false
            }
        }
    }

    return true
}
```

#### Javascript solution

```javascript
var isValidRow = function(board) {
    let checker = 0, num;

    for(let i = 0; i < 9; i++){
        if(board[i] != '.'){
            num = board[i] - '0';
            if((checker & (1 << num)) > 0)
                return false;
            checker = (checker | (1 << num));
        }
    }

    return true;
}

var isValidColumn = function(board, j) {
    let checker = 0, num;

    for(let i = 0; i < 9; i++){
        if(board[i][j] != '.'){
            num = board[i][j] - '0';
            if((checker & (1 << num)) > 0)
                return false;
            checker = (checker | (1 << num));
        }
    }

    return true;
}

var isValidCell = function(board, n, m) {
    let checker = 0, num;

    for(let i = n; i < n + 3; i++){
        for(let j = m; j < m + 3; j++){
            if(board[i][j] != '.'){
                num = board[i][j] - '0';
                if((checker & (1 << num)) > 0)
                    return false;
                checker = (checker | (1 << num));
            }
        }
    }

    return true;
}

var isValidSudoku = function(board) {
    let i;

    for(i = 0; i < 9; i++){
        if(!isValidRow(board[i])){
            return false;
        }
    }

    for(i = 0; i < 9; i++){
        if(!isValidColumn(board, i)){
            return false;
        }
    }

    for(i = 0; i < 9; i += 3){
        for(let j = 0; j < 9; j += 3){
           if(!isValidCell(board, i, j)){
                return false;
            }
        }
    }

    return true;
};
```

Let's dry-run just one row to get an idea of how it validates every column and cell.

```
Input board =
[['5', '3', '.', '.', '7', '.', '.', '.', '.']
,['6', '.', '.', '1', '9', '5', '.', '.', '.']
,['.', '9', '8', '.', '.', '.', '.', '6', '.']
,['8', '.', '.', '.', '6', '.', '.', '.', '3']
,['4', '.', '.', '8', '.', '3', '.', '.', '1']
,['7', '.', '.', '.', '2', '.', '.', '.', '6']
,['.', '6', '.', '.', '.', '.', '2', '8', '.']
,['.', '.', '.', '4', '1', '9', '.', '.', '5']
,['.', '.', '.', '.', '8', '.', '.', '7', '9']]

// isValidSudoku function

Step 1: initialize i

Step 2: for(i = 0; i < 9; i++){
           if(!isValidRow(board[i])){
               return false;
            }
        }

// we will only check for the first 0th row
// in isValidRow

Step 3: set checker = 0
        initialize num

        loop for i = 0; i < 9; i++
          - if board[i] != '.'
            board[0] != '.'
            '5' != '.'
            true

            num = board[i] - '0'
                = '5' - '0'
                = 5

            if checker & (1 << num) > 0
               0 & (1 << 5) > 0
               0 > 0
               false

            checker = (checker | (1 << num))
                    = 0 | 1 << 5
                    = 0 | 32
                    = 32

            i++
            i = 1

Step 4: i < 9
        1 < 9
        true

        - if board[i] != '.'
          board[1] != '.'
          '3' != '.'
          true

        num = board[i] - '0'
            = '3' - '0'
            = 3

        if checker & (1 << num) > 0
           0 & (1 << 3) > 0
           0 > 0
           false

        checker = (checker | (1 << num))
                = 32 | 1 << 3
                = 32 | 8
                = 40

        i++
        i = 2

Step 5: i < 9
        2 < 9
        true

        - if board[i] != '.'
          board[2] != '.'
          '.' != '.'
          false

        i++
        i = 3

Step 6: i < 9
        3 < 9
        true

        - if board[i] != '.'
          board[3] != '.'
          '.' != '.'
          false

        i++
        i = 4

Step 7: i < 9
        4 < 9
        true

        - if board[i] != '.'
          board[4] != '.'
          '7' != '.'
          true

        num = board[i] - '0'
            = '7' - '0'
            = 7

        if checker & (1 << num) > 0
           0 & (1 << 7) > 0
           0 > 0
           false

        checker = (checker | (1 << num))
                = 40 | 1 << 7
                = 40 | 128
                = 168

        i++
        i = 5

Step 8: i < 9
        5 < 9
        true

        - if board[i] != '.'
          board[5] != '.'
          '.' != '.'
          false

        i++
        i = 6

Step 9: i < 9
        6 < 9
        true

        - if board[i] != '.'
          board[6] != '.'
          '.' != '.'
          false

        i++
        i = 7

Step 10: i < 9
         7 < 9
         true

         - if board[i] != '.'
           board[7] != '.'
           '.' != '.'
           false

         i++
         i = 8

Step 11: i < 9
         8 < 9
         true

         - if board[i] != '.'
           board[8] != '.'
           '.' != '.'
           false

         i++
         i = 9

Step 12: i < 9
         9 < 9
         false

Step 13: return true

So we calculate the answer in the same way for the rest of the rows, columns, and 3 x 3 cells.

For this 9 x 9 matrix, the answer is true. The answer we return is true.
```
