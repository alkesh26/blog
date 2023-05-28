---
title: LeetCode - Gray Code
description: LeetCode - return any valid n-bit gray code sequence using C++, Golang, and JavaScript.
date: 2023-01-28
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return any valid n-bit gray code sequence, c++, golang, javascript"
---

## Problem statement

An **n-bit gray code sequence** is a sequence of `2^n` integers where:

- Every integer is in the **inclusive** range [0, 2^n - 1],
- The first integer is 0,
- An integer appears **no more than once** in the sequence,
- The binary representation of every pair of **adjacent** integers differs by **exactly one bit**, and
- The binary representation of the **first** and **last** integers differs by **exactly one bit**.

Given an integer `n`, return *any valid **n-bit gray code sequence***.

Problem statement taken from: <a href='https://leetcode.com/problems/gray-code' target='_blank'>https://leetcode.com/problems/gray-code</a>

**Example 1:**

```
Input: n = 2
Output: [0, 1, 3, 2]
Explanation:
The binary representation of [0, 1, 3, 2] is [00, 01, 11, 10].
- 00 and 01 differ by one bit
- 01 and 11 differ by one bit
- 11 and 10 differ by one bit
- 10 and 00 differ by one bit
[0, 2, 3, 1] is also a valid gray code sequence, whose binary representation is [00, 10, 11, 01].
- 00 and 10 differ by one bit
- 10 and 11 differ by one bit
- 11 and 01 differ by one bit
- 01 and 00 differ by one bit
```

**Example 2:**

```
Input: n = 1
Output: [0, 1]
```

**Constraints:**

```
- 1 <= n <= 16
```

### Explanation

#### Using list

n-bit Gray Codes can be generated using lists. We create two lists L1 and L2, where L2 is the reverse of L1. We modify the list L1 by prefixing `0` in all gray codes of L1. We modify the L2 list by prefixing `1` in all gray codes. In the end, we concatenate L1 and L2. The concatenated list is the required list of n-bit Gray codes.

The C++ snippet of the above approach is as below:

```cpp
vector<string> result;

result.push_back('0');
result.push_back('1');

int i, j;

for(i = 2; i < (1 << n); i = i << 1) {
    for (j = i-1; j >= 0; j--)
        result.push_back(result[j]);

    for (j = 0; j < i; j++)
        result[j] = '0' + result[j];

    for (j = i; j < 2 * i; j++)
        result[j] = '1' + result[j];
}

for(i = 0; i < result.size(); i++)
    cout << result[i] << endl;
```

The time complexity and the space complexity of the above approach is **O(2^n)**.

#### Using Recursion

We can also use a recursive approach, where we append `0` and `1` each time till the number of bits is not equal to `n`. A C++ snippet using recursion is as below:

```cpp
if (n <= 0)
    return { '0' };

if (n == 1) {
    return {'0', '1'};
}

vector<string> recursionResult = generateGray(n - 1);
vector<string> result;

for(int i = 0; i < recursionResult.size(); i++) {
    string s = recursionResult[i];
    result.push_back('0' + s);
}

for(int i = recursionResult.size() - 1; i >= 0;i--) {
    string s = recursionResult[i];
    result.push_back('1' + s);
}

return result;
```

#### Using Bitset

A gray code for a number `x` can be generated using the below bitwise operation.

```cpp
x ^ (x >> 1)

// x = 3
3 ^ (3 >> 1)
3 ^ 1
2

// x = 7
7 ^ (7 >> 1)
7 ^ 3
4
```

For n-bit gray code, there will be `2^n` number of combinations generated. We can use a simple for loop to generate all these combinations.

Let's check the algorithm first.

```
- initialize vector<int> result

- loop for i = 0; i < (1 << n); i++
  - result.push_back(i ^ (i >> 1))

- return result
```

The time complexity and the space complexity of the above approach is **O(n)**.

Let's check our algorithm in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
class Solution {
public:
    vector<int> grayCode(int n) {
        vector<int> result;

        for(int i = 0; i < (1 << n); i++) {
            result.push_back(i ^ (i >> 1));
        }

        return result;
    }
};
```

#### Golang solution

```go
func grayCode(n int) []int {
    size := int(math.Pow(2, float64(n)))
    result := make([]int, size)

    for i := 0; i < (1 << n); i++ {
        result[i] = i^(i>>1)
    }

    return result
}
```

#### JavaScript solution

```javascript
var grayCode = function(n) {
    let result = [];

    for(let i = 0; i < (1 << n); i++) {
        result.push(i ^ (i >> 1));
    }

    return result;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: n = 3

Step 1: initialize vector<int> result

Step 2: loop for i = 0; i < (1 << n)
          0 < (1 << 3)
          0 < 8
          true

          result.push_back(i ^ (i >> 1))
          result.push_back(0 ^ (0 >> 1))
          result.push_back(0 ^ (0))
          result.push_back(0)
          result = [0]

          i++
          i = 1

Step 3: loop for i < (1 << n)
          1 < (1 << 3)
          1 < 8
          true

          result.push_back(i ^ (i >> 1))
          result.push_back(1 ^ (1 >> 1))
          result.push_back(1 ^ (0))
          result.push_back(1)
          result = [0, 1]

          i++
          i = 2

Step 4: loop for i < (1 << n)
          2 < (1 << 3)
          2 < 8
          true

          result.push_back(i ^ (i >> 1))
          result.push_back(2 ^ (2 >> 1))
          result.push_back(2 ^ (1))
          result.push_back(3)
          result = [0, 1, 3]

          i++
          i = 3

Step 5: loop for i < (1 << n)
          3 < (1 << 3)
          3 < 8
          true

          result.push_back(i ^ (i >> 1))
          result.push_back(3 ^ (3 >> 1))
          result.push_back(3 ^ (1))
          result.push_back(2)
          result = [0, 1, 3, 2]

          i++
          i = 4

Step 6: loop for i < (1 << n)
          4 < (1 << 3)
          4 < 8
          true

          result.push_back(i ^ (i >> 1))
          result.push_back(4 ^ (4 >> 1))
          result.push_back(4 ^ (2))
          result.push_back(6)
          result = [0, 1, 3, 2, 6]

          i++
          i = 5

Step 7: loop for i < (1 << n)
          5 < (1 << 3)
          5 < 8
          true

          result.push_back(i ^ (i >> 1))
          result.push_back(5 ^ (5 >> 1))
          result.push_back(5 ^ (2))
          result.push_back(7)
          result = [0, 1, 3, 2, 6, 7]

          i++
          i = 6

Step 8: loop for i < (1 << n)
          6 < (1 << 3)
          6 < 8
          true

          result.push_back(i ^ (i >> 1))
          result.push_back(6 ^ (6 >> 1))
          result.push_back(6 ^ (3))
          result.push_back(5)
          result = [0, 1, 3, 2, 6, 7, 5]

          i++
          i = 7

Step 9: loop for i < (1 << n)
          7 < (1 << 3)
          7 < 8
          true

          result.push_back(i ^ (i >> 1))
          result.push_back(7 ^ (7 >> 1))
          result.push_back(7 ^ (3))
          result.push_back(4)
          result = [0, 1, 3, 2, 6, 7, 5, 4]

          i++
          i = 8

Step 10: loop for i < (1 << n)
          8 < (1 << 3)
          8 < 8
          false

Step 11: return result

We return the answer as [0, 1, 3, 2, 6, 7, 5, 4].
```
