---
title: LeetCode - Two Sum II - Input Array Is Sorted
description: LeetCode - return the indices of the two numbers that sum to the target using C++, Golang, and Javascript.
date: 2022-08-27
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the indices of the two numbers that sum to target, c++, golang, javascript."
---

### Problem statement

Given a **1-indexed** array of integers *numbers* that is already ***sorted in non-decreasing order***,
find two numbers such that they add up to a specific *target* number.
Let these two numbers be *numbers[index1]* and *numbers[index2]* where
*1 <= index1 < index2 <= numbers.length*.

Return the *indices of the two numbers*,
index1 and index2, ***added by one*** as an integer array *[index1, index2]* of length 2.

The tests are generated such that there is **exactly one solution**.
You **may not** use the same element twice.

Your solution must use only constant extra space.

Problem statement taken from: <a href="https://leetcode.com/problems/two-sum-ii-input-array-is-sorted" target="_blank">https://leetcode.com/problems/two-sum-ii-input-array-is-sorted</a>

**Example 1:**

```
Input: numbers = [2, 7, 11, 15], target = 9
Output: [1, 2]
Explanation: The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].
```

**Example 2:**

```
Input: numbers = [2, 3, 4], target = 6
Output: [1, 3]
Explanation: The sum of 2 and 4 is 6. Therefore, index1 = 1, index2 = 3. We return [1, 3].
```

**Example 3:**

```
Input: numbers = [-1, 0], target = -1
Output: [1, 2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].
```

**Constraints:**

```
- 2 <= numbers.length <= 3 * 10^4
- -1000 <= numbers[i] <= 1000
- numbers are sorted in non-decreasing order.
- -1000 <= target <= 1000
- The tests are generated such that there is exactly one solution.
```

### Explanation

#### Binary Search

The problem is similar to our previous
[Two Sum](https://alkeshghorpade.me/post/leetcode-two-sum)
problem.
Instead of returning the numbers, we need to return their indices that
sums up to target.

The input array is sorted, which makes it easy and direct for us to use
the binary search concept.
Let's check the algorithm directly.

```
- initialize i = 0, j = numbers.size() - 1
  sum = 0

- loop while i < j
  - sum = numbers[i] + numbers[j]

  - if sum > target
    - decrement: j--
  - else if sum < target
    - increment: i++
  - else
    // when the sum is equal to the target
    - return [i + 1, j + 1]
- while end

- return []
```

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int i = 0, j = numbers.size() - 1;
        int sum;

        while(i < j) {
            sum = numbers[i] + numbers[j];

            if(sum > target) {
                j--;
            } else if(sum < target) {
                i++;
            } else {
                return { i + 1, j + 1 };
            }
        }

        return {};
    }
};
```

#### Golang solution

```go
func twoSum(numbers []int, target int) []int {
    i, j := 0, len(numbers) - 1
    sum := 0

    for i < j {
        sum = numbers[i] + numbers[j]

        if sum > target {
            j--
        } else if sum < target {
            i++
        } else {
            return []int{ i + 1, j + 1 }
        }
    }

    return []int{}
}
```

#### Javascript solution

```javascript
var twoSum = function(numbers, target) {
    let i = 0, j = numbers.length - 1;
    let sum = 0;

    while(i < j) {
        sum = numbers[i] + numbers[j];

        if(sum > target) {
            j--;
        } else if(sum < target) {
            i++;
        } else {
            return [i + 1, j + 1];
        }
    }

    return [];
};
```

Let's dry-run our algorithm for **Example 1**.

```
Input: numbers = [2, 7, 11, 15]
       target = 9

Step 1: set i = 0
            j = numbers.size() - 1
              = 4 - 1
              = 3
            sum = 0

Step 2: loop while i < j
        0 < 3
        true

        sum = numbers[i] + numbers[j]
            = numbers[0] + numbers[3]
            = 2 + 15
            = 17

        if sum > target
           17 > 9
           true

           j--
           j = j - 1
             = 3 - 1
             = 2

Step 3: loop while i < j
        0 < 2
        true

        sum = numbers[i] + numbers[j]
            = numbers[0] + numbers[3]
            = 2 + 11
            = 13

        if sum > target
           13 > 9
           true

           j--
           j = j - 1
             = 2 - 1
             = 1

Step 4: loop while i < j
        0 < 1
        true

        sum = numbers[i] + numbers[j]
            = numbers[0] + numbers[3]
            = 2 + 7
            = 9

        if sum > target
           9 > 9
           false
        else if sum < target
           9 < 9
           false
        else
           return [i + 1, j + 1]
           return [0 + 1, 1 + 1]
           return [1, 2]

We return the answer as [1, 2].
```
