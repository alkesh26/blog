---
title: LeetCode - House Robber
description: LeetCode - return the maximum amount of money you can rob tonight using C++, Golang and Javascript.
date: 2022-01-02
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - the maximum amount of money you can rob tonight, c++, golang, javascript"
---

### Problem statement

You are a professional robber planning to rob houses along a street.
Each house has a certain amount of money stashed,
the only constraint stopping you from robbing each of them is that adjacent
houses have security systems connected and
**it will automatically contact the police if two
adjacent houses were broken into on the same night**.

Given an integer array *nums* representing the amount of money of each house,
return *the maximum amount of money you can rob tonight **without alerting the police***.

**Example 1:**

```
Input: nums = [1, 2, 3, 1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
```

**Example 2:**

```
Input: nums = [2, 7, 9, 3, 1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
```

**Constraints:**

```
- 1 <= nums.length <= 100
-  <= nums[i] <= 400
```

### Explanation

#### Dynamic programming

We can reduce the problem to find the maximum sum subsequence
where no two selected elements are adjacent.
The approach to the problem is using Dynamic programming.
So there are two cases.

1. If the element is selected the next adjacent element cannot be selected.
2. If an element is not selected then the next element can be selected.

A C++ snippet of the above approach is as below:

```cpp
int rob(vector<int>& nums ){
    int n = nums.size();

    if (n == 0)
        return 0;
    if (n == 1)
        return nums[0];
    if (n == 2)
        return max(nums[0], nums[1]);

    int dp[n];

    dp[0] = nums[0];
    dp[1] = max(nums[0], nums[1]);

    for (int i = 2; i<n; i++)
        dp[i] = max(nums[i]+dp[i-2], dp[i-1]);

    return dp[n-1];
}
```

The time and space complexity of the above approach is **O(N)**.

#### Efficient approach: using two variables

If we carefully look at the dynamic programming approach
we observe that the values of the previous two indices
matter while calculating the value for an index.
We can replace the DP array with two variables.

Let's check the algorithm first.

```
- set evenSum, oddSum = 0, 0

- loop for i = 0; i < nums.size(); i++
  - if i % 2 == 0 // even index
    - evenSum += nums[i]
    - evenSum = evenSum > oddSum ? evenSum : oddSum
  - else
    - oddSum += nums[i]
    - oddSum = evenSum > oddSum ? evenSum : oddSum

- return evenSum > oddSum ? evenSum: oddSum
```

The time complexity of the above approach is **O(N)**
and space complexity if reduced to **O(1)**.

#### C++ solution

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int evenSum = 0, oddSum = 0;

        for(int i = 0; i < nums.size(); i++){
            if(i % 2 == 0){
                evenSum += nums[i];
                evenSum = evenSum > oddSum ? evenSum : oddSum;
            } else {
                oddSum += nums[i];
                oddSum = evenSum > oddSum ? evenSum : oddSum;
            }
        }

        return evenSum > oddSum ? evenSum: oddSum;
    }
};
```

#### Golang solution

```go
func rob(nums []int) int {
    evenSum, oddSum := 0, 0

    for i := 0; i < len(nums); i++ {
        if i % 2 == 0 {
            evenSum += nums[i]

            if evenSum < oddSum {
                evenSum = oddSum
            }
        } else {
            oddSum += nums[i]

            if oddSum < evenSum {
                oddSum = evenSum
            }
        }
    }

    if evenSum > oddSum {
        return evenSum
    }

    return oddSum
}
```

#### Javascript solution

```javascript
var rob = function(nums) {
    let evenSum = 0, oddSum = 0;

    for(let i = 0; i < nums.length; i++) {
        if( i % 2 == 0 ) {
            evenSum += nums[i];
            evenSum = evenSum > oddSum ? evenSum : oddSum;
        } else {
            oddSum += nums[i];
            oddSum = evenSum > oddSum ? evenSum : oddSum;
        }
    }

    return evenSum > oddSum ? evenSum : oddSum;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [2, 7, 9, 3, 1]

Step 1: evenSum = 0
        oddSum = 0

Step 2: loop for i = 0; i < nums.size()
        0 < 5
        true

        i % 2 == 0
        0 % 2 == 0
        true

        evenSum = evenSum + nums[i]
                = 0 + nums[0]
                = 2

        evenSum = evenSum > oddSum ? evenSum : oddSum
                = 2 > 0
                = true
                = 2

        i++
        i = 1

Step 3: loop for i < nums.size()
        1 < 5
        true

        i % 2 == 0
        1 % 2 == 0
        false

        oddSum = oddSum + nums[i]
                = 0 + nums[1]
                = 7

        oddSum = evenSum > oddSum ? evenSum : oddSum
               = 2 > 7
               = false
               = 7

        i++
        i = 2

Step 4: loop for i < nums.size()
        2 < 5
        true

        i % 2 == 0
        2 % 2 == 0
        true

        evenSum = evenSum + nums[i]
                = 2 + nums[2]
                = 2 + 9
                = 11

        evenSum = evenSum > oddSum ? evenSum : oddSum
                = 11 > 7
                = true
                = 11

        i++
        i = 3

Step 5: loop for i < nums.size()
        3 < 5
        true

        i % 2 == 0
        3 % 2 == 0
        false

        oddSum = oddSum + nums[i]
                = 7 + nums[3]
                = 7 + 3
                = 10

        oddSum = evenSum > oddSum ? evenSum : oddSum
               = 11 > 10
               = true
               = 11

        i++
        i = 4

Step 6: loop for i < nums.size()
        4 < 5
        true

        i % 2 == 0
        4 % 2 == 0
        true

        evenSum = evenSum + nums[i]
                = 11 + nums[4]
                = 11 + 1
                = 12

        evenSum = evenSum > oddSum ? evenSum : oddSum
                = 12 > 11
                = true
                = 12

        i++
        i = 5

Step 7: loop for i < nums.size()
        5 < 5
        false

Step 8: return evenSum > oddSum ? evenSum : oddSum
        12 > 11
        true

So we return the answer as 12.
```
