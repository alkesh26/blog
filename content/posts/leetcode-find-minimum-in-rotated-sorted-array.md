---
title: LeetCode - Find Minimum in Rotated Sorted Array
description: LeetCode - find the minimum element in a rotated sorted array using C++, Golang, and Javascript.
date: 2022-07-24
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "find the minimum element in a rotated sorted array, c++, golang, javascript"
---

## Problem statement

Suppose an array of length *n* sorted in ascending order is **rotated** between 1 and n times.
For example, the array *nums = [0, 1, 2, 4, 5, 6, 7]* might become:

*[4, 5, 6, 7, 0, 1, 2]* if it was rotated *4* times.
*[0, 1, 2, 4, 5, 6, 7]* if it was rotated *7* times.
Notice that **rotating** an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results
in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array *nums* of **unique** elements, return *the minimum element of this array*.

You must write an algorithm that runs in O(log n) time.

Problem statement taken from: <a href='https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/' target='_blank'>https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/</a>.

**Example 1:**

```
Input: nums = [3, 4, 5, 1, 2]
Output: 1
Explanation: The original array was [1, 2, 3, 4, 5] rotated 3 times.
```

**Example 2:**

```
Input: nums = [4, 5, 6, 7, 0, 1, 2]
Output: 0
Explanation: The original array was [0, 1, 2, 4, 5, 6, 7] and it was rotated 4 times.
```

**Example 3:**

```
Input: nums = [11, 13, 15, 17]
Output: 11
Explanation: The original array was [11, 13, 15, 17] and it was rotated 4 times.
```

**Constraints:**

```
- n == nums.length
- 1 <= n <= 5000
- -5000 <= nums[i] <= 5000
- All the integers of nums are unique
- nums is sorted and rotated between 1 and n times
```

### Explanation

#### Brute force approach

The naive approach is to do a linear search which takes **O(N)** time.
We need to find the **ith** index where a smaller number appears after **(i - 1)th** index.

#### Binary search

Since the array is rotated but sorted, we can modify our binary search implementation.
The rotated array has two segments that are sorted.
The index where the sorting is disturbed occurs at the smallest element in the array.

Let's check the algorithm:

```
- set low = 0
      high = nums.size() - 1

- loop while low < high
  - set mid = low + (high - low) / 2

  - if nums[low] <= nums[mid] && nums[high] >= nums[mid]
    - set high = mid - 1
  - else if nums[low] <= nums[mid] && nums[high] <= nums[mid]
    - set low = mid + 1
  - else if nums[mid] <= nums[low]
    - set high = mid

- return nums[low]
```

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int low = 0;
        int high = nums.size() - 1;

        while(low < high) {
            int mid = low + (high - low) / 2;

            if(nums[low] <= nums[mid] && nums[high] >= nums[mid])
                high = mid - 1;
            else if(nums[low] <= nums[mid] && nums[high] <= nums[mid])
                low = mid + 1;
            else if(nums[mid] <= nums[low])
                high = mid;
        }

        return nums[low];
    }
};
```

#### Golang solution

```go
func findMin(nums []int) int {
    low, mid := 0, 0
    high := len(nums) - 1

    for low < high {
        mid = low + (high - low) / 2

        if nums[low] <= nums[mid] && nums[high] >= nums[mid] {
            high = mid - 1
        } else if nums[low] <= nums[mid] && nums[high] <= nums[mid] {
            low = mid + 1
        } else if nums[mid] <= nums[low] {
            high = mid
        }
    }

    return nums[low];
}
```

#### Javascript solution

```javascript
var findMin = function(nums) {
    let low = 0;
    let high = nums.length - 1;

    while(low < high) {
        let mid = low + Math.floor((high - low) / 2);

        if(nums[low] <= nums[mid] && nums[high] >= nums[mid])
            high = mid - 1;
        else if(nums[low] <= nums[mid] && nums[high] <= nums[mid])
            low = mid + 1;
        else if(nums[mid] <= nums[low])
            high = mid;
    }

    return nums[low];
};
```

Let's dry run our algorithm.

```
Input: nums = [4, 5, 6, 7, 0, 1, 2]

Step 1: low = 0
        high = nums.size() - 1
             = 7 - 1
             = 6

Step 2: loop while low < high
          0 < 6
          true

          mid = low + (high - low) / 2
              = 0 + (6 - 0) / 2
              = 3

          if nums[low] <= nums[mid] && nums[high] >= nums[mid]
             nums[0] <= nums[3] && nums[6] >= nums[3]
             4 <= 7 && 2 >= 7
             false

          else if nums[low] <= nums[mid] && nums[high] >= nums[mid]
                  nums[0] <= nums[3] && nums[6] <= nums[3]
                  4 <= 7 && 2 <= 7
                  true

                  low = mid + 1
                      = 3 + 1
                      = 4

Step 3: loop while low < high
          4 < 6
          true

          mid = low + (high - low) / 2
              = 4 + (6 - 4) / 2
              = 4 + 1
              = 5

          if nums[low] <= nums[mid] && nums[high] >= nums[mid]
             nums[4] <= nums[5] && nums[6] >= nums[5]
             0 <= 1 && 2 >= 1
             true

             high = mid - 1
                  = 5 - 1
                  = 4

Step 4: loop while low < high
          4 < 4
          false

Step 5: return nums[low]
               nums[4]
               0

We return the answer as 0.
```
