---
title: LeetCode - Count and Say
description: LeetCode - return the nth term of the count-and-say sequence using C++, Golang, and JavaScript.
date: 2023-04-06
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the nth term of the count-and-say sequence, c++, golang, javascript"
---

## Problem statement

The **count-and-say** sequence is a sequence of digit strings defined by the recursive formula:

* countAndSay(1) = '1'

* countAndSay(n) is the way you would 'say' the digit string from countAndSay(n-1), which is then converted into a different digit string.

To determine how you 'say' a digit string, split it into the **minimal** number of substrings such that each substring contains exactly one unique digit. Then for each substring, say the number of digits, then say the digit. Finally, concatenate every said digit.

For example, the saying and conversion for digit string '3322251':

![Container](./../count-and-say.png)

Given a positive integer `n`, return *the nth term of the **count-and-say** sequence.*

Problem statement taken from: <a href='https://leetcode.com/problems/count-and-say' target='_blank'>https://leetcode.com/problems/count-and-say</a>

**Example 1:**

```
Input: n = 1
Output: '1'
Explanation: This is the base case.
```

**Example 2:**

```
Input: n = 4
Output: '1211'
Explanation:
countAndSay(1) = '1'
countAndSay(2) = say '1' = one 1 = '11'
countAndSay(3) = say '11' = two 1's = '21'
countAndSay(4) = say '21' = one 2 + one 1 = '12' + '11' = '1211'
```

**Constraints:**

```
- 1 <= n <= 30
```

### Explanation

#### Brute force approach

A naive approach is to generate all the terms from 1 to n. We generate the next term using the current term by scanning it left to right. While scanning it, we keep track of the count of all consecutive characters. For the matching characters, we append the count of the character and append the character to the count.

A C++ snippet of this approach is as follows:

```cpp
string countAndSay(int n) {
    if (n == 1) {
        return '1';
    }
    if (n == 2) {
        return '11';
    }

    string current = '11';
    string tmp = '';
    int counter = 1;
    int len;

    for (int i = 3; i <= n; i++) {
        current += '$';
        len = str.length();

        counter = 1;
        tmp = '';

        for (int j = 1; j < len; j++) {
            if (current[j] != current[j - 1]) {
                tmp += counter + '0';
                tmp += current[j-1];
                counter = 1;
            } else {
                counter++;
            }
        }

        current = tmp;
    }

    return current;
}
```

The time complexity of this approach is **O(n^2)**. The space complexity is **O(1)**.

#### Dynamic Programming

We can use Dynamic Programming to generate each row of the count and say pattern based on the previous row. We store all the  results in a vector of strings to avoid repeating the same calculations for multiple rows. This will reduce the overall time complexity of the solution.

Let's check the algorithm to understand it better.

#### Algorithm

```
- initialize a vector of string
  vector<string> dp(n + 1, '')

  set dp[1] = '1'

  initialize current and next string
  string current, next;

  set counter to 1
  int counter = 1

- loop for i = 2; i <= n; i++
  - set current = dp[i - 1]
  - set next = ''
  - set counter = 1

  - loop for j = 1; j < current.size(); j++
    - if current[j - 1] == current[j]
      - update counter = counter + 1
    - else
      - update next = next + to_string(counter) + current[j - 1]
      - set counter = 1
    - if end

    - update next = next + to_string(counter) + current.back()

    - dp[i] = next
  - for end

- for end

- return dp[n]
```

#### C++ solution

```cpp
class Solution {
public:
    string countAndSay(int n) {
        vector<string> dp(n + 1, '');
        dp[1] = '1';
        string current, next;
        int counter;

        for(int i = 2; i <= n; i++) {
            current = dp[i - 1];
            next = '';

            counter = 1;

            for(int j = 1; j < current.size(); j++) {
                if(current[j - 1] == current[j]) {
                    counter++;
                } else {
                    next += to_string(counter) + current[j - 1];
                    counter = 1;
                }
            }

            next += to_string(counter) + current.back();

            dp[i] = next;
        }

        return dp[n];
    }
};
```

#### Golang solution

```go
func countAndSay(n int) string {
    dp := make([]string, n + 1)
    dp[1] = '1'
    var current, next string
    counter := 1

    for i := 2; i <= n; i++ {
        current = dp[i - 1]
        next = ''

        counter = 1

        for j := 1; j < len(current); j++ {
            if current[j - 1] == current[j] {
                counter++
            } else {
                next += strconv.Itoa(counter) + string(current[j - 1])
                counter = 1
            }
        }

        next += strconv.Itoa(counter) + current[len(current) - 1:]

        dp[i] = next
    }

    return dp[n]
}
```

#### JavaScript solution

```javascript
var countAndSay = function(n) {
    let dp = new Array(n + 1).fill('');
    dp[1] = '1';
    let current, next;
    let counter;

    for(let i = 2; i <= n; i++) {
        current = dp[i - 1];
        next = '';

        counter = 1;

        for(let j = 1; j < current.length; j++) {
            if(current[j - 1] == current[j]) {
                counter++;
            } else {
                next += counter.toString() + current[j - 1];
                counter = 1;
            }
        }

        next += counter.toString() + current.slice(-1);

        dp[i] = next;
    }

    return dp[n];
};
```

Let's dry-run our algorithm for a few examples to see how the solution works.

```
Input: n = 4

Step 1: vector<string> dp(n + 1, '')
        dp(4 + 1, '')
        dp(5, '')
        dp = ['', '', '', '', '']
        dp[1] = '1'
        dp = ['', '1', '', '', '']

        string current, next
        int counter

Step 2: loop for i = 2; i <= n
          2 <= 4
          true

          current = dp[i - 1]
                  = dp[2 - 1]
                  = dp[1]
                  = '1'
          next = ''

          counter = 1

          loop for j = 1; j < current.size()
            1 < 1
            false

          next = next + to_string(counter) + current.back()
               = '' + to_string(1) + '1'
               = '' + '1' + '1'
               = '11'

          dp[i] = next
          dp[2] = '11'

          dp = ['', '1', '11', '', '']

          i++
          i = 3

Step 3: loop for i <= n
          3 <= 4
          true

          current = dp[i - 1]
                  = dp[3 - 1]
                  = dp[2]
                  = '11'
          next = ''

          counter = 1

          loop for j = 1; j < current.size()
            1 < 2
            true

            if current[j - 1] == current[j]
               current[1 - 1] == current[1]
               current[0] == current[1]
               '1' == '1'
               true

               counter++
               counter = 2

            i++
            i = 2

          loop for j < current.size()
            2 < 2
            false

          next = next + to_string(counter) + current.back()
               = '' + to_string(2) + '1'
               = '' + '2' + '1'
               = '21'

          dp[i] = next
          dp[3] = '21'

          dp = ['', '1', '11', '21', '']

          i++
          i = 4

Step 4: loop for i <= n
          4 <= 4
          true

          current = dp[i - 1]
                  = dp[4 - 1]
                  = dp[3]
                  = '21'
          next = ''

          counter = 1

          loop for j = 1; j < current.size()
            1 < 2
            true

            if current[j - 1] == current[j]
               current[1 - 1] == current[1]
               current[0] == current[1]
               '2' == '1'
               false
            else
               next = next + to_string(counter) + current[j - 1]
                    = '' + to_string(1) + current[1 - 1]
                    = '' + '1' + '2'
                    = '12'

               counter = 1

            j++
            j = 2

          loop for j < current.size()
            2 < 2
            false

          next = next + to_string(counter) + current.back()
               = '12' + to_string(1) + '1'
               = '' + '1' + '1'
               = '1211'

          dp[i] = next
          dp[4] = '1211'

          dp = ['', '1', '11', '21', '1211']

          i++
          i = 5

Step 5: loop for i <= n
          5 <= 4
          false

Step 6: return dp[n]
               dp[4]

We return the answer as '1211'.
```
