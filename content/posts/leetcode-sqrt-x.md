---
title: LeetCode Sqrt(x)
description: LeetCode find square root of positive number x in C++, Golang and Javascript
date: 2021-05-23
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - find square root of positive number x, c++, golang, javascript"
---

![Container](./../square-root.png)

### Problem statement

Given a non-negative integer **x**, compute and return the square root of **x**.

Since the return type is an integer, the decimal digits are **truncated**,
and only **the integer part** of the result is returned.

**Note**: You are not allowed to use any built-in exponent function or operator, such as
`pow(x, 0.5)` or `x ** 0.5`.

Problem statement taken from: <a href="https://leetcode.com/problems/sqrtx" target="_blank">https://leetcode.com/problems/sqrtx</a>

**Example 1:**

```
Input: x = 4
Output: 2
```

**Example 2:**

```
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since the decimal part is truncated, 2 is returned.
```

**Constraints:**

```
0 <= x <= 2^31 - 1
```

### Explanation

#### Brute force

The simple approach to this problem is to try with all-natural numbers starting from 1.
We continue increasing the number till the square of the number is greater than **x**.

C++ snippet of the above approach will look like this:

```cpp
int i = 1, result = 1;

while (result <= x)
{
    i++;
    result = i * i;
}

return i - 1;
```

The time complexity of the above approach is **O(√ n)**, since we are running
a loop from 1 till the square root of that number.

The algorithm can still be improved by using the binary search concept here.

#### Binary search

Since the value of **i*i** i.e., square of numbers increasing monotonically,
we can use this concept to find the square root of the number using
binary search.

Let's check the algorithm below:

```
- return x if x <= 1
- initialize start = 2, end = x, middle = 0

- Loop while start <= end
  - middle = start + ( end - start )/ 2
  - if middle == x / middle
    - return middle

  - if middle < x / middle
    - set start = middle + 1
  - else
    - set end = middle - 1

- if start > x /start
  - return start - 1

- return start
```

The time complexity of the above approach is **O(log(n))**

#### C++ solution

```cpp
class Solution {
public:
    int mySqrt(int x) {
        if(x <= 1){
            return x;
        }

        int start = 2, end = x, middle;

        while(start <= end){
            middle = start + (end - start)/2;

            if(middle == x/middle){
                return middle;
            }

            if(middle < x/middle){
                start = middle + 1;
            } else {
                end = middle - 1;
            }
        }

        if(start > x/start){
            return start - 1;
        }

        return start;
    }
};
```

#### Golang solution

```go
func mySqrt(x int) int {
    start := 0
    end := x

    for start <= end {
		middle := start + ( end - start )/2
		if middle * middle > x {
			end = middle - 1
		} else if (middle + 1)*( middle + 1) > x {
			return middle
		} else {
			start = middle + 1
		}
	}

    return start
}
```

#### Javascript solution

```javascript
var mySqrt = function(x) {
    let start = 0, end = x, middle = 0;

    while (start < end) {
        middle = parseInt((start + end)/2);
        if (middle * middle === x) {
            return middle;
        }
        if (x < middle * middle) {
            end = middle - 1;
        } else {
            start = middle + 1;
        }
    }

    return x < end * end ? end - 1 : end;
};
```

Let's dry-run our algorithm to see how the solution works.

```
x = 8

Step 1: x <= 1
        8 <= 1
        false

Step 2: start = 2
        end = 8

Step 3: Loop while 2 <= 8
        true

        middle = 2 + (8 - 2) / 2
               = 2 + 6 / 2
               = 2 + 3
               = 5

        middle == x / middle
        5 == 8 / 5
        5 == 1
        false

        middle < x/middle
        5 < 8 / 5
        5 < 1
        false

        end = middle - 1
        end = 5 - 1
        end = 4

Step 4: Loop while 2 <= 4
        true

        middle = 2 + (4 - 2) / 2
               = 2 + 2 / 2
               = 2 + 1
               = 3

        middle == x / middle
        3 == 8 / 3
        3 == 2
        false

        middle < x/middle
        3 < 8 / 3
        3 < 2
        false

        end = middle - 1
        end = 3 - 1
        end = 2

Step 4: Loop while 2 <= 2
        true

        middle = 2 + (2 - 2) / 2
               = 2 + 0 / 2
               = 2 + 0
               = 2

        middle == x / middle
        2 == 8 / 2
        2 == 4
        false

        middle < x/middle
        2 < 8 / 2
        2 < 4
        true

        start = middle + 1
        start = 2 + 1
        start = 3

Step 5: Loop while 3 <= 2
        false

Step 6: if start > x/start
        3 > 8 / 3
        3 > 2

        return start - 1

So the answer is 2.
```
