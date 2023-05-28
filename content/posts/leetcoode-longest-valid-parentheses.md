---
title: Longest Valid Parentheses - LeetCode
description: Given a string consisting of opening and closing parentheses, find the length of the longest valid parentheses in it using C++, Golang, and JavaScript.
date: 2023-05-28
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - Given a string consisting of opening and closing parentheses find the length of the longest valid parentheses, c++, golang, javascript"
---

## Problem statement

Given a string containing just the characters '(' and ')', return *the length of the longest valid (well-formed) parentheses substring.*

Problem statement taken from: <a href='https://leetcode.com/problems/longest-valid-parentheses' target='_blank'>https://leetcode.com/problems/longest-valid-parentheses</a>

**Example 1:**

```
Input: s = '(()'
Output: 2
Explanation: The longest valid parentheses substring is '()'.
```

**Example 2:**

```
Input: s = ')()())'
Output: 4
Explanation: The longest valid parentheses substring is '()()'.
```

**Example 3:**

```
Input: s = ''
Output: 0
```

**Constraints:**

```
- 0 <= s.length <= 3 * 10^4
- s[i] is '(', or ')'
```

### Solutions for Longest Valid Parentheses

#### Approach 1: Brute Force

The brute force approach is to generate all the substrings and check whether every string is valid parentheses. If the substring is valid and the length exceeds the maximum length seen so far, then update the maximum length. We return this maximum length as the longest valid parentheses.

The problem with this approach is the time complexity which is **O(n^3)**. Three nested for loops will be used. The first two will generate all the substrings, and the third inner loop will verify whether the substring is valid parentheses.

#### Approach 2: Using Stack

An efficient way to solve the longest valid parentheses is using a Stack. The solution is similar to our approach in [valid parentheses](https://alkeshghorpade.me/post/leetcode-valid-parentheses) problem. Instead of pushing the open brackets `(` to the stack, we push the indexes of the opening brackets.

The algorithm for this approach is as follows:

```
- initialize stack<int> st
  // push -1 to the stack to provide the base
  // for the next valid set of parentheses
  st.push(-1)

- set result = 0

- loop for i = 0; i < str.size(); i++
  // if opening bracket, push the index i

  - if str[i] == '('
    - st.push(i)

  - else
    // if str[i] == ')'

    // pop the last encountered opening bracket's index
    - if !st.empty()
      - st.pop()
    - end if

    // if the length formed with the base of the current valid substring
    // is more than max so far
    - if !st.empty
      - set result = max(result, i - st.top())
    - else
      - st.push(i)
    - end if
  - end if
- end for

- return result
```

A C++ snippet of this algorithm is as below:

```
int longestValidParentheses(string s) {
    stack<int> stk;
    stk.push(-1);

    int result = 0;

    for (int i = 0; i < str.size(); i++) {
        if (str[i] == '(') {
            stk.push(i);
        } else {
            if (!stk.empty()) {
                stk.pop();
            }

            if (!stk.empty()) {
                result = max(result, i - stk.top());
            } else {
                stk.push(i);
            }
        }
    }

    return result;
}
```

The time complexity of this approach is **O(n)** because we are iterating over the string once. The space complexity is also **O(n)**, as we used an additional data structure, Stack.

#### Approach 3: Using left and right counters

Using two counters, we can solve this problem in **O(1)** time.
* The idea is to scan the string from left to right.

* We keep track of the number of open and closed braces using left and right counters. We increment the left and right counter by 1 when identifying an opening `(` and closing `)` braces.

* When the left and right counters are equal, the length of the current substring is calculated. If it exceeds the previous longest valid parentheses, we update the result with the current substring length.

* At any point while scanning, if the right counter value exceeds the left counter, the substring is not a valid parentheses string. We set the left and right counters to 0.

* We then scan the string from right to left and repeat similar steps above.

Let's check the algorithm for this approach.

#### Algorithm

```
- set left, right, maxLength = 0
      n = s.length

- loop for i = 0; i < n; i++
  - if s[i] == '('
    - increment left: left++
  - else
    - increment right: right++
  - end if

  - if left == right
    - update maxLength: maxLength = max(maxLength, 2 * right)
  - else if right > left
    - set left, right = 0, 0
  - end if
- end for

- set left, right = 0, 0

- loop for i = 0; i < n; i++
  - if s[i] == '('
    - increment left: left++
  - else
    - increment right: right++
  - end if

  - if left == right
    - update maxLength: maxLength = max(maxLength, 2 * right)
  - else if left > right
    - set left, right = 0, 0
  - end if
- end for

- return maxLength
```

The time complexity of the above approach is **O(n)**, and the space complexity is **O(1)**.

Check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    // Main function to return the length of
    // the longest valid parentheses
    int longestValidParentheses(string s) {
        int left = 0, right = 0, maxLength = 0;
        int n = s.length();

        // iterate the string from left to right
        for(int i = 0; i < n; i++) {
            if(s[i] == '(') {
                left++;
            } else {
                right++;
            }

            // if left is equal to right, we found a
            // valid parentheses substring
            if(left == right) {
                maxLength = max(maxLength, 2 * right);
            } else if (right > left) {
                // reset the left and right counter when we have
                // invalid parentheses substring
                left = 0;
                right = 0;
            }
        }

        left = 0;
        right = 0;

        // iterate the string from right to left
        for(int i = n - 1; i >= 0; i--) {
            if(s[i] == '(') {
                left++;
            } else {
                right++;
            }

            // if left is equal to right, we found a
            // valid parentheses substring
            if(left == right) {
                maxLength = max(maxLength, 2 * right);
            } else if (left > right) {
                // reset the left and right counter when we have
                // invalid parentheses substring
                left = 0;
                right = 0;
            }
        }

        return maxLength;
    }
};
```

#### Golang solution

```go
// Main function to return the length of
// the longest valid parentheses
func longestValidParentheses(s string) int {
    left, right, maxLength := 0, 0, 0
    n := len(s)

    // iterate the string from left to right
    for  i := 0; i < n; i++ {
        if s[i] == '(' {
            left++
        } else {
            right++
        }

        // if left is equal to right, we found a
        // valid parentheses substring
        if left == right {
            maxLength = max(maxLength, 2 * right)
        } else if (right > left) {
            // reset the left and right counter when we have
            // invalid parentheses substring
            left = 0
            right = 0
        }
    }

    left = 0
    right = 0

    // iterate the string from right to left
    for i := n - 1; i >= 0; i-- {
        if s[i] == '(' {
            left++
        } else {
            right++
        }

        // if left is equal to right, we found a
        // valid parentheses substring
        if left == right {
            maxLength = max(maxLength, 2 * right)
        } else if (left > right) {
            // reset the left and right counter when we have
            // invalid parentheses substring
            left = 0
            right = 0
        }
    }

    return maxLength
}

func max(a, b int) int {
    if a > b {
        return a
    }

    return b
}
```

#### JavaScript solution

```javascript
// Main function to return the length of
// the longest valid parentheses
var longestValidParentheses = function(s) {
    let left = 0, right = 0, maxLength = 0;
    let n = s.length;

    // iterate the string from left to right
    for(let i = 0; i < n; i++) {
        if(s[i] == '(') {
            left++;
        } else {
            right++;
        }

        // if left is equal to right, we found a
        // valid parentheses substring
        if(left == right) {
            maxLength = Math.max(maxLength, 2 * right);
        } else if (right > left) {
            // reset the left and right counter when we have
            // invalid parentheses substring
            left = 0;
            right = 0;
        }
    }

    left = 0;
    right = 0;

    // iterate the string from right to left
    for(let i = n - 1; i >= 0; i--) {
        if(s[i] == '(') {
            left++;
        } else {
            right++;
        }

        // if left is equal to right, we found a
        // valid parentheses substring
        if(left == right) {
            maxLength = Math.max(maxLength, 2 * right);
        } else if (left > right) {
            // reset the left and right counter when we have
            // invalid parentheses substring
            left = 0;
            right = 0;
        }
    }

    return maxLength;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: s = ')()())'

Step 1: set left = 0, right = 0, maxLength = 0
        n = s.size()
          = 6

Step 2: loop for i = 0; i < n
          0 < 6
          true

          if s[i] == '('
             s[0] == '('
             ')' == '('
             false
          else
            right++
            right = 1

          if left == right
            0 == 1
            false
          else if right > left
            1 > 0
            true

            left = 0
            right = 0

          i++
          i = 1

Step 3: loop for i < n
          1 < 6
          true

          if s[i] == '('
            s[1] == '('
            '(' == '('
            true
            left++
            left = 1

          if left == right
            1 == 0
            false
          else if right > left
            0 > 1
            false

          i++
          i = 2

Step 4: loop for i < n
          2 < 6
          true

          if s[i] == '('
             s[2] == '('
             ')' == '('
             false
          else
            right++
            right = 1

          if left == right
            1 == 1
            true

            maxLength = max(maxLength, 2 * right)
                      = max(0, 2 * 1)
                      = max(0, 2)
                      = 2

          i++
          i = 3

Step 5: loop for i < n
          3 < 6
          true

          if s[i] == '('
            s[3] == '('
            '(' == '('
            true
            left++
            left = 2

          if left == right
            2 == 1
            false
          else if right > left
            1 > 2
            false

          i++
          i = 4

Step 6: loop for i < n
          4 < 6
          true

          if s[i] == '('
             s[4] == '('
             ')' == '('
             false
          else
            right++
            right = 2

          if left == right
            2 == 2
            true

            maxLength = max(maxLength, 2 * right)
                      = max(2, 2 * 2)
                      = max(2, 4)
                      = 4

          i++
          i = 5

Step 7: loop for i < n
          5 < 6
          true

          if s[i] == '('
            s[5] == '('
            ')' == '('
            false
          else
            right++
            right = 3

          if left == right
            2 == 3
            false
          else
            left = 0
            right = 0

          i++
          i = 6

Step 8: loop for i < n
          6 < 6
          false

Step 9: left = 0
        right = 0

Step 10: loop for i = n - 1; i >= 0
           i = 6 - 1 = 5
           i >= 0
           5 >= 0
           true

           if s[i] == '('
             s[5] == '('
             ')' == '('
             false
           else
             right++
             right = 1

           if left == right
             0 == 1
             false
           else if left > right
             0 > 1
             false

           i--
           i = 4

Step 11: loop for i >= 0
           4 >= 0
           true

           if s[i] == '('
             s[4] == '('
             ')' == '('
             false
           else
             right++
             right = 2

           if left == right
             0 == 2
             false
           else if left > right
             0 > 2
             false

           i--
           i = 3

Step 12: loop for i >= 0
           3 >= 0
           true

           if s[i] == '('
             s[3] == '('
             '(' == '('
             true
             left++
             left = 1

           if left == right
             1 == 2
             false
           else if left > right
             1 > 2
             false

          i--
          i = 2

Step 13: loop for i >= 0
           2 >= 0
           true

           if s[i] == '('
             s[2] == '('
             ')' == '('
             false
           else
             right++
             right = 3

           if left == right
             1 == 3
             false
           else if left > right
             1 > 3
             false

           i--
           i = 1

Step 14: loop for i >= 0
           1 >= 0
           true

           if s[i] == '('
             s[1] == '('
             '(' == '('
             true
             left++
             left = 2

           if left == right
             2 == 3
             false
           else if left > right
             2 > 3
             false

           i--
           i = 0

Step 15: loop for i >= 0
           0 >= 0
           true

           if s[i] == '('
             s[1] == '('
             ')' == '('
             false
           else
             right++
             right = 4

           if left == right
             2 == 4
             false
           else if left > right
             2 > 4
             false

           i--
           i = -1

Step 16: loop for i >= 0
           -1 >= 0
           false

Step 17: return maxLength

We return the answer as 4.
```
