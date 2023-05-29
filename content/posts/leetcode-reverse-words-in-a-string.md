---
title: LeetCode - Reverse Words in a String
description: LeetCode - return a string of the words in reverse order concatenated by a single space using C++, Golang, and JavaScript.
date: 2023-03-09
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "return a string of the words in reverse order concatenated by a single space, c++, golang, javascript"
---

## Problem statement

Given an input string `s`, reverse the order of the **words**.

A word is defined as a sequence of non-space characters. The **words** in `s` will be separated by at least one space.

Return *a string of the words in reverse order concatenated by a single space*.

**Note** that `s` may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

Problem statement taken from: <a href='https://leetcode.com/problems/reverse-words-in-a-string' target='_blank'>https://leetcode.com/problems/reverse-words-in-a-string</a>

**Example 1:**

```
Input: s = 'the sky is blue'
Output: 'blue is sky the'
```

**Example 2:**

```
Input: s = '  hello world  '
Output: 'world hello'
Explanation: Your reversed string should not contain leading or trailing spaces.
```

**Example 3:**

```
Input: s = 'a good   example'
Output: 'example good a'
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.
```

**Constraints:**

```
- 1 <= s.length <= 10^4
- s contains English letters (upper-case and lower-case), digits, and spaces ' '
- There is at least one word in s
```

### Explanation

#### Brute Force approach: Using Stack

We can solve the problem using a Stack data structure. We split the input string `s` into words and put them on the stack. Once we are done reading the input string, we pop the words from stack and stick them together.

A C++ snippet of this approach is as follows:

```cpp
string reverseWords(string s) {
    stack<string> st;
    int i = 0, n = s.length();
    string c = '';

    while(i < n) {
        if(s[i] == ' ') {
            if(c.length() > 0) {
                st.push(c);
                c.clear();
            }
        } else {
            c += s[i];
        }
        i++;
    }

    if(c.length() > 0)
        st.push(c);

    string res = '';

    while(!st.empty()) {
        res += st.top();
        st.pop();
        res += ' ';
    }

    res.pop_back();

    return res;
}
```

The time complexity of the above approach is **O(n)**. Since we are using a Stack data structure the space complexity is **O(n)**.

#### Optimized solution: Using pointers

If we observe the above solution, we are pushing the word on a stack when we encounter a space ' '. Instead of a stack we can use a temp string. We traverse the string from end to beginning. We keep adding the characters to the temp string until a white space is found.

When we encounter a white space, we store the temporary string to the resultant string variable and then empty the temp string. Let's check the algorithm to understand the approach clearly.

#### Algorithm

```
- set result, temp = '', ''
  set n = s.length()

- loop for i = n - 1; i >= 1; i--
  - if s[i] == ' '
    - if temp != ''
      - result = result + temp + ' '
      - temp = ''
    - if end
  - else
    - temp = s[i] + temp
  - if end
- for end

- update result = result + temp

- if result[result.length() - 1] == ' '
  - result.erase(result.length() - 1)
- if end

- return result
```

The time complexity of the above approach is **O(n)**. We are not using a stack anymore and using a temp variable, the space complexity is reduced to **O(1)**.

#### C++ solution

```cpp
class Solution {
public:
    string reverseWords(string s) {
        string result = '';
        int n = s.length();
        string temp;

        for(int i = n - 1; i >= 0; i--){
            if(s[i] == ' ') {
                if(temp != '') {
                    result = result + temp + ' ';
                    temp = '';
                }
            } else {
                temp = s[i] + temp;
            }
        }

		result = result + temp;

        if(result[result.length() - 1] == ' ') {
            result.erase(result.length() - 1);
        }

        return result;
    }
};
```

#### Golang solution

```go
func reverseWords(s string) string {
    result, temp := '', ''
    n := len(s)

    for i := n - 1; i >= 0; i-- {
        if s[i] == ' ' {
            if temp != '' {
                result = result + temp + ' '
                temp = ''
            }
        } else {
            temp = string(s[i]) + temp
        }
    }

    result = result + temp

    if result[len(result) - 1] == ' ' {
        result = result[:len(result) - 1]
    }

    return result
}
```

#### JavaScript solution

```javascript
var reverseWords = function(s) {
    let result = '', temp = '';
    let n = s.length;

    for(let i = n - 1; i >= 0; i--){
        if(s[i] == ' ') {
            if(temp != '') {
                result = result + temp + ' ';
                temp = '';
            }
        } else {
            temp = s[i] + temp;
        }
    }

    result = result + temp;

    if(result[result.length - 1] == ' ') {
        result = result.slice(0, -1);
    }

    return result;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: s = 'the sky is blue'

Step 1: result = '', temp = ''
        n = s.length()
          = 15

Step 2: loop for i = n - 1; i >= 0
          i = 15 - 1 = 14
          i >= 0
          14 >= 0
          true

          if s[i] == ' '
             s[14] == ' '
             'e' == ' '
             false
          else
            temp = s[i] + temp
                 = s[14] + ''
                 = 'e' + ''
                 = 'e'

          i--
          i = 13

Step 3: loop for i >= 0
          13 >= 0
          true

          if s[i] == ' '
             s[13] == ' '
             'u' == ' '
             false
          else
            temp = s[i] + temp
                 = s[13] + 'e'
                 = 'u' + 'e'
                 = 'ue'

          i--
          i = 12

Step 4: loop for i >= 0
          12 >= 0
          true

          if s[i] == ' '
             s[12] == ' '
             'l' == ' '
             false
          else
            temp = s[i] + temp
                 = s[12] + 'ue'
                 = 'l' + 'ue'
                 = 'lue'

          i--
          i = 11

Step 5: loop for i >= 0
          11 >= 0
          true

          if s[i] == ' '
             s[11] == ' '
             'b' == ' '
             false
          else
            temp = s[i] + temp
                 = s[11] + 'lue'
                 = 'b' + 'lue'
                 = 'blue'

          i--
          i = 10

Step 6: loop for i >= 0
          10 >= 0
          true

          if s[i] == ' '
             s[10] == ' '
             ' ' == ' '
             true

             if temp != ''
                'blue' != ''
                true

                result = result + temp + ' '
                       = '' + 'blue' + ' '
                       = 'blue '

                temp = ''

          i--
          i = 9

Step 7: loop for i >= 0
          9 >= 0
          true

          if s[i] == ' '
             s[9] == ' '
             's' == ' '
             false
          else
            temp = s[i] + temp
                 = s[9] + ''
                 = 's' + ''
                 = 's'

          i--
          i = 8

Step 8: loop for i >= 0
          8 >= 0
          true

          if s[i] == ' '
             s[8] == ' '
             'i' == ' '
             false
          else
            temp = s[i] + temp
                 = s[8] + 's'
                 = 'i' + 's'
                 = 'is'

          i--
          i = 7

Step 9: loop for i >= 0
          7 >= 0
          true

          if s[i] == ' '
             s[7] == ' '
             ' ' == ' '
             true

             if temp != ''
                'is' != ''
                true

                result = result + temp + ' '
                       = 'blue ' + 'is' + ' '
                       = 'blue is '

                temp = ''

          i--
          i = 6

Step 10: loop for i >= 0
           6 >= 0
           true

           if s[i] == ' '
             s[6] == ' '
             'y' == ' '
             false
           else
            temp = s[i] + temp
                 = s[6] + ''
                 = 'y' + ''
                 = 'y'

           i--
           i = 5

Step 11: loop for i >= 0
           5 >= 0
           true

           if s[i] == ' '
             s[5] == ' '
             'k' == ' '
             false
           else
            temp = s[i] + temp
                 = s[5] + 'y'
                 = 'k' + 'y'
                 = 'ky'

           i--
           i = 4

Step 12: loop for i >= 0
           4 >= 0
           true

           if s[i] == ' '
             s[4] == ' '
             's' == ' '
             false
           else
            temp = s[i] + temp
                 = s[5] + 'ky'
                 = 's' + 'ky'
                 = 'sky'

           i--
           i = 3

Step 13: loop for i >= 0
          3 >= 0
          true

          if s[i] == ' '
             s[3] == ' '
             ' ' == ' '
             true

             if temp != ''
                'sky' != ''
                true

                result = result + temp + ' '
                       = 'blue is ' + 'sky' + ' '
                       = 'blue is sky '

                temp = ''

          i--
          i = 2

Step 14: loop for i >= 0
           2 >= 0
           true

           if s[i] == ' '
             s[2] == ' '
             'e' == ' '
             false
           else
            temp = s[i] + temp
                 = s[2] + ''
                 = 'e' + ''
                 = 'e'

           i--
           i = 1

Step 15: loop for i >= 0
           1 >= 0
           true

           if s[i] == ' '
             s[1] == ' '
             'h' == ' '
             false
           else
            temp = s[i] + temp
                 = s[1] + 'e'
                 = 'h' + 'e'
                 = 'he'

           i--
           i = 0

Step 16: loop for i >= 0
           0 >= 0
           true

           if s[i] == ' '
             s[0] == ' '
             't' == ' '
             false
           else
            temp = s[i] + temp
                 = s[0] + 'he'
                 = 't' + 'he'
                 = 'the'

           i--
           i = -1

Step 17: loop for i >= 0
           -1 >= 0
           false

Step 18: result = result + temp
                = 'blue is sky ' + 'the'
                = 'blue is sky the'

Step 19: if result[result.length() - 1] == ' '
            result[15 - 1] == ' '
            result[14] == ' '
            'e' == ' '
            false

Step 20: return result

We return the result as 'blue is sky the'.
```
