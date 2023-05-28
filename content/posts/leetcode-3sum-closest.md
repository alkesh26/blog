---
title: LeetCode - 3Sum closest
description: LeetCode - 3Sum closest using C++, Golang and Javascript.
date: 2021-09-26
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - 3 sum closest, c++, golang, javascript"
---

## Problem statement

Given an integer array **nums** of length **n** and an integer **target**,
find three integers in **nums** such that the sum is closest to **target**.

Return *the sum of the three integers*.

You may assume that each input would have exactly one solution.

Problem statement taken from: <a href='https://leetcode.com/problems/3sum-closest' target='_blank'>https://leetcode.com/problems/3sum-closest</a>

**Example 1:**

```
Input: nums = [-1, 2, 1, -4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

**Example 2:**

```
Input: nums = [0, 0, 0], target = 1
Output: 0
```

**Constraints:**

```
- 3 <= nums.length <= 1000
- -1000 <= nums[i] <= 1000
- -10^4 <= target <= 10^4
```

### Explanation

#### Brute force approach

A simple approach to solving the problem is to explore all the subsets of size 3
and keep a track of the difference between **target** and the sum
of this subset.
Then return the subset whose difference between sum and target is minimum.

C++ implementation of the above approach looks like this:

```cpp
for (int i = 0; i < arr.size() ; i++)
{
    for(int j =i + 1; j < arr.size(); j++)
    {
        for(int k =j + 1; k < arr.size(); k++)
        {
            //update the closestSum
            if(abs(x - closestSum) > abs(x - (arr[i] + arr[j] + arr[k])))
                closestSum = (arr[i] + arr[j] + arr[k]);
        }
    }
}

return closestSum
```

Since we are using three nested loops, the time complexity
of the above approach is **O(N^3)** and no extra space is required
the space complexity is **O(1)**.

#### Two pointer technique

By sorting the array, we can improve the efficiency of the algorithm.
Once the array is sorted, we can use the two-pointer technique.

We traverse the array and fix the first element of the triplet.
We use the two-pointer algorithm to find the closest number to
**target - nums[i]**. Update the closest sum.
Since the two-pointer takes linear time, it is better than a nested loop.

##### Algorithm

```
- if nums.size < 3
  - return 0

- sort(nums.begin(), nums.end())

- set i = 0, minDiff = INT_MAX
- initialize sum

- loop while i < nums.size() - 2
  - set left = i + 1
  - set right = nums.size() - 1

  - loop while right > left
    - set temp = nums[i] + nums[left] + nums[right]
    - set diff = abs(temp - target)

    - if diff == 0
      - return target

    - if diff < minDiff
      - minDiff = diff
      - sum = temp

    - if temp < target
      - left++
    - else
      - right++

  - loop end

  - i++
- loop end

- return sum
```

#### C++ solution

```cpp
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        if(nums.size() < 3){
            return 0;
        }

        sort(nums.begin(), nums.end());

        int i = 0;
        int sum, minDiff = INT_MAX;

        while(i < nums.size() - 2){
            int left = i + 1;
            int right = nums.size() - 1;
            while(right > left){
                int temp = nums[i] + nums[left] + nums[right];
                int diff = abs(temp - target);

                if(diff == 0){
                    return target;
                }

                if(diff < minDiff){
                    minDiff = diff;
                    sum = temp;
                }

                if(temp < target){
                    left++;
                }
                else{
                    right--;
                }
            }
            i++;
        }

    return sum;
  }
};
```

#### Golang solution

```go
const MaxUint = ^uint(0)
const MaxInt = int(MaxUint >> 1)

func absInt(x int) int{
    if x < 0 {
        return x*-1
    }

    return x
}

func threeSumClosest(nums []int, target int) int {
    numsLength := len(nums)
    if numsLength < 3 {
        return 0
    }

    sort.Ints(nums)

    i, sum := 0, 0
    minDiff := MaxInt

    for i < numsLength - 2 {
        left := i + 1
        right := numsLength - 1

        for right > left {
            temp := nums[i] + nums[left] + nums[right]
            diff := absInt(temp - target)

            if diff == 0 {
                return target
            }

            if diff < minDiff {
                minDiff = diff
                sum = temp
            }

            if temp < target {
                left++
            } else {
                right--
            }
        }

        i++
    }

    return sum
}
```

#### Javascript solution

```javascript
var threeSumClosest = function(nums, target) {
    if(nums.length < 3) {
        return 0;
    }

    nums.sort();

    let i = 0, minDiff = Number.MAX_VALUE;
    let sum;

    while( i < nums.length - 2 ){
        let left = i + 1;
        let right = nums.length - 1

        while( right > left ){
            let temp = nums[i] + nums[left] + nums[right];
            let diff = Math.abs(temp - target);

            if( diff == 0 ){
                return target;
            }

            if( diff < minDiff ){
                minDiff = diff;
                sum = temp;
            }

            if( temp < target ){
                left++;
            } else {
                right--;
            }
        }
        i++;
    }

    return sum;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [-1, 2, 1, -4], target = 1

Step 1: if nums.size() < 3
           4 < 3
           false

Step 2: sort(nums.start(), nums.end())
          - [-4, -1, 1, 2]

Step 3: int i = 0;
        int sum, minDiff = INT_MAX;

Step 4: loop while i < nums.size() - 2
        0 < 4 - 2
        0 < 2
        true

        left = i + 1
             = 0 + 1
             = 1
        right = nums.size() - 1
              = 4 - 1
              = 3

        loop while right > left
        3 > 1
        true

        temp = nums[i] + nums[left] + nums[right]
             = nums[0] + nums[1] + nums[3]
             = -4 + -1 + 2
             = -3

        diff = abs(temp - target)
             = abs(-3 - 1)
             = abs(-4)
             = 4

        if diff == 0
           4 == 0
           false

        if diff < minDiff
           4 < INT_MAX
           true

           minDiff = diff
                   = 4
           sum = temp
               = -3

        if temp < target
           -3 < 4
           true

           left++
           left = 2

        loop while right > left
        3 > 2
        true

        temp = nums[i] + nums[left] + nums[right]
             = nums[0] + nums[2] + nums[3]
             = -4 + 1 + 2
             = -1

        diff = abs(temp - target)
             = abs(-1 - 1)
             = abs(-2)
             = 2

        if diff == 0
           2 == 0
           false

        if diff < minDiff
           2 < 4
           true

           minDiff = diff
                   = 2
           sum = temp
               = -1

        if temp < target
           -1 < 4
           true

           left++
           left = 3

        loop while right > left
        3 > 3
        false

        i++
        i = 1

Step 5: loop while i < nums.size() - 2
        1 < 4 - 2
        1 < 2
        true

        left = i + 1
             = 1 + 1
             = 2
        right = nums.size() - 1
              = 4 - 1
              = 3

        loop while right > left
        3 > 2
        true

        temp = nums[i] + nums[left] + nums[right]
             = nums[1] + nums[2] + nums[3]
             = -1 + 1 + 2
             = 2

        diff = abs(temp - target)
             = abs(2 - 1)
             = abs(1)
             = 1

        if diff == 0
           1 == 0
           false

        if diff < minDiff
           1 < 2
           true

           minDiff = diff
                   = 1
           sum = temp
               = 2

        if temp < target
           2 < 4
           true

           left++
           left = 3

        loop while right > left
        3 > 3
        false

        i++
        i = 2

Step 6: loop while i < nums.size() - 2
        2 < 4 - 2
        2 < 2
        false

Step 7: return sum
        return 2

So the answer is 2.
```
