---
title: LeetCode - Bitwise AND of Numbers Range
description: LeetCode - return the bitwise AND of all numbers in this range, inclusive using C++, Golang, and JavaScript.
date: 2023-04-15
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the bitwise AND of all numbers in this range, c++, golang, javascript"
---

## Problem statement

Given two integers `left` and `right` that represent the range `[left, right]`, return *the bitwise AND of all numbers in this range, inclusive*.

Problem statement taken from: <a href='https://leetcode.com/problems/bitwise-and-of-numbers-range' target='_blank'>https://leetcode.com/problems/bitwise-and-of-numbers-range</a>

**Example 1:**

```
Input: left = 5, right = 7
Output: 4
```

**Example 2:**

```
Input: left = 0, right = 0
Output: 0
```

**Example 3:**

```
Input: left = 1, right = 2147483647
Output: 0
```

**Constraints:**

```
0 <= left <= right <= 2^31 - 1
```

### Explanation

#### Naive solution

A naive solution is to iterate from left to right and do bit-wise AND of all the numbers. An efficient solution to this is as follows:

1. Find the position of the Most Significant Bit (MSB) in both numbers
2. If the positions of MSB are different, then the result is 0
3. If positions are the same, set the position in msbPos
4. We add 2^msbPos to result
5. We subtract 2^msbPos from the left and right
6. Repeat steps 1, 2, and 3 for new values of left and right

A C++ snippet of the above approach is as follows:

```cpp
int msbPos(long long int number) {
    int msbPosition = -1;

    while(number) {
        number = number >> 1;
        msbPosition++;
    }

    return msbPosition;
}

int rangeBitwiseAnd(int left, int right) {
    long long int result = 0;

    while (left && right) {
        int msbLeft = msbPos(left);
        int msbRight = msbPos(right);

        if (msbLeft != msbRight)
            break;

        long long int msbValue =  (1 << msbLeft);
        result = result + msbValue;

        left = left - msbValue;
        right = right - msbValue;
    }

    return result;
}
```

The time complexity of this approach is **O(log(max(left, right)))**. The space complexity is **O(1)**.

#### Efficient solution

Instead of finding the MSB of the left and right numbers, we flip the LSB of the right number. We check if the new number after flipping LSB of right is in the range `left < number < right` or not. If the number is greater than `left` again flip LSB. If the new number is not greater than the left, we return the new number as our answer.

A C++ snippet of the above approach is as follows:

```
int rangeBitwiseAnd(int left, int right) {
    for(int i = 0; i < (int)log2(right) + 1; i++) {
        if (right <= left) {
            return right;
        }

        if (right & (1 << i)) {
            right &= ~(1UL << i);
        }
    }

    return right;
}
```

The time complexity of this approach is **O(log(right))**. The space complexity is **O(1)**.

**Another approach**

If a number n is a power of 2 then (n &(n – 1)) is equal to 0. Now, if the left is less than 2^k and the right is greater than or equal to 2^k, then the & of all values in between left and right should be zero as (2^k & (2^k – 1)) is equal to 0.

If both left and right lie within the same number of bits then the only answer won't be zero. Now, in every case last bit is bound to be zero because even if left and right are 2 side-by-side numbers last bit will be different. Similarly, 2nd last bit will be zero if the difference between left and right is greater than 2 and this goes on for every bit.

For example, if left = 1100(12) and right = 1111(15), then the last bit should be zero of the answer. For 2nd last bit, we need to check whether left/2 == right/2 because if they are equal then we know that right – left <= 2. So if left/2 and right/2 are not equal then we proceed. The 3rd last bit should have a difference of 4 which can be checked by left/4 != right/4. Hence we check every bit from last until left != right and in every step we modify left /= 2(left >> 1) and right /= 2(right >> 1) to reduce a bit from the end.

Let's check the algorithm to understand it better.

#### Algorithm

```
- set shiftcount = 0

- loop while left != right && left > 0
  - shiftcount++

  - left = left >> 1
  - right = right >> 1
- while end

- return left << shiftcount
```

The time complexity of this approach is **O(log(max(left, right)))**. The space complexity is **O(1)**.

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        int shiftcount = 0;

        while(left != right && left > 0) {
            shiftcount++;
            left = left >> 1;
            right = right >> 1;
        }

        return int64_t(left << shiftcount);
    }
};
```

#### Golang solution

```go
func rangeBitwiseAnd(left int, right int) int {
    shiftcount := 0

    for left != right && left > 0 {
        shiftcount++
        left = left >> 1;
        right = right >> 1;
    }

    return left << shiftcount
}
```

#### JavaScript solution

```javascript
var rangeBitwiseAnd = function(left, right) {
    let shiftcount = 0;

    while(left != right && left > 0) {
        shiftcount++;
        left = left >> 1;
        right = right >> 1;
    }

    return left << shiftcount;
}
```

#### Dry Run

Let's dry-run our algorithm for a few examples to see how the solution works.

```
Input: left = 5
       right = 7

Step 1: shiftcount = 0

Step 2: loop while left != right && left > 0
          5 != 7 && 5 > 0
          true

          shiftcount++
          shiftcount = shiftcount + 1
                     = 0 + 1
                     = 1

          left = left >> 1
               = 5 >> 1
               = 2

          right = right >> 1
                = 7 >> 1
                = 3

Step 3: loop while left != right && left > 0
          2 != 3 && 2 > 0
          true

          shiftcount++
          shiftcount = shiftcount + 1
                     = 1 + 1
                     = 2

          left = left >> 1
               = 2 >> 1
               = 1

          right = right >> 1
                = 3 >> 1
                = 1

Step 4: loop while left != right && left > 0
          1 != 1 && 1 > 0
          false

Step 5: return left << shiftcount
          1 << 2
          4

We return the answer as 4.
```
