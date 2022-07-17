---
title: LeetCode - Search in Rotated Sorted Array II
description: LeetCode - search in rotated sorted array containing duplicates using C++, Golang, and Javascript.
date: 2022-07-17
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - search in rotated sorted array containing duplicates, c++, golang, javascript"
---

### Problem statement

There is an integer array *nums* sorted in non-decreasing order (not necessarily with **distinct** values).

Before being passed to your function, *nums* is **rotated** at an unknown pivot index *k (0 <= k < nums.length)*
such that the resulting array is *[nums[k], nums[k + 1], ..., nums[n - 1], nums[0], nums[1], ..., nums[k - 1]]* **(0-indexed)**.
For example, *[0, 1, 2, 4, 4, 4, 5, 6, 6, 7]* might be rotated at pivot index 5
and become *[4, 5, 6, 6, 7, 0, 1, 2, 4, 4]*.

Given the array *nums* **after** the rotation and an integer *target*,
return true if target is in nums, or false if it is not in nums.

You must decrease the overall operation steps as much as possible.

Problem statement taken from: <a href="https://leetcode.com/problems/search-in-rotated-sorted-array-ii/" target="_blank">https://leetcode.com/problems/search-in-rotated-sorted-array-ii/</a>.

**Example 1:**

```
Input: nums = [2, 5, 6, 0, 0, 1, 2], target = 0
Output: true
```

**Example 2:**

```
Input: nums = [2, 5, 6, 0, 0, 1, 2], target = 3
Output: false
```

**Constraints:**

```
- 1 <= nums.length <= 10^5
- -2^31 <= nums[i] <= 2^31 - 1
- 0 <= k <= 10^5
```

### Explanation

The solution for this problem is similar to the previous
[Search in Rotated Sorted Array](https://alkeshghorpade.me/post/leetcode-search-in-rotated-sorted-array).
The only difference is that due to the presence of duplicates,
**nums[low] == nums[mid]** is a possibility and we have to deal with this
case separately.

Let's jump directly to the algorithm.

```
// search function
- if low > high
    - return -1

- set mid = low + (high - low) / 2

- if nums[mid] == key
    - return true

- if nums[low] == nums[mid + 1] && nums[high] == nums[mid]
    - low++
    - high--
    - search(nums, low, high, key)

if nums[low] <= nums[mid]
    - if key >= nums[low] && key <= nums[mid]
        - return search(nums, low, mid - 1, key)

    - return search(nums, mid + 1, high, key)

if key >= nums[mid] && key <= nums[high]
    - return search(nums, mid + 1, high, key)

- return search(nums, low, mid - 1, key)
```

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    bool searchUtil(vector<int>& nums, int low, int high, int target) {
        if(low > high) {
            return false;
        }

        int mid = low + (high - low)/2;

        if(nums[mid] == target){
            return true;
        }

        if(nums[low] == nums[mid] && nums[high] == nums[mid]){
            low++;
            high--;
            return searchUtil(nums, low, high, target);
        }

        if(nums[low] <= nums[mid]){
            if(target >= nums[low] && target <= nums[mid]){
                return searchUtil(nums, low, mid - 1, target);
            }

            return searchUtil(nums, mid + 1, high, target);
        }

        if(target >= nums[mid] && target <= nums[high]){
            return searchUtil(nums, mid + 1, high, target);
        }

        return searchUtil(nums, low, mid - 1, target);
    }

    bool search(vector<int>& nums, int target) {
        bool result = searchUtil(nums, 0, nums.size() - 1, target);
        return result;
    }
};
```

#### Golang solution

```go
func searchUtil(nums []int, low, high, target int) bool {
    if low > high {
        return false
    }

    mid := low + (high - low) / 2

    if nums[mid] == target {
        return true
    }

    if nums[low] == nums[mid] && nums[high] == nums[mid] {
        low++
        high--
        return searchUtil(nums, low, high, target)
    }

    if nums[low] <= nums[mid] {
        if target >= nums[low] && target <= nums[mid] {
            return searchUtil(nums, low, mid - 1, target)
        }

        return searchUtil(nums, mid + 1, high, target)
    }

    if target >= nums[mid] && target <= nums[high] {
        return searchUtil(nums, mid + 1, high, target);
    }

    return searchUtil(nums, low, mid - 1, target);
}

func search(nums []int, target int) bool {
    return searchUtil(nums, 0, len(nums) - 1, target)
}
```

#### Javascript solution

```javascript
var searchUtil = function(nums, low, high, target) {
    if(low > high) {
        return false;
    }

    let mid = low + (high - low)/2;

    if(nums[mid] == target){
        return true;
    }

    if(nums[low] == nums[mid] && nums[high] == nums[mid]){
        low++;
        high--;
        return searchUtil(nums, low, high, target);
    }

    if(nums[low] <= nums[mid]){
        if(target >= nums[low] && target <= nums[mid]){
            return searchUtil(nums, low, mid - 1, target);
        }

        return searchUtil(nums, mid + 1, high, target);
    }

    if(target >= nums[mid] && target <= nums[high]){
        return searchUtil(nums, mid + 1, high, target);
    }

    return searchUtil(nums, low, mid - 1, target);
};

var search = function(nums, target) {
    return searchUtil(nums, 0, nums.length - 1, target);
};
```

Let's dry run the problem.

```
Input: nums = [2, 5, 6, 0, 0, 1, 2], target = 3

// search function
Step 1: searchUtil(nums, 0, nums.size() - 1, target)
        searchUtil(nums, 0, 6, 0)

// searchUtil function
Step 2: low > high
        0 > 6
        false

Step 3: mid = low + (high - low)/2
            = 0 + (6 - 0)/2
            = 0 + 6/2
            = 3

Step 4: if nums[mid] == target
           nums[3] == 3
           0 == 3
           false

Step 5: if nums[low] == nums[mid] && nums[high] == nums[mid]
           nums[0] == nums[3] && nums[6] == nums[3]
           2 == 0 && 2 == 0
           false

Step 6: if nums[low] <= nums[mid]
           nums[0] <= nums[3]
           2 <= 0
           false

Step 7: if target >= nums[mid] && target <= nums[high]
           3 >= nums[3] && 3 <= nums[6]
           3 >= 0 && 3 <= 2
           false

Step 8: searchUtil(nums, low, mid - 1, target)
        searchUtil(nums, 0, 2, 3)

// searchUtil function
Step 9: low > high
        0 > 2
        false

Step 10: mid = low + (high - low)/2
             = 0 + (2 - 0)/2
             = 0 + 2/2
             = 1

Step 11: if nums[mid] == target
            nums[1] == 3
            5 == 3
            false

Step 12: if nums[low] == nums[mid] && nums[high] == nums[mid]
            nums[0] == nums[1] && nums[2] == nums[1]
            2 == 5 && 6 == 5
            false

Step 13: if nums[low] <= nums[mid]
            nums[0] <= nums[1]
            2 <= 5
            true

            if target >= nums[low] && target <= nums[mid]
               3 >= nums[0] && 3 <= nums[1]
               3 >= 2 && 3 <= 5
               true

               return searchUtil(nums, low, mid - 1, target)
                      searchUtil(nums, 0, 1 - 1, 3)
                      searchUtil(nums, 0, 0, 3)

// searchUtil function
Step 14: if low > high
            0 > 0
            false

Step 15: mid = low + (high - low)/2
             = 0 + (0 - 0)/2
             = 0 + 0/2
             = 0

Step 16: if nums[mid] == target
            nums[0] == 3
            2 == 3
            false

Step 17: if nums[low] == nums[mid] && nums[high] == nums[mid]
            nums[0] == nums[0] && nums[0] == nums[0]
            2 == 2 && 2 == 2
            true

            low++
            low = 1

            high--
            high = -1

            return searchUtil(nums, low, high, target)
                   searchUtil(nums, 1, -1, 3)

// searchUtil function
Step 14: if low > high
            1 > -1
            true

            return false

// We go back from Step 14 to Step 9 to Step 2 to Step 1 because of recursion

We return the answer as false.
```
