---
title: LeetCode - Find the Prefix Common Array of Two Arrays
description: LeetCode - return the prefix common array of A and B using C++, Golang, and JavaScript.
date: 2023-04-30
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "return the prefix common array of A and B, c++, golang, javascript"
---

## Problem statement

You are given two **0-indexed** integer permutations `A` and `B` of length `n`.

A **prefix common array** of A and B is an array C such that C[i] is equal to the count of numbers that are present at or before the index i in both A and B.

Return *the **prefix common array** of A and B*.

A sequence of n integers is called a **permutation** if it contains all integers from 1 to n exactly once.

Problem statement taken from: <a href='https://leetcode.com/problems/find-the-prefix-common-array-of-two-arrays' target='_blank'>https://leetcode.com/problems/find-the-prefix-common-array-of-two-arrays</a>

**Example 1:**

```
Input: A = [1, 3, 2, 4], B = [3, 1, 2, 4]
Output: [0, 2, 3, 4]
Explanation: At i = 0: no number is common, so C[0] = 0.
At i = 1: 1 and 3 are common in A and B, so C[1] = 2.
At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.
At i = 3: 1, 2, 3, and 4 are common in A and B, so C[3] = 4.
```

**Example 2:**

```
Input: A = [2, 3, 1], B = [3, 1, 2]
Output: [0, 1, 3]
Explanation: At i = 0: no number is common, so C[0] = 0.
At i = 1: only 3 is common in A and B, so C[1] = 1.
At i = 2: 1, 2, and 3 are common in A and B, so C[2] = 3.
```

**Constraints:**

```
- 1 <= A.length == B.length == n <= 50
- 1 <= A[i], B[i] <= n
- It is guaranteed that A and B are both a permutation of n integers.
```

### Explanation

#### Brute Force

We need to return an array result of the same length such that result[i] is the number of elements that are common in both A and B. We can start by creating two hash maps **map1** and **m2** to store the indices of each element in A and B, respectively.

We then iterate over array A and count the number of elements that are common to both A and B up to that point. We do this by checking if the index of each element in A is less than or equal to i and the index of the same element in B is also less than or equal to i. We store the count in an array result and return it as the answer.

A C++ snippet of the above approach is as follows:

```cpp
vector<int> findThePrefixCommonArray(vector<int>& A, vector<int>& B) {
    int n = A.size();
    unordered_map<int, int> map1, map2;

    for(int i = 0; i < n; i++) {
        map1[A[i]] = i;
        map2[B[i]] = i;
    }

    vector<int> result(n);

    for(int i = 0; i < n; i++) {
        int count = 0;

        for(int j = 0; j <= i; j++) {
            if(m1[A[j]] <= i && m2[A[j]] <= i) {
                count++;
            }
        }

        result[i] = count;
    }

    return result;
}
```

The time complexity of this solution is **O(n^2)**, since we are using two nested for loops. The space complexity is **O(n)**.

#### Efficient solution

To find the prefix common array, we can iterate over arrays A and B simultaneously and keep track of the frequency of each integer in both arrays using an array seen. For each element in A and B, we increment the corresponding element in seen and check if its frequency becomes 2. If the frequency becomes 2, it means that the element is present in both A and B at or before the current index i.

We update the corresponding element in the result array result by adding 1 if the frequency of the element in A or B becomes 2, otherwise we add 0.

Finally, we compute the prefix sum of the result array to get the prefix common array of A and B.

Let's check the algorithm to understand it clearly.

#### Algorithm

```
- set current = 0
      n = A.size()

- set result(n)
      seen(n + 1)

- loop for i = 0; i < n; i++
  - seen[A[i]] = seen[A[i]] + 1
  - if seen[A[i]] == 2
    - current++
  - if end

  - seen[B[i]] = seen[B[i]] + 1
  - if seen[B[i]] == 2
    - current++
  - if end

  - result[i] = current
- for end

- return result
```

The time complexity of this approach is **O(n)**. The space complexity of this approach is **O(n)**.

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    vector<int> findThePrefixCommonArray(vector<int>& A, vector<int>& B) {
        int current = 0, n = A.size();
        vector<int> result(n), seen(n + 1);

        for (int i = 0; i < n; ++i) {
            if (++seen[A[i]] == 2) {
                current++;
            }

            if (++seen[B[i]] == 2) {
                current++;
            }

            result[i] = current;
        }
        return result;
    }
};
```

#### Golang solution

```go
func findThePrefixCommonArray(A []int, B []int) []int {
    current, n := 0, len(A)
    result, seen := make([]int, n), make([]int, n + 1)

    for i := 0; i < n; i++ {
        seen[A[i]]++
        if seen[A[i]] == 2 {
            current++
        }

        seen[B[i]]++
        if seen[B[i]] == 2 {
            current++
        }

        result[i] = current
    }

    return result
}
```

#### JavaScript solution

```javascript
var findThePrefixCommonArray = function(A, B) {
    let current = 0, n = A.length;
    let result = new Array(n), seen = new Array(n + 1).fill(0);

    for (let i = 0; i < n; ++i) {
        if (++seen[A[i]] == 2) {
            current++;
        }

        if (++seen[B[i]] == 2) {
            current++;
        }

        result[i] = current;
    }

    return result;
};
```

#### Dry Run

Let's dry-run our algorithm for a few examples to see how the solution works.

```
Input: A = [1, 3, 2, 4]
       B = [3, 1, 2, 4]

Step 1: int current = 0, n = A.size();
        vector<int> result(n), seen(n + 1);

Step 2: loop for i = 0; i < n;
          0 < 4
          true

          if ++seen[A[i]] == 2
            A[i] = A[0]
                 = 1

            seen[A[i]] = seen[A[0]]
                       = seen[1]
                       = 0

            ++seen[A[i]] = 1

            1 == 2
            false

            seen = [0, 1, 0, 0, 0]

          if ++seen[B[i]] == 2
            B[i] = B[0]
                 = 3

            seen[B[i]] = seen[B[0]]
                       = seen[3]
                       = 0

            ++seen[B[i]] = 1

            1 == 2
            false

            seen = [0, 1, 0, 1, 0]

          result[i] = current
          result[0] = 0
          result = [0, 0, 0, 0]

          i++
          i = 1

Step 3: for i < n
          1 < 4
          true

          if ++seen[A[i]] == 2
            A[i] = A[1]
                 = 3

            seen[A[i]] = seen[A[1]]
                       = seen[3]
                       = 1

            ++seen[A[i]] = 2

            2 == 2
            true
            current++
            current = 1

            seen = [0, 1, 0, 2, 0]

          if ++seen[B[i]] == 2
            B[i] = B[1]
                 = 1

            seen[B[i]] = seen[B[0]]
                       = seen[1]
                       = 1

            ++seen[B[i]] = 2

            2 == 2
            true

            current++
            current = 2

            seen = [0, 2, 0, 2, 0]

          result[i] = current
          result[1] = 2
          result = [0, 2, 0, 0]

          i++
          i = 2

Step 4: for i < n
          2 < 4
          true

          if ++seen[A[i]] == 2
            A[i] = A[2]
                 = 2

            seen[A[i]] = seen[A[2]]
                       = seen[2]
                       = 0

            ++seen[A[i]] = 1

            1 == 2
            false

            seen = [0, 2, 1, 2, 0]

          if ++seen[B[i]] == 2
            B[i] = B[2]
                 = 2

            seen[B[i]] = seen[B[2]]
                       = seen[2]
                       = 1

            ++seen[B[i]] = 2

            2 == 2
            true

            current++
            current = 3

            seen = [0, 2, 2, 2, 0]

          result[i] = current
          result[2] = 3
          result = [0, 2, 3, 0]

          i++
          i = 3

Step 5: for i < n
          3 < 4
          true

          if ++seen[A[i]] == 2
            A[i] = A[3]
                 = 4

            seen[A[i]] = seen[A[2]]
                       = seen[4]
                       = 0

            ++seen[A[i]] = 1

            1 == 2
            false

            seen = [0, 2, 2, 2, 1]

          if ++seen[B[i]] == 2
            B[i] = B[3]
                 = 4

            seen[B[i]] = seen[B[3]]
                       = seen[4]
                       = 1

            ++seen[B[i]] = 2

            2 == 2
            true

            current++
            current = 4

            seen = [0, 2, 2, 2, 2]

          result[i] = current
          result[3] = 4
          result = [0, 2, 3, 4]

          i++
          i = 4

Step 6: for i < n
          4 < 4
          false

Step 7: return result

We return the result as [0, 2, 3, 4].
```
