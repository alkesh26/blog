---
title: LeetCode - Unique Binary Search Trees
description: LeetCode - return the number of structurally unique BST's using C++, Golang, and Javascript.
date: 2022-03-20
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the number of structurally unique BST's, c++, golang, javascript"
---

### Problem statement

Given an integer *n*, return *the number of structurally unique **BST's** (binary search trees) which has exactly n nodes of unique values from 1 to n*.

Problem statement taken from: <a href='https://leetcode.com/problems/unique-binary-search-trees' target='_blank'>https://leetcode.com/problems/unique-binary-search-trees</a>.

**Example 1:**

![Container](./../unique-binary-search-tree.png)

```
Input: n = 3
Output: 5
```

**Example 2:**

```
Input: n = 1
Output: 1
```

**Constraints:**

```
- 1 <= n <= 19
```

### Explanation

#### Brute force solution

The brute force approach is to generate all the possible BSTs and get the count.
This approach will consume a lot of time when we increase **n**.

#### Dynamic Programming

With Dynamic Programming, we will reduce the scope of generating the BSTs and use
mathematical concept to get the required result.

Let's take an example where **n** is **5**.
If node **2** is the root, then the left subtree will include **1** and
the right subtree will include **3**, **4**, and **5**.
The possible number of combinations in the left subtree is 1, and in the right subtree is
5. We multiply 1 and 5.
Similarly, if **3** is the root node, the possible number of combinations in
the left subtree will be 2, and the number of combinations in the right subtree will be 2. So the total BST's
when root node is **3** is **2*2 = 4**.
We add up all these combinations for each node 1 to n and return the required
result.

A C++ snippet of the above approach is as below:

```cpp
int numberOfBST(int n) {
    int dp[n + 1];
    fill_n(dp, n + 1, 0);

    dp[0] = 1;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        for (int j = 1; j <= i; j++) {
            dp[i] = dp[i] + (dp[i - j] * dp[j - 1]);
        }
    }

    return dp[n];
}
```

The time complexity of the above approach is **O(N^2)** and space complexity is
**O(N)**.

#### Catalan numbers

[Catalan numbers](https://en.wikipedia.org/wiki/Catalan_number),
in combinatorial mathematics, are a sequence of natural numbers that occur in various counting problems,
often involving recursively defined objects.

It is denoted by Cn and the formula to calculate it is
**(2n)! / ((n + 1)! * n!)**.

Let's check the algorithm to see how we can use this formula.

```
// numTrees function
- return catalan(2*n, n)

// catalan function
catalan(n , k)
- set result = 1

- if k > n - k
  - k = n - k

- for i = 0; i < k; i++
  - result *= (n - i)
  - result /= (i + 1)

- return result/(k + 1)
```

The time complexity of this approach is **O(N)**, and space complexity is **O(1)**.
Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    long long catalan(int n, int k) {
        long long result = 1;

        if(k > n - k) {
            k = n - k;
        }

        for(int i = 0; i < k; i++) {
            result *= (n - i);
            result /= (i + 1);
        }

        return result/(k + 1);
    }

    int numTrees(int n) {
        long long result = catalan(2*n , n );

        return (int) result ;

    }
};
```

#### Golang solution

```go
func catalan(n, k int) int {
    result := 1

    if k > n - k {
        k = n - k
    }

    for i := 0; i < k; i++ {
        result *= (n - i)
        result /= (i + 1)
    }

    return result/(k + 1)
}

func numTrees(n int) int {
    return catalan(2*n , n )
}
```

#### Javascript solution

```javascript
var catalan = function(n, k) {
    let result = 1;

    if(k > n - k) {
        k = n - k;
    }

    for(let i = 0; i < k; i++) {
        result *= (n - i);
        result /= (i + 1);
    }

    return result/(k + 1);
}

var numTrees = function(n) {
    return catalan(2*n, n);
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input n = 4

Step 1: result = catalan(2*n , n )
               = catalan(2*4, 4)
               = catalan(8, 4)

// catalan function
Step 2: result = 1
        n = 8, k = 4

Step 3: if k > n - k
           4 > 8 - 4
           4 > 4
           false

Step 4: loop for i = 0; i < k
          0 < 4
          true

          result *= (n - i)
                  = result * (n - i)
                  = 1 * (8 - 0)
                  = 8

          result /= (i + 1)
                  = result / (i + 1)
                  = 8 / (0 + 1)
                  = 8

          i++
          i = 1

Step 5: loop for i < k
          1 < 4
          true

          result *= (n - i)
                  = result * (n - i)
                  = 8 * (8 - 1)
                  = 8 * 7
                  = 56

          result /= (i + 1)
                  = result / (i + 1)
                  = 56 / (1 + 1)
                  = 56 / 2
                  = 28

          i++
          i = 2

Step 6: loop for i < k
          2 < 4
          true

          result *= (n - i)
                  = result * (n - i)
                  = 28 * (8 - 2)
                  = 28 * 6
                  = 168

          result /= (i + 1)
                  = result / (i + 1)
                  = 168 / (2 + 1)
                  = 168 / 3
                  = 56

          i++
          i = 3

Step 7: loop for i < k
          3 < 4
          true

          result *= (n - i)
                  = result * (n - i)
                  = 56 * (8 - 3)
                  = 56 * 5
                  = 280

          result /= (i + 1)
                  = result / (i + 1)
                  = 280 / (3 + 1)
                  = 280 / 4
                  = 70

          i++
          i = 4

Step 8: loop for i < k
          4 < 4
          false

Step 9: return result/(k + 1)
               70/(4 + 1)
               70/5
               14

So we return the answer as 14.
```
