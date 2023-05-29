---
title: LeetCode - Factorial Trailing Zeroes
description: LeetCode - return the number of trailing zeroes in n! using C++, Golang and Javascript.
date: 2021-12-30
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "return the number of trailing zeroes in n!, c++, golang, javascript"
---

## Problem statement

Given an integer *n*, return the number of trailing zeroes in *n!*.

Note that *n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1*.

Problem statement taken from: <a href='https://leetcode.com/problems/factorial-trailing-zeroes' target='_blank'>https://leetcode.com/problems/factorial-trailing-zeroes</a>

**Example 1:**

```
Input: n = 3
Output: 0
Explanation: 3! = 6, no trailing zero.
```

**Example 2:**

```
Input: n = 5
Output: 1
Explanation: 5! = 120, one trailing zero.
```

**Example 3:**

```
Input: n = 0
Output: 0
```

**Constraints:**

```
- 0 <= n <= 10^4
```

### Explanation

A simple approach is to calculate the factorial of the number first and
then count the number of trailing zeroes. The above method can cause
overflow for bigger numbers.

The idea is to consider prime factors of a factorial n. A trailing zero is
a result of prime factor 2 and 5. We just need to count the number of 2's and
5's.

Consider the example **n = 5**. There is one 5 and three 2s in prime factors of 5!.

```
5! = 5 * 4 * 3 * 2 * 1
   = 5 * 2^2 * 3 * 2
   = 2^3 * 3 * 5
```

And for **n = 11**, we have two 5s and eight 2s.

```
11! = 11 * 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1
    = 2^8 * 3^4 * 5^2 * 7 * 11
```

We can easily say that number of 2s is greater than number of 5s. We only need to count
the number of 5s in prime factors and we are done.

#### Count number of 5s in prime factors of n!

The simplest way is to calculate floor(n/5).
For example 7! has one 5, 10! has two 5s.
But for the case where n is 25, 125, etc we have more than one 5.
When we consider 29! we get one extra 5 and the numbers of trailing zeroes becomes 6.
To handle this case, we first divide n by 5 and remove all single 5s,
then divide by 25 to remove extra 5s and so on.

```
Trailing 0s in n! = floor(n/5) + floor(n/25) + floor(n/125) + ....
```

#### C++ solution

```
class Solution {
public:
    int trailingZeroes(int n) {
        int count = 0;

        for(long int i = 5; n / i >= 1; i *= 5){
            count += n/i;
        }

        return count;
    }
};
```

#### Golang solution

```go
func trailingZeroes(n int) int {
    count := 0

    for i := 5; n / i >= 1; i *= 5 {
        count += n/i
    }

    return count
}
```

#### Javascript solution

```javascript
var trailingZeroes = function(n) {
    let count = 0;

    for( let i = 5; n / i >= 1; i *= 5 ) {
        count += Math.floor(n / i);
    }

    return count;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: n = 29

Step 1: count = 0

Step 2: loop for i = 5; n / i >= 1
        28 / 5 >= 1
        5 >= 1
        true

        count = count + n / i
              = 0 + 29 / 5
              = 0 + 5
              = 5

        i *= 5
        i = 5 * 5
          = 25

Step 3: n / i >= 1
        28 / 25 >= 1
        1 >= 1
        true

        count = count + n / i
              = 5 + 29 / 25
              = 5 + 1
              = 6

        i *= 5
           = 25 * 5
           = 125

Step 4: n / i >= 1
        28 / 125 >= 1
        0 >= 1
        false

Step 5: return count

So we return the answer as 6.
```
