---
title: LeetCode - Search Insert Position
description: LeetCode - Search Insert Position using C++, Golang and Javascript.
date: 2021-09-05
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - search insert position, c++, golang, javascript"
---

## Problem statement

Given a sorted array of distinct integers and a target value,
return the index if the target is found.
If not,
return the index where it would be if it were inserted in order.

You must write an algorithm with **O(log n)** runtime complexity.

Problem statement taken from: <a href='https://leetcode.com/problems/search-insert-position' target='_blank'>https://leetcode.com/problems/search-insert-position</a>

**Example 1:**

```
Input: nums = [1, 3, 5, 6], target = 5
Output: 2
```

**Example 2:**

```
Input: nums = [1, 3, 5, 6], target = 2
Output: 1
```

**Example 3:**

```
Input: nums = [1, 3, 5, 6], target = 7
Output: 4
```

**Example 4:**

```
Input: nums = [1, 3, 5, 6], target = 0
Output: 0
```

**Example 5:**

```
Input: nums = [1], target = 0
Output: 0
```

**Constraints:**

```
- 1 <= nums.length <= 10^4
- -10^4 <= nums[i] <= 10^4
- nums contains distinct values sorted in ascending order.
- -10^4 <= target <= 10^4
```

### Explanation

#### Brute Force approach

The brute force approach is to linearly iterate over the array
and find the index where the target can be inserted.

The solution is easy and quick to implement but it takes
**O(n)** time.

Since the elements are sorted we can use binary search algorithm
to find that correct index.

#### Binary search approach

##### Algorithm

```
- set start = 0 and end = N - 1.
- loop while (start <= end)
  - mid = (start + end)/2

  - if target > nums[mid]
    - start = mid + 1
  - else if target < nums[mid]
    - end = mid - 1
  - else
    - return mid

- return start
```

#### C++ solution

```cpp
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int start = 0;
        int end = nums.size()-1;

        while(start <= end){
            int mid = (start + end)/2;

            if(target > nums[mid]){
                start = mid + 1;
            }else if(target < nums[mid]){
                end = mid - 1;
            }else{
                return mid;
            }
        }

        return start;
    }
};
```

#### Golang solution

```go
func searchInsert(nums []int, target int) int {
    start := 0
    end := len(nums) - 1

    for start <= end {
        mid := (start + end) / 2

        if target < nums[mid] {
            end = mid - 1
        } else if target > nums[mid] {
            start = mid + 1
        } else {
            return mid
        }
    }

    return start
}
```

#### Javascript solution

```javascript
var searchInsert = function(nums, target) {
    let start = 0, end = nums.length - 1;
    let mid;

    while( start < end ){
        mid = (start + end) / 2;

        if( target < nums[mid] ){
            end = mid - 1;
        } else if( target > nums[mid] ){
            start = mid + 1;
        } else {
            return mid;
        }
    }

    return start;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [1, 3, 5, 6], target = 5

Step 1: start = 0
        end = nums.size() - 1
            = 4 - 1
            = 3

Step 2: loop while( start < end )
        0 < 3
        true

        mid = (start + end)/2
            = (0 + 3)/2
            = 3/2
            = 1

        if target < nums[mid]
           5 < nums[1]
           5 < 3
           false
        else if target > nums[mid]
           5 > nums[1]
           5 > 3
           true

           start = mid + 1
                 = 1 + 1
                 = 2

Step 3: loop while( start < end )
        2 < 3
        true

        mid = (start + end)/2
            = (2 + 3)/2
            = 5/2
            = 2

        if target < nums[mid]
           5 < 5
           false
        else if target > nums[mid]
           5 > nums[1]
           5 > 5
           false
        else
          return mid
          return 2

So the answer returned is 2.
```
