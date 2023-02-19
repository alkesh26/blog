---
title: LeetCode - Minimize Maximum Pair Sum in Array
description: LeetCode - return the minimized maximum pair sum after optimally pairing up the elements using C++, Golang, and JavaScript.
date: 2023-02-19
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the minimized maximum pair sum after optimally pairing up the elements, c++, golang, javascript"
---

### Problem statement

The **pair sum of a pair** `(a, b)` is equal to `a + b`. The **maximum pair sum is the largest pair sum** in a list of pairs.

For example, if we have pairs `(1, 5)`, `(2, 3)`, and `(4, 4)`, the **maximum pair sum** would be `max(1 + 5, 2 + 3, 4 + 4) = max(6, 5, 8) = 8`.

Given an array `nums` of **even** length `n`, pair up the elements of `nums` into `n / 2` pairs such that:

* Each element of `nums` is in exactly one pair, and

* The **maximum pair sum** is **minimized**.

Return *the minimized **maximum pair sum** after optimally pairing up the elements*.

Problem statement taken from: <a href='https://leetcode.com/problems/minimize-maximum-pair-sum-in-array' target='_blank'>https://leetcode.com/problems/minimize-maximum-pair-sum-in-array</a>

**Example 1:**

```
Input: nums = [3, 5, 2, 3]
Output: 7
Explanation: The elements can be paired up into pairs (3, 3) and (5, 2).
The maximum pair sum is max(3 + 3, 5 + 2) = max(6, 7) = 7.
```

**Example 2:**

```
Input: nums = [3, 5, 4, 2, 4, 6]
Output: 8
Explanation: The elements can be paired up into pairs (3, 5), (4, 4), and (6, 2).
The maximum pair sum is max(3 + 5, 4 + 4, 6 + 2) = max(8, 8, 8) = 8.
```

**Constraints:**

```
- n == nums.length
- 2 <= n <= 10^5
- n is even
- 1 <= nums[i] <= 10^5
```

### Explanation

#### Sorting

We sort the array first and then iterate over the loop to form pairs (i, j). i will start from index 0, and j will begin from the last index.

We increment and decrement i and j, respectively, to form the next pairs till i < j.

Let's check the algorithm first.

```
- sort(nums.begin(), nums.end())
  maxSum = 0
  i = 0
  j = nums.size() - 1

- loop while i < j
  - if nums[i] + nums[j] > maxSum
    - maxSum = nums[i] + nums[j]

  - i++
    j--
- while end

- return maxSum
```

The time complexity of the above approach is **O(n * log(n))**, and the space complexity is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
class Solution {
public:
    int minPairSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int maxSum = 0, i = 0, j = nums.size() - 1;

        while(i < j) {
            if(nums[i] + nums[j] > maxSum) {
                maxSum = nums[i] + nums[j];
            }

            i++;
            j--;
        }

        return maxSum;
    }
};
```

#### Golang solution

```go
func minPairSum(nums []int) int {
    sort.Ints(nums)
    i, j := 0, len(nums) - 1
    maxSum := 0

    for i < j {
        if nums[i] + nums[j] > maxSum {
            maxSum = nums[i] + nums[j]
        }

        i++
        j--
    }

    return maxSum
}
```

#### JavaScript solution

```javascript
var minPairSum = function(nums) {
    nums.sort((a, b) => a - b);
    let i = 0, j = nums.length - 1;
    let maxSum = 0;

    while(i < j) {
        maxSum = Math.max(nums[i] + nums[j], maxSum);

        i++;
        j--;
    }

    return maxSum;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [3, 5, 5, 2, 4, 6]

Step 1: sort(nums.begin(), nums.end())
        nums = [2, 3, 4, 5, 5, 6]

        maxSum = 0
        i = 0
        j = nums.size() - 1
          = 6 - 1
          = 5

Step 2: loop while i < j
          0 < 5
          true

          if nums[i] + nums[j] > maxSum
             nums[0] + nums[5] > 0
             2 + 6 > 0
             8 > 0
             true

             maxSum = nums[i] + nums[j]
                    = nums[0] + nums[5]
                    = 2 + 6
                    = 8

          i++
          i = 1

          j--
          j = 4

Step 3: loop while i < j
          1 < 4
          true

          if nums[i] + nums[j] > maxSum
             nums[1] + nums[4] > 8
             3 + 5 > 8
             8 > 8
             false

          i++
          i = 2

          j--
          j = 3

Step 4: loop while i < j
          2 < 3
          true

          if nums[i] + nums[j] > maxSum
             nums[2] + nums[3] > 8
             4 + 5 > 8
             9 > 8
             true

             maxSum = nums[i] + nums[j]
                    = nums[2] + nums[3]
                    = 4 + 5
                    = 9

          i++
          i = 3

          j--
          j = 2

Step 5: loop while i < j
          3 < 2
          false

Step 6: return maxSum

We return the answer as 9.
```
