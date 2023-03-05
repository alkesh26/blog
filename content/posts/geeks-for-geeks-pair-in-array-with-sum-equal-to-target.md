---
title: Find a pair in an array with a sum equal to the target using sorting
description: Given array nums and a number target, check for pair in nums with sum as target.
date: 2021-03-06
hashtags: ["GeeksForGeeks", "algorithms", "golang", "cpp"]
categories: "geeksforgeeks - pair in an array with a sum equal to the target, c++, golang"
---

## Problem statement

Given array nums of n numbers and another number target, determines
whether or not there exist two elements in nums whose sum is exactly equal to target.

Problem statement taken from:
<a href='https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/' target='_blank'>
  https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/
</a>

**Example 1:**
```
Input: nums = {0, -1, 2, -3, 1}, target = -2
Output: [3,4]
```

**Example 2:**
```
Input: nums = {1, -2, 1, 0, 5}, target = 0
Output: []
```

### Explanation

The problem can be solved in **O(NlogN)** time, without using extra space.
The **NlogN** is the average time taken to sort an array.

#### Sorting and two pointers

##### Algorithm

```
- Sort the array in ascending order.
- Initialize two variables l and r.
  - Set l = 0 pointing to leftmost index of array.
  - Set r = n - 1 pointing to rightmost index of array.
- Loop while l < r
  - if (nums[l] + nums[r] == x) then return [l, r]
  - else if (nums[l] + nums[r] < x) then l++
  - else r--
- If no such pair found return []
```

#### C++ solution

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>&nums, int target) {
        sort(nums.begin(), nums.end());

        int l = 0, r = nums.size() - 1;
        while(l < r){
            if (nums[l] + nums[r] == target){
                return vector<int> {l, r};
            } else if (nums[l] + nums[r] < target){
                l++;
            } else {
                r--;
            }
        }

        return vector<int> {};
    }
};
```

#### Golang solution

```go
func twoSum(nums []int, target int) []int {
    sort.Ints(nums)
    l := 0
    r := len(nums) - 1

    for l < r {
        if nums[l] + nums[r] == target {
            return []int{l, r}
        } else if nums[l] + nums[r] < target {
            l++
        } else {
            r--
        }
    }

    return []int{}
}
```
