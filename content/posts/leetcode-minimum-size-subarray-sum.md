---
title: LeetCode - Minimum Size Subarray Sum
description: LeetCode - return the minimal length of a subarray whose sum is greater than or equal to target using C++, Golang and Javascript.
date: 2023-01-08
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "the minimal length of a subarray whose sum is greater than or equal to target, c++, golang, javascript"
---

## Problem statement

Given an array of positive integers `nums` and a positive integer `target`, return *the minimal length of a
subarray whose sum is greater than or equal to target*. If there is no such subarray, return `0` instead.

Problem statement taken from: <a href='https://leetcode.com/problems/minimum-size-subarray-sum' target='_blank'>https://leetcode.com/problems/minimum-size-subarray-sum</a>

**Example 1:**

```
Input: target = 7, nums = [2, 3, 1, 2, 4, 3]
Output: 2
Explanation: The subarray [4, 3] has the minimal length under the problem constraint.
```

**Example 2:**

```
Input: target = 4, nums = [1, 4, 4]
Output: 1
```

**Example 3:**

```
Input: target = 11, nums = [1, 1, 1, 1, 1, 1, 1, 1]
Output: 0
```

**Constraints:**

```
- 1 <= target <= 10^9
- 1 <= nums.length <= 10^5
- 1 <= nums.length <= 10^4
```

### Explanation

#### Brute force approach

A naive approach is to run two nested loops. The outer loop selects a starting element,
and the inner loop iterates over the array.
Whenever the sum of elements between the start and end becomes more than target,
we update the minimum length if current length is smaller than the smallest length so far.

A C++ snippet of this approach is as below:

```cpp
int minLength = n + 1;

for (int start = 0; start < n; start++) {
    int currentSum = nums[start];

    if (currentSum > x) return 1;

    for (int end = start + 1; end < n; end++) {
        currentSum += nums[end];

        if (currentSum > x && (end - start + 1) < minLength)
            minLength = (end - start + 1);
    }
}

return minLength;
```

The time-complexity of the above approach is **O(n^2)**, and the
space complexity is **O(1)**.

#### Efficient solution

An efficient approach is to use a sliding window approach.
Let's jump to the algorithm to understand it clearly.

```
- set l = 0, r = -1
      sum = 0
      minLength = nums.size() + 1

- loop while l < nums.size()
  - if r + 1 < nums.size() && sum < target
    - sum += nums[++r]
  - else
    - sum -= nums[l++]

  - if sum >= target
    - minLength = min(minLength, r - l + 1)
- loop end

- return minLength == nums.size() + 1 ? 0 : minLength
```

The time complexity of the above approach is **O(n)**, and the space complexity is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int l = 0, r = -1;
        int sum = 0;
        int minLength = nums.size() + 1;

        while(l < nums.size()) {
            if(r + 1 < nums.size() && sum < target) {
                sum += nums[++r];
            } else {
                sum -= nums[l++];
            }

            if(sum >= target) {
                minLength = min(minLength, r - l + 1);
            }
        }

        return minLength == nums.size() + 1 ? 0 : minLength;
    }
};
```

#### Golang solution

```go
func minSubArrayLen(target int, nums []int) int {
    l, r := 0, -1
    sum := 0
    minLength := len(nums) + 1

    for ;l < len(nums); {
        if r + 1 < len(nums) && sum < target {
            r += 1
            sum += nums[r]
        } else {
            sum -= nums[l]
            l += 1
        }

        if sum >= target {
            minLength = min(minLength, r - l + 1)
        }
    }

    if minLength == len(nums) + 1 {
        return 0
    }

    return minLength
}

func min(a, b int) int {
    if a < b {
        return a
    }

    return b
}
```

#### Javascript solution

```javascript
var minSubArrayLen = function(target, nums) {
    let l = 0, r = -1;
    let sum = 0;
    let minLength = nums.length + 1;

    while(l < nums.length) {
        if(r + 1 < nums.length && sum < target) {
            sum += nums[++r];
        } else {
            sum -= nums[l++];
        }

        if(sum >= target) {
            minLength = Math.min(minLength, r - l + 1);
        }
    }

    return minLength == nums.length + 1 ? 0 : minLength;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: target = 7, nums = [2, 3, 1, 2, 4, 3]

Step 1: l = 0, r = -1
        sum = 0
        minLength = nums.size() + 1
                  = 6 + 1
                  = 7

Step 2: loop while l < nums.size()
          0 < 6
          true

          if r + 1 < nums.size() && sum < target
             -1 + 1 < 6 && 0 < 7
             0 < 6 && 0 < 7
             true

            sum = sum + nums[++r]
                = 0 + nums[0]
                = 0 + 2
                = 2

            r = 0

          if sum >= target
             2 >= 7
             false

Step 3: loop while l < nums.size()
          0 < 6
          true

          if r + 1 < nums.size() && sum < target
             0 + 1 < 6 && 2 < 7
             1 < 6 && 2 < 7
             true

            sum = sum + nums[++r]
                = 2 + nums[1]
                = 2 + 3
                = 5

            r = 1

          if sum >= target
             5 >= 7
             false

Step 4: loop while l < nums.size()
          0 < 6
          true

          if r + 1 < nums.size() && sum < target
             1 + 1 < 6 && 5 < 7
             2 < 6 && 5 < 7
             true

            sum = sum + nums[++r]
                = 5 + nums[2]
                = 5 + 1
                = 6

            r = 2

          if sum >= target
             6 >= 7
             false

Step 5: loop while l < nums.size()
          0 < 6
          true

          if r + 1 < nums.size() && sum < target
             2 + 1 < 6 && 6 < 7
             3 < 6 && 6 < 7
             true

            sum = sum + nums[++r]
                = 6 + nums[3]
                = 6 + 2
                = 8

            r = 3

          if sum >= target
             8 >= 7
             true

             minLength = min(minLength, r - l + 1)
                       = min(7, 3 - 0 + 1)
                       = min(7, 4)
                       = 4

Step 6: loop while l < nums.size()
          0 < 6
          true

          if r + 1 < nums.size() && sum < target
             3 + 1 < 6 && 8 < 7
             4 < 6 && 8 < 7
             false
          else
            sum = sum - nums[l++]
                = 8 - nums[0]
                = 8 - 2
                = 6

            l = 1

Step 7: loop while l < nums.size()
          1 < 6
          true

          if r + 1 < nums.size() && sum < target
             3 + 1 < 6 && 6 < 7
             4 < 6 && 6 < 7
             true

            sum = sum + nums[++r]
                = 6 + nums[4]
                = 6 + 4
                = 10

            r = 4

           if sum >= target
             10 >= 7
             true

             minLength = min(minLength, r - l + 1)
                       = min(4, 4 - 1 + 1)
                       = min(4, 4)
                       = 4

Step 8: loop while l < nums.size()
          1 < 6
          true

          if r + 1 < nums.size() && sum < target
             4 + 1 < 6 && 10 < 7
             5 < 6 && 10 < 7
             false
          else
            sum = sum - nums[l++]
                = 10 - nums[1]
                = 10 - 3
                = 7

            l = 2

          if sum >= target
             7 >= 7
             true

             minLength = min(minLength, r - l + 1)
                       = min(4, 4 - 2 + 1)
                       = min(4, 3)
                       = 3

Step 9: loop while l < nums.size()
          2 < 6
          true

          if r + 1 < nums.size() && sum < target
             4 + 1 < 6 && 7 < 7
             5 < 6 && 7 < 7
             false
          else
            sum = sum - nums[l++]
                = 7 - nums[2]
                = 7 - 1
                = 6

            l = 3

          if sum >= target
             6 >= 7
             false

Step 10: loop while l < nums.size()
          3 < 6
          true

          if r + 1 < nums.size() && sum < target
             4 + 1 < 6 && 6 < 7
             5 < 6 && 6 < 7
             true

             sum = sum + nums[++r]
                 = 6 + nums[5]
                 = 6 + 3
                 = 9

             r = 5

           if sum >= target
             9 >= 7
             true

             minLength = min(minLength, r - l + 1)
                       = min(3, 5 - 3 + 1)
                       = min(3, 3)
                       = 3

Step 11: loop while l < nums.size()
          3 < 6
          true

          if r + 1 < nums.size() && sum < target
             5 + 1 < 6 && 9 < 7
             6 < 6 && 9 < 7
             false
          else
            sum = sum - nums[l++]
                = 9 - nums[3]
                = 9 - 2
                = 7

            l = 4

          if sum >= target
             7 >= 7
             true

             minLength = min(minLength, r - l + 1)
                       = min(3, 5 - 4 + 1)
                       = min(3, 2)
                       = 2

Step 12: loop while l < nums.size()
          4 < 6
          true

          if r + 1 < nums.size() && sum < target
             5 + 1 < 6 && 7 < 7
             6 < 6 && 7 < 7
             false
          else
            sum = sum - nums[l++]
                = 7 - nums[4]
                = 7 - 4
                = 3

            l = 5

          if sum >= target
             3 >= 7
             false

Step 13: loop while l < nums.size()
          5 < 6
          true

          if r + 1 < nums.size() && sum < target
             5 + 1 < 6 && 3 < 7
             6 < 6 && 3 < 7
             false
          else
            sum = sum - nums[l++]
                = 3 - nums[5]
                = 3 - 3
                = 0

            l = 6

           if sum >= target
             0 >= 7
             false

Step 14: loop while l < nums.size()
          6 < 6
          false

Step 15: minLength == nums.size() + 1 ? 0 : minLength
         2 == 6 + 1 ? 0 : 2
         2 == 7 ? 0 : 2
         false

We return the result as 2.
```
