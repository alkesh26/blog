---
title: LeetCode - Single Number
description: LeetCode - Find the number which appears only one time in an array using C++, Golang and Javascript.
date: 2022-02-12
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "find the number which appears only one time in an array, c++, golang, javascript"
---

## Problem statement

Given a **non-empty** array of integers *nums*, every element appears *twice* except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

Problem statement taken from: <a href='https://leetcode.com/problems/single-number' target='_blank'>https://leetcode.com/problems/single-number</a>.

**Example 1:**

```
Input: nums = [2, 2, 1]
Output: 1
```

**Example 2:**

```
Input: nums = [4, 1, 2, 1, 2]
Output: 4
```

**Example 3:**

```
Input: nums = [1]
Output: 1
```

**Constraints:**

```
- 1 <= nums.length <= 3 * 10^4
- -3 * 10^4 <= nums[i] <= 3 * 10^4
- Each element in the array appears twice except for one element which appears only once.
```

### Explanation

#### Brute force solution

The brute force solution is to check if every element appears once or not.
Once an element with a single occurrence is found, we return that element.
The time complexity of the above approach is **O(N^2)**.

The time complexity can be reduced to **O(N)** by using hashing.
We traverse all the elements in an array and put them in the hash table.
Array element will be the key in the hash table, and its value will be the count
of occurrences of that element in the array.

A C++ snippet for this approach is as below:

```cpp
int singleNumber(vector<int>& nums) {
    map<int, int> m;

    for(int i = 0; i < nums.size(); i++) {
        m[nums[i]]++;
    }

    for(auto const & [key, value]: m) {
        if(value == 1) {
            return key;
        }
    }

    return -1;
}
```

The time complexity is reduced to **O(N)**, but space complexity has increased
to **O(N)**.

#### Optimized solution

We can reduce the space complexity to **O(1)**, by using a single int variable.
We can use the arithmetic XOR operator **^**.
An XOR operator returns 0 when the operands are similar.

```
3 ^ 1
=> 2

3 ^ 2
=> 0

3 ^ 0
=> 3
```

Since every element in an array appears twice except one, the XOR for
all duplicates will return 0. And XOR for any non-zero number with zero
will return the same number.
We need to iterate over the array and perform XOR for all the elements.

Let's check the algorithm now.

```
- initialize singleNum = 0

- loop for i = 0; i < nums.size(); i++
  - singleNum ^= nums[i]

- return singleNum
```

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int singleNum = 0;

        for(int i = 0; i < nums.size(); i++) {
            singleNum ^= nums[i];
        }

        return singleNum;
    }
};
```

#### Golang solution

```go
func singleNumber(nums []int) int {
    singleNum := 0

    for i := 0; i < len(nums); i++ {
        singleNum ^= nums[i]
    }

    return singleNum
}
```

#### Javascript solution

```javascript
var singleNumber = function(nums) {
    let singleNum = 0;

    for(let i = 0; i < nums.length; i++) {
        singleNum ^= nums[i];
    }

    return singleNum;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [4, 1, 2, 1, 2]

Step 1: singleNum = 0

Step 2: loop for i = 0; i < nums.size()
          0 < 5
          true

          singleNum ^= nums[i]
                     = singleNum ^ nums[0]
                     = 0 ^ 4
                     = 4

          i++
          i = 1

Step 3: i < nums.size()
          1 < 5
          true

          singleNum ^= nums[i]
                     = singleNum ^ nums[1]
                     = 4 ^ 1
                     = 5

          i++
          i = 2

Step 4: i < nums.size()
          2 < 5
          true

          singleNum ^= nums[i]
                     = singleNum ^ nums[2]
                     = 5 ^ 2
                     = 7

          i++
          i = 3

Step 5: i < nums.size()
          3 < 5
          true

          singleNum ^= nums[i]
                     = singleNum ^ nums[3]
                     = 7 ^ 1
                     = 6

          i++
          i = 4

Step 6: i < nums.size()
          4 < 5
          true

          singleNum ^= nums[i]
                     = singleNum ^ nums[4]
                     = 6 ^ 2
                     = 4

          i++
          i = 5

Step 7: i < nums.size()
          5 < 5
          false

Step 8: return singleNum

So we return the answer as 4.
```
