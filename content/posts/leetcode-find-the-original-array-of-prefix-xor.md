---
title: LeetCode - Find The Original Array of Prefix XOR
description: Given a sequence arr[] of N - 1 elements which is xor of all adjacent pairs in an array, the task is to find that original array from the arr[].
date: 2023-02-12
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "given a sequence arr[] of N - 1 elements which is xor of all adjacent pairs in an array, the task is to find that original array from the arr[], c++, golang, javascript"
---

## Problem statement

You are given an **integer** array `pref` of size `n`. Find and return *the array arr of size n that satisfies*:

```
- pref[i] = arr[0] ^ arr[1] ^ ... ^ arr[i].
```

Note that ^ denotes the bitwise-xor operation.

It can be proven that the answer is unique.

Problem statement taken from: <a href='https://leetcode.com/problems/find-the-original-array-of-prefix-xor' target='_blank'>https://leetcode.com/problems/find-the-original-array-of-prefix-xor</a>

**Example 1:**

```
Input: pref = [5, 2, 0, 3, 1]
Output: [5, 7, 2, 3, 2]
Explanation: From the array [5, 7, 2, 3, 2] we have the following:
- pref[0] = 5.
- pref[1] = 5 ^ 7 = 2.
- pref[2] = 5 ^ 7 ^ 2 = 0.
- pref[3] = 5 ^ 7 ^ 2 ^ 3 = 3.
- pref[4] = 5 ^ 7 ^ 2 ^ 3 ^ 2 = 1.
```

**Example 2:**

```
Input: pref = [13]
Output: [13]
Explanation: We have pref[0] = arr[0] = 13.
```

**Constraints:**

```
- 1 <= pref.length <= 10^5
- 0 <= pref[i] <= 10^6
```

### Explanation

For an XOR operator, we have the following set of operations to be true.

```
a ^ b = c
a ^ c = b

Eg

5 ^ 7 = 2
5 ^ 2 = 7
```

We use this approach to get back our original array.

Let's check the algorithm first.

```
- set n = pref.size()

- if n == 0 || n == 1
  - return pref

- loop for i = n - 1; i >= 1; i--
  - pref[i] = pref[i] ^ pref[i - 1]

- return pref
```

The time complexity of the above approach is **O(n)**, and the space complexity is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
class Solution {
public:
    vector<int> findArray(vector<int>& pref) {
        int n = pref.size();

        if(n == 0 || n == 1) {
            return pref;
        }

        for(int i = n - 1; i >= 1; i--) {
            pref[i] ^= pref[i - 1];
        }

        return pref;
    }
};
```

#### Golang solution

```go
func findArray(pref []int) []int {
    n := len(pref)

    if n == 0 || n == 1 {
        return pref
    }

    for i := n - 1; i >= 1; i-- {
        pref[i] ^= pref[i - 1]
    }

    return pref
}
```

#### JavaScript solution

```javascript
var findArray = function(pref) {
    let n = pref.length;

    if(n === 0 || n === 1) {
        return pref;
    }

    for(let i = n - 1; i >= 1; i--) {
        pref[i] ^= pref[i - 1];
    }

    return pref;
};
```

Let's dry-run our algorithm for **Example 1**.

```
Input: pref = [5, 2, 0, 3, 1]

Step 1: n = pref.size()
          = 5

Step 2: if n == 0 || n == 1
           5 == 0 || 5 == 1
           false

Step 3: loop for i = n - 1; i >= 1; i--
          i = 5 - 1 = 4
          4 >= 1
          true

          pref[i] = pref[i] ^ pref[i - 1]
                  = pref[4] ^ pref[3]
                  = 1 ^ 3
                  = 2

          pref = [5, 2, 0, 3, 2]

          i--
          i = 3

Step 4: loop for i >= 1
          3 >= 1
          true

          pref[i] = pref[i] ^ pref[i - 1]
                  = pref[3] ^ pref[2]
                  = 3 ^ 0
                  = 3

          pref = [5, 2, 0, 3, 2]

          i--
          i = 2

Step 5: loop for i >= 1
          2 >= 1
          true

          pref[i] = pref[i] ^ pref[i - 1]
                  = pref[2] ^ pref[1]
                  = 0 ^ 2
                  = 2

          pref = [5, 2, 2, 3, 2]

          i--
          i = 1

Step 6: loop for i >= 1
          1 >= 1
          true

          pref[i] = pref[i] ^ pref[i - 1]
                  = pref[1] ^ pref[0]
                  = 2 ^ 5
                  = 7

          pref = [5, 7, 2, 3, 2]

          i--
          i = 0

Step 7: loop for i >= 1
          0 >= 1
          false

Step 8: return pref

We return the answer as [5, 7, 2, 3, 2].
```
