---
title: LeetCode - Contiguous Array
description: LeetCode - return the maximum length of a contiguous subarray with an equal number of 0 and 1 using C++, Golang and Javascript.
date: 2022-02-05
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the maximum length of a contiguous subarray with an equal number of 0 and 1, c++, golang, javascript"
---

## Problem statement

Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.

Problem statement taken from: <a href='https://leetcode.com/problems/contiguous-array' target='_blank'>https://leetcode.com/problems/contiguous-array</a>.

**Example 1:**

```
Input: nums = [0, 1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
```

**Example 2:**

```
Input: nums = [0, 1, 0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
```

**Constraints:**

```
- 1 <= nums.length <= 10^5
- nums[i] is either 0 or 1
```

### Explanation

#### Brute Force approach

The naive approach is to consider every subset of the array and verify if it has
an equal number of 0's and 1's.
Then we find out the maximum size subarray with equal no of 0's and 1's.

A C++ snippet of this approach looks as below:

```cpp
int maxLength = 0;

for (int i = 0; i < nums.size(); i++) {
    int zeroes = 0, ones = 0;
    for (int j = i; j < nums.length; j++) {
        if (nums[j] == 0) {
            zeroes++;
        } else {
            ones++;
        }
        if (zeroes == ones) {
            maxLength = Math.max(maxLength, j - i + 1);
        }
    }
}

return maxLength;
```

The time complexity of the above approach is **O(N^2)** which will timeout for big arrays.

#### Using additional array

In this approach, we use an additional array of size 2n + 1.
We use an additional **sum** variable which will track the sum
of the array elements while traversing. We will increment the sum by 1 when an element at a particular index is 1 and decrement the sum by -1 if the element is 0.

So the maximum and minimum sum we can reach is n and -n,
where n is the size of the array.
So we create an array of size 2n + 1 to keep track of the various sum's
encountered so far. Whenever we come across the same sum value while traversing
the array, we compute the length of the subarray by subtracting the value at that
index from the current index.
We compare the above value with the maximum subarray we might have encountered
previously.

A C++ snippet of this optimized approach looks as below:

```cpp
int n = nums.size();
int array[2 * n + 1];
array[n] = -1;
int maxLength = 0, count = 0;

for (int i = 0; i < n; i++) {
    count = count + (nums[i] == 0 ? -1 : 1);

    if (array[count + n] >= -1) {
        maxLength = max(maxLength, i - array[count + n]);
    } else {
        array[count + n] = i;
    }
}

return maxLength;
```

The time complexity of the above approach is **O(N)**,
and space complexity is **O(N)** for an array of size 2n + 1.

#### Using hash map

We can optimize the space to n by using a hash map instead of an array.
The hash map will store the key-value pair in the form of
index-sum.

We create an entry for a sum in the hash map whenever we encounter
that sum for the first time and store its index as value.
If we encounter the sum again, we subtract the existing index (value of hash map)
from the current index.

Let's check the algorithm.

```
- set unordered_map[int, int] = {0 , -1}
  set maxLength = 0, sum = 0

- loop for i = 0; i < nums.size(); i++
  - sum = sum + (nums[i] == 1 ? 1 : -1)

  // the sum exists in the hash map update the maxLength
  // else set the current index for that sum
  - if m.count(sum)
    - maxLength = max(maxLength, i - m[sum])
  - else
    - m[sum] = i

- return maxLength
```

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int findMaxLength(vector<int>& nums) {
        unordered_map<int, int> m{{0, -1}};
        int maxLength = 0, sum = 0;

        for(int i = 0; i < nums.size(); i++) {
            sum = sum + (nums[i] == 1 ? 1 : -1);

            if(m.count(sum)) {
                maxLength = max(maxLength, i - m[sum]);
            } else {
                m[sum] = i;
            }
        }

        return maxLength;
    }
};
```

#### Golang solution

```go
func max(a, b int) int {
    if a > b {
        return a
    }

    return b
}

func findMaxLength(nums []int) int {
    m := make(map[int]int)
    maxLength, sum := 0, 0
    m[0] = -1

    for i := 0; i < len(nums); i++ {
        if nums[i] == 1 {
            sum = sum + 1
        } else {
            sum = sum - 1
        }

        if index, ok := m[sum]; ok  {
            maxLength = max(maxLength, i - index)
        } else {
            m[sum] = i
        }
    }

    return maxLength
}
```

#### Javascript solution

```javascript
var findMaxLength = function(nums) {
    let m = {0: -1};
    let maxLength = 0, sum = 0;

    for(let i = 0; i < nums.length; i++) {
        sum = sum + (nums[i] == 1 ? 1 : -1);

        if(m[sum] === undefined) {
            m[sum] = i;
        } else {
            maxLength = Math.max(maxLength, i - m[sum]);
        }
    }

    return maxLength;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: [0, 1, 1, 0, 1, 1, 1, 0]

Step 1: unordered_map<int, int> m{{0, -1}}
        maxLength = 0, sum = 0

Step 2: loop for i = 0; i < nums.size()
        0 < 8
        true

        sum = sum + (nums[i] == 1 ? 1 : -1)
            = 0 + (nums[0] == 1 ? 1 : -1)
            = 0 + (0 == 1 ? 1 : -1)
            = 0 + -1
            = -1

        if m.count(sum)
           m.count(-1) // no key with -1
           false
        else
           m[sum] = i
           m[-1] = 0

        i++
        i = 1

Step 3: i < nums.size()
        1 < 8
        true

        sum = sum + (nums[i] == 1 ? 1 : -1)
            = -1 + (num[1] == 1 ? 1 : -1)
            = -1 + (1 == 1 ? 1 : -1)
            = -1 + 1
            = 0

        if m.count(sum)
           m.count(0) // has key with 0
           true

           maxLength = max(maxLength, i - m[sum])
                     = max(0, 1 - (-1))
                     = max(0, 2)
                     = 2

        i++
        i = 2

Step 4: i < nums.size()
        2 < 8
        true

        sum = sum + (nums[i] == 1 ? 1 : -1)
            = 0 + (num[2] == 1 ? 1 : -1)
            = 0 + (1 == 1 ? 1 : -1)
            = 0 + 1
            = 1

        if m.count(sum)
           m.count(1) // no key with -1
           false
        else
           m[sum] = i
           m[1] = 2

        i++
        i = 3

Step 5: i < nums.size()
        3 < 8
        true

        sum = sum + (nums[i] == 1 ? 1 : -1)
            = 1 + (num[3] == 1 ? 1 : -1)
            = 1 + (0 == 1 ? 1 : -1)
            = 1 + -1
            = 0

        if m.count(sum)
           m.count(0) // has key with 0
           true

           maxLength = max(maxLength, i - m[sum])
                     = max(2, 3 - (-1))
                     = max(2, 4)
                     = 4

        i++
        i = 4

Step 6: i < nums.size()
        4 < 8
        true

        sum = sum + (nums[i] == 1 ? 1 : -1)
            = 0 + (num[4] == 1 ? 1 : -1)
            = 0 + (1 == 1 ? 1 : -1)
            = 0 + 1
            = 1

        if m.count(sum)
           m.count(1) // has key with 1
           true

           maxLength = max(maxLength, i - m[sum])
                     = max(4, 4 - 2)
                     = max(4, 2)
                     = 2

        i++
        i = 5

Step 7: i < nums.size()
        5 < 8
        true

        sum = sum + (nums[i] == 1 ? 1 : -1)
            = 1 + (num[5] == 1 ? 1 : -1)
            = 1 + (1 == 1 ? 1 : -1)
            = 1 + 1
            = 2

        if m.count(sum)
           m.count(2) // no key with 2
           false
        else
           m[sum] = i
           m[2] = 5

        i++
        i = 6

Step 8: i < nums.size()
        6 < 8
        true

        sum = sum + (nums[i] == 1 ? 1 : -1)
            = 2 + (num[6] == 1 ? 1 : -1)
            = 2 + (1 == 1 ? 1 : -1)
            = 2 + 1
            = 3

        if m.count(sum)
           m.count(3) // no key with 3
           false
        else
           m[sum] = i
           m[3] = 6

        i++
        i = 7

Step 9: i < nums.size()
        7 < 8
        true

        sum = sum + (nums[i] == 1 ? 1 : -1)
            = 3 + (num[7] == 1 ? 1 : -1)
            = 3 + (0 == 1 ? 1 : -1)
            = 3 + -1
            = 2

        if m.count(sum)
           m.count(2) // has key with 0
           true

           maxLength = max(maxLength, i - m[sum])
                     = max(4, 7 - 5)
                     = max(4, 2)
                     = 4

        i++
        i = 8

Step 10: i < nums.size()
         8 < 8
         false

Step 11: return maxLength

So we return the answer as 4.
```
