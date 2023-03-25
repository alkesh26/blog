---
title: LeetCode - First Missing Positive
description: LeetCode - return the smallest missing positive integer using C++, Golang, and JavaScript.
date: 2023-03-25
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the smallest missing positive integer, c++, golang, javascript"
---

## Problem statement

Given an unsorted integer array `nums`, return the smallest missing positive integer.

You must implement an algorithm that runs in **O(n)** time and uses constant extra space.

Problem statement taken from: <a href='https://leetcode.com/problems/first-missing-positive' target='_blank'>https://leetcode.com/problems/first-missing-positive</a>

**Example 1:**

```
Input: nums = [1, 2, 0]
Output: 3
Explanation: The numbers in the range [1, 2] are all in the array.
```

**Example 2:**

```
Input: nums = [3, 4, -1, 1]
Output: 2
Explanation: 1 is in the array but 2 is missing.
```

**Example 3:**

```
Input: nums = [7, 8, 9, 11, 12]
Output: 1
Explanation: The smallest positive integer 1 is missing.
```

**Constraints:**

```
- 1 <= nums.length <= 10^5
- -2^31 <= nums[i] <= 2^31 - 1
```

### Explanation

#### Brute force approach

The naive approach is to run two nested for loops and identify the first missing positive integer. The maximum positive number in an array of size n will be n + 1.

The outer for loop starts from 1 and ends at n + 1. We linearly search from 1 to n + 1 in the array. If any positive integer is missing in the sequence, we will return that value.

The C++ snippet of the above approach is as follows:

```cpp
int firstMissingPositive(vector<int>& nums) {
    int n = nums.size();
    bool missingNumber = false;

    for (int i = 1; i <= n + 1; i = i + 1) {
        missingNumber = true;

        for (int j = 0; j < n; j = j + 1) {
            if (nums[j] == i) {
                missingNumber = false;
                break;
            }
        }

        if(missingNumber)
            return i;
    }
}
```

The time complexity of this approach is **O(n^2)**. We are not using any additional space, so the space complexity is **O(1)**.

#### Sorting

We can optimize the time complexity using sorting. We first sort the array using QuickSort or HeapSort. Then we iterate over the array linearly to find the first missing positive integer.

The C++ snippet of this approach is as follows:

```cpp
int firstMissingPositive(vector<int>& nums) {
    sort(nums.begin(), nums.end())
    int n = nums.size(), i = 0;

    while(nums[i] <  1) {
        i++;
    }

    int missingNumber = 1;

    for(int j = i; j < n; j++) {
        if(missingNumber == nums[j]) {
            missingNumber += 1;
        } else if(missingNumber < nums[j]) {
            return missingNumber;
        }
    }

    return missingNumber;
}
```

As we are sorting the array the time complexity of this approach is **O(n * log(n))**. The space complexity is **O(1)**.

#### Hash Table

We can further improve the time complexity of our approach by using a hash table. We create a hash table for size n. We run a loop over the array and insert all the elements in the hash. We run another loop from 1 to n + 1. If any element i is not present in the hash table we return i.

The C++ snippet of this approach is as follows:

```cpp
int firstMissingPositive(vector<int>& nums) {
    int n = nums.size();
    map<int, int> m;
    int i = 0;

    while( i < n) {
        m[nums[i]] = i;
    }

    for(int i = 1; i <= n + 1; i++) {
        if(m.find(i) == m.end()) {
            return i;
        }
    }

    return n + 1;
}
```

We are scanning the array and map linearly the time complexity of this approach is **O(n)**. As we are using an additional space in terms of the hash table, the space complexity is **O(n)**.

#### Optimized solution

We can solve this problem without using any additional place. We use the array indexes to mark the presence of the numbers in the array. We mark the number X at nums[X - 1]. The number 1 gets placed at nums[0], 2 at nums[1], and so on. We don't mark numbers that are negative or greater than n + 1.

Let's check the algorithm first.

#### Algorithm

```
- set i = 0
      n = nums.size()

- loop while i < n
  - if nums[i] > 0 && nums[i] <= n + 1 && nums[nums[i] - 1] != nums[i]
    - swap nums[nums[i] - 1] and nums[i]
  - else
    - increment i: i++
  - if end
- while end

- loop for i = 0; i < n; i++
  - if nums[i] != i + 1
    - return i + 1
  - if end
- for end

- return n + 1
```

The time complexity of this approach is **O(n)**. The space complexity is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int i = 0, n = nums.size();

        while(i < n) {
            if(nums[i] > 0 & nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                swap(nums[nums[i] - 1], nums[i]);
            } else {
                i++;
            }
        }

        for(i = 0; i < n; i++) {
            if(nums[i] != i + 1) {
                return i + 1;
            }
        }

        return n + 1;
    }
};
```

#### Golang solution

```go
func firstMissingPositive(nums []int) int {
    i, n := 0, len(nums)
    tmp := 0

    for i < n {
        if nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i] {
            tmp = nums[nums[i] - 1]
            nums[nums[i] - 1] = nums[i]
            nums[i] = tmp
        } else {
            i++
        }
    }

    for i = 0; i < n; i++ {
        if nums[i] != i + 1 {
            return i + 1
        }
    }

    return n + 1
}
```

#### JavaScript solution

```javascript
var firstMissingPositive = function(nums) {
    let i = 0, n = nums.length;
    let tmp;

    while(i < n) {
        if(nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
            tmp = nums[nums[i] - 1];
            nums[nums[i] - 1] = nums[i];
            nums[i] = tmp;
        } else {
            i++;
        }
    }

    for(i = 0; i < n; i++) {
        if(nums[i] != i + 1) {
            return i + 1;
        }
    }

    return n + 1;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [3, 4, -1, 1]

Step 1: i = 0
        n = nums.size()
          = 4

Step 2: loop while i < n
          0 < 4
          true

          if nums[i] > 0 && nums[i] <= n + 1 && nums[nums[i] - 1] != nums[i]
             nums[0] > 0 && nums[0] <= 4 + 1 && nums[nums[0] - 1] != nums[0]
             3 > 0 && 3 <= 5 && nums[3 - 1] != 3
             true && true && nums[2] != 3
             true && -1 != 3
             true

             swap(nums[nums[i] - 1], nums[i])
             swap(nums[2], nums[0])

             nums = [-1, 4, 3, 1]

          while continue

        while i < n
          0 < 4
          true

          if nums[i] > 0 && nums[i] <= n + 1 && nums[nums[i] - 1] != nums[i]
             nums[0] > 0 && nums[0] <= 4 + 1 && nums[nums[0] - 1] != nums[0]
             -1 > 0
             false

          else
            i++
            i = 1

        while i < n
          1 < 4
          true

          if nums[i] > 0 && nums[i] <= n + 1 && nums[nums[i] - 1] != nums[i]
             nums[1] > 0 && nums[1] <= 4 + 1 && nums[nums[1] - 1] != nums[1]
             4 > 0 && 4 <= 5 && nums[4 - 1] != 4
             true && true && nums[3] != 4
             true && 1 != 3
             true

             swap(nums[nums[i] - 1], nums[i])
             swap(nums[3], nums[1])

             nums = [-1, 1, 3, 4]

          while continue

        while i < n
          1 < 4
          true

          if nums[i] > 0 && nums[i] <= n + 1 && nums[nums[i] - 1] != nums[i]
             nums[1] > 0 && nums[1] <= 4 + 1 && nums[nums[1] - 1] != nums[1]
             1 > 0 && 1 <= 5 && nums[1 - 1] != 1
             true && true && nums[0] != 1
             true && -1 != 1
             true

             swap(nums[nums[i] - 1], nums[i])
             swap(nums[0], nums[1])

             nums = [1, -1, 3, 4]

          while continue

        while i < n
          1 < 4
          true

          if nums[i] > 0 && nums[i] <= n + 1 && nums[nums[i] - 1] != nums[i]
             nums[1] > 0 && nums[1] <= 4 + 1 && nums[nums[1] - 1] != nums[1]
             -1 > 0
             false

          else
            i++
            i = 2

        while i < n
          2 < 4
          true

          if nums[i] > 0 && nums[i] <= n + 1 && nums[nums[i] - 1] != nums[i]
             nums[2] > 0 && nums[2] <= 4 + 1 && nums[nums[2] - 1] != nums[2]
             3 > 0 && 3 <= 5 && nums[3 - 1] != nums[2]
             true && true && nums[2] != nums[2]
             false

          else
            i++
            i = 3

        while i < n
          3 < 4
          true

          if nums[i] > 0 && nums[i] <= n + 1 && nums[nums[i] - 1] != nums[i]
             nums[3] > 0 && nums[3] <= 4 + 1 && nums[nums[3] - 1] != nums[3]
             4 > 0 && 4 <= 5 && nums[4 - 1] != nums[3]
             true && true && nums[3] != nums[3]
             false

          else
            i++
            i = 4

        while i < n
          4 < 4
          false

Step 3: loop for i = 0; i < n
          0 < 4
          true

          if nums[i] != i + 1
             nums[0] != 0 + 1
             1 != 1
             false

          i++
          i = 1

        loop for i < n
          1 < 4
          true

          if nums[i] != i + 1
             nums[1] != 1 + 1
             -1 != 2
             true

             return i + 1

We return the answer as 2.
```
