---
title: LeetCode - Find First and Last Position of Element in Sorted Array
description: LeetCode - find first and last position of element in sorted array using C++, Golang and Javascript.
date: 2021-06-06
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "find first and last position of element in sorted array, c++, golang, javascript"
---

![Container](./../first-and-last.png)

## Problem statement

Given an array of integers **nums** sorted in ascending order,
find the starting and ending position of a given **target** value.

If **target** is not found in the array, return **[-1, -1]**.

Problem statement taken from: <a href='https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array' target='_blank'>https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array</a>

**Example 1:**

```
Input: nums = [5, 7, 7, 8, 8, 10], target = 8
Output: [3, 4]
```

**Example 2:**

```
Input: nums = [5, 7, 7, 8, 8, 10], target = 6
Output: [-1, -1]
```

**Example 3:**

```
Input: nums = [], target = 0
Output: [-1, -1]
```

**Constraints:**

```
- 0 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9
- nums is a non-decreasing array.
- -10^9 <= target <= 10^9
```

### Explanation

#### Brute force

The brute force approach will be to do a linear scan of the array.
We use two pointers **leftIndex** and **rightIndex** start with the first array
element.

When the first occurrence of the **target** element is found,
we assign that index to **leftIndex** variable.
We keep on iterating till the element is different from **target**.
We assign the current **index - 1** value to **rightIndex**.

The C++ snippet of the above logic is as below:

```cpp
int firstIndex = -1, lastIndex = -1;
for (int i = 0; i < n; i++) {
    if (x != arr[i])
        continue;

    if (firstIndex == -1)
        firstIndex = i;
    lastIndex = i;
}
```

#### Binary search solution

An efficient solution to this problem is to use binary search.
Let's check the algorithm below:

```
- set i = 0, j = nums.size() - 1
- set leftIndex and rightIndex to -1

- loop while i <= j
  - set mid = i + (j - i)/2

  - if nums[mid] > target
    - set j = mid - 1
  - else if nums[mid] < target
    - set i = mid + 1
  - else
    - leftIndex = mid
    - set j = mid - 1

- set i = 0, j = nums.size() - 1

- loop while i <= j
  - set mid = i + (j - i)/2

  - if nums[mid] > target
    - set j = mid - 1
  - else if nums[mid] < target
    - set i = mid + 1
  - else
    - rightIndex = mid
    - set i = mid + 1

- return [leftIndex, rightIndex]
```

The time complexity of the above approach is **O(log(N))** and,
space complexity is **O(1)**.

#### C++ solution

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        int i, j, mid;
        i = 0;
        j = nums.size() - 1;
        int leftIndex = -1, rightIndex = -1;

        while(i <= j){
            mid = (i + j)/2;
            if(nums[mid] > target){
                j = mid - 1;
            } else if (nums[mid] < target){
                i = mid + 1;
            } else {
                leftIndex = mid;
                j = mid - 1;
            }
        }

        i = 0; j = nums.size() - 1;
        while(i <= j){
            mid = (i + j)/2;
            if(nums[mid] > target){
                j = mid - 1;
            } else if (nums[mid] < target){
                i = mid + 1;
            } else {
                rightIndex = mid;
                i = mid + 1;
            }
        }

        vector<int> ans;
        ans.push_back(leftIndex);
        ans.push_back(rightIndex);

        return ans;
    }
};
```

#### Golang solution

```go
func searchRange(nums []int, target int) []int {
    i, j := 0, len(nums) - 1
    leftIndex, rightIndex := -1, -1

    for i <= j {
        mid := i + (j - i)/2

        if nums[mid] > target {
            j = mid - 1
        } else if nums[mid] < target {
            i = mid + 1
        } else {
            leftIndex = mid
            j = mid - 1
        }
    }

    i, j = 0, len(nums) - 1

    for i <= j {
        mid := i + (j - i)/2

        if nums[mid] > target {
            j = mid - 1
        } else if nums[mid] < target {
            i = mid + 1
        } else {
            rightIndex = mid
            i = mid + 1
        }
    }

    return []int{leftIndex, rightIndex}
}
```

#### Javascript solution

```javascript
var searchRange = function(nums, target) {
    let i = 0, j = nums.length - 1, mid;
    let leftIndex = -1, rightIndex = -1;

    while(i <= j){
        mid = ~~(i + (j - i) / 2);

        if(nums[mid] > target){
            j = mid - 1;
        } else if (nums[mid] < target){
            i = mid + 1;
        } else {
            leftIndex = mid;
            j = mid - 1;
        }
    }

    i = 0;
    j = nums.length - 1;

    while(i <= j){
        mid = ~~(i + (j - i) / 2);

        if(nums[mid] > target){
            j = mid - 1;
        } else if (nums[mid] < target){
            i = mid + 1;
        } else {
            rightIndex = mid;
            i = mid + 1;
        }
    }

    return [leftIndex, rightIndex];
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
nums = [5, 7, 7, 8, 8, 10]
target = 8

Step 1: i = 0
        j = nums.size() - 1
          = 6 - 1
          = 5

Step 2: leftIndex = -1
        rightIndex = -1

Step 3: loop while i <= j
        0 <= 5
        mid = 2

        nums[2] > 8
        7 > 8
        false

        nums[2] < 8
        7 < 8
        true
        i = mid + 1
          = 3

Step 4: loop while i <= j
        3 <= 5
        mid = 4

        nums[4] > 8
        8 > 8
        false

        nums[4] < 8
        8 < 8
        false

        nums[4] == 8
        8 == 8
        true
        leftIndex = 4
        j = 4 - 1
          = 3

Step 5: loop while i <= j
        3 <= 3
        mid = 3

        nums[3] > 8
        8 > 8
        false

        nums[3] < 8
        8 < 8
        false

        nums[4] == 8
        8 == 8
        true
        leftIndex = 3
        j = 3 - 1
          = 2

Step 6: loop while i <= j
        3 <= 2
        false

Step 7: i = 0
        j = nums.size() - 1
          = 6 - 1
          = 5

Step 8: loop while i <= j
        0 <= 5
        mid = 2

        nums[2] > 8
        7 > 8
        false

        nums[2] < 8
        7 < 8
        true
        i = mid + 1
          = 3

Step 9: loop while i <= j
        3 <= 5
        mid = 4

        nums[4] > 8
        8 > 8
        false

        nums[4] < 8
        8 < 8
        false

        nums[4] == 8
        8 == 8
        true
        rightIndex = 4
        i = mid + 1
          = 5

Step 10: loop while i <= j
         5 <= 5
         mid = 5

         nums[5] > 8
         10 > 8
         true
         j = mid - 1
           = 5 - 1
           = 4

Step 11: loop while i <= j
         5 <= 4
         false

Step 12: return [3, 4]
```
