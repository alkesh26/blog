---
title: LeetCode - ZigZag Conversion
description: LeetCode - zig-zag conversion using C++, Golang and Javascript.
date: 2021-10-21
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - zig-zag conversion, c++, golang, javascript"
---

### Problem statement

The string *'PAYPALISHIRING'* is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

```
P   A   H   N
A P L S I I G
Y   I   R
```

And then read line by line: *'PAHNAPLSIIGYIR'*

Write the code that will take a string and make this conversion given a number of rows:

```
string convert(string s, int numRows);
```

Problem statement taken from: <a href='https://leetcode.com/problems/zigzag-conversion' target='_blank'>https://leetcode.com/problems/zigzag-conversion</a>

**Example 1:**

```
Input: s = 'PAYPALISHIRING', numRows = 3
Output: 'PAHNAPLSIIGYIR'
```

**Example 2:**

```
Input: s = 'PAYPALISHIRING', numRows = 4
Output: 'PINALSIGYAHRPI'
Explanation:
P     I    N
A   L S  I G
Y A   H R
P     I
```

**Example 3:**

```
Input: s = 'A', numRows = 1
Output: 'A'
```

**Constraints:**

```
- 1 <= s.length <= 1000
- s consists of English letters (lower-case and upper-case), ',' and '.'
- 1 <= numRows <= 1000
```

### Explanation

#### Process by row

The number of rows into which the string should be zig-zag is passed.
We can create an array of strings.
Based on the current index,
append that character in the respective string array index.

Let's check the algorithm.

```
- if numRows <= 1
  - return s

- initialize i, set row = 0, down = true

- initialize array of strings: string array[numRows]

- loop for i = 0; i < numRows; i++
  - set array[i] = '' (empty string)

- loop for i = 0; i < s.size(); i++
  - append character to string
    array[row] += s[i];

  - if row == 0
    - set down = true

  - if row == numRows - 1
    - set down = false

  - increment or decrement row based on down boolean
    down ? row++ : row--

- set string answer = ''

- loop for i = 0; i < numRows; i++
  - answer += array[i]

- return answer
```

#### C++ solution

```cpp
class Solution {
public:
    string convert(string s, int numRows) {
        if(numRows <= 1) {
            return s;
        }

        int i, row = 0;
        bool down = true;
        string array[numRows];

        for(i = 0; i < numRows; i++){
            array[i] = '';
        }

        for(i = 0; i < s.size(); i++){
            array[row] += s[i];

            if(row == 0){
                down = true;
            }

            if(row == numRows - 1){
                down = false;
            }

            down ? row++ : row--;
        }

        string answer = '';

        for(i = 0; i < numRows; i++){
            answer += array[i];
        }

        return answer;
    }
};
```

#### Golang solution

```go
func convert(s string, numRows int) string {
    if numRows <= 1 {
        return s
    }

    i, row := 0, 0
    down := true
    array := make([]string, numRows)

    for i = 0; i < len(s); i++ {
        array[row] += string(s[i])

        if row == 0 {
            down = true
        }

        if row == numRows - 1 {
            down = false
        }

        if down {
            row++
        } else {
            row--
        }
    }

    answer := ''

    for i = 0; i < numRows; i++ {
        answer += array[i]
    }

    return answer
}
```

#### Javascript solution

```javascript
var convert = function(s, numRows) {
    if( numRows <= 1 ){
        return s;
    }

    let i, row = 0;
    let down = true;
    let array = [];

    for( i = 0; i < numRows; i++ ){
        array[i] = '';
    }

    for( i = 0; i < s.length; i++ ){
        array[row] += s[i];

        if( row == 0 ){
            down = true;
        }

        if( row == numRows - 1 ){
            down = false;
        }

        down ? row++ : row--;
    }

    var answer = '';

    for( i = 0; i < numRows; i++ ){
        answer += array[i];
    }

    return answer;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: s = 'ABCDEFGH', numRows = 3

Step 1: if numRows <= 1
          3 <= 1
          false

Step 2: int i, row = 0
        bool down = true
        string array[numRows]
        string array[3];

Step 3: loop for i = 0; i < numRows; i++
          - set array[i] = '';

        numRows = 3
        so array[0] = array[1] = array[2] = ''

Step 4: loop for i = 0; i < s.size()
        i < 8
        0 < 8
        true

        array[row] += s[i]
        array[row] = array[0] + s[0]
                   = '' + 'A'
                   = 'A'
        array[0] = 'A'

        row == 0
        true
        down = true

        down ? row++ : row--
        row++
        row = 1

        i++
        i = 1

Step 5: loop for i < s.size()
        i < 8
        1 < 8
        true

        array[row] += s[i]
        array[row] = array[1] + s[1]
                   = '' + 'B'
                   = 'B'
        array[1] = 'B'

        row == 0
        false

        row == numRows - 1
        1 == 2
        false

        down ? row++ : row--
        row++
        row = 2

        i++
        i = 2

Step 6: loop for i < s.size()
        i < 8
        2 < 8
        true

        array[row] += s[i]
        array[row] = array[2] + s[2]
                   = '' + 'C'
                   = 'C'
        array[2] = 'C'

        row == 0
        false

        row == numRows - 1
        2 == 2
        true
        down = false

        down ? row++ : row--
        row--
        row = 1

        i++
        i = 3

Step 7: loop for i < s.size()
        i < 8
        3 < 8
        true

        array[row] += s[i]
        array[row] = array[1] + s[3]
                   = 'B' + 'D'
                   = 'BD'
        array[1] = 'BD'

        row == 0
        false

        row == numRows - 1
        1 == 2
        false

        down ? row++ : row--
        row--
        row = 0

        i++
        i = 4

Step 8: loop for i < s.size()
        i < 8
        4 < 8
        true

        array[row] += s[i]
        array[row] = array[0] + s[4]
                   = 'A' + 'E'
                   = 'AE'
        array[1] = 'AR'

        row == 0
        true
        down = true

        row == numRows - 1
        1 == 2
        false

        down ? row++ : row--
        row++
        row = 1

        i++
        i = 5

Step 9: loop for i < s.size()
        i < 8
        5 < 8
        true

        array[row] += s[i]
        array[row] = array[1] + s[5]
                   = 'BD' + 'F'
                   = 'BDF'
        array[1] = 'BDF'

        row == 0
        false

        row == numRows - 1
        1 == 2
        false

        down ? row++ : row--
        row++
        row = 2

        i++
        i = 6

Step 10: loop for i < s.size()
        i < 8
        6 < 8
        true

        array[row] += s[i]
        array[row] = array[2] + s[6]
                   = 'C' + 'G'
                   = 'CG'
        array[2] = 'CG'

        row == 0
        false

        row == numRows - 1
        2 == 2
        true
        down = false

        down ? row++ : row--
        row--
        row = 1

        i++
        i = 7

Step 11: loop for i < s.size()
        i < 8
        7 < 8
        true

        array[row] += s[i]
        array[row] = array[1] + s[7]
                   = 'BDF' + 'H'
                   = 'BDFH'
        array[1] = 'BDFH'

        row == 0
        false

        row == numRows - 1
        1 == 2
        false

        down ? row++ : row--
        row--
        row = 0

        i++
        i = 8

Step 11: loop for i < s.size()
        i < 8
        8 < 8
        false

Step 12: string answer = '';

Step 13: loop for( i = 0; i < numRows; i++ )
           answer += array[i];

        array[0] = 'AE'
        array[1] = 'BDFH'
        array[2] = 'CG'

        so answer is 'AEBDFHCG'

Step 14: return answer

So the answer is 'AEBDFHCG'
```
