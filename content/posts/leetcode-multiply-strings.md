---
title: LeetCode - Multiply Strings
description: LeetCode - multiply two non-negative integers represented as strings using C++, Golang and Javascript.
date: 2022-01-15
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - merge all overlapping intervals and return an array of non-overlapping intervals, c++, golang, javascript"
---

### Problem statement

Given two non-negative integers *num1* and *num2* represented as strings, return the product of *num1* and *num2*, also represented as a string.

**Note**: You must not use any built-in BigInteger library or convert the inputs to integer directly.

Problem statement taken from: <a href='https://leetcode.com/problems/multiply-strings' target='_blank'>https://leetcode.com/problems/multiply-strings</a>

**Example 1:**

```
Input: num1 = '2', num2 = '3'
Output: '6'
```

**Example 2:**

```
Input: num1 = '123', num2 = '456'
Output: '56088'
```

**Constraints:**

```
- 1 <= num1.length, num2.length <= 200
- num1 and num2 consist of digits only.
- Both num1 and num2 do not contain any leading zero, except the number 0 itself.
```

### Explanation

#### Using standard elementary maths approach

The simple approach is to multiply the two numbers
using our standard elementary school maths approach.
But when it comes to programming, we need to adjust trailing zeros the moment we shift
to the next digit in a multiplier.
To solve this, we will shift the result array index to the left after
every multiplication of a digit in num1.

Let's check the algorithm:

```
- set m = num1.size() and n = num2.size()
  set result = string(m + n, '0') // create a string of length m + n with all chars as '0'
  set indexCounter = 0
  initialize index, carry, currentNumber, sum

- loop for i = m - 1; i >= 0; i--
  - set carry = 0
  - set index = m + n - 1 - indexCounter
  - set currentNumber = num1[i] - '0'

  - loop for j = n - 1; j >= 0; j--
    - set sum = (num2[j] - '0') * currentNumber + carry + result[index] - '0'
    - update carry = sum / 10
    - set result[index] = (char)(sum % 10 + '0')
    - update index = index - 1

  - loop while carry > 0
    - set sum = result[index] - '0' + carry
    - update carry = sum / 10
    - set result[index] = (char)(sum % 10 + '0')
    - update index = index - 1

  - update indexCounter = indexCounter + 1

- set lastZeroIndex = 0

- loop while lastZeroIndex < m + n && result[lastZeroIndex] == '0'
  - lastZeroIndex++

- if lastZeroIndex == m + n
  - return '0'

- return string(result.begin() + lastZeroIndex, result.end())
```

### C++ solution

```cpp
class Solution {
public:
    string multiply(string num1, string num2) {
        int m = num1.size();
        int n = num2.size();
        string result(m + n, '0');
        int indexCounter = 0;
        int index, carry, currentNumber, sum;

        for(int i = m - 1; i >= 0; i--){
            carry = 0;
            index = m + n - 1 - indexCounter;
            currentNumber = num1[i] - '0';

            for(int j = n - 1; j >= 0; j--){
                sum = (num2[j] - '0')*currentNumber + carry + result[index] - '0';
                carry = sum / 10;
                result[index] = (char)(sum % 10 + '0');
                index--;
            }

            while(carry > 0){
                sum = result[index] - '0' + carry;
                carry = sum / 10;
                result[index] = (char)(sum % 10 + '0');
                index--;
            }

            indexCounter++;
        }

        int lastZeroIndex = 0;
        while(lastZeroIndex < m + n && result[lastZeroIndex] == '0'){
            lastZeroIndex++;
        }

        if(lastZeroIndex == m + n){
            return '0';
        }

        return string(result.begin() + lastZeroIndex, result.end());
    }
};
```

### Golang solution

```go
import 'strings'

func multiply(num1 string, num2 string) string {
    m, n := len(num1), len(num2)
    result := make([]byte, m + n)
    carry, indexCounter, sum, index := 0, 0, 0, 0

    for i := m - 1; i >= 0; i-- {
        carry = 0
        currentNumber := int(num1[i] - '0')
        index = m + n - 1 - indexCounter

        for j := n - 1; j >= 0; j-- {
            sum = int(num2[j] - '0') * currentNumber + carry + int(result[index])
            carry = sum / 10
            result[index] = byte(sum % 10)
            index--
        }

        for carry > 0 {
            sum = int(result[index]) + carry
            carry = sum / 10
            result[index] = byte(sum % 10)
            index--
        }

        indexCounter++
    }

    lastZeroIndex := 0
    for lastZeroIndex < m + n && result[lastZeroIndex] == 0 {
        lastZeroIndex++
    }

    if lastZeroIndex == m + n {
        return '0'
    }

    return string(result[lastZeroIndex:])
}
```

### Javascript solution

```javascript
var multiply = function(num1, num2) {
    let m = num1.length, n = num2.length;
    let result = [];
    let carry, currentNumber, index, sum;
    let indexCounter = 0;

    for(let i = m - 1; i >= 0; i--){
        carry = 0;
        currentNumber = num1[i] - '0';
        index = m + n - 1 - indexCounter;

        for(let j = n - 1; j >= 0; j--){
            sum = (num2[j] - '0') * currentNumber + carry + (result[index] ? result[index] : 0);
            carry = Math.floor(sum / 10);
            result[index] = sum % 10;
            index--;
        }

        while(carry > 0){
            sum = (result[index] ? result[index] : 0) + carry;
            carry = Math.floor(sum / 10);
            result[index] = sum % 10;
            index--;
        }

        indexCounter++;
    }

    let lastZeroIndex = 0;

    for(;lastZeroIndex < m + n && result[lastZeroIndex] == 0;){
        lastZeroIndex++
    }

    if(lastZeroIndex == m + n){
        return '0';
    }

    return result.join('').replace(/^0+/, '')
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: num1 = '23', num2 = '46'

Step 1: m = num1.size()
          = 2
        n = num2.size()
          = 2

        string result(m + n, '0')
        result = '0000'
        indexCounter = 0
        int index, carry, currentNumber, sum

Step 2: loop for i = m - 1; i >= 0
        i = 2 - 1
          = 1

        i >= 0
        1 >= 0
        true

        carry = 0
        index = m + n - 1 - indexCounter
              = 2 + 2 - 1 - 0
              = 3
        currentNumber = num1[i] - '0'
                      = num1[1] - '0'
                      = '3' - '0'
                      = 3

        loop for j = n - 1; j >= 0
        j = n - 1
          = 2 - 1
          = 1

          sum = (num2[j] - '0')*currentNumber + carry + result[index] - '0'
              = (num2[1] - '0') * 3 + 0 + result[3] - '0'
              = ('6' - '0') * 3 + 0 + '0' - '0'
              = 6*3 + 0 + 0
              = 18

          carry = sum / 10
                = 18/ 10
                = 1

          result[3] = (char)(sum % 10 + '0')
                        = (char)(18 % 10 + '0')
                        = (char)(8 + '0')
                        = '8'

          index--
          index = index - 1
                = 3 - 1
                = 2

          j--
          j = 0

        loop for j >= 0
        0 >= 0
        true

          sum = (num2[j] - '0')*currentNumber + carry + result[index] - '0'
              = (num2[0] - '0') * 3 + 1 + result[2] - '0'
              = ('4' - '0') * 3 + 1 + '0' - '0'
              = 4*3 + 1 + 0
              = 13

          carry = sum / 10
                = 13 / 10
                = 1

          result[2] = (char)(sum % 10 + '0')
                        = (char)(13 % 10 + '0')
                        = (char)(3 + '0')
                        = '3'

          index--
          index = index - 1
                = 2 - 1
                = 1

          j--
          j = -1

        loop for j >= 0
        -1 >= 0
        false

        loop while carry > 0
        1 > 0
        true

          sum = result[index] - '0' + carry
              = result[1] - '0' + 1
              = '0' - '0' + 1
              = 1

          carry = sum / 10
                = 1 / 10
                = 0

          result[1] = (char)(sum % 10 + '0')
                    = (char)(1 % 10 + '0')
                    = (char)(1 + '0')
                    = '1'

          index--
          index = index - 1
                = 1 - 1
                = 0

        indexCounter++
        indexCounter = indexCounter + 1
                     = 1

        i--
        i = i - 1
          = 1 - 1
          = 0

        result = ['0', '1', '3', '8']

Step 3: loop for i >= 0
        0 >= 0
        true

        carry = 0
        index = m + n - 1 - indexCounter
              = 2 + 2 - 1 - 1
              = 2

        currentNumber = num1[i] - '0'
                      = num1[0] - '0'
                      = '2' - '0'
                      = 2

        loop for j = n - 1; j >= 0
        j = n - 1
          = 2 - 1
          = 1

        sum = (num2[j] - '0')*currentNumber + carry + result[index] - '0'
            = (num2[1] - '0') * 2 + 0 + result[2] - '0'
            = ('6' - '0') * 2 + 0 + '3' - '0'
            = 6 * 2 + 3
            = 15

        carry = sum / 10
              = 15 / 10
              = 1

        result[2] = (char)(sum % 10 + '0')
                  = (char)(15 % 10 + '0')
                  = (char)(5 + '0')
                  = '5'

        index--
        index = index - 1
              = 2 - 1
              = 1

        j--
        j = j - 1
          = 1 - 1
          = 0

        loop for j >= 0
        0 >= 0
        true

        sum = (num2[j] - '0') * currentNumber + carry + result[index] - '0'
            = ('4' - '0') * 2 + 1 + result[1] - '0'
            = 4 * 2 + 1 + '1' - '0'
            = 8 + 1 + 1
            = 10

        carry = sum / 10
              = 10 / 10
              = 1

        result[1] = (char)(sum % 10 + '0')
                  = (char)(10 % 10 + '0')
                  = (char)(0 + '0')
                  = '0'

        index--
        index = index - 1
              = 1 - 1
              = 0

        j--
        j = j - 1
          = 0 - 1
          = -1

        loop for j >= 0
        -1 >= 0
        false

        loop while carry > 0
        1 > 0
        true

          sum = result[index] - '0' + carry
              = result[0] - '0' + 1
              = '0' - '0' + 1
              = 1

          carry = sum / 10
                = 1 / 10
                = 0

          result[0] = (char)(sum % 10 + '0')
                    = (char)(1 % 10 + '0')
                    = (char)(1 + '0')
                    = '1'

          index--
          index = index - 1
                = 0 - 1
                = -1

        loop while carry > 0
        0 > 0
        false

        indexCounter++
        indexCounter = indexCounter + 1
                     = 2

        i--
        i = i - 1
          = 0 - 1
          = -1

        result = ['1', '0', '5', '8']

Step 4: loop for i >= 0
        -1 >= 0
        false

Step 5: lastZeroIndex = 0

Step 6: loop while lastZeroIndex < m + n && result[lastZeroIndex] == '0'
          0 < 2 + 2 && result[0] == '0'
          0 < 4 && '1' == '0'
          true && false
          false

Step 7: if lastZeroIndex == m + n
          0 == 2 + 2
          0 == 4
          false

Step 8: return string(result.begin() + lastZeroIndex, result.end())
          string(result.begin() + 0, result.end())
          string(['1', '0', '5', '8'])
          '1058'

So we return the result as '1058'.
```
