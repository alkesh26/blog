---
title: LeetCode - Subsets II
description: LeetCode - return all possible subsets (the power set) of array with duplicates using C++, Golang and Javascript.
date: 2022-01-30
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return all possible subsets (the power set) of array with duplicates, c++, golang, javascript"
---

## Problem statement

Given an integer array *nums* that may contain duplicates, return *all possible subsets (the power set)*.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.

Problem statement taken from: <a href='https://leetcode.com/problems/subsets-ii' target='_blank'>https://leetcode.com/problems/subsets-ii</a>.

**Example 1:**

```
Input: nums = [1, 2, 2]
Output: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]
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
```

### Explanation

#### Backtracking

The approach for this problem is similar to our previous blog
[LeetCode Subsets](https://alkeshghorpade.me/post/leetcode-generate-subsets).
The only difference is we need to exclude duplicate elements here
while generating the subset.

First, we will sort the nums array.
We can either exclude the duplicate elements while recursively calling the subset generator function
or we can mark the subset as a Set (Set is an abstract data type that can store unique values).

Let's check the algorithm first.

```
// subsetsWithDup(nums) function
- sort nums array sort(nums.begin(),nums.end())

- initialize vector<int> subset
             set<vector<int>> result
             vector<vector<int>> answer

- call util function subsetsUtil(nums, result, subset, 0)

- push set result in vector array
  loop for(auto it:result)
         answer.push_back(it)

- return answer

// subsetsUtil(nums, result, subset, index) function
- insert subset in result
  result.insert(subset)

- loop for i = index; i < nums.size(); i++
  - subset.push_back(nums[i])

  - subsetsUtil(nums, result, subset, i + 1)

  - subset.pop_back()
```

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.
**Note:** In the C++ solution the subset is a Set, while in Golang and Javascript it's a normal array
and we have ignored the duplicates.

#### C++ solution

```cpp
class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(),nums.end());
        vector<int> subset;
        set<vector<int>> result;

        subsetsUtil(nums, result, subset, 0);

        vector<vector<int>> answer;

        for(auto it:result){
            answer.push_back(it);
        }

        return answer;
    }

public:
    void subsetsUtil(vector<int>& nums, set<vector<int>>& result, vector<int>& subset, int index) {
        result.insert(subset);

        for(int i = index; i < nums.size(); i++){
            subset.push_back(nums[i]);

            subsetsUtil(nums, result, subset, i + 1);

            subset.pop_back();
        }

        return;
    }
};
```

#### Golang solution

```go
func subsetsUtils(nums, subset []int, result *[][]int) {
    cp := make([]int, len(subset))
    copy(cp, subset)

    *result = append(*result, cp)

    for i := 0; i < len(nums); i++ {
        subsetsUtils(nums[i+1:], append(subset, nums[i]), result)

        for ; i < len(nums)-1 && nums[i] == nums[i+1]; i++ {
        }
    }
}

func subsetsWithDup(nums []int) [][]int {
    sort.Ints(nums)

    var result [][]int
    subset := make([]int, 0, len(nums))

    subsetsUtils(nums, subset, &result)

    return result
}
```

#### Javascript solution

```javascript
var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);

    const result = [];

    subsetsUtils(0, []);

    return result;

    function subsetsUtils (index, array) {
        result.push([...array]);

        for (let i = index; i < nums.length; i++) {
            if (i > index && nums[i] == nums[i - 1]) {
                continue;
            }

            array.push(nums[i]);
            subsetsUtils(i + 1, array);
            array.pop();
        }
    }
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [1, 2, 2]

Step 1: sort(nums.begin(),nums.end())
        nums = [1, 2, 3]

Step 2: initialize vector<int> subset
                   set<vector<int>> result

Step 3: subsetsUtil(nums, result, subset, 0)

// in subsetsUtils function
Step 4: result.push_back(subset)
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
        subsetsUtil([1, 2, 2], [[]], [1], 0 + 1)
        subsetsUtil([1, 2, 2], [[]], [1], 1)

Step 5: result.push_back(subset)
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
        subsetsUtil([1, 2, 2], [[], [1]], [1, 2], 1 + 1)
        subsetsUtil([1, 2, 2], [[], [1]], [1, 2], 2)

Step 6: result.push_back(subset)
        result.push_back([1, 2])

        result = [[], [1], [1, 2]]

        loop for i = index, i < nums.size()
        i = 2
        2 < 3
        true

        subset.push_back(nums[i])
        subset.push_back(nums[2])
        subset.push_back(2)

        subset = [1, 2, 2]

        subsetsUtil(nums, res, subset, i + 1)
        subsetsUtil([1, 2, 2], [[], [1], [1, 2]], [1, 2, 2], 2 + 1)
        subsetsUtil([1, 2, 2], [[], [1], [1, 2]], [1, 2, 2], 3)

Step 7: result.push_back(subset)
        result.push_back([1, 2, 3])

        result = [[], [1], [1, 2], [1, 2, 3]]

        loop for i = index, i < nums.size()
        i = 3
        3 < 3
        false

Step 8: Here we backtrack to last line of Step 6 where
        i = 2
        subset = [1, 2, 2]

        We execute the next line
        subset.pop()

        subset = [1, 2]

Step 9: We backtrack to last line of Step 5 where
        i = 1
        subset = [1, 2]

        We execute the next line
        subset.pop()

        subset = [1]

Step 10: For loop continues where we execute
        loop for i = index, i < nums.size()
        i = 2
        i < nums.size()
        2 < 3
        true

        subset.push_back(nums[i])
        subset.push_back(nums[2])
        subset.push_back(2)

        subset = [1, 2]

        subsetsUtil(nums, res, subset, i + 1)
        subsetsUtil([1, 2, 2], [[], [1], [1, 2]], [1, 2], 2 + 1)
        subsetsUtil([1, 2, 2], [[], [1], [1, 2]], [1, 2], 3)

Step 11: result.push_back(subset)
         result.push_back([1, 2])

         result = [[], [1], [1, 2], [1, 2, 2]]

         loop for i = index, i < nums.size()
         i = 3
         3 < 3
         false

Step 12: Here we backtrack to last line of Step 3 where
         i = 0
         subset = [1]

         We execute the next line
         subset.pop()

         subset = []

Step 13: For loop continues where we execute
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
         subsetsUtil([1, 2, 2], [[], [1], [1, 2]], [2], 1 + 1)
         subsetsUtil([1, 2, 2], [[], [1], [1, 2]], [2], 2)

Step 14: result.push_back(subset)
         result.push_back([2])

         result = [[], [1], [1, 2], [1, 2, 2], [1, 2], [2]]

         loop for i = index, i < nums.size()
         i = 2
         2 < 3
         true

         subset.push_back(nums[i])
         subset.push_back(nums[2])
         subset.push_back(2)

         subset = [2, 2]

         subsetsUtil(nums, res, subset, i + 1)
         subsetsUtil([1, 2, 2], [[], [1], [1, 2], [2]], [2, 2], 2 + 1)
         subsetsUtil([1, 2, 2], [[], [1], [1, 2], [2]], [2, 2], 3)

Step 15: result.push_back(subset)
         result.push_back([2, 2])

         result = [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]

         loop for i = index, i < nums.size()
         i = 3
         3 < 3
         false

Step 16: Here we backtrack to last line of Step 14 where
         i = 2
         subset = [2, 2]

         We execute the next line
         subset.pop()

         subset = [2]

Step 17: Here we backtrack to last line of Step 13 where
         i = 1
         subset = [2]

         We execute the next line
         subset.pop()

         subset = []

Step 18: For loop continues where we execute
         loop for i = index, i < nums.size()
         i = 2
         i < nums.size()
         2 < 3
         true

         subset.push_back(nums[i])
         subset.push_back(nums[2])
         subset.push_back(2)

         subset = [2]

         subsetsUtil(nums, res, subset, i + 1)
         subsetsUtil([1, 2, 2], [[], [1], [1, 2], [2], [2, 2]], [2], 2 + 1)
         subsetsUtil([1, 2, 2], [[], [1], [1, 2], [2], [2, 2]], [2], 3)

Step 19: result.push_back(subset)
         result.push_back([2])

         result = [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]

         loop for i = index, i < nums.size()
         i = 3
         3 < 3
         false

Step 20: We have no more stack entries left. We return to the main function.

Step 21: for(auto it:result){
            answer.push_back(it);
        }

        We push result Set to answer Vector.

Step 22: return answer

So we return the answer as [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]].
```
