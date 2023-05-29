---
title: LeetCode - Excel Sheet Column Title
description: LeetCode - return the corresponding column title as it appears in an Excel sheet using C++, Golang, and JavaScript.
date: 2023-02-09
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "return the corresponding column title as it appears in an Excel sheet, c++, golang, javascript"
---

## Problem statement

Given an integer `columnNumber`, return *its corresponding column title as it appears in an Excel sheet*.

For example:

```
A -> 1
B -> 2
C -> 3
...
Z -> 26
AA -> 27
AB -> 28
...
```

Problem statement taken from: <a href='https://leetcode.com/problems/excel-sheet-column-title' target='_blank'>https://leetcode.com/problems/excel-sheet-column-title</a>

**Example 1:**

```
Input: columnNumber = 1
Output: 'A'
```

**Example 2:**

```
Input: columnNumber = 28
Output: 'AB'
```

**Example 3:**

```
Input: columnNumber = 701
Output: 'ZY'
```

**Constraints:**

```
- 1 <= columnNumber <= 2^31 - 1
```

### Explanation

This is one of the easiest problem in LeetCode. We need to follow the below algorithm to get the answer.

```
- initialize allAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  answer = ''
  reminder = 0

- loop while columnNumber > 0
  - set columnNumber = columnNumber - 1

  - set reminder = columnNumber % 26

  - update answer.push_back(allAlphabets[reminder])

  - update columnNumber = columnNumber / 26
- while end

- reverse(answer.begin(), answer.end())

- return answer
```

The time complexity of the above approach is **O(log26(n))**, and the space complexity is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
class Solution {
public:
    string convertToTitle(int columnNumber) {
        string allAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        string answer = '';
        int reminder;

        while(columnNumber > 0) {
            columnNumber -= 1;
            reminder = columnNumber % 26;
            answer.push_back(allAlphabets[reminder]);
            columnNumber /= 26;
        }

        reverse(answer.begin(), answer.end());
        return answer;
    }
};
```

#### Golang solution

```go
func convertToTitle(columnNumber int) string {
    allAlphabets := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    answer := ''
    reminder := 0

    for columnNumber > 0 {
        columnNumber -= 1
        reminder = columnNumber % 26
        answer += string(allAlphabets[reminder])
        columnNumber /= 26
    }

    return reverse(answer)
}

func reverse(s string) string {
    runes := []rune(s)
    for i, j := 0, len(runes) - 1; i < j; i, j = i + 1, j - 1 {
        runes[i], runes[j] = runes[j], runes[i]
    }
    return string(runes)
}
```

#### JavaScript solution

```javascript
var convertToTitle = function(columnNumber) {
    let allAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let answer = '';
    let reminder;

    while(columnNumber > 0) {
        columnNumber -= 1;
        reminder = columnNumber % 26;
        answer += allAlphabets[reminder];
        columnNumber = Math.floor(columnNumber / 26);
    }

    return answer.split('').reverse().join('');
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: columnNumber = 1092

Step 1: allAlphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        answer = ''
        reminder = 0

Step 2: loop while columnNumber > 0
          1092 > 0
          true

          columnNumber = columnNumber - 1
                       = 1092 - 1
                       = 1091

          reminder = columnNumber % 26
                   = 1091 % 26
                   = 25

          answer.push_back(allAlphabets[reminder])
          answer.push_back(allAlphabets[25])
          answer.push_back('Z')
          answer = 'Z'

          columnNumber = columnNumber / 26
                       = 1091 / 26
                       = 41

Step 2: loop while columnNumber > 0
          41 > 0
          true

          columnNumber = columnNumber - 1
                       = 41 - 1
                       = 40

          reminder = columnNumber % 26
                   = 40 % 26
                   = 14

          answer.push_back(allAlphabets[reminder])
          answer.push_back(allAlphabets[14])
          answer.push_back('O')
          answer = 'ZO'

          columnNumber = columnNumber / 26
                       = 40 / 26
                       = 1

Step 3: loop while columnNumber > 0
          1 > 0
          true

          columnNumber = columnNumber - 1
                       = 1 - 1
                       = 0

          reminder = columnNumber % 26
                   = 0 % 26
                   = 0

          answer.push_back(allAlphabets[reminder])
          answer.push_back(allAlphabets[0])
          answer.push_back('A')
          answer = 'ZOA'

          columnNumber = columnNumber / 26
                       = 1 / 26
                       = 0

Step 4: loop while columnNumber > 0
          0 > 0
          false

Step 5: reverse(answer.begin(), answer.end())
        answer = 'AOZ'

Step 6: retrun answer

We return the answer as AOZ.
```
