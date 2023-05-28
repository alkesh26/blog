---
title: LeetCode Reverse Integer
description: LeetCode reverse an integer in C++, Golang and Javascript
date: 2021-04-11
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - reverse an integer, c++, golang, javascript"
---

## Problem statement

Given a signed 32-bit integer **x**, return **x** with its digits reversed.
If reversing **x** causes the value to go outside the signed 32-bit integer
range **[-2^31, 2^31 - 1]**, then return 0.

Problem statement taken from: <a href='https://leetcode.com/problems/reverse-integer' target='_blank'>https://leetcode.com/problems/reverse-integer</a>

**Example 1:**
```
Input: x = 123
Output: 321
```

**Example 2:**
```
Input: x = -123
Output: -321
```

**Example 3:**
```
Input: x = 120
Output: 21
```

**Example 4:**
```
Input: x = 0
Output: 0
```

**Constraints:**
```
-2^31 <= x <= 2^31 - 1
```

### Explanation

This is an easy problem that is similar to reverse a string.
We only have one approach to this problem.

We repeatedly remove the last digit of the integer **x** and
add that to the reverse integer.

We get the last digit using modulo operator **%** and remove the
last digit by dividing the integer **x** by 10.

```
lastDigit = x % 10
x = x / 10
```

But we need to be careful of one **edge case** here.
While reversing the integer we need to check if the value results
in **integer overflow** or not.

Based on different programming language we can get either a Runtime
error or unexpected output if integer overflow case is not handled.

In the case of Javascript and Golang, we can first reverse the integer and
then verify if the value lies in between the integer range.
But in the case of C++, we need to verify it on every run since it can raise
Runtime error.

#### Algorithm

```
- Initialize reverse and reminder to 0.
- Initialize flag to 1.
  - We set this to -1 if input number x is less than 0.
- Loop while x != 0
  - set reminder = x % 10
  - In case of C++ just verify integer overflow first
    - if (reverse > INT_MAX / 10 || (reverse >= INT_MAX / 10 && reminder > INT_MAX%10)
      - return 0.
  - set reverse = reverse * 10 + reminder
  - set x = x / 10
- In case of Golang and Javascript check for integer overflow
  - if reverse >= INT_MAX || reverse <= INT_MIN
    - return 0
- return reverse*flag
```

#### C++ solution

```cpp
class Solution {
public:
    int reverse(int x) {
        bool positive = true;
        int reminder;
        long num = (long)(x);

        if(num == 0) {
            return x;
        } else if (num < 0) {
            num = num * -1;
            positive = false;
        }

        int answer = 0;

        while (num != 0) {
            reminder = num % 10;

            if(answer > (INT_MAX/10) || (answer == (INT_MAX/10) && reminder > (INT_MAX%10))) {
                return 0;
            }

            answer = answer*10 + reminder;

            num = num/10;
        }

        return positive ? (int)(answer) : (int)(answer*-1);
    }
};
```

#### Golang solution

```
func reverse(x int) int {
    reverse, reminder := 0, 0

	for x != 0 {
		reminder = x % 10
		reverse = reverse*10 + reminder
		x /= 10
	}

	if reverse > math.MaxInt32 || reverse < math.MinInt32 {
		return 0
	}

    return reverse
}
```

#### Javascript solution

```
var reverse = function(x) {
    var num = Math.abs(x);
    var flag = 1;
    var answer = 0, reminder = 0;

    if ( x < 0 ) {
        flag = -1;
    }

	while( num > 0 ) {
		reminder = num % 10;
		answer = answer*10 + reminder;
        num = (num - reminder) / 10;
	}

	if ( answer >= Math.pow(2,31) ) {
        return 0;
    }

    return answer*flag;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
x = 123
reverse = 0
reminder = 0
flag = 1

Step 1: x != 0, 123 != 0
        reminder = 123 % 10 = 3
        reverse = reverse * 10 + reminder
                = 0 * 10 + 3
                = 3
        x = x / 10
          = 123 / 10
          = 12

Step 2: x != 0, 12 != 0
        reminder = 12 % 10 = 2
        reverse = reverse * 10 + reminder
                = 3 * 10 + 2
                = 32
        x = x / 10
          = 12 / 10
          = 1

Step 3: x != 0, 1 != 0
        reminder = 1 % 10 = 1
        reverse = reverse * 10 + reminder
                = 32 * 10 + 1
                = 321
        x = x / 10
          = 1 / 10
          = 0

Step 4: x != 0, 0 != 0

So the answer is reverse = 321
```
