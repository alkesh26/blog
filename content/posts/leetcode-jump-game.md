---
title: LeetCode - Jump Game
description: LeetCode - jump game using C++, Golang and Javascript.
date: 2021-10-24
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - jump game, c++, golang, javascript"
---

### Problem statement

You are given an integer array **nums**.
You are initially positioned at the array's **first index**,
and each element in the array represents your maximum jump length at that position.

Return **true** if you can reach the last index, or **false** otherwise.

Problem statement taken from: <a href="https://leetcode.com/problems/jump-game" target="_blank">https://leetcode.com/problems/jump-game</a>

**Example 1:**

```
Input: nums = [2, 3, 1, 1, 4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

**Example 2:**

```
Input: nums = [3, 2, 1, 0, 4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
```

**Constraints:**

```
- 1 <= nums.length <= 10^4
- 0 <= nums[i] <= 10^5
```

### Explanation

#### Brute force approach

A naive approach is to start from the first element and recursively
call for all the elements reachable from this first element.
We can use the below approach to solve the problem.

```
minJumps(start, end) = Min ( minJumps(k, end) ) for all k reachable from start
```

A small C++ snippet of the above approach will look as below:

```cpp
int minJumps(int arr[], int n){
    if (n == 1)
        return 0;

    int res = INT_MAX;
    for (int i = n - 2; i >= 0; i--) {
        if (i + arr[i] >= n - 1) {
            int sub_res = minJumps(arr, i + 1);
            if (sub_res != INT_MAX)
                res = min(res, sub_res + 1);
        }
    }

    return res;
}
```

Since there are n maximum possible ways to move from an element,
the time complexity of the above approach is **O(N^2)**.

#### Optimized solution

The problem can be solved in linear time.
We need to identify what's the maximum jump we can take
from the current index **i**.
Only if the current jump is greater than the maximum jump
we use that index and increment the count.

Let's check the algorithm below:

```
- set max = nums[0] the first element of the array.

- if nums.size() == 1 && nums[0] == 0
  - return true

- loop for i = 0; i < nums.size(); i++
  - if max <= i && nums[i] == 0
    - return false

  - if i + nums[i] > max
    - max = i + nums[i]

  - if max >= nums.length - 1
    - return true

- return false
```

#### C++ solution

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int max = nums[0];

        if(nums.size() == 1 && nums[0] == 0)
            return true;

        for(int i = 0; i < nums.size(); i++){
            if(max <= i && nums[i] == 0)
                return false;

            if(i + nums[i] > max)
                max = i + nums[i];

            if(max >= nums.size() - 1)
                return true;
        }

        return false;
    }
};
```

#### Golang solution

```go
func canJump(nums []int) bool {
    max := nums[0]
    length := len(nums)

    if length == 1 && nums[0] == 0 {
        return true
    }

    for i := 0; i < length; i++ {
        if max <= i && nums[i] == 0 {
            return false
        }

        if i + nums[i] > max {
            max = i + nums[i]
        }

        if max >= length - 1 {
            return true
        }
    }

    return false
}
```

#### Javascript solution

```javascript
var canJump = function(nums) {
    let max = nums[0];
    const size = nums.length;

    if( size == 1 && nums[0] == 0 ){
        return true;
    }

    for(let i = 0; i < size; i++){
        if( max <= i && nums[i] == 0 ){
            return false;
        }

        if( i + nums[i] > max ){
            max = i + nums[i];
        }

        if( max >= size - 1 ){
            return size;
        }
    }

    return false;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [2, 3, 1, 1, 4]

Step 1: max = nums[0]
            = 2

Step 2: if nums.size() == 1 && nums[0] == 0
           5 == 1 && 2 == 0
           false

Step 3: loop for i = 0; i < nums.size()
        0 < 5
        true

        max <= i && nums[i] == 0
        2 <= 0 && nums[0] == 0
        2 <= 0 && 2 == 0
        false

        i + nums[i] > max
        0 + nums[0] > 2
        0 + 2 > 2
        false

        max >= nums.size() - 1
        2 >= 5 - 1
        2 >= 4
        false

        i++
        i = 1

Step 4: i < nums.size()
        1 < 5
        true

        max <= i && nums[i] == 0
        2 <= 1 && nums[1] == 0
        2 <= 1 && 3 == 0
        false

        i + nums[i] > max
        1 + nums[1] > 2
        1 + 3 > 2
        4 > 2
        true

        max = i + nums[i]
            = 1 + nums[1]
            = 1 + 3
            = 4

        max >= nums.size() - 1
        4 >= 5 - 1
        4 >= 4
        true

        return true

So the answer we return is true.
```

Let's dry-run the negative test case.

```
Input: nums = [3, 2, 1, 0, 4]

Step 1: max = nums[0]
            = 3

Step 2: if nums.size() == 1 && nums[0] == 0
           5 == 1 && 3 == 0
           false

Step 3: loop for i = 0; i < nums.size()
        0 < 5
        true

        max <= i && nums[i] == 0
        3 <= 0 && nums[0] == 0
        3 <= 0 && 3 == 0
        false

        i + nums[i] > max
        0 + nums[3] > 3
        0 + 3 > 3
        false

        max >= nums.size() - 1
        3 >= 5 - 1
        3 >= 4
        false

        i++
        i = 1

Step 4: i < nums.size()
        1 < 5
        true

        max <= i && nums[i] == 0
        3 <= 1 && nums[2] == 0
        3 <= 1 && 2 == 0
        false

        i + nums[i] > max
        1 + nums[2] > 3
        1 + 2 > 3
        3 > 3
        false

        max >= nums.size() - 1
        3 >= 5 - 1
        3 >= 4
        false

        i++
        i = 2

Step 5: i < nums.size()
        2 < 5
        true

        max <= i && nums[i] == 0
        3 <= 2 && nums[2] == 0
        3 <= 2 && 1 == 0
        false

        i + nums[i] > max
        2 + nums[2] > 3
        2 + 1 > 3
        3 > 3
        false

        max >= nums.size() - 1
        3 >= 5 - 1
        3 >= 4
        false

        i++
        i = 3

Step 6: i < nums.size()
        3 < 5
        true

        max <= i && nums[i] == 0
        3 <= 3 && nums[3] == 0
        3 <= 3 && 0 == 0
        true

        return false

So the answer we return is false.
```
