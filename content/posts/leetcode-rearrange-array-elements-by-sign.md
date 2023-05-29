---
title: LeetCode - Rearrange Array Elements by Sign
description: LeetCode - rearrange the elements of nums such that very consecutive pair of integers have opposite signs using C++, Golang, and JavaScript.
date: 2023-02-16
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "rearrange the elements of nums such that very consecutive pair of integers have opposite signs, c++, golang, javascript"
---

## Problem statement

You are given a **0-indexed** integer array `nums` of even length consisting of an **equal** number of positive and negative integers.

You should **rearrange** the elements of `nums` such that the modified array follows the given conditions:

Every **consecutive pair** of integers have **opposite signs.**
For all integers with the same sign, the **order** in which they were present in `nums` is **preserved.**
The rearranged array begins with a positive integer.
Return the *modified array after rearranging the elements to satisfy the aforementioned conditions.*

Problem statement taken from: <a href='https://leetcode.com/problems/rearrange-array-elements-by-sign' target='_blank'>https://leetcode.com/problems/rearrange-array-elements-by-sign</a>

**Example 1:**

```
Input: nums = [3, 1, -2, -5, 2, -4]
Output: [3, -2, 1, -5, 2, -4]
Explanation:
The positive integers in nums are [3,1,2]. The negative integers are [-2, -5, -4].
The only possible way to rearrange them such that they satisfy all conditions is [3, -2, 1, -5, 2, -4].
Other ways such as [1, -2, 2, -5, 3, -4], [3, 1, 2, -2, -5, -4], [-2, 3, -5, 1, -4, 2] are incorrect because they do not satisfy one or more conditions.
```

**Example 2:**

```
Input: nums = [-1, 1]
Output: [1, -1]
Explanation:
1 is the only positive integer and -1 the only negative integer in nums.
So nums is rearranged to [1, -1].
```

**Constraints:**

```
- 2 <= nums.length <= 2 * 10^5
- nums.length is even
- 1 <= |nums[i]| <= 10^5
- nums consists of equal number of positive and negative integers.
```

### Explanation

The problem is easy to solve. We can solve it in **O(n)** time using an additional array.

Let's explore the algorithm directly.

```
- set n = nums.size()
      answer = []
      positiveIndex = 0, negativeIndex = 1

- loop for int i = 0; i < n; i++
  - if nums[i] > 0
    - answer[positiveIndex] = nums[i]
      positiveIndex = positiveIndex + 2
  - else
    - answer[negativeIndex] = nums[i]
      negativeIndex = negativeIndex + 2
  - if end
- for end

- return answer
```

The time complexity of the above approach is **O(n)**, and the space complexity is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
class Solution {
public:
    vector<int> rearrangeArray(vector<int>& nums) {
        int n = nums.size();
        vector<int> answer(n);
        int positiveIndex = 0, negativeIndex = 1;

        for(int i = 0; i < n; i++) {
            if(nums[i] > 0) {
                answer[positiveIndex] = nums[i];
                positiveIndex += 2;
            } else {
                answer[negativeIndex] = nums[i];
                negativeIndex += 2;
            }
        }

        return answer;
    }
};
```

#### Golang solution

```go
func rearrangeArray(nums []int) []int {
    n := len(nums)
    answer := make([]int, n)
    positiveIndex, negativeIndex := 0, 1

    for i := 0; i < n; i++ {
        if nums[i] > 0 {
            answer[positiveIndex] = nums[i]
            positiveIndex += 2
        } else {
            answer[negativeIndex] = nums[i]
            negativeIndex += 2
        }
    }

    return answer
}
```

#### JavaScript solution

```javascript
var rearrangeArray = function(nums) {
    let n = nums.length;
    let answer = [];
    let positiveIndex = 0, negativeIndex = 1;

    for(let i = 0; i < n; i++) {
        if(nums[i] > 0) {
            answer[positiveIndex] = nums[i];
            positiveIndex += 2;
        } else {
            answer[negativeIndex] = nums[i];
            negativeIndex += 2;
        }
    }

    return answer;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [3, 1, -2, -5, 2, -4]

Step 1: n = nums.size()
          = 6
        answer = [0, 0, 0, 0, 0, 0]
        positiveIndex = 0
        negativeIndex = 1

Step 2: loop for i = 0; i < 6; i++
          0 < 6
          true

          if nums[i] > 0
             nums[0] > 0
             3 > 0
             true

             answer[positiveIndex] = nums[i]
             answer[0] = nums[0]
                       = 3
             answer = [3, 0, 0, 0, 0, 0]

             positiveIndex = positiveIndex + 2
                           = 0 + 2
                           = 2

          i++
          i = 1

Step 3: loop for i < 6
          1 < 6
          true

          if nums[i] > 0
             nums[1] > 0
             1 > 0
             true

             answer[positiveIndex] = nums[i]
             answer[2] = nums[1]
                       = 1
             answer = [3, 0, 1, 0, 0, 0]

             positiveIndex = positiveIndex + 2
                           = 2 + 2
                           = 4

          i++
          i = 2

Step 4: loop for i < 6
          2 < 6
          true

          if nums[i] > 0
             nums[2] > 0
             -2 > 0
             false
          else
             answer[negativeIndex] = nums[i]
             answer[1] = nums[2]
                       = -2
             answer = [3, -2, 1, 0, 0, 0]

             negativeIndex = negativeIndex + 2
                           = 1 + 2
                           = 3

          i++
          i = 3

Step 5: loop for i < 6
          3 < 6
          true

          if nums[i] > 0
             nums[3] > 0
             -5 > 0
             false
          else
             answer[negativeIndex] = nums[i]
             answer[3] = nums[2]
                       = -5
             answer = [3, -2, 1, -5, 0, 0]

             negativeIndex = negativeIndex + 2
                           = 3 + 2
                           = 5

          i++
          i = 4

Step 6: loop for i < 6
          4 < 6
          true

          if nums[i] > 0
             nums[4] > 0
             2 > 0
             true

             answer[positiveIndex] = nums[i]
             answer[4] = nums[4]
                       = 1
             answer = [3, -2, 1, -5, 2, 0]

             positiveIndex = positiveIndex + 2
                           = 4 + 2
                           = 6

          i++
          i = 5

Step 7: loop for i < 6
          5 < 6
          true

          if nums[i] > 0
             nums[5] > 0
             -4 > 0
             false
          else
             answer[negativeIndex] = nums[i]
             answer[5] = nums[5]
                       = -4
             answer = [3, -2, 1, -5, 2, -4]

             negativeIndex = negativeIndex + 2
                           = 5 + 2
                           = 7

          i++
          i = 6

Step 8: loop for i < 6
          6 < 6
          false

Step 9: return answer

We return the answer as [3, -2, 1, -5, 2, -4].
```
