---
title: LeetCode - Valid Number
description: LeetCode - return true if a string is a valid number using C++, Golang, and JavaScript.
date: 2023-03-30
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return true if a string is a valid number, c++, golang, javascript"
---

## Problem statement

A **valid number** can be split up into these components (in order):

A **decimal number** or an **integer**.

(Optional) An `'e'` or `'E'`, followed by an **integer**.

A **decimal number** can be split up into these components (in order):

(Optional) A sign character (either `'+'` or `'-'`).

One of the following formats:
One or more digits, followed by a dot `'.'`.

One or more digits, followed by a dot `'.'`, followed by one or more digits.

A dot `'.'`, followed by one or more digits.

An **integer** can be split up into these components (in order):

(Optional) A sign character (either `'+'` or `'-'`).

One or more digits.

For example, all the following are valid numbers: ['2', '0089', '-0.1', '+3.14', '4.', '-.9', '2e10', '-90E3', '3e+7', '+6e-1', '53.5e93', '-123.456e789'], while the following are not valid numbers: ['abc', '1a', '1e', 'e3', '99e2.5', '--6', '-+3', '95a54e53'].

Given a string `s`, return `true` if `s` is a **valid number**.

Problem statement taken from: <a href='https://leetcode.com/problems/valid-number' target='_blank'>https://leetcode.com/problems/valid-number</a>

**Example 1:**

```
Input: s = '0'
Output: true
```

**Example 2:**

```
Input: s = 'e'
Output: false
```

**Example 3:**

```
Input: s = '.'
Output: false
```

**Constraints:**

```
- 1 <= s.length <= 20
- s consists of only English letters (both uppercase and lowercase), digits (0-9), plus '+', minus '-', or dot '.'.
```

### Explanation

In these kinds of problems, we should first check the invalid cases. We return false the moment we discover any invalid case. We must iterate over the string and run a few checks based on the current character. While iterating, we should keep track of whether the signs (`+` or `-`), the exponent `e` or decimal `.` has appeared before or not.

We need to ensure below cases are handled in our code:

1. The characters in the string belong to the set {+, -, ., e, [0-9]}.
2. No `.` comes after `e` or `E`.
3. A dot `.` should be followed by a digit.
4. The character `e` should be followed either by `+`, `-`, or a digit [0-9].
5. Any other non-numeric character appearing.
6. Reaching the end of S without an active number.
7. No more than one exponent character `e` or `E` or one sign or decimal in the string.

Let's check the algorithm.

#### Algorithm

```
- set number = false
      exponent = false
      sign = false
      decimal = false

- loop for character in s
  // check if the current char is a number, then set the number flag to true
  - if c >= '0' && c <= '9'
    - number = true

  // if char is an exponent, then verify
  // appeared twice or before any number
  // return false
  // else set exponent to true and all other variables to false
  - else if c == 'e' || c == 'E'
    - if exponent || !number
      - return false
    - else
      - exponent = true, sign = false, number = false, decimal = false
    - if end

  // if char is a sign
  // return false if sign appeared before
  // return false if it appeared after any number
  // return false if it appeared after a decimal .
  // else
  // set sign to true
  - else if c == '+' || c == '-'
    - if sign || number || decimal
      - return false
    - else
      - sign = true
    - if end

  // if char is a decimal
  // return false if decimal appeared before
  // return false if appeared after an exponent
  // else
  // set decimal to true

  // if char is any character apart from number, sign, exponent or decimal
  // return false
  - else
    - return false
- for end

// if a number has not appeared in the string, the number flag will be false
// else it will be true
// We return the number as our answer
- return number
```

The time complexity of this approach is **O(n)**. The space complexity is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
class Solution {
public:
    bool isNumber(string s) {
        bool number = false, exponent = false, sign = false, decimal = false;

        for (auto c : s) {
            if (c >= '0' && c <= '9')
                number = true;
            else if (c == 'e' || c == 'E')
                if (exponent || !number)
                    return false;
                else
                    exponent = true, sign = false, number = false, decimal = false;
            else if (c == '+' || c == '-')
                if (sign || number || decimal)
                    return false;
                else
                    sign = true;
            else if (c == '.')
                if (decimal || exponent)
                    return false;
                else
                    decimal = true;
            else
                return false;
        }

        return number;
    }
};
```

#### Golang solution

```go
func isNumber(s string) bool {
    number, exponent, sign, decimal := false, false, false, false

    for _, c := range s {
        if c >= '0' && c <= '9' {
            number = true
        } else if c == 'e' || c == 'E' {
            if exponent || !number {
                return false
            } else {
                exponent = true
                sign = false
                number = false
                decimal = false
            }
        } else if c == '+' || c == '-' {
            if sign || number || decimal {
                return false
            } else {
                sign = true
            }
        } else if c == '.' {
            if decimal || exponent {
                return false
            } else {
                decimal = true
            }
        } else {
            return false
        }
    }

    return number
}
```

#### JavaScript solution

```javascript
var isNumber = function(s) {
    let number = false, exponent = false, sign = false, decimal = false;

    for (c of s) {
        if (c >= '0' && c <= '9')
            number = true;
        else if (c == 'e' || c == 'E')
            if (exponent || !number)
                return false;
            else
                exponent = true, sign = false, number = false, decimal = false;
        else if (c == '+' || c == '-')
            if (sign || number || decimal)
                return false;
            else
                sign = true;
        else if (c == '.')
            if (decimal || exponent)
                return false;
            else
                decimal = true;
        else
            return false;
    }

    return number;
};
```

#### Dry Run

Let's dry-run our algorithm for a few examples to see how the solution works.

```
Input: '-90E3'

Step 1: set number = false
            exponent = false
            sign = false
            decimal = false

Step 2: loop for auto c in s
          c = '-'

          if c >= '0' && c <= '9'
            false
          else if c == 'e' || c == 'E'
            false
          else if c == '+' || c == '-'
            true

            if sign || number || decimal
               false || false || false
            else
               sign = true

Step 3: loop for auto c in s
          c = '9'

          if c >= '0' && c <= '9'
            true
            number = true

Step 4: loop for auto c in s
          c = '0'

          if c >= '0' && c <= '9'
            true
            number = true

Step 5: loop for auto c in s
          c = 'E'

          if c >= '0' && c <= '9'
            false
          else if c == 'e' || c == 'E'
            true

            if exponent || !number
               false || !true
               false || false
               false
            else
              exponent = true
              sign = false
              number = false
              decimal = false

Step 6: loop for auto c in s
          c = '3'

          if c >= '0' && c <= '9'
            true
            number = true

Step 7: loop for auto c in s
          String ends

        loop exit

Step 8: return number

We return true.

Input: '99e2.5'

Step 1: set number = false
            exponent = false
            sign = false
            decimal = false

Step 2: loop for auto c in s
          c = '9'

          if c >= '0' && c <= '9'
            true
            number = true

Step 3: loop for auto c in s
          c = '9'

          if c >= '0' && c <= '9'
            true
            number = true

Step 4: loop for auto c in s
          c = 'e'

          if c >= '0' && c <= '9'
            false
          else if c == 'e' || c == 'E'
            true

            if exponent || !number
               false || !true
               false || false
               false
            else
              exponent = true
              sign = false
              number = false
              decimal = false

Step 5: loop for auto c in s
          c = '.'

          if c >= '0' && c <= '9'
            false
          else if c == 'e' || c == 'E'
            false
          else if c == '+' || c == '-'
            false
          else if c == '.'
            true

            if decimal || exponent
               false || true
               true

               return false

The decimal . appeared after the exponent e. We return the answer as false.
```
