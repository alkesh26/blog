---
title: Sudoku Solver
description: Write a program to solve a Sudoku puzzle by filling in the empty cells.
date: 2023-06-15
hashtags: ["programming", "algorithms", "golang", "cpp", "javascript"]
categories: "write a program to solve a Sudoku puzzle by filling the empty cells, c++, golang, javascript"
---

## Problem statement

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy **all of the following rules:**

Each of the digits `1-9` must occur exactly once in each row.
Each of the digits `1-9` must occur exactly once in each column.
Each of the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.
The '.' character indicates empty cells.

Problem statement taken from: <a href='https://leetcode.com/problems/sudoku-solver' target='_blank'>https://leetcode.com/problems/sudoku-solver</a>.

**Example 1:**

![Container](./../sudoku-question.png)

```
Input: board = [['5', '3', '.', '.', '7', '.', '.', '.', '.'],
  ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
  ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
  ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
  ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
  ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
  ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
  ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
  ['.', '.', '.', '.', '8', '.', '.', '7', '9']
]

Output: [['5', '3', '4', '6', '7', '8', '9', '1', '2'],
  ['6', '7', '2', '1', '9', '5', '3', '4', '8'],
  ['1', '9', '8', '3', '4', '2', '5', '6', '7'],
  ['8', '5', '9', '7', '6', '1', '4', '2', '3'],
  ['4', '2', '6', '8', '5', '3', '7', '9', '1'],
  ['7', '1', '3', '9', '2', '4', '8', '5', '6'],
  ['9', '6', '1', '5', '3', '7', '2', '8', '4'],
  ['2', '8', '7', '4', '1', '9', '6', '3', '5'],
  ['3', '4', '5', '2', '8', '6', '1', '7', '9']
]

Explanation: The input board is shown above and the only valid solution is shown below:
```

![Container](./../sudoku-answer.png)

**Constraints:**

```
- board.length == 9
- board[i].length == 9
- board[i][j] is a digit or '.'
- It is guaranteed that the input board has only one solution.
```

### Solutions for Sudoku Solver

#### Approach 1: Sudoku using Brute Force

The naive approach is to generate all possible numbers 1 to 9 configurations to fill the empty cells. We try every combination one by one until we get a valid sudoku. For every empty cell, we fill the position with numbers from 1 to 9. Once the sudoku is filled, we check if the sudoku is valid or not. If the sudoku is invalid, we recur for other cases.

A C++ snippet of this approach is as follows:

```cpp
class Solution {
public:
    bool isValid(vector<vector<char>>& board, int i, int j, char value){
        // check for a valid row
        for(int row = 0; row < 9; row++) {
            if(board[row][j] == value) {
                return false;
            }
        }

        // check for a valid column
        for(int col = 0; col < 9; col++) {
            if(board[i][col] == value) {
                return false;
            }
        }

        // check for a valid 3 * 3 matrix
        for(int k = 0; k < 9; k++) {
            if(board[3 * (i / 3) + k % 3][3 * (j / 3) + k / 3] == value) {
                return false;
            }
        }

        return true;
    }

    bool solveSudokuHelper(vector<vector<char>>& board, int row, int column) {
        // if we reached the last cell of the board
        // we should avoid further backtracking
        // return true in this case
        if (row == 8 && column == 9)
            return true;

        // if the column value becomes 9,
        // we move to the next row
        if (column == 9) {
            row++;
            column = 0;
        }

        // if the current cell of the board already contains
        // any value from 1-9, we iterate for the next column
        if (board[row][column] != '.')
            return solveSudokuHelper(board, row, column + 1);

        for (int num = 1; num <= 9; num++) {
            // Check if it is safe to place
            // the num (1-9) in the
            // given cell
            if (isValid(board, row, column, num)) {
                // assign the value to the corresponding cell
                board[row][column] = char(num);

                // fill in the values for the next column
                if (solveSudokuHelper(board, row, column + 1))
                    return true;
            }

            // if, in the previous step, the sudoku was invalid
            // update the cell to an empty value. In this case, '.'
            board[row][column] = '.';
        }

        return false;
    }

    void solveSudoku(vector<vector<char>>& board) {
        solveSudokuHelper(board, 0, 0);
    }
};
```

The time complexity of this approach is **O(9 ^ (n * n))**. We are filling every empty cell of the board with all 9 possible combinations.

The space complexity is **O(1)**.

#### Approach 2: Sudoku using Backtracking

Sudoku is solved by assigning numbers one by one to empty cells. In this approach, we first check if assigning a number to the cell is safe. If the placement is valid, we then move to the next column. To validate the cell value, we check if the number is not present in the current row, column, or 3 * 3 subgrid. After validating the cell, we recursively check whether this assignment leads to the solution. We try the next number if the assignment doesn't lead to a solution.

The code flow of this approach is as follows:

```
- Create a HashMap for the row, column and 3 * 3 subgrid.
- Create a function that validates the assignment of the current cell of the grid.
- If any number from 1-9 has a value greater than 1 in the HashMap, return false else, return true.
- Create a recursive function that accepts the sudoku board as a param.
- Check for an empty cell ('.')
  - if the cell is empty, assign a number from 1 to 9
  - check if assigning the number to the current cell, makes the sudoku safe or not
  - if the sudoku is valid, recursively call the function for all safe cases from 0 to 9.
  - if any recursive call returns true, we end the loop.
```

A C++ snippet of this approach is as below:

```cpp
class Solution {
public:
    bool numPresentInRow(vector<vector<char>>& board, int row, int num) {
        for (int column = 0; column < 9; column++)
            if (grid[row][column] == num)
                return true;

        return false;
    }

    bool numPresentInColum(vector<vector<char>>& board, int column, int num) {
        for (int row = 0; row < 9; row++)
            if (grid[row][column] == num)
                return true;

        return false;
    }

    bool numPresentInSubGrid(vector<vector<char>>& board, int subGridRowStartIndex, int subGridColumnStartIndex, int num) {
        for (int row = 0; row < 3; row++)
            for (int col = 0; col < 3; col++)
                if (grid[row + subGridRowStartIndex][col + subGridColumnStartIndex] == num)
                    return true;

        return false;
    }

    bool isSafe(vector<vector<char>>& board, int row, int column, char num) {
        return !numPresentInRow(board, row, num)
           && !numPresentInColum(board, column, num)
           && !numPresentInSubGrid(board, row - row % 3, column - column % 3, num)
           && board[row][column] == '.';
    }

    // function to check if there are any empty cells in the sudoku
    // if yes, the row and column parameters (passed by reference)
    // will be set to the location that is empty and true is returned
    bool hasEmptyCell(vector<vector<char>>& board, int& row, int& column) {
        for (row = 0; row < 9; i++)
            for (column = 0; column < 9; column++)
                if (grid[row][column] == '.')
                    return true;

        return false;
    }

    bool solveSudokuHelper(vector<vector<char>>& board) {
        int row, column;

        // return true if there are no empty cells
        if (!hasEmptyCell(board, row, column))
            return true;

        // loop from 1 to 9
        for (int num = 1; num <= 9; num++) {
            // check if the assignment of num is safe
            if (isSafe(board, row, column, num)) {
                // make a tentative assignment
                board[row][column] = char(num);

                // return true if the current assignment is valid
                if (solveSudokuHelper(board))
                    return true;

                // if the assignment is unsafe,
                // assign the empty value
                board[row][column] = '.';
            }
        }

        // this triggers backtracking
        return false;
    }

    void solveSudoku(vector<vector<char>>& board) {
        solveSudokuHelper(board);
    }
};
```

The worst-case time complexity of this approach remains the same as the **Brute Force** approach, that is **O(9 ^ (n * n))**. But since we are validating the assignment, we are avoiding a few unnecessary iterations; hence, the average-case time complexity will be better.

#### Approach 3: Sudoku using BitMask

This approach is a slight optimization to the **Backtracing** solution. Instead of looping over each row, column and subgrid to check whether the number is already present, we use bit masks to verify the same.

Let's check the algorithm first.

#### Algorithm

```
// function solveSudoku(board)
- set vector<int> rows(9, 0), columns(9, 0), subgrids(9, 0)

// this will mask the bits in the row, columns and subgrids array
// for non-empty cells
- call setBits(board, rows, columns, subgrids)

// function to backtrack and generate the possible solutions
- backtrack(board, index, rows, columns, subgrids)


// function setBits(board, rows, columns, subgrids)
- loop for row = 0; row < 9; row++
  - loop for column = 0; column < 9; column++
    - if board[row][column] != '.'
      - set bitMask = 1 << (board[row][column] - '1')
      - set subgrid = (row / 3) * 3 + (column / 3)

      // mask the values in the row, column and subgrid array
      - rows[row] |= bitMask
      - columns[column] |= bitMask
      - subgrids[subgrid] |= bitMask
    - end if
  - end inner for loop
- end outer for loop
```

Check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    void setBits(vector<vector<char>>& board, vector<int>& rows, vector<int>& columns, vector<int>& subgrids) {
        for(int row = 0; row < 9; row++) {
            for(int column = 0; column < 9; column++) {
                if(board[row][column] != '.') {
                    int bitMask = 1 << (board[row][column] - '1');
                    int subgrid = (row / 3) * 3 + (column / 3);

                    rows[row] |= bitMask;
                    columns[column] |= bitMask;
                    subgrids[subgrid] |= bitMask;
                }
            }
        }
    }

    bool backtrack(vector<vector<char>>& board, int index, vector<int>& rows, vector<int>& columns, vector<int>& subgrids) {
        if (index > 80)
            return true;

        int row = index / 9;
        int column = index % 9;

        if (board[row][column] != '.')
            return backtrack(board, index + 1, rows, columns, subgrids);

        int subgrid = (row / 3) * 3 + (column / 3);

        for (int i = 0; i < 9; ++i) {
            int mask = 1 << i;
            if (rows[row] & mask || columns[column] & mask || subgrids[subgrid] & mask)
                continue;

            board[row][column] = i + '1';
            rows[row] |= mask;
            columns[column] |= mask;
            subgrids[subgrid] |= mask;

            if (backtrack(board, index + 1, rows, columns, subgrids))
                return true;

            board[row][column] = '.';
            rows[row] ^= mask;
            columns[column] ^= mask;
            subgrids[subgrid] ^= mask;
        }

        return false;
    }

    void solveSudoku(vector<vector<char>>& board) {
        vector<int> rows(9, 0), columns(9, 0), subgrids(9, 0);

        setBits(board, rows, columns, subgrids);

        backtrack(board, 0, rows, columns, subgrids);
    }
};
```

#### Golang solution

```go
func setBits(board [][]byte, rows []int, columns []int, subgrids []int) {
    for row := 0; row < 9; row++ {
        for column := 0; column < 9; column++ {
            if board[row][column] != '.' {
                bitMask := 1 << (board[row][column] - '1')
                subgrid := (row / 3) * 3 + (column / 3)

                rows[row] |= bitMask
                columns[column] |= bitMask
                subgrids[subgrid] |= bitMask
            }
        }
    }
}

func backtrack(board [][]byte, index int, rows []int, columns []int, subgrids []int) bool {
    if index > 80 {
        return true
    }

    row := index / 9
    column := index % 9

    if board[row][column] != '.' {
        return backtrack(board, index + 1, rows, columns, subgrids)
    }

    subgrid := (row / 3) * 3 + (column / 3)

    for i := 0; i < 9; i++ {
        mask := 1 << i

        if (rows[row] & mask != 0) || (columns[column] & mask != 0) || (subgrids[subgrid] & mask != 0) {
            continue
        }

        board[row][column] = byte(i + 1 + '0')
        rows[row] |= mask
        columns[column] |= mask
        subgrids[subgrid] |= mask

        if backtrack(board, index + 1, rows, columns, subgrids) {
            return true
        }

        board[row][column] = '.'
        rows[row] ^= mask
        columns[column] ^= mask
        subgrids[subgrid] ^= mask
    }

    return false
}

func solveSudoku(board [][]byte)  {
    rows, columns, subgrids := make([]int, 9), make([]int, 9), make([]int, 9)

    setBits(board, rows, columns, subgrids)

    backtrack(board, 0, rows, columns, subgrids)
}
```

#### JavaScript solution

```javascript
var setBits = function(board, rows, columns, subgrids) {
    for(let row = 0; row < 9; row++) {
        for(let column = 0; column < 9; column++) {
            if(board[row][column] != '.') {
                let bitMask = 1 << (parseInt(board[row][column]) - 1);
                let subgrid = Math.floor(row / 3) * 3 + Math.floor(column / 3);

                rows[row] |= bitMask;
                columns[column] |= bitMask;
                subgrids[subgrid] |= bitMask;
            }
        }
    }
}

var backtrack = function(board, index, rows, columns, subgrids) {
    if (index > 80)
            return true;

    let row = Math.floor(index / 9);
    let column = Math.floor(index % 9);

    if (board[row][column] != '.')
        return backtrack(board, index + 1, rows, columns, subgrids);

    let subgrid = Math.floor(row / 3) * 3 + Math.floor(column / 3);

    for (let i = 0; i < 9; ++i) {
        let mask = 1 << i;
        if (rows[row] & mask || columns[column] & mask || subgrids[subgrid] & mask)
            continue;

        board[row][column] = (i + 1).toString();
        rows[row] |= mask;
        columns[column] |= mask;
        subgrids[subgrid] |= mask;

        if(backtrack(board, index + 1, rows, columns, subgrids))
            return true;

        board[row][column] = '.';
        rows[row] ^= mask;
        columns[column] ^= mask;
        subgrids[subgrid] ^= mask;
    }

    return false;
}

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    let rows = Array(9).fill(0), columns = Array(9).fill(0), subgrids = Array(9).fill(0);

    setBits(board, rows, columns, subgrids);

    backtrack(board, 0, rows, columns, subgrids);
};
```
