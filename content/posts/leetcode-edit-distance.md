---
title: LeetCode - Edit Distance
description: LeetCode - return the minimum number of operations required to convert word1 to word2 using C++, Golang, and JavaScript.
date: 2023-05-14
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the minimum number of operations required to convert word1 to word2, c++, golang, javascript"
---

## Problem statement

Given two strings `word1` and `word2`, return *the minimum number of operations required to convert word1 to word2*.

You have the following three operations permitted on a word:

* Insert a character
* Delete a character
* Replace a character

Problem statement taken from: <a href='https://leetcode.com/problems/edit-distance' target='_blank'>https://leetcode.com/problems/edit-distance</a>

**Example 1:**

```
Input: word1 = 'horse', word2 = 'ros'
Output: 3
Explanation:
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
```

**Example 2:**

```
Input: word1 = 'intention', word2 = 'execution'
Output: 5
Explanation:
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
```

**Constraints:**

```
- 0 <= word1.length, word2.length <= 500
- word1 and word2 consist of lowercase English letters.
```

### Explanation

As per Wikipedia:

Edit Distance is a string metric, i.e. a way of quantifying how dissimilar two strings (e.g., words) are to one another, that is measured by counting the minimum number of operations required to transform one string into the other.

Edit distances find applications in natural language processing, where automatic spelling correction can determine candidate corrections for a misspelled word by selecting words from a dictionary that have a low distance to the word in question. In bioinformatics, it can be used to quantify the similarity of DNA sequences, which can be viewed as strings of the letters A, C, G, and T.

Different definitions of an edit distance use different sets of string operations. [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) operations are the removal, insertion, or substitution of a character in the string. Being the most common metric, the term Levenshtein distance is often used interchangeably with edit distance.

In this blog post, we will discuss three solutions to the Edit distance problem. We will start with brute force and try to optimize the solution using Dynamic programming.

#### Brute Force Approach

The brute approach is based on recursion. We think about the smaller subproblems which can be solved easily. We recurse over the input sequence and figure out which operation Insert, Delete, or Replace will cost the minimum.

We consider i and j as pointers to word1 and word2 respectively. If the first character of both strings are the same we then recurse for lengths i + 1 and j + 1. If the characters are different, we will perform all three operations on that character. We compute which operation cost is minimum.

A C++ snippet of this approach is as follows:

```cpp
int editDistance(string word1, string word2) {
    if (word1.length() == 0)
        return word2.length();

    if (word2.length() == 0)
        return word1.length();

    return match(word1, word2, 0, 0);
}

int match(string s1, string s2, int i, int j) {
    if (s1.length() == i)
         return s2.length() - j;

    if (s2.length() == j)
        return s1.length() - i;

    int result;

    if (s1[i] == s2[j]) {
        result = match(s1, s2, i + 1, j + 1);
    } else {
        int insertChar = match(s1, s2, i, j + 1);
        int deleteChar = match(s1, s2, i + 1, j);
        int substituteChar = match(s1, s2, i + 1, j + 1);
        result = min(insertChar, deleteChar, substituteChar) + 1;
    }

    return result
}
```

The time-complexity of this approach is **O(3^n)**. The space-complexity is **O(m)**, where m is the stack space of the recursion tree.

#### Dynamic Programming: Memoization Approach

If we look at the recursion stack in the brute force approach, we will find many subproblems are overlapping. When we calculate the minimum value for the ith and jth index of word1 and word2 respectively, we store the value in a cache array so that it could be used when needed.

Assuming we know the edit distance of two strings till i and j indices. We can then write

```
editDistance(i + 1, j + 1) = 1 + min (editDistance(i, j + 1), editDistance(i + 1, j), editDistance(i, j))
```

1. We check if the characters at word1[i] is equal to word2[j] then look for cache[i + 1][j + 1].

2. Else, we take minimum of cache[i + 1][j], cache[i][j + 1], cache[i][j] and add 1 to it and store the result in cache[i + 1][j + 1].

A C++ snippet of this approach is as follows:

```cpp
int editDistance(string word1, string word2) {
    int cache[word1.length][word2.length];

    for (int i = 0; i < word1.length; i++) {
        for (int j = 0; j < word2.length; j++) {
            cache[i][j] = -1;
        }
    }

    return match(word1, word2, 0, 0, cache);
}

int match(string s1, string s2, int i, int j, int[][] cache){
    if (s1.size() == i)
        return s2.size() - j;

    if (s2.size() == j)
        return s1.size() - i;

    if (cache[i][j] != -1) {
        return cache[i][j];
    }

    if (s1[i] == s2[j]) {
        cache[i][j] = match(s1, s2, i + 1, j + 1, cache);
    } else {
        int insertChar = match(s1, s2, i, j + 1, cache);
        int deleteChar = match(s1, s2, i + 1, j, cache);
        int replaceChar = match(s1, s2, i + 1, j + 1, cache);
        cache[i][j] = min(insertChar, deleteChar, replaceChar) + 1;
    }

    return cache[i][j];
}
```

The time-complexity of this approach is **O(n^2)**. The space-complexity is **O(n^2)**.

#### Dynamic Programming: Tabulation Approach

The tabulation approach works in a bottom-up fashion as compared to the top-down Memoization approach. With the bottom-up approach, while calculating editDistance for i and j, we first calculate the minimum from

```
editDistance(i - 1, j)
editDistance(i, j - 1)
editDistance(i - 1, j - 1)
```

Let's check the algorithm to understand it clearly.

#### Algorithm

```
- set m = word1.length()
      n = word2.length()

- initialize vector<vector<int>> dp(m + 1, vector<int>(n + 1))

- loop for i = 0; i <= m; i++
  - set dp[i][0] = i
- for end

- loop for j = 0; j <= n; j++
  - set dp[0][j] = j
- for end

- loop for i = 1; i <= m; i++
  - loop for j = 1; j <= n; j++
    - if word1[i - 1] == word2[j - 1]
      - set dp[i][j] = dp[i - 1][j - 1]
    - else
      - set dp[i][j] = 1 + min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1])
    - if end
  - for end
- for end

- return dp[m][n]
```

The time-complexity of this approach is **O(n^2)**. The space-complexity is **O(n^2)**.

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int editDistance(string word1, string word2) {
        int m = word1.length();
        int n = word2.length();

        vector<vector<int>> dp(m + 1, vector<int>(n + 1));

        for (int i = 0; i <= m; i++) {
            dp[i][0] = i;
        }

        for (int j = 0; j <= n; j++) {
            dp[0][j] = j;
        }

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1[i - 1] == word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]});
                }
            }
        }

        return dp[m][n];
    }
};
```

#### Golang solution

```go
func editDistance(word1 string, word2 string) int {
    m , n := len(word1), len(word2)

    dp := make([][]int, m + 1)

    for i := 0; i < m + 1; i++ {
        dp[i] = make([]int, n + 1)
    }

    for i := 0; i <= m; i++ {
        dp[i][0] = i
    }

    for j := 0; j <= n; j++ {
        dp[0][j] = j
    }

    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if word1[i - 1] == word2[j - 1] {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                dp[i][j] = 1 + min(min(dp[i][j - 1], dp[i - 1][j]), dp[i - 1][j - 1])
            }
        }
    }

    return dp[m][n]
}

func min(a, b int) int {
    if a < b {
        return a
    }

    return b
}
```

#### JavaScript solution

```javascript
var editDistance = function(word1, word2) {
    let m = word1.length;
    let n = word2.length;

    let dp = Array(m + 1).fill().map(() => Array(n + 1));

    for (let i = 0; i <= m; i++) {
        dp[i][0] = i;
    }

    for (let j = 0; j <= n; j++) {
        dp[0][j] = j;
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] == word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(Math.min(dp[i][j - 1], dp[i - 1][j]), dp[i - 1][j - 1]);
            }
        }
    }

    return dp[m][n];
};
```

#### Dry Run

Let's dry-run our algorithm for a few examples to see how the solution works.

```
Input: word1 = 'horse'
       word2 = 'ros'

Step 1: m = word1.length()
          = 5
        n = word2.length()
          = 3

Step 2: vector<vector<int>> dp(m + 1, vector<int>(n + 1))
        dp[6][4]

Step 3: loop for i = 0; i <= m; i++
            dp[i][0] = i
        for end

        dp = [
               [0, 0, 0, 0],
               [1, 0, 0, 0],
               [2, 0, 0, 0],
               [3, 0, 0, 0],
               [4, 0, 0, 0],
               [5, 0, 0, 0],
             ]

Step 4: loop for j = 0; i <= n; i++
            dp[0][j] = j
        for end

        dp = [
               [0, 1, 2, 3],
               [1, 0, 0, 0],
               [2, 0, 0, 0],
               [3, 0, 0, 0],
               [4, 0, 0, 0],
               [5, 0, 0, 0],
             ]

Step 5: loop for i = 1; i <= m
          1 <= 5
          true

          loop for j = 1; j <= n
            1 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[1 - 1] == word2[1 - 1]
               word1[0] == word2[0]
               'h' == 'r'
               false

            else
              dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]})
              dp[1][1] = 1 + min(dp[1][1 - 1], dp[1 - 1][1], dp[1 - 1][1 - 1])
                       = 1 + min(dp[1][0], dp[0][1], dp[0][0])
                       = 1 + min(1, 1, 0)
                       = 1 + 0
                       = 1

            j++
            j = 2

          loop for j <= n
            2 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[1 - 1] == word2[2 - 1]
               word1[0] == word2[1]
               'h' == 'o'
               false

            else
              dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]})
              dp[1][2] = 1 + min(dp[1][2 - 1], dp[1 - 1][2], dp[1 - 1][2 - 1])
                       = 1 + min(dp[1][1], dp[0][2], dp[0][1])
                       = 1 + min(1, 2, 1)
                       = 1 + 1
                       = 2

            j++
            j = 3

          loop for j <= n
            3 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[1 - 1] == word2[3 - 1]
               word1[0] == word2[2]
               'h' == 's'
               false

            else
              dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]})
              dp[1][3] = 1 + min(dp[1][3 - 1], dp[1 - 1][3], dp[1 - 1][3 - 1])
                       = 1 + min(dp[1][2], dp[0][3], dp[0][2])
                       = 1 + min(2, 3, 2)
                       = 1 + 2
                       = 3

            j++
            j = 4

          loop for j <= n
            4 <= 3
            false

          dp = [
                 [0, 1, 2, 3],
                 [1, 1, 2, 3],
                 [2, 0, 0, 0],
                 [3, 0, 0, 0],
                 [4, 0, 0, 0],
                 [5, 0, 0, 0],
               ]

          i++
          i = 2

Step 6: loop for i <= m
          2 <= 5
          true

          loop for j = 1; j <= n
            1 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[2 - 1] == word2[1 - 1]
               word1[1] == word2[0]
               'o' == 'r'
               false

            else
              dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]})
              dp[2][1] = 1 + min(dp[2][1 - 1], dp[2 - 1][1], dp[2 - 1][1 - 1])
                       = 1 + min(dp[2][0], dp[1][1], dp[1][0])
                       = 1 + min(2, 1, 1)
                       = 1 + 1
                       = 2

            j++
            j = 2

          loop for j <= n
            2 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[2 - 1] == word2[2 - 1]
               word1[1] == word2[1]
               'o' == 'o'
               true

               dp[i][j] = dp[i - 1][j - 1]
               dp[2][2] = dp[2 - 1][2 - 1]
                        = dp[1][1]
                        = 1

            j++
            j = 3

          loop for j <= n
            3 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[2 - 1] == word2[3 - 1]
               word1[1] == word2[2]
               'o' == 's'
               false

            else
              dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]})
              dp[2][3] = 1 + min(dp[2][3 - 1], dp[2 - 1][3], dp[2 - 1][3 - 1])
                       = 1 + min(dp[2][2], dp[1][3], dp[1][2])
                       = 1 + min(1, 3, 2)
                       = 1 + 1
                       = 2

            j++
            j = 4

          loop for j <= n
            4 <= 3
            false

          dp = [
                 [0, 1, 2, 3],
                 [1, 1, 2, 3],
                 [2, 2, 1, 2],
                 [3, 0, 0, 0],
                 [4, 0, 0, 0],
                 [5, 0, 0, 0],
               ]

          i++
          i = 3

Step 7: loop for i <= m
          3 <= 5
          true

          loop for j = 1; j <= n
            1 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[3 - 1] == word2[1 - 1]
               word1[2] == word2[0]
               'r' == 'r'
               true

               dp[i][j] = dp[i - 1][j - 1]
               dp[3][1] = dp[3 - 1][1 - 1]
                        = dp[2][0]
                        = 2

            j++
            j = 2

          loop for j <= n
            2 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[3 - 1] == word2[2 - 1]
               word1[2] == word2[1]
               'r' == 'o'
               false

            else
               dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]})
               dp[3][2] = 1 + min(dp[3][2 - 1], dp[3 - 1][2], dp[3 - 1][2 - 1])
                        = 1 + min(dp[3][1], dp[2][2], dp[2][1])
                        = 1 + min(0, 1, 2)
                        = 1 + 1
                        = 2

            j++
            j = 3

          loop for j <= n
            3 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[3 - 1] == word2[3 - 1]
               word1[2] == word2[2]
               'r' == 's'
               false

            else
               dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]})
               dp[3][3] = 1 + min(dp[3][3 - 1], dp[3 - 1][3], dp[3 - 1][3 - 1])
                        = 1 + min(dp[3][2], dp[2][3], dp[2][2])
                        = 1 + min(0, 1, 1)
                        = 1 + 1
                        = 2

            j++
            j = 4

          loop for j <= n
            4 <= 3
            false

          dp = [
                 [0, 1, 2, 3],
                 [1, 1, 2, 3],
                 [2, 2, 1, 2],
                 [3, 2, 2, 2],
                 [4, 0, 0, 0],
                 [5, 0, 0, 0],
               ]

          i++
          i = 4

Step 8: loop for i <= m
          4 <= 5
          true

          loop for j = 1; j <= n
            1 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[4 - 1] == word2[1 - 1]
               word1[3] == word2[0]
               's' == 'r'
               false

            else
               dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]})
               dp[4][1] = 1 + min(dp[4][1 - 1], dp[4 - 1][1], dp[4 - 1][1 - 1])
                        = 1 + min(dp[4][0], dp[3][1], dp[3][0])
                        = 1 + min(4, 2, 3)
                        = 1 + 2
                        = 3

            j++
            j = 2

          loop for j <= n
            2 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[4 - 1] == word2[2 - 1]
               word1[3] == word2[1]
               's' == 'o'
               false

            else
               dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]})
               dp[4][2] = 1 + min(dp[4][2 - 1], dp[4 - 1][2], dp[4 - 1][2 - 1])
                        = 1 + min(dp[4][1], dp[3][2], dp[3][1])
                        = 1 + min(3, 2, 2)
                        = 1 + 2
                        = 3

            j++
            j = 3

          loop for j <= n
            3 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[4 - 1] == word2[3 - 1]
               word1[3] == word2[2]
               's' == 's'
               true

               dp[i][j] = dp[i - 1][j - 1]
               dp[4][3] = dp[4 - 1][3 - 1]
                        = dp[3][2]
                        = 2

            j++
            j = 4

          loop for j <= n
            4 <= 3
            false

          dp = [
                 [0, 1, 2, 3],
                 [1, 1, 2, 3],
                 [2, 2, 1, 2],
                 [3, 2, 2, 2],
                 [4, 3, 3, 2],
                 [5, 0, 0, 0],
               ]

          i++
          i = 5

Step 9: loop for i <= m
          5 <= 5
          true

          loop for j = 1; j <= n
            1 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[5 - 1] == word2[1 - 1]
               word1[4] == word2[0]
               'e' == 'r'
               false

            else
               dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]})
               dp[5][1] = 1 + min(dp[5][1 - 1], dp[5 - 1][1], dp[5 - 1][1 - 1])
                        = 1 + min(dp[5][0], dp[4][1], dp[4][0])
                        = 1 + min(5, 3, 4)
                        = 1 + 3
                        = 4

            j++
            j = 2

          loop for j = 1; j <= n
            2 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[5 - 1] == word2[2 - 1]
               word1[4] == word2[1]
               'e' == 'o'
               false

            else
               dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]})
               dp[5][2] = 1 + min(dp[5][2 - 1], dp[5 - 1][2], dp[5 - 1][2 - 1])
                        = 1 + min(dp[5][1], dp[4][2], dp[4][1])
                        = 1 + min(4, 3, 3)
                        = 1 + 3
                        = 4

            j++
            j = 3

          loop for j = 1; j <= n
            3 <= 3
            true

            if word1[i - 1] == word2[j - 1]
               word1[5 - 1] == word2[3 - 1]
               word1[4] == word2[2]
               'e' == 's'
               false

            else
               dp[i][j] = 1 + min({dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]})
               dp[5][3] = 1 + min(dp[5][3 - 1], dp[5 - 1][3], dp[5 - 1][3 - 1])
                        = 1 + min(dp[5][2], dp[4][3], dp[4][2])
                        = 1 + min(4, 2, 3)
                        = 1 + 2
                        = 3

            j++
            j = 4

          loop for j = 1; j <= n
            4 <= 3
            false

          dp = [
                 [0, 1, 2, 3],
                 [1, 1, 2, 3],
                 [2, 2, 1, 2],
                 [3, 2, 2, 2],
                 [4, 3, 3, 2],
                 [5, 4, 4, 3],
               ]

          i++
          i = 6

Step 10: loop for i <= m
           6 <= 5
           false

Step 11: return dp[m][n]
                dp[5][3]
                3

We return the answer as 3.
```
