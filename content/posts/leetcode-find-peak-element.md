---
title: LeetCode - Find Peak Element
description: LeetCode - find element in array which is greater than it's neighbors using C++, Golang and Javascript.
date: 2022-01-20
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - find element in array which is greater than it's neighbors, c++, golang, javascript"
---

## Problem statement

A peak element is an element that is strictly greater than its neighbors.

Given an integer array *nums*, find a peak element, and return its index. If the array contains multiple peaks, return the index to **any of the peaks**.

You may imagine that *nums[-1] = nums[n] = -∞*.

You must write an algorithm that runs in *O(log n)* time.

Problem statement taken from: <a href='https://leetcode.com/problems/find-peak-element' target='_blank'>https://leetcode.com/problems/find-peak-element</a>

**Example 1:**

```
Input: nums = [1, 2, 3, 1]
Output: 2
Explanation: 3 is a peak element, and your function should return the index number 2.
```

**Example 2:**

```
Input: nums = [1, 2, 1, 3, 5, 6, 4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
```

**Constraints:**

```
- 1 <= nums.length <= 1000
- -2^31 <= nums[i] <= 2^31 - 1
- nums[i] != nums[i + 1] for all valid i
```

### Explanation

#### Brute force approach

A simple approach is to scan the array elements and check if their neighbors are strictly smaller.
For the first and last element of the array, we verify the first index, and the second last index
respectively. For the rest of the elements, we verify the neighbors.

Since we are scanning all the elements of the array, the time complexity of the code will
be **O(N)**.

A C++ snippet of the above approach will look as below:

```cpp
int findPeak(int array[]){
    int n = array.size();

    if (n == 1)
      return 0;
    if (arr[0] >= arr[1])
        return 0;
    if (arr[n - 1] >= arr[n - 2])
        return n - 1;

    for (int i = 1; i < n - 1; i++) {
        if (arr[i] >= arr[i - 1] && arr[i] >= arr[i + 1])
            return i;
    }
}
```

#### Binary search approach

We can reduce the time complexity of the above program to **O(log(N))** using binary search.

In the case of Binary Search, we work on a sorted array and try to find the target element by reducing
the array size to half in every iteration.
We can modify the Binary Search approach for this problem to find the required element.
If the middle element is not the peak, we check if the element on the right side is greater
than the middle element. If yes, there is always a peak element on the right side.
Similarly, if the left side element is greater, the peak will be on the left side.

Let's check the algorithm first to understand the modified binary search approach.

```
- set low = 0, high = nums.size() - 1
  initialize mid

- loop while low < high
  - set mid = low + (high - low / 2)

  - if nums[mid] > nums[mid + 1]
    - set high = mid
  - else if nums[mid] <= nums[mid + 1]
    - set low = mid + 1

- return low
```

#### C++ solution

```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int low = 0, high = nums.size() - 1;
        int mid;

        while(low < high) {
            mid = low + (high - low)/2;
            if(nums[mid] > nums[mid + 1]){
                high = mid;
            } else if(nums[mid] <= nums[mid + 1]){
                low = mid + 1;
            }
        }

        return low;
    }
};
```

#### Golang solution

```go
func findPeakElement(nums []int) int {
    low, high := 0, len(nums) - 1
    var mid int

    for low < high {
        mid = low + (high - low)/2

        if nums[mid] > nums[mid + 1] {
            high = mid
        } else if nums[mid] <= nums[mid + 1] {
            low = mid + 1
        }
    }

    return low
}
```

#### Javascript solution

```javascript
var findPeakElement = function(nums) {
    let low = 0, high = nums.length - 1;
    let mid;

    while(low < high) {
        mid = low + Math.floor((high - low) / 2);

        if(nums[mid] > nums[mid + 1]){
            high = mid;
        } else if(nums[mid] <= nums[mid + 1]){
            low = mid + 1;
        }
    }

    return low;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [1, 2, 1, 3, 5, 6, 4]

Step 1: set low = 0
            high = nums.size() - 1
                 = 7 - 1
                 = 6
        initialize mid

Step 2: loop while low < high
        0 < 6
        true

        mid = low + (high - low) / 2
            = 0 + (6 - 0) / 2
            = 6 / 2
            = 3

        if nums[mid] > nums[mid + 1]
           nums[3] > nums[4]
           3 > 5
           false

        else if nums[mid] <= nums[mid + 1]
                nums[3] <= nums[4]
                3 <= 5
                true

               low = mid + 1
                   = 3 + 1
                   = 4

Step 3: loop while low < high
        4 < 6
        true

        mid = low + (high - low) / 2
            = 4 + (6 - 4) / 2
            = 4 + 2 / 2
            = 4 + 1
            = 5

        if nums[mid] > nums[mid + 1]
           nums[5] > nums[6]
           6 > 4
           true

           high = mid
                = 5

Step 4: loop while low < high
        4 < 5
        true

        mid = low + (high - low) / 2
            = 4 + (5 - 4) / 2
            = 4 + 1 / 2
            = 4 + 0
            = 4

        if nums[mid] > nums[mid + 1]
           nums[4] > nums[5]
           5 > 6
           false

        else if nums[mid] <= nums[mid + 1]
                nums[4] <= nums[5]
                5 < 6
                true

                low = mid + 1
                    = 4 + 1
                    = 5

Step 5: loop while low < high
        5 < 5
        false

Step 6: return low

So we return the answer as 5.
```
