---
title: LeetCode - House Robber II
description: LeetCode - return the maximum amount of money you can rob when houses are arranged in a circle using C++, Golang, and Javascript.
date: 2022-09-10
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "return the maximum amount of money you can rob when houses are arranged in a circle, c++, golang, javascript"
---

## Problem statement

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and **it will automatically contact the police if two adjacent houses were broken into on the same night**.

Given an integer array *nums* representing the amount of money of each house, return *the maximum amount of money you can rob tonight **without alerting the police***.

Problem statement taken from: <a href='https://leetcode.com/problems/house-robber-ii/' target='_blank'>https://leetcode.com/problems/house-robber-ii/</a>


**Example 1:**

```
Input: nums = [2, 3, 2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
```

**Example 2:**

```
Input: nums = [1, 2, 3, 1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

**Example 3:**

```
Input: nums = [1,2,3]
Output: 3
```

**Constraints:**

```
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 1000
```

### Explanation

This problem is an extension of our old blog post
[House Robber](https://alkeshghorpade.me/post/leetcode-house-robber).
The tricky part of the problem is the houses are arranged in a circle.
The first house is the neighbor of the last one, which means one of the
houses cannot be robbed.

We need to run two cases here:

* Select the first house and ignore the last one. We calculate the max amount that can be looted
  from nums[0] to nums[len - 2].
* Select the last house and ignore the first one. We calculate the max amount that can be looted
  from nums[1] to nums[len - 1].

Let's check the algorithm here:

```
// rob(nums) method
- set n = nums.size();

// for empty array.
- if n == 0
  - return 0

// for an array of size 1
- if n == 1
  - return nums[0]

- return max(robHelper(nums, 0, n - 2), robHelper(nums, 1, n - 1))

// robHelper(nums, l, r)
- set include = 0
      exclude = 0
      tmp = 0

- loop for i = l; i <= r; i++
  - set tmp = max(include, exclude)

  - update include = exclude + nums[i]

  - set exclude = tmp

- return max(include, exclude)
```

Let's check our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int robHelper(vector<int>& nums, int l, int r) {
        int include = 0, exclude = 0, tmp;

        for(int i = l ; i <= r ; i++) {
            tmp = max(include , exclude);
            include = exclude + nums[i];
            exclude = tmp;
        }

        return max(include , exclude);
    }

    int rob(vector<int>& nums) {
        int n = nums.size();

        if(n == 0) {
            return 0;
        }

        if(n == 1) {
            return nums[0];
        }

       return max(robHelper(nums, 0, n - 2) , robHelper(nums, 1, n - 1));
    }
};
```

#### Golang solution

```go
func max(a, b int) int {
    if a > b {
        return a
    }

    return b
}

func robHelper(nums []int, l, r int) int {
    include, exclude, tmp := 0, 0, 0

    for i := l; i <= r; i++ {
        tmp = max(include, exclude)
        include = exclude + nums[i]
        exclude = tmp
    }

    return max(include, exclude)
}

func rob(nums []int) int {
    n := len(nums)

    if n == 0 {
        return 0
    }

    if n == 1 {
        return nums[0]
    }

    return max(robHelper(nums, 0, n - 2), robHelper(nums, 1, n - 1))
}
```

#### Javascript solution

```javascript
var robHelper = function(nums, l, r) {
    let include = 0, exclude = 0, tmp;

    for(let i = l; i <= r; i++) {
        tmp = Math.max(include, exclude);
        include = exclude + nums[i];
        exclude = tmp;
    }

    return Math.max(include, exclude);
}

var rob = function(nums) {
    let n = nums.length;

    if(n == 0) {
        return 0;
    }

    if(n == 1) {
        return nums[0];
    }

    return Math.max(robHelper(nums, 0, n - 2), robHelper(nums, 1, n - 1));
};
```

Let's dry run our algorithm for a given input.

```
Input: nums = [1, 3, 2, 6, 8, 4]

// rob(vector<int>& nums)
Step 1: n = nums.size()
          = 6

Step 2: n == 0
        6 == 0
        false

Step 3: n == 1
        6 == 1
        false

Step 4: return max(robHelper(nums, 0, n - 2), robHelper(nums, 1, n - 1))
        return max(robHelper(nums, 0, 4), robHelper(nums, 1, 5))

First call for robHelper(nums, 0, 4)
Step 5: include = 0
        exclude = 0
        tmp

Step 6: loop for i = l; i <= r
        i = 0
        0 <= 4
        true

        tmp = max(include , exclude)
            = max(0, 0)
            = 0

        include = exclude + nums[i]
                = 0 + nums[0]
                = 0 + 1
                = 1

        exclude = tmp
                = 0

        i++
        i = 1

Step 7: loop for i <= r
        1 <= 4
        true

        tmp = max(include , exclude)
            = max(1, 0)
            = 1

        include = exclude + nums[i]
                = 0 + nums[1]
                = 0 + 3
                = 3

        exclude = tmp
                = 1

        i++
        i = 2

Step 8: loop for i <= r
        2 <= 4
        true

        tmp = max(include , exclude)
            = max(3, 1)
            = 3

        include = exclude + nums[i]
                = 1 + nums[2]
                = 1 + 2
                = 3

        exclude = tmp
                = 3

        i++
        i = 3

Step 9: loop for i <= r
        3 <= 4
        true

        tmp = max(include , exclude)
            = max(3, 3)
            = 3

        include = exclude + nums[i]
                = 3 + nums[3]
                = 3 + 6
                = 9

        exclude = tmp
                = 3

        i++
        i = 4

Step 10: loop for i <= r
         4 <= 4
         true

         tmp = max(include , exclude)
             = max(9, 3)
             = 9

         include = exclude + nums[i]
                 = 3 + nums[4]
                 = 3 + 8
                 = 11

         exclude = tmp
                 = 9

         i++
         i = 5

Step 11: loop for i <= r
         5 <= 4
         false

Step 12: return max(include, exclude)
                max(11, 9)

         We return 11

// we come back to step 4 and compute robHelper(nums, 1, 5)

Step 13: return max(11, robHelper(nums, 1, 5))

call for robHelper(nums, 1, 5)
Step 14: include = 0
         exclude = 0
         tmp

Step 15: loop for i = l; i <= r
         i = 1
         1 <= 5
         true

         tmp = max(include , exclude)
             = max(0, 0)
             = 0

         include = exclude + nums[i]
                 = 0 + nums[1]
                 = 0 + 3
                 = 3

          exclude = tmp
                  = 0

          i++
          i = 2

Step 16: loop for i <= r
         i = 2
         2 <= 5
         true

         tmp = max(include , exclude)
             = max(3, 0)
             = 3

         include = exclude + nums[i]
                 = 0 + nums[2]
                 = 0 + 2
                 = 2

         exclude = tmp
                 = 3

         i++
         i = 3

Step 17: loop for i <= r
         i = 3
         3 <= 5
         true

         tmp = max(include , exclude)
             = max(2, 3)
             = 3

         include = exclude + nums[i]
                 = 3 + nums[3]
                 = 3 + 6
                 = 9

         exclude = tmp
                 = 3

         i++
         i = 4

Step 18: loop for i <= r
         i = 4
         4 <= 5
         true

         tmp = max(include , exclude)
             = max(9, 3)
             = 9

         include = exclude + nums[i]
                 = 3 + nums[4]
                 = 3 + 8
                 = 11

         exclude = tmp
                 = 9

         i++
         i = 5

Step 19: loop for i <= r
         i = 5
         5 <= 5
         true

         tmp = max(include , exclude)
             = max(11, 9)
             = 11

         include = exclude + nums[i]
                 = 9 + nums[5]
                 = 9 + 4
                 = 13

         exclude = tmp
                 = 11

         i++
         i = 6

Step 20: loop for i <= r
         i = 6
         6 <= 5
         false

We return to step 13
Step 21: return max(11, robHelper(nums, 1, 5))
         return max(11, 13)

We return the answer as 13.
```
