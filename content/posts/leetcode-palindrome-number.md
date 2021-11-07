---
title: LeetCode Palindrome Number
description: LeetCode palindrome number solution in C++, Golang and Javascript
date: 2021-04-24
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - palindrome number solution, c++, golang, javascript"
---

### Problem statement

Given an integer **x**, return **true** if **x** is palindrome integer.

An integer is a **palindrome** when it reads the same backward as forward.
For example, **121** is palindrome while **123** is not.

**Example 1:**
```
Input: x = 121
Output: true
```

**Example 2:**
```
Input: x = -121
Output: false
```

**Example 3:**
```
Input: x = 10
Output: false
```

**Example 4:**
```
Input: x = -101
Output: false
```

**Constraints:**
```
- -2^31 <= x <= 2^31 - 1
```

### Explanation

As mentioned in the problem statement, palindrome number
is one that reads the same from both sides.

#### Brute force solution

A brute force solution will be to convert the integer into a string,
reverse the string, and check if the two strings are the same.

But this approach will require extra space for creating a string.

```cpp
// Convert number into string using itoa or custom method.
string str = itoa(x)

string reverseStr = reverse(str)

return reverseStr == str
```

The time complexity of this program will be **O(N)**.
The space complexity will be **O(M)** where M is the
number of digits in the integer.

#### Optimized solution

We can avoid the extra space and reduce the time complexity
similar to the way we check palindrome string.
But here, we get the first and last digits and compare them.

Fetching the last digit is simple and, we can use the modulus operator
**%**.
Fetching the first digit can be done using a divisor.
Let's check the algorithm.

##### Algorithm
```
- if x < 0
  - return false.
- set divisor = 1

// We use the divisor to compute the number of digits in the number x.
// We keep multiplying the divisor by 10 till x / divisor is greater than equal to 10.
- Loop while x / divisor >= 10
  - divisor = divisor * 10

- Loop while x != 0
  // here we check if first and last digit are same or not.
  - if x / divisor != x % 10
    - return false

  // remove the first digit
  - set x = x % divisor

  // remove the last digit
  - set x = x / 10

  // since first and last digit are removed we divide divisor by 100
  - set divisor = divisor / 100

- return true
```

#### C++ solution

```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        if(x < 0){
            return false;
        }

        int divisor = 1;
        while(x/divisor >= 10){
            divisor *= 10;
        }

        while(x != 0){
            if (x / divisor != x % 10) {
                return false;
            }
            x %= divisor;
            x /= 10;
            divisor /= 100;
        }

        return true;
    }
};
```

#### Golang solution

```go
func isPalindrome(x int) bool {
    if x < 0 {
        return false
    }

    divisor := 1

    for x / divisor >= 10 {
        divisor *= 10
    }

    for x != 0 {
        if x / divisor != x % 10 {
            return false
        }

        x %= divisor
        x /= 10
        divisor /= 100
    }

    return true
}
```

#### Javascript solution

```javascript
var isPalindrome = function(x) {
    if( x < 0 ){
        return false;
    }

    let divisor = 1;

    while( x / divisor >= 10 ){
        divisor *= 10;
    }

    while( x != 0 ){
        if( Math.trunc(x / divisor) != Math.floor(x % 10) ){
            return false;
        }

        x %= divisor;
        x = Math.floor( x / 10 );
        divisor /= 100;
    }

    return true;
};
```

Let's dry-run our algorithm.

```
x = 12321

Step 1: x < 0
        12321 < 0
        false

Step 2: divisor = 1

Step 3: while x / divisor >= 10

        1. 12321 / 1 >= 10
           12321 >= 10
           divisor *= 10
           divisor = 10

        2. 12321 / 10 >= 10
           1232 >= 10
           divisor *= 10
           divisor = 100

        3. 12321 / 100 >= 10
           123 >= 10
           divisor *= 10
           divisor = 1000

        4. 12321 / 1000 >= 10
           12 >= 10
           divisor *= 10
           divisor = 10000

        5. 12321 / 10000 >= 10
           1 >= 10
           Loop exit

Step 4: while x != 0

        1. 12321 / 10000 != 12321 % 10
           1 != 1
           false

           x %= divisor
           x = 12321 % 10000
           x = 2321

           x /= 10
           x = 232

           divisor /= 100
           divisor = 100

        2. 232 / 100 != 232 % 10
           2 != 2
           false

           x %= divisor
           x = 232 % 100
           x = 32

           x /= 10
           x = 3

           divisor /= 100
           divisor = 1

        3. 3 / 1 != 3 % 10
           3 != 3
           false

           x %= divisor
           x = 3 % 1
           x = 0

           x /= 10
           x = 0

           divisor /= 100
           divisor = 0

        4. x != 0
           0 != 0
           Loop exit

Step 5: return true
```
