---
title: LeetCode String to Integer (atoi)
description: LeetCode convert a string of numbers(words) into integer using C++, Golang and Javascript.
date: 2021-04-18
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - string to integer atoi, c++, golang, javascript"
---

### Problem statement

Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer
(similar to C/C++'s atoi function).

Problem statement taken from: <a href="https://leetcode.com/problems/string-to-integer-atoi" target="_blank">https://leetcode.com/problems/string-to-integer-atoi</a>

**Example 1:**
```
Input: s = "42"
Output: 42
```

**Example 2:**
```
Input: s = "      -142"
Output: 142
```

**Example 3:**
```
Input: s = "871 and words"
Output: 871
```

**Example 4:**
```
Input: s = "Words and then number 987"
Output: 0
```

**Example 5:**
```
Input: s = "-91283472332"
Output: -2147483648
```

**Constraints:**
```
- 0 <= s.length <= 200
- s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'
```

### Explanation

The problem is simple, but we need to think of few edge cases.
Below are the observations from the above examples -
- Ignore all leading whitespace.
- Check if **+** or **-** symbol is used.
- Read the numbers till the next non-digit character or string end is reached.
- If the integer is out on 32-bit signed integer range **[-2^31, 2^31 - 1]** we return either of
  these limits based on integer sign.

#### Algorithm

```
- Initialize intMax = 2^31 - 1 and intMin = -2^31
- Initialize length to string length
- Initialize positive = true and set i = 0

// Remove all leading whitespace.
- Loop while i < length && s[i] == ' '
  - i++

// we use this for maintaining the sign of integer
- Set flag = 1

- if i < length && s[i] == '+' || s[i] == '-'
  - Set flag to -1 if s[i] == '-'
  - i++

// if the string starts with a word
- if s[i] < '0' || s[i] > '9'
  - return 0

- Set num = 0

- Loop while i < length && s[i] >= '0' && s[i] <= '9'

  // first we verify for integer overflow and return INT_MAX or INT_MIN based on flag
  - if num > INT_MAX/10 || (num == INT_MAX/10 && s[i] - '0' > 7))
    - return INT_MAX or INT_MIN if flag = 1 or flag = -1

  - set num = num*10 + s[i] - '0'

- return num * flag
```

##### C++ solution

```cpp
class Solution {
public:
    int myAtoi(string s) {
        if(s.length() == 0){
            return 0;
        }
        int i = 0;

        while(s[i] == ' '){
            i++;
        }

        bool isPositive = true;

        if(s[i] == '-' || s[i] == '+'){
            isPositive = (s[i] == '+' ? true : false);
            i++;
        }

        if(s[i] - '0' < 0 || s[i] - '0' > 9){
            return 0;
        }

        int num = 0;

        while(s[i] >= '0' && s[i] <= '9'){
            if(num > INT_MAX/10 || (num == INT_MAX/10 && s[i] - '0' > 7)){
                return isPositive ? INT_MAX : INT_MIN;
            }

            num = num*10 + (s[i] - '0');
            i++;
        }

        return isPositive ? num : num*-1;
    }
};
```

##### Golang solution

```go
func myAtoi(s string) int {
    str := []rune(s)
    length := len(s)

    intMax, intMin := (1<<31)-1, 1<<31
    i := 0

	for i < length && str[i] == ' ' {
		i++
	}

    flag := 1

	if i < length && (str[i] == '-' || str[i] == '+') {
		if str[i] == '-' {
			flag = -1
		}
		i++
	}

    result := 0

	for i < length && str[i] >= '0' && str[i] <= '9' {
		digit := int(str[i] - '0')

		if flag > 0 && result > (intMax - digit)/10 || flag < 0 && result > ((intMin - digit)/10) {
			if flag == 1 {
				return intMax
			} else {
				return -intMin
			}
		}

		result = result*10 + digit
		i++
	}

	return result * flag
}
```

##### Javascript solution

```javascript
var myAtoi = function(s) {
  const intMin = -(2**31);
  const intMax = 2**31 - 1;

  let i = 0, length = s.length;
  let positive = true;

  while (i < length && s.charAt(i) === ' ') {
    i++;
  }

  if (i === length) {
    return 0;
  }

  if (s.charAt(i) === '+') {
    i++;
  } else if (s.charAt(i) === '-') {
    i++;
    positive = false;
  }

  let num = 0;
  for (; i < length && s.charAt(i) >= '0' && s.charAt(i) <= '9'; i++) {
    num = num * 10 + (s.charAt(i) - '0');
  }

  num = positive ? num : -num;

  if (num < intMin) {
    return intMin;
  } else if (num > intMax) {
    return intMax;
  }

  return num;
};
```

Let's dry-run our algorithm to see how the solution works.

```
s = "      -142"

Step 1: intMax = 2^31 - 1
        intMin = -2^31.

Step 2: length = s.length
        = 10

Step 3: length != 0
        10 != 0
        so we won't return 0

Step 4: i = 0

Step 5: while s[i] == ' '
          i++

        so i will be 6 after this loop

Step 6: flag = 1

Step 7: if i < length && s[i] == '+' or s[i] == '-'
          s[i] == '-'
          flag = -1

Step 8: if s[i] < '0' || s[i] > '9'
          s[i] = '4'
          so we won't return 0

Step 9: num = 0

Step 10: while i < length && s[i] >= '0' && s[i] <= '9'
           i = 7
           s[i] = '1'
           num = num * 10 + s[i] - '0'
               = 0 * 10 + '1' - '0'
               = 1

           i = 8
           s[i] = '4'
           num = num * 10 + s[i] - '0'
               = 1 * 10 + '4' - '0'
               = 14

           i = 9
           s[i] = '2'
           num = num * 10 + s[i] - '0'
               = 14 * 10 + '2' - '0'
               = 142

num = num * flag
    = 142 * -1
    = -142

We return -142
```
