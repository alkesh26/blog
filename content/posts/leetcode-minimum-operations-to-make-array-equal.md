---
title: LeetCode - Minimum Operations to Make Array Equal
description: LeetCode - return the minimum number of operations needed to make all the elements of arr equal using C++, Golang, and JavaScript.
date: 2023-02-25
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the minimum number of operations needed to make all the elements of arr equal, c++, golang, javascript"
---

## Problem statement

You have an array `arr` of length `n` where `arr[i] = (2 * i) + 1` for all valid values of `i` (i.e., `0 <= i < n`).

In one operation, you can select two indices `x` and `y` where `0 <= x, y < n` and subtract `1` from `arr[x]` and add `1` to `arr[y]` (i.e., perform `arr[x] -=1` and `arr[y] += 1`). The goal is to make all the elements of the array equal. It is guaranteed that all the elements of the array can be made equal using some operations.

Given an integer `n`, the length of the array, return *the minimum number of operations needed to make all the elements of arr equal.*

Problem statement taken from: <a href='https://leetcode.com/problems/minimum-operations-to-make-array-equal' target='_blank'>https://leetcode.com/problems/minimum-operations-to-make-array-equal</a>

**Example 1:**

```
Input: n = 3
Output: 2
Explanation: arr = [1, 3, 5]
First operation choose x = 2 and y = 0, this leads arr to be [2, 3, 4]
In the second operation choose x = 2 and y = 0 again, thus arr = [3, 3, 3].
```

**Example 2:**

```
Input: n = 6
Output: 9
```

**Constraints:**

```
- 1 <= n <= 10^4
```

### Explanation

#### Brute Force

As per the problem statement, the value at index `i` in the array is equal to `(2 * i) + 1`. The array of size n can be represented as follows:

```
arr = [2 * 0 + 1, 2 * 1 + 1, 2 * 2 + 1,.... 2 * (n - 1) + 1]

when n = 6
arr = [2 * 0 + 1, 2 * 1 + 1, 2 * 2 + 1, 2 * 3 + 1, 2 * 4 + 1, 2 * 5 + 1]
    = [1, 3, 5, 7, 9, 11]

when n = 7
arr = [1, 3, 5, 7, 9, 11, 13]
```

The array elements are ordered in a linear arithmetic series. Let's calculate the number of operations at each step.

```
arr = [1, 3, 5, 7, 9, 11, 13]

First operation, we will increase arr[0] = 1 by 1 and decrease arr[6] = 13 by 1.
arr = [2, 3, 5, 7, 9, 11, 12]

We repeat the above process till arr[0] and arr[6] = 7

Number of operations = 6

Similarly, for arr[1] and arr[5], the number of operations to update value to 7 will be 4.
For arr[2] and arr[4], the number of operations will be 2.

Total number of operations = 6 + 4 + 2
                           = 12

arr = [1, 3, 5, 7, 9, 11, 13, 15, 17]

First operation, we will increase arr[0] = 1 by 1 and decrease arr[8] = 17 by 1.
arr = [2, 3, 5, 7, 9, 11, 13, 15, 16]

We repeat the above process till arr[0] and arr[8] = 9

Number of operations = 8

Similarly, for arr[1] and arr[7], the number of operations to update the value to 9 will be 6.
For arr[2] and arr[6], the number of operations will be 4.
For arr[3] and arr[5], the number of operations will be 2.

Total number of operations = 8 + 6 + 4 + 2
                           = 20
```

From the above pattern, we observe at any step or index `i`, the number of operations is `n - 2 * i - 1`. The total number of operations will be

```
number_of_operations = 0

for(int i = 0; i < n / 2; i++) {
    number_of_operations += n - (2 * i) - 1
}

return number_of_operations
```

The time complexity of the above approach is **O(n)**, and the space complexity is **O(1)**.

#### Efficient approach

We can further optimize the above approach. Let's observe the pattern for the number of operations. For every i = 0, 1, 2,...(n/2) - 1, we get the series as

```
n - 1, n - 3, n - 5,.......7, 5, 3, 1.
```

This is an arithmetic series `a, a + d, a + 2d....`, where a = 1 and d = 2. The arithmetic sum of this series is

```
sum = n * (2 * a + (n - 1) * d) / 2
```

In our case, n = n / 2. We apply the above formula

```
sum = (n / 2) * (2 * 1 + (n/2 - 1) * 2) / 2
    = n * (2 + (n - 2)) / 4
    = n * (n) / 4
    = (n * n) / 4
```

When n is odd, the arithmetic series is `n - 1, n - 3,....5, 3, 1`. When n is even, the arithmetic series is `n - 1,...6, 4, 2`. We apply the same arithmetic series formula, reducing the sum to `(n * n) / 4`.

The time and space complexity of the above approach is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
class Solution {
public:
    int minOperations(int n) {
        return (n * n) >> 2;
    }
};
```

#### Golang solution

```go
func minOperations(n int) int {
    return (n * n) >> 2
}
```

#### JavaScript solution

```javascript
var minOperations = function(n) {
    return (n * n) >> 2;
};
```

For n = 6, we return the solution as (6 * 6) >> 2 = 9.
