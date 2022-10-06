---
title: LeetCode - Valid Parentheses
description: LeetCode - check for balanced brackets in an expression using C++, Golang and Javascript.
date: 2021-06-27
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - check for balanced brackets in an expression, c++, golang, javascript"
---

![Container](./../valid-parentheses.png)

### Problem statement

Given a string **s** containing just the characters **'('**, **')'**, **'{'**, **'}'**,
**'['** and **']'**, determine if the input string is valid.

An input string is valid if:
```
  1. Open brackets must be closed by the same type of brackets.
  2. Open brackets must be closed in the correct order.
```

Problem statement taken from: <a href='https://leetcode.com/problems/valid-parentheses' target='_blank'>https://leetcode.com/problems/valid-parentheses</a>

**Example 1:**

```
Input: s = '()'
Output: true
```

**Example 2:**

```
Input: s = '()[]{}'
Output: true
```

**Example 3:**

```
Input: s = '(]'
Output: false
```

**Example 4:**

```
Input: s = '([)]'
Output: false
```

**Example 5:**

```
Input: s = '{[]}'
Output: true
```

**Constraints:**

```
- 1 <= s.length <= 10^4
- s consists of parentheses only '()[]{}'
```

### Explanation

The problem can be solved by using a stack or by recursion.
For a large string, building up a stack of recursive calls consumes memory temporarily
and may take more space than an iterative solution.

We can use extra storage in the form of a stack and hashmap.
Let's check the algorithm and solution.

#### Stack

```
- initialize stack st and i = 0.

- return true if the string is empty.

- Loop while i < 0
  - if s[i] == '(' || s[i] == '[' || s[i] == '{'

    // push the char to stack
    - st.push(s[i])

  - else if s[i] == ')' && !st.empty() && st.top() == '(' ||
            s[i] == '}' && !st.empty() && st.top() == '{' ||
            s[i] == ']' && !st.empty() && st.top() == '['

    // pop the top element if the current char is a closing brace provided
    // stack is not empty.
    - st.pop()

  - else

    // the string is not a valid parenthesis
    - return false

  i++

- return true if st.empty()

- return false.
```

#### C++ solution

```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;

        if(s.size() == 0){
            return true;
        }

        int i = 0;
        while(i < s.size()){
            if( s[i] == '(' || s[i] == '[' || s[i] == '{' ){
                st.push(s[i]);
            } else if ( (s[i] == ')' && !st.empty() && st.top() == '(') ||
                        (s[i] == '}' && !st.empty() && st.top() == '{') ||
                        (s[i] == ']' && !st.empty() && st.top() == '[')
                      ){
                st.pop();
            } else {
                return false;
            }
            i++;
        }

        if(st.empty()) {
            return true;
        }

        return false;
    }
};
```

#### Golang solution

```go
func isValid(s string) bool {
    st := []rune{}
	bracketsMap := map[rune]rune{
		')': '(',
		'}': '{',
		']': '[',
	}

	for _, v := range s {
		if len(st) == 0 {
			st = append(st, v)
			continue
		}

		if bracketsMap[v] == st[len(st)-1] {
			st = st[:len(st)-1]
		} else {
			st = append(st, v)
		}
	}

	return len(st) == 0
}
```

#### Javascript solution

```javascript
var isValid = function(s) {
   let st = [];
   const legend = {
     '(': ')',
     '{': '}',
     '[': ']'
   };

   for (let i = 0; i < s.length; i++) {
     if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
       st.push(s[i]);
     } else if (legend[st.pop()] !== s[i]) {
       return false;
     }
   }

   return st.length ? 0 : 1;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input:
s = ()[]{}

Step 1: stack<char> st;

Step 2: s.size() == 0
        s.size() = 6
        6 == 0
        false

Step 3: i = 0

Step 4: loop while i < 6
        0 < 6
        true

        // stack is empty
        st = []

        if s[i] == '(' || s[i] == '[' || s[i] == '{'
          true
          st.push(s[i])
          st.push( '(' )

                 top
                  |
          st = [ '(' ]

        i++
        i = 1

Step 5: loop while i < 6
        1 < 6
        true

               top
                |
        st = [ '(' ]

        if s[i] == '(' || s[i] == '[' || s[i] == '{'
          false

        else if (s[i] == ')' && !st.empty() && st.top() == '(')
          true
          st.pop()
          st = []

        i++
        i = 2

Step 6: loop while i < 6
        2 < 6
        true

        // stack is empty
        st = []

        if s[i] == '(' || s[i] == '[' || s[i] == '{'
          true
          st.push(s[i])
          st.push( '[' )

                 top
                  |
          st = [ '[' ]

        i++
        i = 3

Step 7: loop while i < 6
        3 < 6
        true

               top
                |
        st = [ '[' ]

        if s[i] == '(' || s[i] == '[' || s[i] == '{'
          false

        else if (s[i] == ']' && !st.empty() && st.top() == '[')
          true
          st.pop()
          st = []

        i++
        i = 4

Step 8: loop while i < 6
        4 < 6
        true

        // stack is empty
        st = []

        if s[i] == '(' || s[i] == '[' || s[i] == '{'
          true
          st.push(s[i])
          st.push( '{' )

                 top
                  |
          st = [ '{' ]

        i++
        i = 5

Step 9: loop while i < 6
        5 < 6
        true

               top
                |
        st = [ '{' ]

        if s[i] == '(' || s[i] == '[' || s[i] == '{'
          false

        else if (s[i] == '}' && !st.empty() && st.top() == '{')
          true
          st.pop()
          st = []

        i++
        i = 6

Step 10: loop while i < 6
        6 < 6
        false

Step 11: if st.empty()
           true

The answer is true.
```
