---
title: LeetCode - Divide Two Integers
description: LeetCode - return the quotient after dividing dividend by divisor using C++, Golang, and JavaScript.
date: 2023-04-23
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "return the quotient after dividing dividend by divisor, c++, golang, javascript"
---

## Problem statement

Given two integers `dividend` and `divisor`, divide two integers **without** using multiplication, division, and mod operator.

The integer division should truncate toward zero, which means losing its fractional part. For example, `8.345` would be truncated to `8`, and `-2.7335` would be truncated to `-2`.

Return *the **quotient** after dividing dividend by divisor.*

**Note**: Assume we are dealing with an environment that could only store integers within the **32-bit** signed integer range: [−2^31, 2^31 − 1]. For this problem, if the quotient is **strictly greater than** 2^31 - 1, then return 2^31 - 1, and if the quotient is **strictly less than** -2^31, then return -2^31.

Problem statement taken from: <a href='https://leetcode.com/problems/divide-two-integers' target='_blank'>https://leetcode.com/problems/divide-two-integers</a>

**Example 1:**

```
Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 = 3.33333.. which is truncated to 3.
```

**Example 2:**

```
Input: dividend = 7, divisor = -3
Output: -2
Explanation: 7/-3 = -2.33333.. which is truncated to -2.
```

**Constraints:**

```
- -2^31 <= dividend, divisor <= 2^31 - 1
- divisor != 0
```

### Explanation

#### Brute Force

We are not allowed to use multiplication, division, and mod operator. We can make use of the subtraction operator to divide two integers and find the answer. We keep subtracting the divisor from the dividend till the time dividend is greater than or equal to the divisor. We keep a count of the number of subtractions. This count is equal to the quotient of the two numbers.

We must also keep track of the sign of the dividend and the divisor. A C++ snippet of this approach is as follows:

```cpp
int divide(int dividend, int divisor) {
    if (divisor == 1)
        return dividend;

    if (dividend == INT_MIN) {
        dividend++;
    }

    int sign = -1, quotient = 0;

    if ((dividend < 0 && divisor < 0) || (dividend >= 0 && divisor >= 0))
        sign = 1;

    dividend = abs(dividend);
    divisor = abs(divisor);

    while (dividend >= divisor) {
        dividend -= divisor;
        quotient++;
    }

    return quotient * sign;
}
```

The time complexity of this approach is **O(abs(m - n) / n)**, where m is the dividend and n is the divisor. The space complexity of this approach is **O(1)**. We are not using any extra space to store the numbers, the space complexity of this solution is constant, i.e. **O(1)**.

#### Binary Search

We can optimize the above approach using Binary Search. We know for a particular dividend and divisor, **quotient * divisor <= dividend**. For a number **a**, which is less than the quotient this equation always holds true **a * divisor <= dividend**. Similarly, for a number **b** which is greater than the quotient, the equation **b * divisor >= dividend** is true.

We know the quotient will lie between 0 and the dividend. We perform a binary search on this given range 0 to the dividend. If **mid * divisor > dividend**, we search the left side and set **high = mid - 1**. Else we search the right side and set **low = mid + 1**. The value of mid that satisfies the condition will be our quotient.

A C++ snippet of this approach is as follows:

```cpp
int divide(int dividend, int divisor) {
    unsigned long long int low = 0;
    unsigned long long int high = abs(dividend);

    if (dividend == INT_MIN) {
        if (divisor == -1) {
            return INT_MAX;
        } else if (divisor == 1) {
            return INT_MIN;
        }
    }

    int quotient = 0;
    while (low <= high) {
        unsigned long long int mid = (low + high) / 2;
        if (abs(divisor) * mid <= abs(dividend)) {
            quotient = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return ((dividend < 0 && divisor < 0) || (dividend >= 0 && divisor >= 0) ? quotient : -quotient);
}
```

The time complexity of this approach is **O(log n)**, where n is the dividend. The space complexity of this approach is **O(1)**.

#### Bit Manipulation

We find the greatest power of 2 when multiplied by the quotient gives us a quotient that is just smaller than the dividend. After finding this power, we add it to our answer. We then reduce the dividend by the divisor multiplied by this power of 2.

Let's check the algorithm to understand it clearly.

#### Algorithm

```
- if dividend == divisor
    return 1

- set isPositive = (dividend < 0 == divisor < 0)
      absDividend = abs(dividend)
      absDivisor = abs(divisor)
      answer = 0

- loop while absDividend >= absDivisor
    int quotient = 0

    loop while absDividend > (absDivisor << (quotient + 1))
      quotient++
    while end

    update answer = answer + (1 << quotient)

    update absDividend = absDividend - (absDivisor << quotient)
- while end

- if answer == (1 << 31) and isPositive
    return INT_MAX

- return isPositive ? answer : -answer
```

The time complexity of this approach is **O(log n)**, where n is the dividend. The space complexity of this approach is **O(1)**.

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int divide(int dividend, int divisor) {
        if (dividend == divisor) {
            return 1;
        }

        bool isPositive = (dividend < 0 == divisor < 0);
        unsigned int absDividend = abs(dividend);
        unsigned int absDivisor = abs(divisor);
        unsigned int answer = 0;

        while (absDividend >= absDivisor) {
            int quotient = 0;
            while (absDividend > (absDivisor << (quotient + 1)))
                quotient++;

            answer += (1 << quotient);

            absDividend -= (absDivisor << quotient);
        }

        if (answer == (1 << 31) and isPositive)
            return INT_MAX;

        return isPositive ? answer : -answer;
    }
};
```

#### Golang solution

```go
func abs(a int) int {
    if a < 0 {
        return a * -1
    }

    return a
}

func divide(dividend int, divisor int) int {
    if dividend == divisor {
        return 1
    }

    isPositive := true

    if (dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0) {
        isPositive = false
    }

    absDividend := abs(dividend)
    absDivisor := abs(divisor)
    answer := 0

    for absDividend >= absDivisor {
        quotient := 0

        for absDividend > (absDivisor << (quotient + 1)) {
            quotient++
        }

        answer += (1 << quotient)

        absDividend -= (absDivisor << quotient)
    }

    if answer == (1 << 31) && isPositive {
        return math.MaxInt32
    }

    if isPositive {
        return answer
    } else {
        return -answer
    }
}
```

#### JavaScript solution

```javascript
var divide = function(dividend, divisor) {
    if (dividend == divisor) {
        return 1;
    }

    let isPositive = (dividend < 0 == divisor < 0);
    let absDividend = Math.abs(dividend);
    let absDivisor = Math.abs(divisor);
    let answer = 0;

    while (absDividend >= absDivisor) {
        let quotient = 0;
        while (absDividend > (absDivisor << (quotient + 1)))
            quotient++;

        answer += (1 << quotient);

        absDividend -= (absDivisor << quotient);
    }

    if (answer == (1 << 31) && isPositive)
        return Number.MAX_SAFE_INTEGER;

    return isPositive ? answer : -answer;
};
```

#### Dry Run

Let's dry-run our algorithm for a few examples to see how the solution works.

```
Input dividend = 10
      divisor = 3

Step 1: if dividend == divisor
           10 == 3
           false

Step 2: isPositive = (dividend < 0 == divisor < 0)
                   = (10 < 0 == 3 < 0)
                   = (false == false)
                   = true
        absDividend = abs(dividend)
                    = abs(10)
                    = 10
        absDivisor = abs(absDivisor)
                    = abs(3)
                    = 3
        answer = 0

Step 3: loop while absDividend >= absDivisor
          10 >= 3
          true

          quotient = 0

          loop while absDividend > (absDivisor << (quotient + 1))
            10 > (3 << (0 + 1))
            10 > (3 << 1)
            10 > 6
            true

            quotient++
            quotient = quotient + 1
                     = 1

          loop while absDividend > (absDivisor << (quotient + 1))
            10 > (3 << (1 + 1))
            10 > (3 << 2)
            10 > 12
            false

          answer += (1 << quotient)
          answer = answer + (1 << quotient)
                 = 0 + 1 << 1
                 = 0 + 2
                 = 2

          absDividend -= (absDivisor << quotient)
          absDividend = absDividend - (absDivisor << quotient)
                      = 10 - (3 << 1)
                      = 10 - 6
                      = 4

Step 4: loop while absDividend >= absDivisor
          4 >= 3
          true

          quotient = 0

          loop while absDividend > (absDivisor << (quotient + 1))
            4 > (3 << (0 + 1))
            4 > (3 << 1)
            4 > 6
            false

          answer += (1 << quotient)
          answer = answer + (1 << quotient)
                 = 2 + 1 << 0
                 = 2 + 1
                 = 3

          absDividend -= (absDivisor << quotient)
          absDividend = absDividend - (absDivisor << quotient)
                      = 4 - (3 << 0)
                      = 4 - 3
                      = 1

Step 5: loop while absDividend >= absDivisor
          1 >= 3
          false

Step 6: if answer == (1 << 31) && isPositive
           3 == 2147483648 && true
           false && true
           false

Step 7: return isPositive ? answer : -answer
            true ? 3 : -3

We return the answer as 3.
```
