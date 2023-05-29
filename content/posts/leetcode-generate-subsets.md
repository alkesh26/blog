---
title: LeetCode - Subsets
description: LeetCode - Generate all possible subsets using C++, Golang and Javascript.
date: 2021-10-31
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "generate all possible subsets, c++, golang, javascript"
---

## Problem statement

Given an integer array *nums* of **unique** elements, return *all possible subsets (the power set)*.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.

Problem statement taken from: <a href='https://leetcode.com/problems/subsets' target='_blank'>https://leetcode.com/problems/subsets</a>

**Example 1:**

```
Input: nums = [1, 2, 3]
Output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
```

**Example 2:**

```
Input: nums = [0]
Output: [[], [0]]
```

**Constraints:**

```
- 1 <= nums.length <= 10
- -10 <= nums[i] <= 10
- All the numbers of nums are unique.
```

### Explanation

#### Backtracking

The general strategy in backtracking is either to include the current element or exclude it.
We follow similar approach here. When running the recursive call we either include
the current element or we exclude it.

Let's check the algorithm.

```
// main function
- initialize subset vector: vector<int> subset
- initialize result vector: vector<vector<int>> result

- call subsetsUtil(nums, result, subset, 0)

- return result

// subsetsUtil function
- res.push_back(subset)

- loop for i = index; i < nums.size(); i++
  - subset.push_back(nums[i])

  - subsetsUtil(nums, result, subset, i + 1)

  - subset.pop_back()

- return
```

#### C++ solution

```cpp
class Solution {
public:
    void subsetsUtil(vector<int>& nums, vector<vector<int>>& result, vector<int>& subset, int index) {
        result.push_back(subset);

        for(int i = index; i < nums.size(); i++){
            subset.push_back(nums[i]);

            subsetsUtil(nums, result, subset, i + 1);

            subset.pop_back();
        }

        return;
    }

public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<int> subset;
        vector<vector<int>> result;

        subsetsUtil(nums, result, subset, 0);

        return result;
    }
};
```

#### Golang solution

```go
func subsets(nums []int) [][]int {
    result := make([][]int, 0)

    subsetsUtils(nums, &result, []int{}, 0)

    return result
}

func subsetsUtils(nums []int, result *[][]int, subset []int, index int) {
    *result = append(*result, append([]int{}, subset...))

    for i := index; i < len(nums); i++ {
		subset = append(subset, nums[i])

		subsetsUtils(nums, result, subset, i + 1)

		subset = subset[:len(subset)-1]
	}
}
```

#### Javascript solution

```javascript
var subsets = function(nums) {
    function findSubset(array, subset) {
        result.push([...subset]);

        for(let i = 0; i < array.length; i++) {
            subset.push(array[i]);

            findSubset(array.slice(i + 1), subset);

            subset.pop();
        }
    }

    let result = [];
    findSubset(nums, []);
    return result;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [1, 2, 3]

Step 1: vector<int> subset
        vector<vector<int>> result

Step 2: subsetsUtil(nums, res, subset, 0)

// in subsetsUtils function
Step 3: result.push_back(subset)
        result.push_back([])

        result = [[]]

        loop for i = index, i < nums.size()
        i = 0
        0 < 3
        true

        subset.push_back(nums[i])
        subset.push_back(nums[0])
        subset.push_back(1)

        subset = [1]

        subsetsUtil(nums, res, subset, i + 1)
        subsetsUtil([1, 2, 3], [[]], [1], 0 + 1)
        subsetsUtil([1, 2, 3], [[]], [1], 1)

Step 4: result.push_back(subset)
        result.push_back([1])

        result = [[], [1]]

        loop for i = index, i < nums.size()
        i = 1
        1 < 3
        true

        subset.push_back(nums[i])
        subset.push_back(nums[1])
        subset.push_back(2)

        subset = [1, 2]

        subsetsUtil(nums, res, subset, i + 1)
        subsetsUtil([1, 2, 3], [[], [1]], [1, 2], 1 + 1)
        subsetsUtil([1, 2, 3], [[], [1]], [1, 2], 2)

Step 5: result.push_back(subset)
        result.push_back([1, 2])

        result = [[], [1], [1, 2]]

        loop for i = index, i < nums.size()
        i = 2
        2 < 3
        true

        subset.push_back(nums[i])
        subset.push_back(nums[2])
        subset.push_back(3)

        subset = [1, 2, 3]

        subsetsUtil(nums, res, subset, i + 1)
        subsetsUtil([1, 2, 3], [[], [1], [1, 2]], [1, 2, 3], 2 + 1)
        subsetsUtil([1, 2, 3], [[], [1], [1, 2]], [1, 2, 3], 3)

Step 6: result.push_back(subset)
        result.push_back([1, 2, 3])

        result = [[], [1], [1, 2], [1, 2, 3]]

        loop for i = index, i < nums.size()
        i = 3
        3 < 3
        false

Step 7: Here we backtrack to last line of Step 5 where
        i = 2
        subset = [1, 2, 3]

        We execute the next line
        subset.pop()

        subset = [1, 2]

Step 8: We backtrack to last line of Step 4 where
        i = 1
        subset = [1, 2]

        We execute the next line
        subset.pop()

        subset = [1]

Step 9: For loop continues where we execute
        loop for i = index, i < nums.size()
        i = 2
        i < nums.size()
        2 < 3
        true

        subset.push_back(nums[i])
        subset.push_back(nums[2])
        subset.push_back(3)

        subset = [1, 3]

        subsetsUtil(nums, res, subset, i + 1)
        subsetsUtil([1, 2, 3], [[], [1], [1, 2], [1, 2, 3]], [1, 3], 2 + 1)
        subsetsUtil([1, 2, 3], [[], [1], [1, 2], [1, 2, 3]], [1, 3], 3)

Step 10: result.push_back(subset)
         result.push_back([1, 3])

         result = [[], [1], [1, 2], [1, 2, 3], [1, 3]]

         loop for i = index, i < nums.size()
         i = 3
         3 < 3
         false

Step 11: Here we backtrack to last line of Step 3 where
         i = 0
         subset = [1]

         We execute the next line
         subset.pop()

         subset = []

Step 12: For loop continues where we execute
         loop for i = index, i < nums.size()
         i = 1
         i < nums.size()
         1 < 3
         true

         subset.push_back(nums[i])
         subset.push_back(nums[1])
         subset.push_back(2)

         subset = [2]

         subsetsUtil(nums, res, subset, i + 1)
         subsetsUtil([1, 2, 3], [[], [1], [1, 2], [1, 2, 3], [1, 3]], [2], 1 + 1)
         subsetsUtil([1, 2, 3], [[], [1], [1, 2], [1, 2, 3], [1, 3]], [2], 2)

Step 13: result.push_back(subset)
         result.push_back([2])

         result = [[], [1], [1, 2], [1, 2, 3], [1, 3], [2]]

         loop for i = index, i < nums.size()
         i = 2
         2 < 3
         true

         subset.push_back(nums[i])
         subset.push_back(nums[2])
         subset.push_back(3)

         subset = [2, 3]

         subsetsUtil(nums, res, subset, i + 1)
         subsetsUtil([1, 2, 3], [[], [1], [1, 2], [1, 2, 3], [1, 3], [2]], [2, 3], 2 + 1)
         subsetsUtil([1, 2, 3], [[], [1], [1, 2], [1, 2, 3], [1, 3], [2]], [2, 3], 3)

Step 14: result.push_back(subset)
         result.push_back([2, 3])

         result = [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3]]

         loop for i = index, i < nums.size()
         i = 3
         3 < 3
         false

Step 15: Here we backtrack to last line of Step 13 where
         i = 2
         subset = [2, 3]

         We execute the next line
         subset.pop()

         subset = [2]

Step 16: Here we backtrack to last line of Step 12 where
         i = 1
         subset = [2]

         We execute the next line
         subset.pop()

         subset = []

Step 17: For loop continues where we execute
         loop for i = index, i < nums.size()
         i = 2
         i < nums.size()
         2 < 3
         true

         subset.push_back(nums[i])
         subset.push_back(nums[2])
         subset.push_back(3)

         subset = [3]

         subsetsUtil(nums, res, subset, i + 1)
         subsetsUtil([1, 2, 3], [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3]], [3], 2 + 1)
         subsetsUtil([1, 2, 3], [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3]], [3], 3)

Step 18: result.push_back(subset)
         result.push_back([3])

         result = [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]

         loop for i = index, i < nums.size()
         i = 3
         3 < 3
         false

Step 19: We have no more stack entries left. We return to main function.

Step 20: return result

So the result we return is [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]].
```
