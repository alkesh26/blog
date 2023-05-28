---
title: LeetCode - Pascal's Triangle II
description: LeetCode - return the rowIndexth row of Pascal's triangle using C++, Golang, and Javascript.
date: 2022-08-21
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the rowIndexth row of Pascal's triangle, c++, golang, javascript."
---

## Problem statement

Given an integer rowIndex, return the rowIndexth (0-indexed) row of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it, as shown:

Problem statement taken from: <a href='https://leetcode.com/problems/pascals-triangle-ii' target='_blank'>https://leetcode.com/problems/pascals-triangle-ii</a>

![Container](./../pascals-triangle-animated.gif)

**Example 1:**

```
Input: rowIndex = 3
Output: [1, 3, 3, 1]
```

**Example 2:**

```
Input: rowIndex = 0
Output: [1]
```

**Example 3:**

```
Input: rowIndex = 1
Output: [1, 1]
```

**Constraints:**

```
0 <= rowIndex <= 33
```

### Explanation

#### Generate Pascal Triangle and return the row

The problem is almost similar to our previous blog, where we generated the
[Pascals Triangle](https://alkeshghorpade.me/post/leetcode-pascals-triangle).
Here, we have to return the particular row of the triangle instead of
generating it.

We can use the 3rd approach as mentioned in the
[Pascals Triangle](https://alkeshghorpade.me/post/leetcode-pascals-triangle) blog
and return the rowIndexth.

The time-complexity of this approach is **O(N^2)**, and space complexity is **O(1)**.

#### O(N) solution

If we carefully observe the above approach, we need not generate the full pascals
triangle and directly compute the coefficients.

Let's jump to the algorithm to understand it better.

```
- initialize result array

- set c = 1

  // push c into result
  result.push(c)

- loop for i = 1; i <= rowIndex; i++
  // generate the coefficient using the below formula
  - c = c * (rowIndex + 1 - i) / i

  // push the generated coefficient in the result
  - result.push(c)

- return result
```

The time-complexity of this approach is **O(N)**, and space complexity is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    vector<int> pascalRow(int rowIndex) {
        vector<int> result;

        long int c = 1;
        result.push_back(c);

        for(int i = 1; i <= rowIndex; i++) {
            c = c*(rowIndex + 1 - i)/i;
            result.push_back(c);
        }

        return result;
    }

    vector<int> getRow(int rowIndex) {
        return pascalRow(rowIndex);
    }
};
```

#### Golang solution

```go
func pascalRow(rowIndex int) []int {
    result := make([]int, rowIndex + 1)
    c := 1

    result[0] = c

    for i := 1; i <= rowIndex; i++ {
        c = c*(rowIndex + 1 - i)/i
        result[i] = c
    }

    return result
}

func getRow(rowIndex int) []int {
    return pascalRow(rowIndex)
}
```

#### Javascript solution

```javascript
var pascalRow = function(rowIndex) {
    let result = [];
    let c = 1;

    result.push(c);

    for(let i = 1; i <= rowIndex; i++) {
        c = c*(rowIndex + 1 - i)/i;
        result.push(c);
    }

    return result;
}

var getRow = function(rowIndex) {
    return pascalRow(rowIndex);
};
```

#### Dry Run

Let's dry-run our algorithm for **Example 1**.

```
Input: rowIndex = 3

Step 1: vector<int> result
        int c = 1

Step 2: result.push_back(c)
        result = [1]

Step 3: loop for i = 1; i <= rowIndex
        1 <= 3
        true

        c = c * (rowIndex + 1 - i) / i
          = 1 * (3 + 1 - 1) / 1
          = 1 * 3
          = 3

        result.push_back(c)
        result = [1, 3]

        i++
        i = 2

Step 4: loop for i <= rowIndex
        2 <= 3
        true

        c = c * (rowIndex + 1 - i) / i
          = 3 * (3 + 1 - 2) / 2
          = 3 * 1
          = 3

        result.push_back(c)
        result = [1, 3, 3]

        i++
        i = 3

Step 5: loop for i <= rowIndex
        3 <= 3
        true

        c = c * (rowIndex + 1 - i) / i
          = 3 * (3 + 1 - 3) / 3
          = 3 * 1 / 3
          = 1

        result.push_back(c)
        result = [1, 3, 3, 1]

        i++
        i = 4

Step 6: loop for i <= rowIndex
        4 <= 3
        false

Step 7: return result

We return the result as [1, 3, 3, 1].
```
