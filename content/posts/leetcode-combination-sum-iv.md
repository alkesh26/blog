---
title: LeetCode - Combination Sum IV
description: LeetCode - return the number of possible combinations that add up to the target using C++, Golang, and Javascript.
date: 2022-08-18
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "return the number of possible combinations that add up to target, c++, golang, javascript"
---

## Problem statement

Given an array of **distinct** integers *nums* and a target integer *target*,
return *the number of possible combinations that add up to the target*.

The test cases are generated so that the answer can fit in a **32-bit** integer.

Problem statement taken from: <a href='https://leetcode.com/problems/combination-sum-iv' target='_blank'>https://leetcode.com/problems/combination-sum-iv</a>.

**Example 1:**

```
Input: nums = [1, 2, 3], target = 4
Output: 7
Explanation:
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.
```

**Example 2:**

```
Input: nums = [9], target = 3
Output: 0
```

**Constraints:**

```
- 1 <= nums.length <= 200
- 1 <= nums[i] <= 1000
- All the elements of nums are unique
- 1 <= target <= 1000
```

**Follow up**: What if negative numbers are allowed in the given array?
How does it change the problem? What limitation we need to add to the question to allow negative numbers?

### Explanation

#### Backtracking

The problem can be solved using a similar approach we used in our previous blog
[Combination Sum](https://alkeshghorpade.me/post/leetcode-combination-sum).
The solution generates all the possible combinations that sum up to
the target. We then return the count of all such combinations.

The problem only expects us to return the total count, and we can skip generating
the combinations using dynamic programming.

#### Dynamic Programming

Let's check the tree below and try to figure out a solution:

```
                                        [1, 2, 3], 4
                ______________________________|_______________________________
                1                             2                               3
            [1], 3                       [2], 2                           [3], 1
        ________|____________________________
        1                   2                3
      [1, 1], 2           [1, 2], 1        [1, 3], 0
    ____|__________________________________
    1                  2                  3
   [1, 1, 1], 1      [1, 1, 2], 0
```

We generate all possible combinations and check if the remaining target is 0 or less than 0.
When the remaining target is equal to 0, we increment the count.
If it's less than 0, we return.

A C++ snippet for the above logic will look as below:

```cpp
int combinationSum4(vector<int>& nums, int target) {
    if (target <= 0) {
        return target == 0 ? 1 : 0;
    }

    int count = 0;

    for (int& num : nums) {
        count += combinationSum4(nums, target - num);
    }

    return count;
}
```

As there are many duplicate sub-problems, Dynamic programming can be applied
where a duplicate sub-problem solution gets stored in a result array.

Let's check the algorithm first.

```
- initialize result array of size target + 1

// If the target is zero, then there is a combination
- set result[0] = 1

// loop for each target
- loop for t = 1; t <= target; t++

  // for each target, check if there is a combination with all the input nums
  - inner loop for num in nums

    // skip the numbers if they are greater than current target t
    - if t >= num

      // add the combinations that we need for the remaining target
      - result[t] = result[t] + result[t - num]

- return result[target]
```

Let's check our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        vector<unsigned int> result(target + 1, 0);

        result[0] = 1;

        for(int t = 1; t <= target; t++) {
            for(int &num : nums) {
                if(t >= num) {
                    result[t] += result[t - num];
                }
            }
        }

        return result[target];
    }
};
```

#### Golang solution

```go
func combinationSum4(nums []int, target int) int {
    result := make([]int, target + 1)

    result[0] = 1

    for t := 1; t <= target; t++ {
        for _, num := range nums {
            if t >= num {
                result[t] += result[t - num]
            }
        }
    }

    return result[target]
}
```

#### Javascript solution

```javascript
var combinationSum4 = function(nums, target) {
    let result = Array(target + 1).fill(0);

    result[0] = 1;

    for(let t = 1; t <= target; t++) {
        for(let i = 0; i < nums.length; i++) {
            if(t >= nums[i]) {
                result[t] += result[t - nums[i]];
            }
        }
    }

    return result[target];
};
```

Let's dry run our algorithm for a given input.

```
Input: nums = [1, 2, 3]
       target = 4

Step 1: vector<unsigned int> result(target + 1, 0)
        result = [0, 0, 0, 0, 0]

Step 2: result[0] = 1
        result = [1, 0, 0, 0, 0]

Step 3: loop for i = 1; i <= target
            1 <= 4
            true

          loop for int &num : nums
            num = 1

            if t >= num
               1 >= 1
               true

               result[t] = result[t] + result[t - num]
               result[1] = result[1] + result[1 - 1]
                         = 0 + 1
                         = 1

            num = 2

            if t >= num
               1 >= 2
               false

            num = 3

            if t >= num
               1 >= 3
               false

        i++
        i = 2

Step 4: loop for t <= target
          2 <= 4
          true

          loop for int &num : nums
            num = 1

            if t >= num
               2 >= 1
               true

               result[t] = result[t] + result[t - num]
               result[2] = result[2] + result[2 - 1]
                         = 0 + 1
                         = 1

            num = 2

            if t >= num
               2 >= 2
               true

               result[t] = result[t] + result[t - num]
               result[2] = result[2] + result[2 - 2]
                         = 1 + 1
                         = 2

            num = 3

            if t >= num
               2 >= 3
               false

        i++
        i = 3

Step 5: loop for t <= target
          3 <= 4
          true

          loop for int &num : nums
            num = 1

            if t >= num
               3 >= 1
               true

               result[t] = result[t] + result[t - num]
               result[3] = result[3] + result[3 - 1]
                         = 0 + 2
                         = 2

            if t >= num
               3 >= 2
               true

               result[t] = result[t] + result[t - num]
               result[3] = result[3] + result[3 - 2]
                         = 2 + 1
                         = 3

            if t >= num
               3 >= 3
               true

               result[t] = result[t] + result[t - num]
               result[3] = result[3] + result[3 - 3]
                         = 3 + 1
                         = 4

        i++
        i = 4

Step 6: loop for t <= target
          4 <= 4
          true

          loop for int &num : nums
            num = 1

            if t >= num
               4 >= 1
               true

               result[t] = result[t] + result[t - num]
               result[4] = result[4] + result[4 - 1]
                         = 0 + 4
                         = 4

            if t >= num
               4 >= 2
               true

               result[t] = result[t] + result[t - num]
               result[4] = result[4] + result[4 - 2]
                         = 4 + 2
                         = 6

            if t >= num
               4 >= 3
               true

               result[t] = result[t] + result[t - num]
               result[4] = result[4] + result[4 - 3]
                         = 6 + 1
                         = 7

        i++
        i = 5

Step 7: loop for t <= target
          5 <= 4
          false

Step 8: return result[target]
               result[4]

We return the answer as 7.
```
