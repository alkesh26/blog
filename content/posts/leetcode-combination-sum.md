---
title: LeetCode - Combination Sum
description: LeetCode - return a list of all unique combinations of candidates where the chosen numbers sum to the target using C++, Golang, and Javascript.
date: 2022-07-31
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "return a list of all unique combinations of candidates where the chosen numbers sum to the target, c++, golang, javascript"
---

## Problem statement

Given an array of **distinct** integers *candidates* and a target integer *target*,
return a list of all **unique combinations** of *candidates* where the chosen numbers sum to target.
You may return the combinations in **any order**.

The **same** number may be chosen from *candidates* an **unlimited number of times**.
Two combinations are unique if the frequency of at least one of the chosen numbers is different.

It is **guaranteed** that the number of unique combinations that sum up to *target*
is less than *150* combinations for the given input.

Problem statement taken from: <a href='https://leetcode.com/problems/combination-sum/' target='_blank'>https://leetcode.com/problems/combination-sum/</a>.

**Example 1:**

```
Input: candidates = [2, 3, 6, 7], target = 7
Output: [[2, 2, 3], [7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
```

**Example 2:**

```
Input: candidates = [2, 3, 5], target = 8
Output: [[2, 2, 2, 2], [2, 3, 3], [3, 5]]
```

**Example 3:**

```
Input: candidates = [2], target = 1
Output: []
```

**Constraints:**

```
- 1 <= candidates.length <= 30
- 1 <= candidates[i] <= 200
- All elements of candidates are distinct.
- 1 <= target <= 500
```

### Explanation

#### Brute force approach

The brute force approach is to generate all combinations and verify the
elements in the array sum up to target or not.

But the time complexity of the above program will be **O(N^2)**.

#### Backtracking

These kinds of problems can be solved using backtracking.
We write a recursive function where we keep appending the array elements
to a temporary array (called current) and keep tracking the sum
of the elements in this temporary array.
Inside the recursive function, we keep two base cases.

1. The first base case is to check if the sum of the elements in the temporary array is
equal to the target. If yes we return and append the temporary array to the final result.

2. The second base case is to check if the sum exceeds the target element we just return.

Let's check the algorithm to clearly understand the above approach.

```
- initialize the result as a 2D array
  initialize current as an array

  // n = index, at start it will be 0.
  // sumTillNow = sum of the current elements in the array, at the start it will be 0
  // current = current list of elements in the array, at the start it will be an empty array []
- call combinationSumUtil(result, candidates, n, target, sumTillNow, current)

- return result

// combinationSumUtil function
- if sumTillNow == target
  // append current to result
  - result.push_back(current)

- if sumTillNow > target
  - return

- loop for i = n; i <= candidates.size() - 1; i++
  // append candidates array ith element to the current array
  - current.push_back(candidates[i])

  - sumTillNow += candidates[i]

  // call the function recursively
  - combinationSumUtil(result, candidates, i, target, sumTillNow, current)

  - sumTillNow -= current[current.size() - 1]

  // remove the last element from the array
  - current.pop_back()
```

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    void combinationSumUtil(vector<vector<int>>& result, vector<int>& candidates, int n, int target, int sumTillNow, vector<int>& current) {
        if(sumTillNow == target) {
            result.push_back(current);
        }

        if(sumTillNow > target) {
            return;
        }

        for(int i = n; i <= candidates.size() - 1; i++) {
            current.push_back(candidates[i]);
            sumTillNow += candidates[i];

            combinationSumUtil(result, candidates, i, target, sumTillNow, current);

            sumTillNow -= current[current.size() - 1];
            current.pop_back();
        }
    }

    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        vector<int> current;

        combinationSumUtil(result, candidates, 0, target, 0, current);
        return result;
    }
};
```

#### Golang solution

```go
func combinationSumUtil(result *[][]int, candidates []int, n, target, sumTillNow int, current []int) {
    if sumTillNow == target {
        *result = append(*result, append([]int{}, current...))
        return
    }

    if sumTillNow > target {
        return
    }

    for i := n; i <= len(candidates) - 1; i++ {
        current = append(current, candidates[i])
        sumTillNow = sumTillNow + candidates[i]

        combinationSumUtil(result, candidates, i, target, sumTillNow, current)

        sumTillNow = sumTillNow - current[len(current) - 1]
        current = current[:len(current) - 1]
    }
}

func combinationSum(candidates []int, target int) [][]int {
    result := make([][]int, 0)

    combinationSumUtil(&result, candidates, 0, target, 0, []int{})

    return result
}
```

#### Javascript solution

```javascript
var combinationSum = function(candidates, target) {
    let result = [];

    const combinationSumUtil = (candidates, n, target, sumTillNow, current) => {
        if(sumTillNow === target) {
            result.push([...current]);
        }

        if(sumTillNow > target) {
            return;
        }

        for(let i = n; i <= candidates.length - 1; i++){
            current.push(candidates[i]);
            sumTillNow += candidates[i];

            combinationSumUtil(candidates, i, target, sumTillNow, current);

            sumTillNow -= current[current.length - 1];
            current.pop();
        }
    }

    combinationSumUtil(candidates, 0, target, 0, []);

    return result;
};
```

Let's dry run our algorithm.

```
Input: candidates = [2, 3, 6, 7]
       target = 7

// combinationSum function
Step 1: vector<vector<int>> result
        vector<int> current

Step 2: combinationSumUtil(result, candidates, 0, target, 0, current)

// combinationSumUtil function
Step 3: if sumTillNow == target
           0 == 7
           false

        if sumTillNow > target
           0 > 7
           false

        loop for int i = n; i <= candidates.size() - 1
             i = 0
             i <= 4 - 1
             0 <= 3
             true

             current.push_back(candidates[i])
             current.push_back(candidates[0])
             current.push_back(2)
             current = [2]

             sumTillNow += candidates[i]
                         = sumTillNow + candidates[0]
                         = 0 + 2
                         = 2

             combinationSumUtil(result, candidates, i, target, sumTillNow, current)
             combinationSumUtil([][], [2, 3, 6, 7], 0, 7, 2, [2])

Step 4: if sumTillNow == target
           2 == 7
           false

        if sumTillNow > target
           2 > 7
           false

        loop for int i = n; i <= candidates.size() - 1
             i = 0
             i <= 4 - 1
             0 <= 3
             true

             current.push_back(candidates[i])
             current.push_back(candidates[0])
             current.push_back(2)
             current = [2, 2]

             sumTillNow += candidates[i]
                         = sumTillNow + candidates[0]
                         = 2 + 2
                         = 4

             combinationSumUtil(result, candidates, i, target, sumTillNow, current)
             combinationSumUtil([][], [2, 3, 6, 7], 0, 7, 4, [2, 2])

Step 5: if sumTillNow == target
           4 == 7
           false

        if sumTillNow > target
           4 > 7
           false

        loop for int i = n; i <= candidates.size() - 1
             i = 0
             i <= 4 - 1
             0 <= 3
             true

             current.push_back(candidates[i])
             current.push_back(candidates[0])
             current.push_back(2)
             current = [2, 2, 2]

             sumTillNow += candidates[i]
                         = sumTillNow + candidates[0]
                         = 4 + 2
                         = 6

             combinationSumUtil(result, candidates, i, target, sumTillNow, current)
             combinationSumUtil([][], [2, 3, 6, 7], 0, 7, 6, [2, 2, 2])

Step 6: if sumTillNow == target
           6 == 7
           false

        if sumTillNow > target
           6 > 7
           false

        loop for int i = n; i <= candidates.size() - 1
             i = 0
             i <= 4 - 1
             0 <= 3
             true

             current.push_back(candidates[i])
             current.push_back(candidates[0])
             current.push_back(2)
             current = [2, 2, 2, 2]

             sumTillNow += candidates[i]
                         = sumTillNow + candidates[0]
                         = 6 + 2
                         = 8

             combinationSumUtil(result, candidates, i, target, sumTillNow, current)
             combinationSumUtil([][], [2, 3, 6, 7], 0, 7, 8, [2, 2, 2, 2])

Step 7: if sumTillNow == target
           8 == 7
           false

        if sumTillNow > target
           8 > 7
           true
           return

           we backtrack to step 6 and continue

Step 8: combinationSumUtil([][], [2, 3, 6, 7], 0, 7, 8, [2, 2, 2, 2])
        sumTillNow = sumTillNow - current[len(current) - 1]
                   = 8 - current[4 - 1]
                   = 8 - current[3]
                   = 8 - 2
                   = 6

        current.pop_back()
        current = [2, 2, 2]

        i++
        i = 1

        i = 1
        i <= 4 - 1
        1 <= 3
        true

        current.push_back(candidates[i])
        current.push_back(candidates[1])
        current.push_back(3)
        current = [2, 2, 2, 3]

        sumTillNow += candidates[i]
                    = 6 + candidates[1]
                    = 6 + 3
                    = 9

        combinationSumUtil(result, candidates, i, target, sumTillNow, current)
        combinationSumUtil([][], [2, 3, 6, 7], 0, 7, 9, [2, 2, 2, 3])

Step 9: if sumTillNow == target
           9 == 7
           false

        if sumTillNow > target
           9 > 7
           true
           return

           we backtrack to step 8 and continue

Step 10:combinationSumUtil([][], [2, 3, 6, 7], 0, 7, 9, [2, 2, 2, 3])
        sumTillNow = sumTillNow - current[len(current) - 1]
                   = 9 - current[4 - 1]
                   = 9 - current[3]
                   = 9 - 3
                   = 6

        current.pop_back()
        current = [2, 2, 2]

        i++
        i = 2

        i = 2
        i <= 4 - 1
        2 <= 3
        true

        current.push_back(candidates[i])
        current.push_back(candidates[2])
        current.push_back(6)
        current = [2, 2, 2, 6]

        sumTillNow += candidates[i]
                    = 6 + candidates[2]
                    = 6 + 6
                    = 12

        combinationSumUtil(result, candidates, i, target, sumTillNow, current)
        combinationSumUtil([][], [2, 3, 6, 7], 0, 7, 12, [2, 2, 2, 6])

Step 11: if sumTillNow == target
           12 == 7
           false

         if sumTillNow > target
           12 > 7
           true
           return

           we backtrack to step 10 and continue

Step 12:combinationSumUtil([][], [2, 3, 6, 7], 0, 7, 9, [2, 2, 2, 3])
        sumTillNow = sumTillNow - current[len(current) - 1]
                   = 12 - current[4 - 1]
                   = 12 - current[3]
                   = 12 - 6
                   = 6

        current.pop_back()
        current = [2, 2, 2]

        i++
        i = 3

        i = 3
        i <= 4 - 1
        3 <= 3
        true

        current.push_back(candidates[i])
        current.push_back(candidates[3])
        current.push_back(7)
        current = [2, 2, 2, 7]

        sumTillNow += candidates[i]
                    = 6 + candidates[3]
                    = 6 + 7
                    = 13

        combinationSumUtil(result, candidates, i, target, sumTillNow, current)
        combinationSumUtil([][], [2, 3, 6, 7], 0, 7, 13, [2, 2, 2, 7])

Step 13: if sumTillNow == target
           13 == 7
           false

         if sumTillNow > target
           13 > 7
           true
           return

           we backtrack to step 12 and continue

Step 14:combinationSumUtil([][], [2, 3, 6, 7], 0, 7, 9, [2, 2, 2, 3])
        sumTillNow = sumTillNow - current[len(current) - 1]
                   = 13 - current[4 - 1]
                   = 13 - current[3]
                   = 13 - 7
                   = 6

        current.pop_back()
        current = [2, 2, 2]

        i++
        i = 4

        i = 3
        i <= 4 - 1
        4 <= 3
        false

        We return to Step 5 directly

Step 15:combinationSumUtil([][], [2, 3, 6, 7], 0, 7, 6, [2, 2, 2])
        sumTillNow = sumTillNow - current[len(current) - 1]
                   = 6 - current[3 - 1]
                   = 6 - current[2]
                   = 6 - 2
                   = 4

        current.pop_back()
        current = [2, 2]

        i++
        i = 1

        i = 1
        i <= 4 - 1
        1 <= 3
        true

        current.push_back(candidates[i])
        current.push_back(candidates[1])
        current.push_back(3)
        current = [2, 2, 3]

        sumTillNow += candidates[i]
                    = 4 + candidates[1]
                    = 4 + 3
                    = 7

        combinationSumUtil(result, candidates, i, target, sumTillNow, current)
        combinationSumUtil([][], [2, 3, 6, 7], 0, 7, 7, [2, 2, 3])

Step 16:if sumTillNow == target
           7 == 7
           true

           result.push_back(current)
           result.push_back([2, 2, 3])

           result = [[2, 2, 3]]

Similarly, we iterate over all other elements and get the result as
[[2, 2, 3], [7]]
```
