---
title: LeetCode - Evaluate Reverse Polish Notation
description: LeetCode - evaluate the value of an arithmetic expression in Reverse Polish Notation in C++, Golang, and Javascript.
date: 2022-10-01
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode evaluate the value of an arithmetic expression in Reverse Polish Notation, c++, golang, javascript"
---

### Problem statement

Evaluate the value of an arithmetic expression in *Reverse Polish Notation*.

Valid operators are *+*, *-*, *, and */*. Each operand may be an integer or another expression.

**Note** that division between two integers should truncate toward zero.

It is guaranteed that the given RPN expression is always valid. That means the expression would always evaluate to a result, and there will not be any division by zero operation.

Problem statement taken from: <a href='https://leetcode.com/problems/evaluate-reverse-polish-notation' target='_blank'>https://leetcode.com/problems/evaluate-reverse-polish-notation</a>

**Example 1:**

```
Input: tokens = ['2', '1', '+', '3', '*']
Output: 9
Explanation: ((2 + 1) * 3) = 9
```

**Example 2:**

```
Input: tokens = ['4', '13', '5', '/', '+']
Output: 6
Explanation: (4 + (13 / 5)) = 6
```

**Example 3:**

```
Input: tokens = ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+']
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
```

**Constraints:**

```
- 1 <= tokens.length <= 10^4
- tokens[i] is either an operator: '+', '-', '*', or '/', or an integer in the range [-200, 200]
```

#### Explanation

[Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation)
is a mathematical notation in which operators follow their operands.

The basic approach is using the stack. Let's check the algorithm directly:

```
- create stack st
  initialize int op1, op2

- loop for i = 0; i < tokens.size; i++
  - if tokens[i] != '+' && tokens[i] != '-' && tokens[i] != '*' && tokens[i] != '/'
    - push to stack st.push(tokens[i])
  - else
    - set op2 = st.pop()
      set op1 = st.pop()

    - if tokens[i] == '+'
      - st.push(op1 + op2)
    - else if tokens[i] == '-'
      - st.push(op1 - op2)
    - else if tokens[i] == '*'
      - st.push(op1 * op2)
    - else
      - st.push(op1 / op2)
- for end

- return st.top()
```

This function's time complexity is **O(N)**, and the space complexity is **O(N)**.

Let's check our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
typedef long long ll;

class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<ll> st;
        ll op1, op2;

        for(int i = 0; i < tokens.size(); i++) {
            if(tokens[i] != '+' && tokens[i] != '-' && tokens[i] != '*' && tokens[i] != '/') {
                st.push(stol(tokens[i]));
            } else {
                op2 = st.top();
                st.pop();
                op1 = st.top();
                st.pop();

                if(tokens[i] == '+')
                    st.push(op1 + op2);
                else if(tokens[i] == '-')
                    st.push(op1 - op2);
                else if(tokens[i] == '*')
                    st.push(op1 * op2);
                else
                    st.push(op1 / op2);
            }
        }

        return (int) st.top();
    }
};
```

#### Golang solution

```go
func evalRPN(tokens []string) int {
    st := []int{}

    for _, token := range tokens {
        if token == '+' {
            st[len(st) - 2] += st[len(st) - 1]
            st = st[:len(st) - 1]
        } else if token == '-' {
            st[len(st) - 2] -= st[len(st) - 1]
            st = st[:len(st) - 1]
        } else if token == '*' {
            st[len(st) - 2] *= st[len(st) - 1]
            st = st[:len(st) - 1]
        } else if token == '/' {
            st[len(st) - 2] /= st[len(st) - 1]
            st = st[:len(st) - 1]
        } else {
            num, _ := strconv.Atoi(token)
            st = append(st, num)
        }
    }

    return st[0]
}
```

#### Javascript solution

```javascript
var evalRPN = function(tokens) {
    let st = [];
    let op1, op2;

    for(let i = 0; i < tokens.length; i++) {
        if(tokens[i] != '+' && tokens[i] != '-' && tokens[i] != '*' && tokens[i] != '/') {
                st.push(parseInt(tokens[i]));
        } else {
            op2 = st.pop();
            op1 = st.pop();

            if(tokens[i] === '+')
                st.push(op1 + op2);
            else if(tokens[i] === '-')
                st.push(op1 - op2);
            else if(tokens[i] === '*')
                st.push(op1 * op2);
            else
                st.push(op1 / op2 | 0);
        }
    }

    return st[0];
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: tokens = ['2', '1', '+', '3', '*']

Step 1: stack<ll> st
        int op1, op2

Step 2: loop for int i = 0; i < tokens.size()
          i < tokens.size()
          0 < 5
          true

          if tokens[i] != '+' && tokens[i] != '-' && tokens[i] != '*' && tokens[i] != '/'
             tokens[0] is '2'
             true

             st.push(stoi(tokens[i]))
             st.push(stoi(tokens[0]))
             st.push(2)

             st = [2]

          i++
          i = 1

Step 3: loop for i < tokens.size()
          1 < 5
          true

          if tokens[i] != '+' && tokens[i] != '-' && tokens[i] != '*' && tokens[i] != '/'
             tokens[1] is '1'
             true

             st.push(stoi(tokens[i]))
             st.push(stoi(tokens[1]))
             st.push(1)

             st = [2, 1]

          i++
          i = 2

Step 4: loop for i < tokens.size()
          2 < 5
          true

          if tokens[i] != '+' && tokens[i] != '-' && tokens[i] != '*' && tokens[i] != '/'
             tokens[1] is '+'
             false

          else
            op2 = st.top()
                = 1

            st.pop()
            st = [2]

            op1 = st.top()
                = 2

            st.pop()
            st = []

            if tokens[i] == '+'
               true

               st.push(op1 + op2)
               st.push(2 + 1)
               st.push(3)

               st = [3]

          i++
          i = 3

Step 5: loop for i < tokens.size()
          3 < 5
          true

          if tokens[i] != '+' && tokens[i] != '-' && tokens[i] != '*' && tokens[i] != '/'
             tokens[3] is '3'
             true

             st.push(stoi(tokens[i]))
             st.push(stoi(tokens[3]))
             st.push(3)

             st = [3, 3]

          i++
          i = 4

Step 6: loop for i < tokens.size()
          4 < 5
          true

          if tokens[i] != '+' && tokens[i] != '-' && tokens[i] != '*' && tokens[i] != '/'
             tokens[4] is '*'
             false

          else
            op2 = st.top()
                = 3

            st.pop()
            st = [3]

            op1 = st.top()
                = 3

            st.pop()
            st = []

            if tokens[i] == '+'
              false
            else if tokens[i] == '-'
              false
            else if tokens[i] == '*'
               st.push(op1 * op2)
               st.push(3 * 3)
               st.push(9)

               st = [9]

          i++
          i = 5

Step 7: loop for i < tokens.size()
          5 < 5
          false

Step 8: return st[0]

We return the answer as 9.
```
