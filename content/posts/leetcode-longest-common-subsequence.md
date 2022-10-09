---
title: LeetCode - Longest Common Subsequence
description: LeetCode - return the length of their longest common subsequence in C++, Golang, and Javascript.
date: 2022-10-09
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode return the length of their longest common subsequence, c++, golang, javascript"
---

### Problem statement

Given two strings *text1* and *text2*, return the length of their longest **common subsequence**. If there is no **common subsequence**, return 0.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

* For example, 'ace' is a subsequence of 'abcde'.

A **common subsequence** of two strings is a subsequence that is common to both strings.

Problem statement taken from: <a href='https://leetcode.com/problems/longest-common-subsequence' target='_blank'>https://leetcode.com/problems/longest-common-subsequence</a>

**Example 1:**

```
Input: text1 = 'abcde', text2 = 'ace'
Output: 3
Explanation: The longest common subsequence is 'ace' and its length is 3.
```

**Example 2:**

```
Input: text1 = 'abc', text2 = 'abc'
Output: 3
Explanation: The longest common subsequence is 'abc' and its length is 3.
```

**Example 3:**

```
Input: text1 = 'abc', text2 = 'def'
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
```

**Constraints:**

```
- 1 <= text1.length, text2.length <= 1000
- text1 and text2 consist of only lowercase English characters.
```

### Explanation

#### Recursion

A naive solution is to check every subsequence of *text1[1..n]* to see if it is also a subsequence of *text2[1..m]*.
To achieve this, we can break down the problem into smaller subproblems until the solution becomes trivial.
We shorten each sequence by removing the last element to break the problem into subproblems.
We recursively perform the same operation on the shortened string and keep pulling the last part
until we reach the string's first character.

Removing the last character of the strings depends on two situations.

* text1 and text2 both end in the same element

```
LCS(text1[1..n], text2[1..m]) = LCS(text1[1..n - 1], text2[1..m - 1]) if text1[n] == text2[m]
```

* text1 and text2 do not end in the same element

Let's take an example to understand this.

```
text1 = 'abc'
text2 = 'abcde'
```

*text1* ends with *c*, while *text2* ends with *e*. We can remove the last character *e* from the string *text2* and
reduce our problem to *LCS(text1[1..n], text2[1..m - 1])*

Similarly, we remove the last character *c* from string *text1* and reduce our problem to *LCS(text1[1..n - 1], text2[1..m])*.
We want to compute the length of the longest common subsequence.
We handle this case using the below approach.

```
LCS(text1[1..n], text2[1..m]) = max(LCS(text1[1..n], text2[1..m - 1]), LCS(text1[1..n - 1], text2[1..m]))
```

A C++ snippet of the above approach is as below:

```cpp
int lcsLength(string text1, string text2, int n, int m) {
    if(n == 0 || m == 0) {
        return 0;
    }

    if(text1[n - 1] == text2[m - 1]) {
        return lcsLength(text1, text2, n - 1, m - 1) + 1;
    }

    return max(lcsLength(X, Y, m, n - 1), lcsLength(X, Y, m - 1, n));
}
```

The time complexity of the above approach is **O(2 ^(n + m))** and space complexity is **O(1)**.

#### Dynamic programming

The above approach has overlapping subproblems. Let's construct a partial recursion tree for the above example to verify
the overlapping subproblems.

```
text1 = 'abc'
text2 = 'abcde'

n = text1.length
  = 3

m = text2.length
  = 5

                        (3, 5)
                   ________|_________
                  |                  |
                (2, 5)             (3, 4)
                  |                  |
     _____________|                  |_____________
     |            |                  |             |
    (1, 5)      (2, 4)              (2, 4)        (3, 3)

    (2, 4) is computed twice.
```

The subproblem *(2, 4)* is computed twice. We know that problems having **optimal substructure** and **overlapping subproblems** can be solved by dynamic programming.

Let's check the algorithm first.

```
- set n = text1.size()
      m = text2.size()

- initialize 2D array int dp[n + 1][m + 1]

- loop for i = 1; i <= n; i++
    loop for j = 1; j <= m; j++
      if text1[i - 1] == text2[j - 1]
        - update dp[i][j] = dp[i - 1][j - 1] + 1
      else
        - update dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])

- return dp[n][m]
```

The time complexity of the above approach is **O(N * M)** and the space complexity is **O(N * M)**.

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int n = text1.size();
        int m = text2.size();
        vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

        for(int i = 1; i <= n; i++) {
            for(int j = 1; j <= m; j++) {
                if(text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = max(dp[i][j - 1], dp[i - 1][j]);
                }
            }
        }

        return dp[n][m];
    }
};
```

#### Golang solution

```go
func longestCommonSubsequence(text1 string, text2 string) int {
    n := len(text1)
    m := len(text2)
    dp := make([][]int, n + 1)

    for i := range dp {
        dp[i] = make([]int, m + 1)
    }

    for i := 1; i <= n; i++ {
        for j := 1; j <= m; j++ {
            if text1[i - 1] == text2[j - 1] {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
            }
        }
    }

    return dp[n][m]
}

func max(a, b int) int {
    if a > b {
        return a
    }

    return b
}
```

#### Javascript solution

```javascript
var longestCommonSubsequence = function(text1, text2) {
    let n = text1.length;
    let m = text2.length;
    let dp = new Array(n + 1).fill(0);

    for (let i = 0; i < n + 1; i++) {
        dp[i] = new Array(m + 1).fill(0);
    }

    for(let i = 1; i <= n; i++) {
        for(let j = 1; j <= m; j++) {
            if(text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i- 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[n][m];
};
```

Let's dry-run our algorithm for **Example 1**.

```
Input: text1 = 'abcde'
       text2 = 'ace'

Step 1: n = text1.size()
          = 5
        m = text2.size()
          = 3

Step 2: dp(n + 1, vector<int>(m + 1, 0))
        dp = [
               [0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0]
             ]

Step 3: loop for i = 1; i <= n
          1 <= 5
          true

          loop for j = 1; j <= m
            1 <= 3
            true

            if text1[i - 1] == text2[j - 1]
               text1[0] == text2[0]
               'a' == 'a'
               true

               dp[i][j] = dp[i - 1][j - 1] + 1
               dp[1][1] = dp[0][0] + 1
                        = 1

            j++
            j = 2

          loop for j <= m
            2 <= 3
            true

            if text1[i - 1] == text2[j - 1]
               text1[0] == text2[1]
               'a' == 'c'
               false

            else
               dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
               dp[1][2] = max(dp[1][1], dp[0][2])
                        = max(1, 0)
                        = 1

            j++
            j = 3

          loop for j <= m
            3 <= 3
            true

            if text1[i - 1] == text2[j - 1]
               text1[0] == text2[2]
               'a' == 'e'
               false

            else
               dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
               dp[1][3] = max(dp[1][2], dp[0][3])
                        = max(1, 0)
                        = 1

            j++
            j = 4

          loop for j <= m
            4 <= 3
            false

          i++
          i = 2

          dp = [
               [0, 0, 0, 0],
               [0, 1, 1, 1],
               [0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0]
             ]

Step 4: loop for i = 1; i <= n
          2 <= 5
          true

          loop for j = 1; j <= m
            1 <= 3
            true

            if text1[i - 1] == text2[j - 1]
               text1[1] == text2[0]
               'b' == 'a'
               false

            else
               dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
               dp[2][1] = max(dp[2][0], dp[1][1])
                        = max(0, 1)
                        = 1

            j++
            j = 2

          loop for j = 1; j <= m
            2 <= 3
            true

            if text1[i - 1] == text2[j - 1]
               text1[1] == text2[1]
               'b' == 'c'
               false

            else
               dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
               dp[2][2] = max(dp[2][1], dp[1][2])
                        = max(1, 1)
                        = 1

            j++
            j = 3

          loop for j = 1; j <= m
            3 <= 3
            true

            if text1[i - 1] == text2[j - 1]
               text1[1] == text2[2]
               'b' == 'e'
               false

            else
               dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
               dp[2][3] = max(dp[2][2], dp[1][3])
                        = max(1, 1)
                        = 1

            j++
            j = 4

            loop for j <= m
              4 <= 3
              false

          i++
          i = 3

          dp = [
               [0, 0, 0, 0],
               [0, 1, 1, 1],
               [0, 1, 1, 1],
               [0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0]
             ]

Step 5: loop for i = 1; i <= n
          3 <= 5
          true

          loop for j = 1; j <= m
            1 <= 3
            true

            if text1[i - 1] == text2[j - 1]
               text1[3] == text2[0]
               'c' == 'a'
               false

            else
               dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
               dp[3][1] = max(dp[3][0], dp[2][1])
                        = max(0, 1)
                        = 1

            j++
            j = 2

            loop for j = 1; j <= m
              2 <= 3
              true

              if text1[i - 1] == text2[j - 1]
                 text1[2] == text2[1]
                 'c' == 'c'
                 true

                 dp[i][j] = dp[i - 1][j - 1] + 1
                 dp[3][2] = dp[2][1] + 1
                          = 1 + 1
                          = 2

              j++
              j = 3

            loop for j = 1; j <= m
              3 <= 3
              true

              if text1[i - 1] == text2[j - 1]
                 text1[2] == text2[2]
                 'c' == 'e'
                 false

              else
                 dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
                 dp[3][3] = max(dp[3][2], dp[2][3])
                          = max(2, 1)
                          = 2

              j++
              j = 4

              loop for j <= m
                4 <= 3
                false

            i++
            i = 4

            dp = [
               [0, 0, 0, 0],
               [0, 1, 1, 1],
               [0, 1, 1, 1],
               [0, 1, 2, 2],
               [0, 0, 0, 0],
               [0, 0, 0, 0]
            ]

Step 6: loop for i = 1; i <= n
          4 <= 5
          true

          loop for j = 1; j <= m
            1 <= 3
            true

            if text1[i - 1] == text2[j - 1]
               text1[3] == text2[0]
               'd' == 'a'
               false

            else
               dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
               dp[4][1] = max(dp[4][0], dp[3][1])
                        = max(0, 1)
                        = 1

            j++
            j = 2

          loop for j = 1; j <= m
            2 <= 3
            true

            if text1[i - 1] == text2[j - 1]
               text1[3] == text2[1]
               'd' == 'c'
               false

            else
               dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
               dp[4][2] = max(dp[4][1], dp[3][2])
                        = max(1, 2)
                        = 2

            j++
            j = 3

          loop for j = 1; j <= m
            3 <= 3
            true

            if text1[i - 1] == text2[j - 1]
               text1[3] == text2[2]
               'd' == 'e'
               false

            else
               dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
               dp[4][3] = max(dp[4][2], dp[3][3])
                        = max(2, 2)
                        = 2

            j++
            j = 4

            loop for j <= m
              4 <= 3
              false

          i++
          i = 5

          dp = [
               [0, 0, 0, 0],
               [0, 1, 1, 1],
               [0, 1, 1, 1],
               [0, 1, 2, 2],
               [0, 1, 2, 2],
               [0, 0, 0, 0]
             ]

Step 7: loop for i = 1; i <= n
          5 <= 5
          true

          loop for j = 1; j <= m
            1 <= 3
            true

            if text1[i - 1] == text2[j - 1]
               text1[4] == text2[0]
               'e' == 'a'
               false

            else
               dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
               dp[5][1] = max(dp[5][0], dp[4][1])
                        = max(0, 1)
                        = 1

            j++
            j = 2

            loop for j = 1; j <= m
              2 <= 3
              true

              if text1[i - 1] == text2[j - 1]
                 text1[4] == text2[1]
                 'e' == 'c'
                 false

              else
                 dp[i][j] = max(dp[i][j - 1], dp[i - 1][j])
                 dp[5][2] = max(dp[5][1], dp[4][2])
                        = max(1, 2)
                        = 2

              j++
              j = 3

            loop for j = 1; j <= m
              3 <= 3
              true

              if text1[i - 1] == text2[j - 1]
                 text1[4] == text2[3]
                 'e' == 'e'
                 true

                 dp[i][j] = dp[i - 1][j - 1] + 1
                 dp[5][3] = dp[4][2] + 1
                          = 2 + 1
                          = 3

              j++
              j = 4

              loop for j <= m
                4 <= 3
                false

            i++
            i = 6

            dp = [
               [0, 0, 0, 0],
               [0, 1, 1, 1],
               [0, 1, 1, 1],
               [0, 1, 2, 2],
               [0, 1, 2, 2],
               [0, 1, 2, 3]
            ]

Step 8: loop for i = 1; i <= n
          6 <= 5
          false

Step 9: return dp[n][m]
               dp[5][3] = 3

We return the answer as 3.
```
