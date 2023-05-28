---
title: LeetCode - Plus One
description: LeetCode - Plus One using C++, Golang and Javascript.
date: 2021-07-25
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - plus one, c++, golang, javascript"
---

## Problem statement

Given a **non-empty** array of decimal digits representing a non-negative integer,
increment one to the integer.

The digits are stored such that the most significant digit is at the head of the list,
and each element in the array contains a single digit.

You may assume the integer does not contain any leading zero,
except the number 0 itself.

Problem statement taken from: <a href='https://leetcode.com/problems/plus-one' target='_blank'>https://leetcode.com/problems/plus-one</a>

**Example 1:**

```
Input: digits = [1, 2, 3]
Output: [1, 2, 4]
Explanation: The array represents the integer 123.
```

**Example 2:**

```
Input: digits = [4, 3, 2, 1]
Output: [4, 3, 2, 2]
Explanation: The array represents the integer 4321.
```

**Example 3:**

```
Input: digits = [0]
Output: [1]
```

**Constraints:**

```
- <= digits.length <= 100
- 0 <= digits[i] <= 9
```

### Explanation

#### Brute Force approach

The basic approach that comes to our mind is converting the array into
number, increment it by 1, and then return the result in array form.

But for a very large array that cannot fit into a given data
type this approach can fail.

#### Incrementing from right to left

We can use the below algorithm to solve this problem:

```
- start from the last index of the array and process each digit till the first index.

- if the current digit is smaller than 9, add one to the current digit,
and return the array else assign zero to the current digit.

- if the first element is 9, then it means all the digits are 9.
  - increase the array size by 1, and set the first digit as 1.

- return array
```

#### C++ solution

```cpp
class Solution {
public:
    vector<int> plusOne(vector<int> &digits)
    {
        int i, size = digits.size(), carry = 1;

        for (i = size - 1; i >= 0 && carry != 0; i--){
            carry += digits[i];
            digits[i] = carry % 10;
            carry = carry / 10;
        }

        if( carry != 0 ){
            digits.emplace(digits.begin(), 1);
        }

        return digits;
    }
};
```

#### Golang solution

```go
func plusOne(digits []int) []int {
    carry := 1

    for i:= len(digits) - 1; i >= 0; i-- {
        digits[i] += carry

        if digits[i] < 10 {
            return digits
        } else {
            digits[i] = 0
            carry = 1
        }
    }

    if carry != 0 {
        return append([]int{1}, digits...)
    } else {
        return digits
    }
}
```

#### Javascript solution

```javascript
var plusOne = function(digits) {
    for(let i = digits.length - 1; i >= 0; i--) {
        digits[i]++;

        if( digits[i] > 9 ){
            digits[i] = 0;
        } else{
            return digits;
        }
    }

    digits.unshift(1);
    return digits;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: digits = [8, 9, 9, 9]

Step 1: size = digits.size()
             = 4

        carry = 1

Step 2: i = size - 1
          = 4 - 1
          = 3

        i >= 0 && carry != 0
        3 >= 0 && 1 != 0
        true

        carry += digits[i]
              += digits[3]
              += 9

        carry = 10

        digits[3] = 10 % 10;
                  = 0

        carry = 10 / 10
              = 1

        i--
        i = 2

Step 3: i >= 0 && carry != 0
        2 >= 0 && 1 != 0
        true

        carry += digits[i]
              += digits[2]
              += 9

        carry = 10

        digits[2] = 10 % 10;
                  = 0

        carry = 10 / 10
              = 1

        i--
        i = 1

Step 4: i >= 0 && carry != 0
        1 >= 0 && 1 != 0
        true

        carry += digits[i]
              += digits[1]
              += 9

        carry = 10

        digits[1] = 10 % 10;
                  = 0

        carry = 10 / 10
              = 1

        i--
        i = 0

Step 4: i >= 0 && carry != 0
        0 >= 0 && 1 != 0
        true

        carry += digits[i]
              += digits[0]
              += 8

        carry = 9

        digits[1] = 9 % 10;
                  = 9

        carry = 9 / 10
              = 0

        i--
        i = -1

Step 5: carry != 0
        0 != 0
        false

Step 6: return digits

So the answer is [9, 0, 0, 0].
```
