---
title: LeetCode - Search in Rotated Sorted Array
description: LeetCode - search target element in rotated sorted array using C++, Golang and Javascript.
date: 2022-01-06
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - the maximum amount of money you can rob tonight, c++, golang, javascript"
---

### Problem statement

There is an integer array *nums* sorted in ascending order (with **distinct** values).

Prior to being passed to your function, *nums* is **possibly rotated** at an unknown pivot index
`k (1 <= k < nums.length)` such that the resulting array is
*[nums[k], nums[k + 1], ..., nums[n - 1], nums[0], nums[1], ..., nums[k - 1]]() (**0-indexed**).
For example, *[0, 1, 2, 4, 5, 6, 7]* might be rotated at pivot index 3 and become
*[4, 5, 6, 7, 0, 1, 2]*.

Given the array *nums* **after** the possible rotation and an integer *target*,
return the index of *target* if *it is in nums, or -1 if it is not in nums*.

You must write an algorithm with `O(log n)` runtime complexity.

Problem statement taken from: <a href="https://leetcode.com/problems/search-in-rotated-sorted-array" target="_blank">https://leetcode.com/problems/search-in-rotated-sorted-array</a>

**Example 1:**

```
Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 0
Output: 4
```

**Example 2:**

```
Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 3
Output: -1
```

**Example 3:**

```
Input: nums = [1], target = 0
Output: -1
```

**Constraints:**

```
- 1 <= nums.length <= 5000
- 10^4 <= nums[i] <= 10^4
- All values of nums are unique.
- nums is an ascending array that is possibly rotated.
- -10^4 <= target <= 10^4
```

### Explanation

#### Binary search two-pass

The naive solution is to find the pivot element.
The index where the element is smaller than the previous one.
We then call the binary search on one of the two sub-arrays.
If we find the target element, we return the index
or return -1.

A C++ snippet of the approach will look like this:

```cpp
int rotatedBinarySearch(int arr[], int n, int key) {
    int pivot = findPivot(arr, 0, n - 1);

    if (pivot == -1)
        return binarySearch(arr, 0, n - 1, key);

    if (arr[pivot] == key)
        return pivot;

    if (arr[0] <= key)
        return binarySearch(arr, 0, pivot - 1, key);

    return binarySearch(arr, pivot + 1, n - 1, key);
}

int findPivot(int arr[], int low, int high) {
    if (high < low)
        return -1;

    if (high == low)
        return low;

    int mid = (low + high) / 2;
    if (mid < high && arr[mid] > arr[mid + 1])
        return mid;

    if (mid > low && arr[mid] < arr[mid - 1])
        return (mid - 1);

    if (arr[low] >= arr[mid])
        return findPivot(arr, low, mid - 1);

    return findPivot(arr, mid + 1, high);
}

int binarySearch(int arr[], int low, int high, int key) {
    if (high < low)
        return -1;

    int mid = (low + high) / 2;
    if (key == arr[mid])
        return mid;

    if (key > arr[mid])
        return binarySearch(arr, (mid + 1), high, key);

    return binarySearch(arr, low, (mid - 1), key);
}
```

The time complexity of this approach is **O(logN)**
and
space complexity is **O(1)**.

#### Binary Search one pass

Instead of iterating the array twice, once to find the pivot and
then finding the target number in one of the sub-arrays,
we can find the target element in one pass.

The standard binary search approach needs to be changed.
We need to pass the left and right index to our search function and
consider the left or right half of the array based on the middle element.

Let's check the algorithm first.

```
// searchIndex function
- set mid = low + high / 2

- if low > high
  - return -1

- if nums[mid] == target
  - return mid

- if nums[low] <= nums[mid]
  - if nums[low] <= target && nums[mid] >= target
    - return searchIndex(nums, low, mid - 1, target)
  - else
    - return searchIndex(nums, mid + 1, high, target)
- else
  - if nums[high] >= target && nums[mid] <= target
    - return searchIndex(nums, mid + 1, high, target)
  - else
    - return searchIndex(nums, low, mid - 1, target)

// search function
- searchIndex(nums, 0, nums.size() - 1, target)
```

#### C++ solution

```cpp
class Solution {
static int searchIndex(vector<int>& nums, int left, int right, int target){
    int mid = (left + right) / 2;
    if(left > right){
        return -1;
    }

    if(nums[mid] == target){
        return mid;
    }

    if(nums[left] <= nums[mid]){
        if(nums[left] <= target && nums[mid] >= target){
            return searchIndex(nums, left, mid - 1, target);
        } else {
            return searchIndex(nums, mid + 1, right, target);
        }
    } else {
        if(nums[right] >= target && nums[mid] <= target){
            return searchIndex(nums, mid + 1, right, target);
        } else {
            return searchIndex(nums, left, mid - 1, target);
        }
    }
};

public:
    int search(vector<int>& nums, int target) {
        return searchIndex(nums, 0, nums.size() - 1, target);
    }
};
```

#### Golang solution

```go
func searchIndex(nums []int, left, right, target int) int {
    mid := (left + right) / 2

    if left > right {
        return -1
    }

    if nums[mid] == target {
        return mid
    }

    if nums[left] <= nums[mid] {
        if nums[left] <= target && nums[mid] >= target {
            return searchIndex(nums, left, mid - 1, target)
        } else {
            return searchIndex(nums, mid + 1, right, target)
        }
    } else {
        if nums[right] >= target && nums[mid] <= target {
            return searchIndex(nums, mid + 1, right, target)
        } else {
            return searchIndex(nums, left, mid - 1, target)
        }
    }
}

func search(nums []int, target int) int {
    return searchIndex(nums, 0, len(nums) - 1, target)
}
```

#### Javascript solution

```javascript
var searchIndex = function(nums, left, right, target) {
    let mid = (left + right) / 2;

    if(left > mid) {
        return -1;
    }

    if(nums[mid] == target) {
        return mid;
    }

    if (nums[left] <= nums[mid]) {
        if(nums[left] <= target && nums[mid] >= target) {
            return searchIndex(nums, left, mid - 1, target);
        } else {
            return searchIndex(nums, mid + 1, right, target);
        }
    } else {
        if(nums[right] >= target && nums[mid] <= target) {
            return searchIndex(nums, mid + 1, right, target);
        } else {
            return searchIndex(nums, left, mid - 1, target);
        }
    }
};

var search = function(nums, target) {
  return searchIndex(nums, 0, nums.length - 1, target);
};
```

Let's dry run the problem.

```
Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 0

Step 1: // search function
        searchIndex(nums, 0, nums.size() - 1, target)

// searchIndex function
Step 2: int mid = (left + right) / 2
        mid = (0 + 6) / 2
            = 6 / 2
            = 3

        if nums[mid] == target
           nums[3] == 0
           7 == 0
           false

        if nums[left] <= nums[mid]
           nums[0] <= nums[3]
           4 <= 7
           true

           if nums[left] <= target && nums[mid] >= target
              nums[0] <= 0 && nums[3] >= 0
              4 <= 0 && 7 >= 0
              false

              return searchIndex(nums, mid + 1, right, target)
                     searchIndex(nums, 4, 6, 0)

// searchIndex(nums, 4, 6, target)
Step 3: int mid = (left + right) / 2
        mid = (4 + 6) / 2
            = 10 / 2
            = 5

        if nums[mid] == target
           nums[5] == 0
           1 == 0
           false

        if nums[left] <= nums[mid]
           nums[4] <= nums[5]
           0 <= 1
           true

           if nums[left] <= target && nums[mid] >= target
              nums[4] <= 0 && nums[5] >= 0
              0 <= 0 && 1 >= 0
              true

              return searchIndex(nums, left, mid - 1, target)
                     searchIndex(nums, 4, 4, 0)

// searchIndex(nums, 4, 4, 0)
Step 4: int mid = (left + right) / 2
        mid = (4 + 4) / 2
            = 8 / 2
            = 4

        if nums[mid] == target
           nums[4] == 0
           0 == 0
           return mid
           return 4

The flow backtracks from step 4 to step 1.

We return the answer as 4.
```
