---
title: LeetCode - Maximum Product Subarray
description: LeetCode - find a contiguous non-empty subarray within the array that has the largest product using C++, Golang and Javascript.
date: 2022-02-06
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - find a contiguous non-empty subarray within the array that has the largest product, c++, golang, javascript"
---

### Problem statement

Given an integer array *nums*, find a contiguous non-empty subarray within the array that has the largest product, and return
*the product*.

The test cases are generated so that the answer will fit in a **32-bit** integer.

A **subarray** is a contiguous subsequence of the array.

Problem statement taken from: <a href='https://leetcode.com/problems/maximum-product-subarray' target='_blank'>https://leetcode.com/problems/maximum-product-subarray</a>.

**Example 1:**

```
Input: nums = [2, 3, -2, 4]
Output: 6
Explanation: [2, 3] has the largest product 6.
```

**Example 2:**

```
Input: nums = [-2, 0, -1]
Output: 0
Explanation: The result cannot be 2, because [-2, -1] is not a subarray.
```

**Constraints:**

```
- 1 <= nums.length <= 2 * 10^4
- -10 <= nums[i] <= 10
- The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
```

### Explanation

#### Brute Force approach

A simple approach is to consider all subarrays and return the maximum product.

A C++ snippet of the approach will look as below:

```cpp
int result = arr[0];

for (int i = 0; i < n; i++) {
    int mul = arr[i];

    for (int j = i + 1; j < n; j++) {
        result = max(result, mul);
        mul *= arr[j];
    }

    result = max(result, mul);
}

return result;
```

The time-complexity of the above approach is **O(N^2)**, and space complexity is **O(1)**.

#### Efficient approach

The efficient approach is similar to what we have used in our previous blog post
[Maximum Subarray](https://alkeshghorpade.me/post/leetcode-maximum-subarray).
An important thing to notice here is an array can contain both positive and negative numbers
as well as zero. The maximum subarray problem used Kadane's algorithm.
We tweak this approach and instead use three variables called as
*max_so_far*, *max_ending_here* and *min_ending_here*.
For each index the maximum number ending at that index will be
*maximum(arr[i], max_ending_here * arr[i], min_ending_here * arr[i])*. Similarly,
the minimum number ending here will be the minimum of these 3.

Let's check the algorithm first.

```
- set max_ending_here, min_ending_here and max_so_far to nums[0]
  initialize temp_maximum

- loop for i = 1; i < nums.size(); i++
  - temp_maximum = max(nums[i], nums[i] * max_ending_here, nums[i] * min_ending_here)
  - min_ending_here = min(nums[i], nums[i] * max_ending_here, nums[i] * min_ending_here)
  - max_ending_here = temp_maximum
  - max_so_far = max(max_so_far, max_ending_here)

- return max_so_far
```

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int max_ending_here = nums[0];
        int min_ending_here = nums[0];
        int max_so_far = nums[0];
        int temp_maximum;

        for(int i = 1; i < nums.size(); i++) {
            temp_maximum = max({nums[i], nums[i] * max_ending_here, nums[i] * min_ending_here});
            min_ending_here = min({nums[i], nums[i] * max_ending_here, nums[i] * min_ending_here});
            max_ending_here = temp_maximum;
            max_so_far = max(max_so_far, max_ending_here);
        }

        return max_so_far;
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

func min(a, b int) int {
    if a < b {
        return a
    }

    return b
}

func maxProduct(nums []int) int {
    max_ending_here, min_ending_here, max_so_far := nums[0], nums[0], nums[0]
    var temp_maximum int

    for i := 1; i < len(nums); i++ {
        temp_maximum = max(nums[i], max(max_ending_here * nums[i], min_ending_here * nums[i]))
        min_ending_here = min(nums[i], min(max_ending_here * nums[i], min_ending_here * nums[i]))
        max_ending_here = temp_maximum
        max_so_far = max(max_so_far, max_ending_here)
    }

    return max_so_far
}
```

#### Javascript solution

```javascript
var maxProduct = function(nums) {
    let max_ending_here = nums[0], min_ending_here = nums[0], max_so_far = nums[0];
    let temp_maximum

    for(let i = 1; i < nums.length; i++) {
        temp_maximum = Math.max(nums[i], Math.max(max_ending_here * nums[i], min_ending_here * nums[i]));

        min_ending_here = Math.min(nums[i], Math.min(max_ending_here * nums[i], min_ending_here * nums[i]));

        max_ending_here = temp_maximum;
        max_so_far = Math.max(max_so_far, max_ending_here)
    }

    return max_so_far;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [2, 3, -2, 4]

Step 1: max_ending_here, min_ending_here, max_so_far = nums[0], nums[0], nums[0]
        max_ending_here = 2
        min_ending_here = 2
        max_so_far = 2

        initialize temp_maximum

Step 2: loop for i = 1; i < nums.size()
        i < nums.size()
        1 < 4
        true

        temp_maximum = max(nums[i], nums[i] * max_ending_here, nums[i] * min_ending_here)
                     = max(nums[1], nums[1] * 2, nums[1] * 2)
                     = max(3, 3 * 2, 3 * 2)
                     = max(3, 6, 6)
                     = 6

        min_ending_here = min(nums[i], nums[i] * max_ending_here, nums[i] * min_ending_here)
                        = min(nums[1], nums[1] * 2, nums[1] * 2)
                        = min(3, 3 * 2, 3 * 2)
                        = min(3, 6, 6)
                        = 3

        max_ending_here = temp_maximum
                        = 6

        max_so_far = max(max_so_far, max_ending_here)
                   = max(2, 6)
                   = 6

        i++
        i = 2

Step 3: loop for i < nums.size()
        i < nums.size()
        2 < 4
        true

        temp_maximum = max(nums[i], nums[i] * max_ending_here, nums[i] * min_ending_here)
                     = max(nums[2], nums[2] * 6, nums[2] * 3)
                     = max(-2, -2 * 6, -2 * 3)
                     = max(-2, -12, -6)
                     = -2

        min_ending_here = min(nums[i], nums[i] * max_ending_here, nums[i] * min_ending_here)
                        = min(nums[2], nums[2] * 6, nums[2] * 3)
                        = min(-2, -2 * 6, -2 * 3)
                        = min(-2, -12, -6)
                        = -12

        max_ending_here = temp_maximum
                        = -2

        max_so_far = max(max_so_far, max_ending_here)
                   = max(6, -2)
                   = 6

        i++
        i = 3

Step 4: loop for i < nums.size()
        i < nums.size()
        3 < 4
        true

        temp_maximum = max(nums[i], nums[i] * max_ending_here, nums[i] * min_ending_here)
                     = max(nums[3], nums[3] * -2, nums[3] * -12)
                     = max(4, 4 * -2, 4 * -12)
                     = max(4, -8, -48)
                     = 4

        min_ending_here = min(nums[i], nums[i] * max_ending_here, nums[i] * min_ending_here)
                        = min(nums[3], nums[3] * -2, nums[3] * -12)
                        = min(4, 4 * -2, 4 * -12)
                        = min(4, -8, -48)
                        = -48

        max_ending_here = temp_maximum
                        = 4

        max_so_far = max(max_so_far, max_ending_here)
                   = max(6, 4)
                   = 6

        i++
        i = 4

Step 5: loop for i < nums.size()
        i < nums.size()
        4 < 4
        false

Step 6: return max_so_far

So we return the answer as 6.
```
