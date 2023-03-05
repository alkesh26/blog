---
title: LeetCode - Jump Game II
description: LeetCode - return the minimum number of jumps to reach the last index using C++, Golang, and Javascript.
date: 2022-09-17
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the minimum number of jumps to reach the last index, c++, golang, javascript"
---

## Problem statement

Given an array of non-negative integers *nums*, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Your goal is to reach the last index in the minimum number of jumps.

You can assume that you can always reach the last index.

Problem statement taken from: <a href='https://leetcode.com/problems/jump-game-ii/' target='_blank'>https://leetcode.com/problems/jump-game-ii/</a>

**Example 1:**

```
Input: nums = [2, 3, 1, 1, 4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

**Example 2:**

```
Input: nums = [2, 3, 0, 1, 4]
Output: 2
```

**Constraints:**

```
- 1 <= nums.length <= 10^4
- 0 <= nums[i] <= 1000
```

### Explanation

The problem is an extension of our old blog post
[Jump Game](https://alkeshghorpade.me/post/leetcode-jump-game).
In the Jump Game problem, we had to calculate if we can reach the last
index of the array or not. In this problem, we need to compute
the minimum number of jumps.

#### Brute Force approach

The naive approach is to solve the problem using recursion.
The base case in this recursion will occur when we reach the last
index.

We will recursively call for all the elements reachable from
the first element. This means we will explore all branches in the recursion
stack and return the minimum number of jumps to reach the last index.

A C++ snippet of this approach is as below:

```cpp
int minJumps(vector<int> &nums, int index){
    if(index >= nums.size() - 1)
        return 0;

    int jumps = INT_MAX;

    for(int index = index + 1; i <= index + nums[index]; i++)
        jumps = min(jumps, 1 + minJumps(nums, i));

    return jumps;
}
```

The time complexity of the above approach is **O(2^N)**, and space complexity is
**O(1)**.

#### Dynamic programming

Using Dynamic programming, we can reduce the time complexity to **O(N^2)**.
The naive approach has **overlapping subproblems**, and their results get stored
in an array. When calculating the minimum jump for the node, we check if the result is
present in the stored array or not.

A C++ snippet of this approach is as below:

```cpp
int jump(vector<int>& nums) {
    int n = nums.size();
    vector<int> store(n);
    store[0] = 0;

    for(int i = 1; i < n; i++) {
        store[i] = INT_MAX;

        for(int j = 0; j < i; j++) {
            if(i <= nums[j] + j && store[j] != INT_MAX){
                store[i] = min(store[i], store[j] + 1);
                break;
            }
        }
    }

    return store[n - 1];
}
```

The time complexity of the above approach is **O(N^2)**, and space complexity is
**O(n)**.

#### Optimal Greedy Approach

In this approach, we use a greedy algorithm that makes an optimal choice at each step.
At any index, we determine the next steps that will move us close to the last
index.

Let's check the algorithm first.

```
- set count, current, farthest = 0, 0, 0

- if nums[0] == 0 || nums.length == 1
  - return 0

- loop for i = 0; i < nums.length; i++
  - if nums[i] + i > farthest
    - set farthest = nums[i] + i

  - if i == current
    - increment count: count++
    - current = farthest

- for end

- return count
```

Let's check our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int count = 0, current = 0, farthest = 0;

        if(nums[0] == 0 || nums.size() == 1) {
            return 0;
        }

        for(int i = 0; i < nums.size() - 1; i++) {
            if(nums[i] + i > farthest) {
                farthest = nums[i] + i;
            }

            if(i == current) {
                count++;
                current = farthest;
            }
        }

        return count;
    }
};
```

#### Golang solution

```go
func jump(nums []int) int {
    count, current, farthest := 0, 0, 0

    if nums[0] == 0 || len(nums) == 1 {
        return 0
    }

    for i := 0; i < len(nums) - 1; i++ {
        if nums[i] + i > farthest {
           farthest = nums[i] + i
        }

        if i == current {
            count++
            current = farthest
        }
    }

    return count
}
```

#### Javascript solution

```javascript
var jump = function(nums) {
    let count = 0, current = 0, farthest = 0;

    if(nums[0] == 0 || nums.length == 1) {
        return 0;
    }

    for(let i = 0; i < nums.length - 1; i++) {
        if(nums[i] + i > farthest) {
            farthest = nums[i] + i;
        }

        if(i == current) {
            count++;
            current = farthest;
        }
    }

    return count;
};
```

Let's dry run our algorithm for a given input.

```
Input: nums = [2, 3, 1, 1, 4]

Step 1: count = 0
        current = 0
        farthest = 0

Step 2: if nums[0] == 0 || nums.length == 1
           2 == 0 || 5 == 1
           false

Step 3: loop for i = 0; i < nums.length - 1; i++
          i < nums.length - 1
          0 <  5 - 1
          0 < 4
          true

          if nums[i] + i > farthest
             nums[0] + 0 > 0
             2 + 0 > 0
             true

             farthest = nums[i] + i
                      = 2

          if i == current
             0 == 0
             true

             count++
             count = 1

             current = farthest
                     = 2

          i++
          i = 1

Step 4: loop for i < nums.length - 1
          i < nums.length - 1
          1 <  5 - 1
          1 < 4
          true

          if nums[i] + i > farthest
             nums[1] + 1 > 2
             3 + 1 > 2
             true

             farthest = nums[i] + i
                      = 4

          if i == current
             1 == 2
             false

          i++
          i = 2

Step 5: loop for i < nums.length - 1
          i < nums.length - 1
          2 <  5 - 1
          2 < 4
          true

          if nums[i] + i > farthest
             nums[2] + 2 > 4
             1 + 2 > 4
             false

          if i == current
             2 == 2
             true

             count++
             count = 2

             current = farthest
                     = 4

          i++
          i = 3

Step 6: loop for i < nums.length - 1
          i < nums.length - 1
          3 <  5 - 1
          3 < 4
          true

          if nums[i] + i > farthest
             nums[3] + 3 > 4
             1 + 1 > 4
             false

          if i == current
             3 == 4
             false

          i++
          i = 4

Step 7: loop for i < nums.length - 1
          i < nums.length - 1
          4 <  5 - 1
          4 < 4
          false

Step 8: return count

We return the answer as 2.
```
