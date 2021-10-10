---
title: LeetCode - Pascal's Triangle
description: LeetCode - Pascal's Triangle using C++, Golang and Javascript.
date: 2021-10-10
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - pascal's triangle, c++, golang, javascript"
---

### Problem statement

Given an integer **numRows**, return the first numRows of **Pascal's triangle**.

In **Pascal's triangle**, each number is the sum of the two numbers directly above it as shown:

Problem statement taken from: <a href="https://leetcode.com/problems/pascals-triangle" target="_blank">https://leetcode.com/problems/pascals-triangle</a>

![Container](./../pascals-triangle-animated.gif)

**Example 1:**

```
Input: numRows = 5
Output: [ [1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1] ]
```

**Example 2:**

```
Input: numRows = 1
Output: [[1]]
```

**Constraints:**

```
- 1 <= numRows <= 30
```

### Explanation

#### Brute force approach

A simple method is to run two loops and calculate the value of
Binominal Coefficient in the inner loop.

For example, the first line has **1**,
the second line has **1 1**,
the third line has **1 2 1**,.. and so on.
Every entry in a line is the value of a Binomial Coefficient.
The value of the ith entry in line number line is C(line, i).
The value can be calculated using the following formula.

```
C(line, i) = line! / ( (line-i)! * i! )
```

A small C++ snippet of the above logic is:

```cpp
void printPascal(int n)
{
    for (int line = 0; line < n; line++){
        for (int i = 0; i <= line; i++)
            cout <<" "<< binomialCoefficient(line, i);
        cout <<"\n";
    }
}

int binomialCoefficient(int n, int k)
{
    int result = 1;

    if (k > n - k)
        k = n - k;

    for (int i = 0; i < k; ++i){
        result *= (n - i);
        result /= (i + 1);
    }

    return result;
}
```

Since we are generating a coefficient for each iteration the
time complexity of the above problem is **O(N^3)**.

#### Optimized solution (O(N^2) time and O(N^2) extra space)

If we take a look at the Pascal triangle,
we can see that every entry is the sum of the two values above it.
So we created a 2D array that stores the previously generated
values.

A small C++ snippet of the above logic is:

```cpp
for (int line = 0; line < n; line++) {
    for (int i = 0; i <= line; i++) {
        if (line == i || i == 0)
            arr[line][i] = 1;
        else
            arr[line][i] = arr[line - 1][i - 1] + arr[line - 1][i];
        cout << arr[line][i] << " ";
    }
    cout << "\n";
}
```

#### Optimized solution (O(N^2) time and O(1) extra space)

This approach is based on the Brute force approach.
The binomial coefficient of *ith* entry can be represented as
**C(line, i)** and all lines start with value 1.
The idea here is to calculate **C(line, i)** using
**C(line, i - 1)**.
 It can be calculated in O(1) time using the following.

```
C(line, i)     = line! / ( (line - i)! * i! )
C(line, i - 1) = line! / ( (line - i + 1)! * (i - 1)! )

So using the above approach we  can change the formula as below:
C(line, i)     = C(line, i - 1) * (line - i + 1) / i

C(line, i) can be calculated from C(line, i - 1) in O(1) time.
```

Let's check the algorithm:

```
- initialize vector<vector<int>> result

- loop for line = 1; line <= n; line++
  - initialize vector<int> temp
  - set C = 1

  - loop for i = 1; i <= line; i++
    - temp.push_back(C)
    - C = C * (line - i) / i

  - result.push_back(temp)

- return result
```

##### C++ Solution

```cpp
class Solution {
public:
    vector<vector<int>> generate(int numRows) {
        vector<vector<int>> result;

        for (int line = 1; line <= numRows; line++){
            vector<int> temp;
            int C = 1;

            for (int i = 1; i <= line; i++){
                temp.push_back(C);
                C = C * (line - i) / i;
            }

            result.push_back(temp);
        }

        return result;
    }
};
```

##### Golang Solution

```go
func generate(numRows int) [][]int {
    var result [][]int

    for line := 1; line <= numRows; line++ {
        var temp []int
        C := 1

        for i := 1; i <= line; i++ {
            temp = append(temp, C);
            C = C * (line - i) / i;
        }

        result = append(result, temp)
    }

    return result
}
```

##### Javascript solution

```javascript
var generate = function(numRows) {
    var result = [];

    for(let line = 1; line <= numRows; line++){
        var temp = [];
        let C = 1;

        for(let i = 1; i <= line; i++){
            temp.push(C);
            C = C * (line - i) / i;
        }

        result.push(temp);
    }

    return result;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: numRows = 3

Step 1: initialize vector<vector<int>> result

Step 2: loop for line = 1; line <= numRows
        1 <= 3
        true

        initialize vector<int> temp

        C = 1

        loop for i = 1; i <= line
        1 <= 1
        true

        temp.push_back(C);
        temp = [1]

        C = C * (line - i) / i;
        C = 1 * (1  - 1) / 1
        C = 0

        i++
        i = 2

        loop for i <= line
        2 <= 1
        false

        result.push_back(temp)

        result = [[1]]

        line++
        line = 2

Step 3: loop for line <= numRows
        2 <= 3
        true

        initialize vector<int> temp

        C = 1

        loop for i = 1; i <= line
        1 <= 2
        true

        temp.push_back(C);
        temp = [1]

        C = C * (line - i) / i
        C = 1 * (2  - 1) / 1
        C = 1 * 1 / 1

        i++
        i = 2

        loop for i <= line
        2 <= 2
        true

        loop for i <= line
        2 <= 2
        true

        temp.push_back(C);
        temp = [1, 1]

        C = C * (line - i) / i
        C = 1 * (2  - 2) / 1
        C = 1 * 0 / 1
        C = 0

        i++
        i = 3

        loop for i <= line
        3 <= 2
        false

        result.push_back(temp)

        result = [[1], [1, 1]]

        line++
        line = 3

Step 4: loop for line <= numRows
        3 <= 3
        true

        initialize vector<int> temp

        C = 1

        loop for i = 1; i <= line
        1 <= 3
        true

        temp.push_back(C);
        temp = [1]

        C = C * (line - i) / i
        C = 1 * (3 - 1) / 1
        C = 1 * 2 / 1
        C = 2

        i++
        i = 2

        loop for i <= line
        2 <= 3
        true

        temp.push_back(C);
        temp = [1, 2]

        C = C * (line - i) / i
        C = 2 * (3 - 2) / 2
        C = 2 * 1 / 2
        C = 1

        i++
        i = 3

        loop for i <= line
        3 <= 3
        true

        temp.push_back(C);
        temp = [1, 2, 1]

        C = C * (line - i) / i
        C = 1 * (3 - 3) / 3
        C = 1 * 0 / 3
        C = 0

        i++
        i = 4

        loop for i <= line
        4 <= 3
        false

        result.push_back(temp)
        result = [[1], [1, 1], [1, 2, 1]]

        line++
        line = 4

Step 5: loop for line <= numRows
        4 <= 3
        false

Step 6: return result

So the result is [[1], [1, 1], [1, 2, 1]].
```
