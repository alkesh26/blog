---
title: LeetCode - Maximum Subarray
description: LeetCode - maximum sum subarray using C++, Golang and Javascript.
date: 2021-06-13
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - maximum sum subarray, c++, golang, javascript"
---

![Container](./../kadane-algorithm.png)

### Problem statement

Given an integer array **nums**,
find the contiguous subarray (containing at least one number) which has the largest sum and return
*its sum*.

Problem statement taken from: <a href="https://leetcode.com/problems/maximum-subarray" target="_blank">https://leetcode.com/problems/maximum-subarray</a>

**Example 1:**

```
Input: nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
Output: 6
Explanation: [4, -1, 2, 1] has the largest sum = 6.
```

**Example 2:**

```
Input: nums = [1]
Output: 1
```

**Example 3:**

```
Input: nums = [5, 4, -1, 7, 8]
Output: 23
```

**Constraints:**

```
- 1 <= nums.length <= 3 * 10^4
- -10^5 <= nums[i] <= 10^5
```

### Explanation

#### Brute force

The brute force approach is to generate all subarrays and
print that subarray which has a maximum sum.

A C++ snippet of the above logic is as below:

```cpp
for (int i = 0; i < n; i++){
    for (int j = i; j < n; j++){
        for (int k = i; k <= j; k++){
            // calculate sum of all the elements
        }
    }
}
```

The time complexity of the above approach is **O(N^3)**.
We can improve the above logic using
[Kadane algorithm](https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/).

#### Kadane algorithm

The simple idea of Kadane’s algorithm is to look for all positive contiguous segments
of the array (`max_sum` is used for this).
And keep track of maximum sum contiguous segment among all positive segments
(`max_sum_so_far` is used for this).
Each time we get a positive sum compare it with `max_sum` and
update `max_sum` if it is greater than `max_sum_so_far`.

Let's check the algorithm below:

```
- set max_sum_so_far = 0, max_sum = INT_MIN

- Loop for i = 0; i < nums.length; i++
  - add max_sum_so_far = max_sum_so_far + nums[i]

  - if max_sum < max_sum_so_far
    - set max_sum = max_sum_so_far

  - if max_sum_so_far < 0
    - set max_sum_so_far = 0

- return max_sum
```

The time complexity of the above approach is **O(N)** and,
space complexity is **O(1)**.

##### C++ solution

```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int max_sum = INT_MIN;
        int max_sum_so_far = 0;

        for(int i = 0; i < nums.size(); i++){
            max_sum_so_far += nums[i];

            if(max_sum < max_sum_so_far){
                max_sum = max_sum_so_far;
            }

            if(max_sum_so_far < 0){
                max_sum_so_far = 0;
            }
        }

        return max_sum;
    }
};
```

##### Golang solution

```go
func maxSubArray(nums []int) int {
    maxSum := math.MinInt32
    maxSumSoFar := 0

    for i := 0; i < len(nums); i++ {
        maxSumSoFar += nums[i]

        if maxSum < maxSumSoFar {
            maxSum = maxSumSoFar
        }

        if maxSumSoFar < 0 {
            maxSumSoFar = 0
        }
    }

    return maxSum
}
```

##### Javascript solution

```javascript
var maxSubArray = function(nums) {
    let maxSumSoFar = 0;
    let maxSum = -Infinity;

    if(nums.length === 0) return 0;
    if(nums.length === 1) return nums[0]

    for( let i = 0; i<nums.length; i++) {
        maxSumSoFar += nums[i];

        maxSum = Math.max(maxSum, maxSumSoFar);

        if(maxSumSoFar < 0) {
            maxSumSoFar = 0;
        }
    }

    return maxSum;
};
```

Let's dry-run our algorithm to see how the solution works.

```
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

Step 1: max_sum_so_far = 0
        max_sum = INT_MIN

Step 2: for i = 0; i < nums.length
        0 < 9
        true

        max_sum_so_far += nums[0]
        max_sum_so_far = 0 + -2
        max_sum_so_far = -2

        max_sum < max_sum_so_far
        -2^31 - 1 < -2
        true

        max_sum = max_sum_so_far
        max_sum = -2

        max_sum_so_far < 0
        -2 < 0
        true

        max_sum_so_far = 0

        i++
        i = 1

Step 3: i < nums.length
        1 < 9
        true

        max_sum_so_far += nums[1]
        max_sum_so_far = 0 + 1
        max_sum_so_far = 1

        max_sum < max_sum_so_far
        -2 < 1
        true

        max_sum = max_sum_so_far
        max_sum = 1

        max_sum_so_far < 0
        1 < 0
        false

        i++
        i = 2

Step 4: i < nums.length
        2 < 9
        true

        max_sum_so_far += nums[2]
        max_sum_so_far = 1 + -3
        max_sum_so_far = -2

        max_sum < max_sum_so_far
        1 < -2
        false

        max_sum_so_far < 0
        -2 < 0
        true

        max_sum_so_far = 0

        i++
        i = 3

Step 5: i < nums.length
        3 < 9
        true

        max_sum_so_far += nums[3]
        max_sum_so_far = 0 + 4
        max_sum_so_far = 4

        max_sum < max_sum_so_far
        1 < 4
        true

        max_sum = max_sum_so_far
        max_sum = 4

        max_sum_so_far < 0
        false

        i++
        i = 4

Step 6: i < nums.length
        4 < 9
        true

        max_sum_so_far += nums[4]
        max_sum_so_far = 4 + -1
        max_sum_so_far = 3

        max_sum < max_sum_so_far
        4 < 3
        false

        max_sum_so_far < 0
        false

        i++
        i = 5

Step 7: i < nums.length
        5 < 9
        true

        max_sum_so_far += nums[5]
        max_sum_so_far = 3 + 2
        max_sum_so_far = 5

        max_sum < 5
        4 < 5
        true

        max_sum = max_sum_so_far
        max_sum = 5

        max_sum_so_far < 0
        false

        i++
        i = 6

Step 8: i < nums.length
        6 < 9
        true

        max_sum_so_far += nums[6]
        max_sum_so_far = 5 + 1
        max_sum_so_far = 6

        max_sum < 6
        5 < 6
        true

        max_sum = max_sum_so_far
        max_sum = 6

        max_sum_so_far < 0
        false

        i++
        i = 7

Step 9: i < nums.length
        7 < 9
        true

        max_sum_so_far += nums[7]
        max_sum_so_far = 6 + -5
        max_sum_so_far = 1

        max_sum < 6
        6 < 1
        false

        max_sum_so_far < 0
        false

        i++
        i = 8

Step 10: i < nums.length
         8 < 9
         true

         max_sum_so_far += nums[8]
         max_sum_so_far = 1 + 4
         max_sum_so_far = 5

         max_sum < 6
         6 < 5
         false

         max_sum_so_far < 0
         false

         i++
         i = 9

Step 11: i < nums.length
         9 < 9
         false

Step 12: return max_sum
         Answer is 6
```
