---
title: LeetCode - Single Number II
description: LeetCode - Find the number that appears only once in an array using C++, Golang, and Javascript.
date: 2022-02-20
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - find the number which appears only one time in an array, c++, golang, javascript"
---

## Problem statement

Given an integer array nums where every element appears **three times** except for one, which appears **exactly once**. Find the *single element and return it*.

You must implement a solution with a linear runtime complexity and use only constant extra space.

Problem statement taken from: <a href='https://leetcode.com/problems/single-number-ii' target='_blank'>https://leetcode.com/problems/single-number-ii</a>.

**Example 1:**

```
Input: nums = [2, 2, 3, 2]
Output: 3
```

**Example 2:**

```
Input: nums = [0, 1, 0, 1, 0, 1, 99]
Output: 99
```

**Constraints:**

```
- 1 <= nums.length <= 3 * 10^4
- -2^31 <= nums[i] <= 2^31 - 1
- Each element in nums appears exactly **three times** except for one element which appears **once**.
```

### Explanation

#### Brute force solution

The brute force approach is to run the loop twice and also maintain the count of each unique element. We then iterate over the hash and return the element that appeared only once. The time complexity will be **O(N^2)** and space complexity
will be **O(N)**.

A C++ snippet of the above logic will be:

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

We can use sorting and do it in **O(N(log(N)))**.

#### XOR operators

Identifying a number that appeared only once, where other elements appeared twice, was easy using the XOR operator (^). We can refer to the solution for this problem [here](https://alkeshghorpade.me/post/leetcode-single-number).

In this case, the array elements appear thrice except one. One XOR operator will not be sufficient to identify a single number. We will use two variables and use the XOR operator on them. Let's name the variable as **ones** and **twos**.

**ones** - This variable will hold the XOR of all the elements that appeared only once.
**twos** - This variable will hold the XOR of all the elements that appeared twice.

At any point of time -
1. A new number appears it's XORed with ones variable. It specifies the first appearance of the number.
2. A number gets repeated it is removed from ones variable and XORed with twos.
3. A number appears thrice it is removed from both ones and twos.

The final answer we want is the value present in the ones variable.

Let's check the algorithm first:

```
- set ones = 0, twos = 0
  initialize common_bit_mask

- loop for i = 0; i < nums.size(); i++
  // if the number appears for the first time ones & nums[i] is 0,
  // so twos does not get any bit from nums[i]
  - twos = twos | (ones & nums[i])

  // Here the ones is set XORed with nums[i],
  // so now ones variable get the bit representation of nums[i]
  - ones = ones ^ nums[i]

  // Now, if the number appeared thrice, both the ones and twos
  // variable has the bit representation of nums[i].
  // We create a negate of these set bits and remove them from the
  // ones and twos variable in next steps.
  - common_bit_mask = ~(ones & twos)

  // remove the third occurrence of the number from ones variable
  - ones &= common_bit_mask

  // remove the third occurrence of the number from twos variable
  - twos &= common_bit_mask

- return ones
```

The time complexity of the above approach is **O(N)**, and space complexity is **O(1)**. Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int ones = 0, twos = 0;
        int common_bit_mask;

        for(int i = 0; i < nums.size(); i++) {
            twos |= (ones & nums[i]);
            ones ^= nums[i];

            common_bit_mask = ~(ones & twos);

            ones &= common_bit_mask;

            twos &= common_bit_mask;
        }

        return ones;
    }
};
```

#### Golang solution

```go
func singleNumber(nums []int) int {
    ones, twos, common_bit_mask := 0, 0, 0

    for i := 0; i < len(nums); i++ {
        twos = twos | (ones & nums[i])
        ones ^= nums[i]

        common_bit_mask = ^(ones & twos)
        ones &= common_bit_mask
        twos &= common_bit_mask
    }

    return ones
}
```

#### Javascript solution

```javascript
var singleNumber = function(nums) {
    let ones = 0, twos = 0, common_bit_mask = 0;

    for(let i = 0; i < nums.length; i++) {
        twos |= (ones & nums[i]);
        ones ^= nums[i];

        common_bit_mask = ~(ones & twos);
        ones &= common_bit_mask;
        twos &= common_bit_mask;
    }

    return ones;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [2, 2, 3, 2]

Step 1: ones = 0, twos = 0
        common_bit_mask

Step 2: loop for i = 0; i < nums.size()
        0 < 4
        true

        twos |= (ones & nums[i])
              = twos | (ones & nums[0])
              = 0 | (0 & 2)
              = 0 | 0
              = 0

        ones ^= nums[i]
              = ones ^ nums[0]
              = 0 ^ 2
              = 2

        common_bit_mask = ~(ones & twos)
                        = ~(0 & 0)
                        = -1

        ones &= common_bit_mask
              = ones & common_bit_mask
              = 2 & -1
              = 2

        twos &= common_bit_mask
              = twos & common_bit_mask
              = 0 & -1
              = 0

        i++
        i = 1

Step 3: i < nums.size()
        1 < 4
        true

        twos |= (ones & nums[i])
              = twos | (ones & nums[1])
              = 0 | (2 & 2)
              = 0 | 2
              = 2

        ones ^= nums[i]
              = ones ^ nums[1]
              = 2 ^ 2
              = 0

        common_bit_mask = ~(ones & twos)
                        = ~(0 & 2)
                        = ~(2)
                        = -1

        ones &= common_bit_mask
              = ones & common_bit_mask
              = 0 & -1
              = 0

        twos &= common_bit_mask
              = twos & common_bit_mask
              = 2 & -1
              = 2

        i++
        i = 3

Step 4: i < nums.size()
        2 < 4
        true

        twos |= (ones & nums[i])
              = twos | (ones & nums[2])
              = 2 | (0 & nums[2])
              = 2 | (0 & 3)
              = 2 | 0
              = 2

        ones ^= nums[i]
              = ones ^ nums[2]
              = 0 ^ 3
              = 3

        common_bit_mask = ~(ones & twos)
                        = ~(3 & 2)
                        = ~(2)
                        = -3

        ones &= common_bit_mask
              = ones & common_bit_mask
              = 3 & -3
              = 1

        twos &= common_bit_mask
              = twos & common_bit_mask
              = 2 & -3
              = 0

        i++
        i = 3

Step 5: i < nums.size()
        3 < 4
        true

        twos |= (ones & nums[i])
              = 0 | (1 & nums[3])
              = 0 | (1 & 2)
              = 0 | (0)
              = 0 | 0
              = 0

        ones ^= nums[i]
              = ones ^ nums[3]
              = 1 ^ 2
              = 3

        common_bit_mask = ~(ones & twos)
                        = ~(0 & 3)
                        = ~(0)
                        = -1

        ones &= common_bit_mask
              = ones & common_bit_mask
              = 3 & -1
              = 3

        twos &= common_bit_mask
              = twos & common_bit_mask
              = 0 & -1
              = 0

        i++
        i = 4

Step 6: i < nums.size()
        4 < 4
        false

Step 7: return ones

So we return the answer as 3.
```
