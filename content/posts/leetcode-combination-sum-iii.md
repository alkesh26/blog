---
title: LeetCode - Combination Sum III
description: LeetCode - return a list of all unique combinations of k numbers that sum up to n using C++, Golang, and Javascript.
date: 2022-08-14
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return a list of all unique combinations of k numbers that sum up to n, c++, golang, javascript"
---

### Problem statement

Find all valid combinations of *k* numbers that sum up to *n* such that the following conditions are true:

* Only numbers 1 through 9 are used.
* Each number is used **at most once**.

Return *a list of all possible valid combinations*.
The list must not contain the same combination twice, and the combinations may be returned in any order.

Problem statement taken from: <a href="https://leetcode.com/problems/combination-sum-iii" target="_blank">https://leetcode.com/problems/combination-sum-iii</a>.

**Example 1:**

```
Input: k = 3, n = 7
Output: [[1, 2, 4]]
Explanation:
1 + 2 + 4 = 7
There are no other valid combinations.
```

**Example 2:**

```
Input: k = 3, n = 9
Output: [[1, 2, 6], [1, 3, 5], [2, 3, 4]]
Explanation:
1 + 2 + 6 = 9
1 + 3 + 5 = 9
2 + 3 + 4 = 9
There are no other valid combinations.
```

**Example 3:**

```
Input: k = 4, n = 1
Output: []
Explanation: There are no valid combinations.
Using 4 different numbers in the range [1, 9], the smallest sum we can get
is 1 + 2 + 3 + 4 = 10 and since 10 > 1, there are no valid combination.
```

**Constraints:**

```
- 2 <= k <= 9
- 1 <= n <= 60
```

### Explanation

#### Backtracking

The problem can be solved using the similar approach we used in our previous two blogs
[Combination Sum II](https://alkeshghorpade.me/post/leetcode-combination-sum-ii) and
[Combination Sum](https://alkeshghorpade.me/post/leetcode-combination-sum).
In this problem, we are not given any input array instead, we need to use
numbers from 1 to 9.

Let's check the algorithm to see how the solution works.

```
- initialize the result as a 2D array
  initialize current as an array

  // current = current list of elements in the array at the start it will be an empty array []
  // currentIndex = index, at start it will be 1.
  // sumTillNow = sum of the current elements in the array at the start it will be 0
  // numsAddedTillNow = count of numbers present in current array.
- call combinationSum2Util(result, current, currentIndex, sumTillNow, numsAddedTillNow, k, n)

- return result

// combinationSum3Util function
- if numsAddedTillNow == k && sumTillNow == n
  // append current to result
  - result.push_back(current)

- if numsAddedTillNow > k || sumTillNow == n
  - return

- loop for i = currentIndex; i <= 9; i++
  - sumTillNow = sumTillNow + i
  - current.push_back(i)
  - numsAddedTillNow = numsAddedTillNow + 1

  // call the function recursively
  - combinationSum3Util(result, current, i + 1, sumTillNow, numsAddedTillNow, k, n)

  - sumTillNow = sumTillNow - i
  - current.pop_back()
  - numsAddedTillNow = numsAddedTillNow - 1
```

Let's check our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    void combinationSum3Util(vector<vector<int>> &result, vector<int>& current, int currentIndex, int sumTillNow, int numsAddedTillNow, int k, int n) {
        if(numsAddedTillNow == k && sumTillNow == n) {
            result.push_back(current);
            return;
        }

        if(numsAddedTillNow > k || sumTillNow > n) {
            return;
        }

        for(int i = currentIndex; i <= 9; i++) {
            sumTillNow += i;
            current.push_back(i);
            numsAddedTillNow++;

            combinationSum3Util(result, current, i + 1, sumTillNow, numsAddedTillNow, k, n);

            sumTillNow -= i;
            current.pop_back();
            numsAddedTillNow--;
        }
    }

    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> result;
        vector<int> current;

        combinationSum3Util(result, current, 1, 0, 0, k, n);

        return result;
    }
};
```

#### Golang solution

```go
func combinationSum3Util(result *[][]int, current []int, currentIndex, sumTillNow, numsAddedTillNow, k, n int) {
    if numsAddedTillNow == k && sumTillNow == n {
        *result = append(*result, append([]int{}, current...))
        return
    }

    if numsAddedTillNow > k || sumTillNow > n {
        return
    }

    for i := currentIndex; i <= 9; i++ {
        sumTillNow += i
        current = append(current, i)
        numsAddedTillNow++

        combinationSum3Util(result, current, i + 1, sumTillNow, numsAddedTillNow, k, n)

        sumTillNow -= i
        current = current[:len(current) - 1]
        numsAddedTillNow--
    }
}

func combinationSum3(k int, n int) [][]int {
    result := make([][]int, 0)

    combinationSum3Util(&result, []int{}, 1, 0, 0, k, n)

    return result
}
```

#### Javascript solution

```javascript
var combinationSum3 = function(k, n) {
    let result = [];

    const combinationSum3Util = (current, currentIndex, sumTillNow, numsAddedTillNow, k, n) => {
        if(numsAddedTillNow == k && sumTillNow == n) {
            result.push([...current]);
            return;
        }

        if(numsAddedTillNow > k || sumTillNow > n) {
           return;
        }

        for(let i = currentIndex; i <= 9; i++) {
            sumTillNow += i;
            current.push(i);
            numsAddedTillNow++;

            combinationSum3Util(current, i + 1, sumTillNow, numsAddedTillNow, k, n);

            sumTillNow -= i;
            current.pop();
            numsAddedTillNow--;
        }
    }

    combinationSum3Util([], 1, 0, 0, k, n);

    return result;
};
```

Let's dry run our algorithm for a few iterations and recursion.

```
Input: k = 3, n = 7

// combinationSum function
Step 1: vector<vector<int>> result
        vector<int> current

Step 2: combinationSum3Util(result, current, 1, 0, 0, k, n)

// combinationSum2Util function
Step 3: if numsAddedTillNow == k && sumTillNow == n
           0 == 3 && 0 == 7
           false

        if numsAddedTillNow > k || sumTillNow > n
           0 > 3 || 0 > 7
           false

        loop for i = currentIndex; i <= 9
        i = 1
        i <= 9
        true

        sumTillNow = sumTillNow + i
                   = 0 + 1
                   = 1

        current.push_back(i)
        current = [1]

        numsAddedTillNow = numsAddedTillNow + 1
                         = 0 + 1
                         = 1

        combinationSum3Util(result, current, i + 1, sumTillNow, numsAddedTillNow, k, n)
        combinationSum3Util([[]], [1], 1 + 1, 1, 1, 3, 7)
        combinationSum3Util([[]], [1], 2, 1, 1, 3, 7)

Step 4: if numsAddedTillNow == k && sumTillNow == n
           1 == 3 && 1 == 7
           false

        if numsAddedTillNow > k || sumTillNow > n
           1 > 3 || 1 > 7
           false

        loop for i = currentIndex; i <= 9
        i = 2
        i <= 9
        true

        sumTillNow = sumTillNow + i
                   = 1 + 2
                   = 3

        current.push_back(i)
        current.push_back(2)
        current = [1, 2]

        numsAddedTillNow = numsAddedTillNow + 1
                         = 1 + 1
                         = 2

        combinationSum3Util(result, current, i + 1, sumTillNow, numsAddedTillNow, k, n)
        combinationSum3Util([[]], [1, 2], 1 + 1, 3, 2, 3, 7)
        combinationSum3Util([[]], [1, 2], 2, 3, 2, 3, 7)

Step 5: if numsAddedTillNow == k && sumTillNow == n
           2 == 3 && 3 == 7
           false

        if numsAddedTillNow > k || sumTillNow > n
           2 > 3 || 3 > 7
           false

        loop for i = currentIndex; i <= 9
        i = 3
        i <= 9
        true

        sumTillNow = sumTillNow + i
                   = 3 + 3
                   = 6

        current.push_back(i)
        current.push_back(3)
        current = [1, 2, 3]

        numsAddedTillNow = numsAddedTillNow + 1
                         = 2 + 1
                         = 3

        combinationSum3Util(result, current, i + 1, sumTillNow, numsAddedTillNow, k, n)
        combinationSum3Util([[]], [1, 2, 3], 2 + 1, 6, 3, 3, 7)
        combinationSum3Util([[]], [1, 2, 3], 3, 6, 3, 3, 7)

Step 6: if numsAddedTillNow == k && sumTillNow == n
           3 == 3 && 3 == 7
           false

        if numsAddedTillNow > k || sumTillNow > n
           3 > 3 || 6 > 7
           false

        loop for i = currentIndex; i <= 9
        i = 4
        i <= 9
        true

        sumTillNow = sumTillNow + i
                   = 6 + 4
                   = 10

        current.push_back(i)
        current.push_back(4)
        current = [1, 2, 3, 4]

        numsAddedTillNow = numsAddedTillNow + 1
                         = 3 + 1
                         = 4

        combinationSum3Util(result, current, i + 1, sumTillNow, numsAddedTillNow, k, n)
        combinationSum3Util([[]], [1, 2, 3, 4], 3 + 1, 10, 4, 3, 7)
        combinationSum3Util([[]], [1, 2, 3, 4], 4, 10, 4, 3, 7)

Step 7: if numsAddedTillNow == k && sumTillNow == n
           4 == 3 && 10 == 7
           false

        if numsAddedTillNow > k || sumTillNow > n
           4 > 3 || 10 > 7
           true

           return

        we backtrack to step 6

Step 8: combinationSum3Util([[]], [1, 2, 3, 4], 4, 10, 4, 3, 7)
        sumTillNow = sumTillNow - i
                   = 10 - 4
                   = 6

        current.pop_back()
        current = [1, 2, 3]

        numsAddedTillNow = numsAddedTillNow - 1
                         = 4 - 1
                         = 3

        i++
        i = 5

        loop for i = currentIndex; i <= 9
        i = 5
        i <= 9
        true

        sumTillNow = sumTillNow + i
                   = 6 + 5
                   = 11

        current.push_back(i)
        current.push_back(5)
        current = [1, 2, 3, 5]

        numsAddedTillNow = numsAddedTillNow + 1
                         = 3 + 1
                         = 4

        combinationSum3Util(result, current, i + 1, sumTillNow, numsAddedTillNow, k, n)
        combinationSum3Util([[]], [1, 2, 3, 5], 3 + 1, 11, 4, 3, 7)
        combinationSum3Util([[]], [1, 2, 3, 5], 4, 11, 4, 3, 7)

Step 9: if numsAddedTillNow == k && sumTillNow == n
           4 == 3 && 11 == 7
           false

        if numsAddedTillNow > k || sumTillNow > n
           4 > 3 || 11 > 7
           true

           return

        we backtrack to step 8 and this gets repeated till i or currentIndex is 9.
        From all these steps, we backtrack to step 6.

Step 10...11...17:

Step 18: combinationSum3Util([[]], [1, 2, 3], 3, 6, 3, 3, 7)
        sumTillNow = sumTillNow - i
                   = 6 - 3
                   = 3

        current.pop_back()
        current = [1, 2]

        numsAddedTillNow = numsAddedTillNow - 1
                         = 3 - 1
                         = 2

        i++
        i = 4

        loop for i = currentIndex; i <= 9
        i = 4
        i <= 9
        true

        sumTillNow = sumTillNow + i
                   = 3 + 4
                   = 7

        current.push_back(i)
        current.push_back(4)
        current = [1, 2, 4]

        numsAddedTillNow = numsAddedTillNow + 1
                         = 2 + 1
                         = 3

        combinationSum3Util(result, current, i + 1, sumTillNow, numsAddedTillNow, k, n)
        combinationSum3Util([[]], [1, 2, 4], 2 + 1, 7, 3, 3, 7)
        combinationSum3Util([[]], [1, 2, 4], 3, 7, 3, 3, 7)

Step 19: if numsAddedTillNow == k && sumTillNow == n
            3 == 3 && 7 == 7
            true

            result.push_back(current)
            result = [[1, 2, 4]]

            return

The backtracking continues till we reach currentIndex = 10.
We return the answer as [[1, 2, 4]].
```
