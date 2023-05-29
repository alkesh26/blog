---
title: LeetCode - Permutations
description: LeetCode - return all the possible permutations of an array with distinct elements using C++, Golang, and Javascript.
date: 2022-08-25
hashtags: ["leetcode", "geeksforgeeks", "algorithms", "golang", "cpp", "javascript"]
categories: "return all the possible permutations of an array with distinct elements, c++, golang, javascript, geeksforgeeks."
---

## Problem statement

Given an array *nums* of distinct integers,
return *all the possible permutations*.
You can return the answer in **any order**.

Problem statement taken from: <a href='https://leetcode.com/problems/permutations' target='_blank'>https://leetcode.com/problems/permutations</a>

**Example 1:**

```
Input: nums = [1, 2, 3]
Output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
```

**Example 2:**

```
Input: nums = [0, 1]
Output: [[0, 1], [1, 0]]
```

**Example 3:**

```
Input: nums = [1]
Output: [[1]]
```

**Constraints:**

```
- 1 <= nums.length <= 6
- -10 <= nums[i] <= 10
- All the integers of nums are unique.
```

### Explanation

#### Backtracking

![Container](./../array-permutations.png)

When we are required to generate a permutation or a sequence,
recursion is the best approach to use. The recursion for this problem
will be a bit different compared to the standard recursion approach.

One approach to solve this problem is to keep track of the element we have
visited and generate permutations for the rest of the array elements.
But, we can solve this by swapping the array elements.

Let's jump to the algorithm to understand it better.

```
- set result = [[]]

- call _getPermutations(result, nums, 0, nums.length - 1)

- return result

// _getPermutations(result, nums, l, r)
- if l == r
  - push the current nums permutation in the result
  - result.push(nums)
- else
  - loop for i = l; i <= r; i++
    - swap(nums[l], nums[i])

    - _getPermutations(result, nums, l + 1, r)

    - swap(nums[l], nums[i])
- end if
```

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> result;

        _getPermutations(result, nums, 0, nums.size() - 1);
        return result;
    }

    void _getPermutations(vector<vector<int>>& result, vector<int> nums, int l, int r){
        if(l == r){
            result.push_back(nums);
            return;
        } else {
            for(int i = l; i <= r; i++){
                swap(nums[l], nums[i]);

                _getPermutations(result, nums, l + 1, r);

                swap(nums[l], nums[i]);
            }
        }
    }
};
```

#### Golang solution

```go
func permute(nums []int) [][]int {
    result := [][]int{}

    _getPermutations(&result, nums, 0, len(nums) - 1)

    return result
}

func _getPermutations(result *[][]int, nums []int, l, r int) {
    if l == r {
        cp := make([]int, len(nums))
        copy(cp, nums)
        *result = append(*result, cp)
    } else {
        for i := l; i <= r; i++ {
            nums[l], nums[i] = nums[i], nums[l]

            _getPermutations(result, nums, l + 1, r)

            nums[l], nums[i] = nums[i], nums[l]
        }
    }
}
```

#### Javascript solution

```javascript
var permute = function(nums) {
    const result = [];

    _getPermutations(result, nums, 0, nums.length - 1);

    return result;
};

function _getPermutations(result, nums, l, r) {
    if(l === r) {
        result.push(nums.slice(0));
        return;
    } else {
        for(let i = l; i <= r; i++) {
            [nums[l], nums[i]] = [nums[i], nums[l]];

            _getPermutations(result, nums, l + 1, r);

            [nums[l], nums[i]] = [nums[i], nums[l]];
        }
    }
}
```

#### Dry Run

Let's dry-run our algorithm for **Example 1**.

```
Input: nums = [1, 2, 3]

// in permute function
Step 1: vector<vector<int>> result

Step 2: _getPermutations(result, nums, 0, nums.size() - 1)
        _getPermutations(result, nums, 0, 2)

// in _getPermutations function
Step 3: if l == r
           0 == 2
           false

        else
          loop for i = l; i <= r
            i = 0
            0 <= 2
            true

            swap(nums[l], nums[i])
            swap(nums[0], nums[0])
            nums = [1, 2, 3]

            _getPermutations(result, nums, l + 1, r)
            _getPermutations(result, nums, 0 + 1, 2)
            _getPermutations(result, nums, 1, 2)

Step 4: if l == r
           1 == 2
           false

        else
          loop for i = l; i <= r
            i = 1
            1 <= 2
            true

            swap(nums[l], nums[i])
            swap(nums[1], nums[1])
            nums = [1, 2, 3]

            _getPermutations(result, nums, l + 1, r)
            _getPermutations(result, nums, 1 + 1, 2)
            _getPermutations(result, nums, 2, 2)

Step 5: if l == r
           2 == 2
           true
           result.push_back(nums)
           result = [[1, 2, 3]]
           return

           // We return to step 4

Step 6: swap(nums[l], nums[i])
        swap(nums[1], nums[1])
        nums = [1, 2, 3]

        i++
        i = 2
        loop for i <= r
            i = 2
            2 <= 2
            true

            swap(nums[l], nums[i])
            swap(nums[1], nums[2])
            nums = [1, 3, 2]

            _getPermutations(result, nums, l + 1, r)
            _getPermutations(result, nums, 1 + 1, 2)
            _getPermutations(result, nums, 2, 2)

Step 7: if l == r
           2 == 2
           true
           result.push_back(nums)
           result = [[1, 2, 3], [1, 3, 2]]
           return

           // We return to step 6

Step 8: swap(nums[l], nums[i])
        swap(nums[1], nums[2])
        nums = [1, 2, 3]

        i++
        i = 3
        loop for i <= r
            i = 3
            3 <= 2
            false

        // we backtrack to step 3

Step 9: swap(nums[l], nums[i])
        swap(nums[0], nums[0])
        nums = [1, 2, 3]

        i++
        i = 1
        loop for i <= r
            i = 1
            1 <= 2
            true

            swap(nums[l], nums[i])
            swap(nums[0], nums[1])
            nums = [2, 1, 3]

            _getPermutations(result, nums, l + 1, r)
            _getPermutations(result, nums, 0 + 1, 2)
            _getPermutations(result, nums, 1, 2)

Step 10: if l == r
            1 == 2
            false

         else
            for i = l; i <= r
            i = 1
            1 <= 2
            true

            swap(nums[l], nums[i])
            swap(nums[1], nums[1])
            nums = [2, 1, 3]

            _getPermutations(result, nums, l + 1, r)
            _getPermutations(result, nums, 1 + 1, 2)
            _getPermutations(result, nums, 2, 2)

Step 11: if l == r
            2 == 2
            true
            result.push_back(nums)
            result = [[1, 2, 3], [1, 3, 2], [2, 1, 3]]
            return

            // We return to step 10

We similarly backtrack to generate the rest of the solution
We return the solution as

[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
```
