---
title: LeetCode - Combinations
description: LeetCode - return all possible combinations of k numbers out of the range [1, n] using C++, Golang, and Javascript.
date: 2022-05-01
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return all possible combinations of k numbers out of the range [1, n], c++, golang, javascript"
---

## Problem statement

Given two integers *n* and *k*, return *all possible combinations of k numbers out of the range [1, n]*.

You may return the answer in **any order**.

Problem statement taken from: <a href='https://leetcode.com/problems/combinations/' target='_blank'>https://leetcode.com/problems/combinations/</a>.

**Example 1:**

```
Input: n = 4, k = 2
Output:
[
  [2, 4],
  [3, 4],
  [2, 3],
  [1, 2],
  [1, 3],
  [1, 4],
]
```

**Example 2:**

```
Input: n = 1, k = 1
Output: [[1]]
```

**Constraints:**

```
- 1 <= n <= 20
- 1 <= k <= n
```

### Explanation

#### Brute force solution

The brute force approach is to generate all possible combinations of size
k for the n elements.
This approach will consume a lot of time when we increase **n**.

#### Backtracking

An optimized solution is to use a backtracking approach.
We create a temporary array called **current**
and
keep adding the elements till the size of the **current** array is equal to
**k**.

Once we reach the limit **k**, we pop the last element
and
push the next element. We repeat the same steps till we reach **n**.

Let's check the algorithm to see how we can use this formula.

```
// combine(n, k)
- initialize result, current

- backtrack(result, current, n, k, 0)

- return result

// backtrack(result, current, n, k, pos)
- if current.size() == k
  - result.push_back(current)
  - return

- loop for i = pos; i < n; i++
  - current.push_back(i + 1)
  - backtrack(result, current, n, k, i + 1)
  - current.pop_back()
```

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    void backtrack(vector<vector<int>> &result, vector<int> current, int n, int k, int pos) {
        if(current.size() == k) {
            result.push_back(current);
            return;
        }

        for(int i = pos; i < n; i++) {
            current.push_back(i + 1);
            backtrack(result, current, n, k, i + 1);
            current.pop_back();
        }
    }

    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> result;
        vector<int> current;

        backtrack(result, current, n, k, 0);

        return result;
    }
};
```

#### Golang solution

```go
func backtrack(result *[][]int, current []int, n, k, pos int) {
    if len(current) == k {
        *result = append(*result, append([]int{}, current...))
        return
    }

    for i := pos; i < n; i++ {
        current = append(current, i + 1)
        backtrack(result, current, n, k, i + 1)
        current = current[:len(current) - 1]
    }
}

func combine(n int, k int) [][]int {
    result := make([][]int, 0)

    backtrack(&result, []int{}, n, k, 0)

    return result
}
```

#### Javascript solution

```javascript
var combine = function(n, k) {
    let result = [];

    const backtrack = (pos, n, k, current) => {
        if(current.length === k){
            result.push([...current]);
        }

        if(pos > n){
            return;
        }
        for(let i = pos; i <= n; i++){
            current.push(i);
            backtrack(i + 1, n, k, current);
            current.pop();
        }
    }

    backtrack(1, n, k, []);

    return result;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: n = 3, k = 2

// combine function
Step 1: vector<vector<int>> result
        vector<int> current

Step 2: backtrack(result, current, n, k, 0)
        backtrack([[]], [], 3, 2, 0)

// backtrack function
Step 3: current.size() == k
        0 == 2
        false

        loop for i = pos; i < n;
          i = 0
          0 < 3
          true

          current.push_back(i + 1)
          current.push_back(0 + 1)
          current.push_back(1)

          current = [1]

          backtrack(result, current, n, k, i + 1)
          backtrack([[]], [1], 3, 2, 0 + 1)
          backtrack([[]], [1], 3, 2, 1)

Step 4: current.size() == k
        1 == 2
        false

        loop for i = pos; i < n;
          i = 1
          1 < 3
          true

          current.push_back(i + 1)
          current.push_back(1 + 1)
          current.push_back(2)

          current = [1, 2]

          backtrack(result, current, n, k, i + 1)
          backtrack([[]], [1, 2], 3, 2, 1 + 1)
          backtrack([[]], [1, 2], 3, 2, 2)

Step 5: current.size() == k
        2 == 2
        true

        result.push_back(current)
        result.push_back([1, 2])

        result = [[1, 2]]
        return

        We backtrack to step 4 and move to the next step.

Step 6: current.pop_back()
        current = [1, 2]

        current = [1]

        i++
        i = 2

        loop for i = pos; i < n;
          i = 2
          2 < 3
          true

          current.push_back(i + 1)
          current.push_back(2 + 1)
          current.push_back(3)

          current = [1, 3]

          backtrack(result, current, n, k, i + 1)
          backtrack([[1, 2]], [1, 3], 3, 2, 2 + 1)
          backtrack([[1, 2]], [1, 3], 3, 2, 3)

Step 7: current.size() == k
        2 == 2
        true

        result.push_back(current)
        result.push_back([1, 3])

        result = [[1, 2], [1, 3]]
        return

        We backtrack to step 6 and move to the next step.

Step 8: current.pop_back()
        current = [1, 3]

        current = [1]

        i++
        i = 3

        loop for i = pos; i < n;
          i = 3
          3 < 3
          false

        We backtrack to step 3 and move to the next step.

Step 9: current.pop_back()
        current = [1]

        current = []

        i++
        i = 1

        loop for i = pos; i < n;
          i = 1
          1 < 3
          true

          current.push_back(i + 1)
          current.push_back(1 + 1)
          current.push_back(2)

          current = [2]

          backtrack(result, current, n, k, i + 1)
          backtrack([[1, 2], [1, 3]], [2], 3, 2, 1 + 1)
          backtrack([[1, 2], [1, 3]], [2], 3, 2, 2)

Step 10: current.size() == k
         1 == 2
         false

         loop for i = pos; i < n;
           i = 2
           2 < 3
           true

           current.push_back(i + 1)
           current.push_back(2 + 1)
           current.push_back(3)

           current = [2, 3]

           backtrack(result, current, n, k, i + 1)
           backtrack([[1, 2], [1, 3]], [2, 3], 3, 2, 2 + 1)
           backtrack([[1, 2], [1, 3]], [2, 3], 3, 2, 3)

Step 11:  current.size() == k
          2 == 2
          true

          result.push_back(current)
          result.push_back([2, 3])

          result = [[1, 2], [1, 3], [2, 3]]
          return

          We backtrack to step 10 and move to the next step.

Step 12: current.pop_back()
         current = [2, 3]

         current = [2]

         i++
         i = 3

         loop for i = pos; i < n;
           i = 3
           3 < 3
           false

         We backtrack to step 9

Step 13: current.pop_back()
         current = [2]

         current = []

         i++
         i = 3

         loop for i = pos; i < n;
           i = 3
           3 < 3
           false

        We backtrack to combine function and return result

// combine function
Step 14: return result

So we return the result as [[1, 2], [1, 3], [2, 3]]
```
