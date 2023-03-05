---
title: LeetCode - Generate Parentheses
description: LeetCode - Generate Parentheses using C++, Golang and Javascript.
date: 2021-08-15
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - generate parentheses, c++, golang, javascript"
---

## Problem statement

Given **n** pairs of parentheses,
write a function to *generate all combinations of well-formed parentheses*.

Problem statement taken from: <a href='https://leetcode.com/problems/generate-parentheses' target='_blank'>https://leetcode.com/problems/generate-parentheses</a>

**Example 1:**

```
Input: n = 3
Output: ['((()))', '(()())', '(())()', '()(())', '()()()']
```

**Example 2:**

```
Input: n = 1
Output: ['()']
```

**Constraints:**

```
- 1 <= n <= 8
```

### Explanation

#### Brute force

A brute force approach to this problem is to generate all combinations of parenthesis using
**(** and **)**.
Then verify which are the valid ones and add the valid ones to the result.

A small C++ code snippet of the above logic will look as below:

```cpp
vector<string> generateParenthesis(int n) {
    vector<string> combinations;
    generateAll('', 0, combinations);
    return combinations;
}

void generateAll(string current, int pos, vector<string> result) {
    if (pos == current.length) {
        if (valid(current))
            result.add(string(current));
    } else {
        current += '(';
        generateAll(current, pos+1, result);
        current += ')';
        generateAll(current, pos+1, result);
    }
}

bool valid(string current) {
    int balance = 0;
    for (int i = 0; i < current.length; i++) {
        if (current[i] == '(') balance++;
        else balance--;
        if (balance < 0) return false;
    }
    return balance == 0;
}
```

The time complexity of the above program is **O((2^2n)*n)**.

#### Backtracking

We can avoid generating all possible permutations of parenthesis by using backtracking
approach.

Instead of adding **(** or **)** every time as in the above approach,
we add them only when we know it will remain a valid sequence.
To do this,
we can keep track of the number of opening and closing brackets we have
added so far.

#### Algorithm

```
- initialize result array.

- call _generateParenthesis('', n, 0, 0, result)
  - This is a recursive function that will generate the valid parenthesis.

- return result

// _generateParenthesis(current, n, left, right, result)

- if right == n
  - result.push_back(current) and return
- else
  - if left < n
    - call _generateParenthesis(current + '(', n, left + 1, right, result)

  - if left > right
    - call _generateParenthesis(current + ')', n, left, right + 1, result)
```

#### C++ solution

```cpp
class Solution {
public:
    void _generateParenthesis(string current, int n, int left, int right, vector<string>& result) {
        if(right == n){
            result.push_back(current);
            return;
        } else {
            if(left < n){
                _generateParenthesis(current + '(', n, left + 1, right, result);
            }

            if(left > right){
                _generateParenthesis(current + ')', n, left, right + 1, result);
            }
        }
    }

    vector<string> generateParenthesis(int n) {
        vector<string> result;
        _generateParenthesis('', n, 0, 0, result);

        return result;
    }
};
```

#### Golang solution

```go
func generateParenthesis(n int) []string {
    result := make([]string, 0)

    _generateParenthesis('', n, 0, 0, &result)
    return result
}

func _generateParenthesis(current string, n, left, right int, result *[]string) {
    if right == n {
        *result = append(*result, current)
        return
    } else {
        if left < n {
            _generateParenthesis(current + '(', n, left + 1, right, result)
        }

        if left > right {
            _generateParenthesis(current + ')', n, left, right + 1, result)
        }
    }
}
```

#### Javascript solution

```javascript
var generateParenthesis = function(n) {
    let result = [];

    _generateParenthesis('', n, 0, 0, result);

    return result;
};

var _generateParenthesis = function(current, n, left, right, result){
    if( right === n ) {
        result.push(current);
        return;
    } else {
        if( left < n ) {
           _generateParenthesis(current + '(', n, left + 1, right, result);
        }

        if( left > right) {
            _generateParenthesis(current + ')', n, left, right + 1, result);
        }
    }
}
```

Let's dry-run our algorithm to see how the solution works.

```
Input: n = 2

Step 1: vector<string> result;

Step 2: _generateParenthesis('', n, 0, 0, result)

// in _generateParenthesis(current, n, left, right, result)

Step 3: right == n
        0 == 2
        false

        left < n
        0 < 2
        true

        _generateParenthesis(current + '(', n, left + 1, right, result)
        _generateParenthesis('' + '(', 2, 0 + 1, 0, [])
        _generateParenthesis('(', 2, 1, 0, [])

Step 4: right == n
        0 == 2
        false

        left < n
        1 < 2
        true

        _generateParenthesis(current + '(', n, left + 1, right, result)
        _generateParenthesis('(' + '(', 2, 1 + 1, 0, [])
        _generateParenthesis('((', 2, 2, 0, [])

Step 5: right == n
        0 == 2
        false

        left < n
        2 < 2
        false

        left > right

        2 > 0
        true

        _generateParenthesis(current + ')', n, left, right + 1, result)
        _generateParenthesis('((' + ')', 2, 2, 0 + 1, [])
        _generateParenthesis('(()', 2, 2, 1, [])

Step 6: right == n
        1 == 2
        false

        left < n
        2 < 2
        false

        left > right

        2 > 1
        true

        _generateParenthesis(current + ')', n, left, right + 1, result)
        _generateParenthesis('(()' + ')', 2, 2, 1 + 1, [])
        _generateParenthesis('(())', 2, 2, 2, [])

Step 7: right == n
        2 == 2
        true

        result.push_back(current)
        [].push_back('(())')
        ['(())']

Step 8: This step goes to the next line of Step 4, where the left is set to 1 and the right is 0.

        left = 1
        right = 0
        current = '('

        _generateParenthesis(current + ')', n, left, right + 1, result)
        _generateParenthesis('(' + ')', 2, 1, 0 + 1, ['(())'])
        _generateParenthesis('()', 2, 1, 1, ['(())'])

Step 9: right == n
        1 == 2
        false

        left < n
        1 < 2
        true

        _generateParenthesis(current + '(', n, left + 1, right, result)
        _generateParenthesis('()' + '(', 2, 1 + 1, 1, ['(())'])
        _generateParenthesis('()(', 2, 2, 1, ['(())'])

Step 10: right == n
         1 == 2
         false

         left < n
         2 < 2
         false

         left > right
         2 > 1

         _generateParenthesis(current + ')', n, left, right + 1, result)
         _generateParenthesis('()(' + ')', 2, 2, 1 + 1, ['(())'])
         _generateParenthesis('()()', 2, 2, 2, ['(())'])

Step 11: right == n
         2 == 2
         true

         result.push_back(current)
         ['(())'].push_back('()()')

Control flows back to Step 3 and then fallbacks to Step 2.

We return result as ['(())', '()()'].
```
