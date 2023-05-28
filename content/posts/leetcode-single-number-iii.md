---
title: LeetCode - Single Number III
description: LeetCode - Return the two elements that appear only once in an array using C++, Golang, and Javascript.
date: 2022-12-25
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return the two elements that appear only once in an array, c++, golang, javascript"
---

## Problem statement

Given an integer array *nums*, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in any order.

You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.

Problem statement taken from: <a href='https://leetcode.com/problems/single-number-iii' target='_blank'>https://leetcode.com/problems/single-number-iii</a>

**Example 1:**

```
Input: nums = [1, 2, 1, 3, 2, 5]
Output: [3, 5]
Explanation:  [5, 3] is also a valid answer.
```

**Example 2:**

```
Input: nums = [-1, 0]
Output: [-1, 0]
```

**Example 3:**

```
Input: nums = [0, 1]
Output: [0, 1]
```

**Constraints:**

```
- 2 <= nums.length <= 3 * 10^4
- 2^31 <= nums[i] <= 2^31 - 1
- Each integer in nums will appear twice, only two integers will appear once.
```

### Explanation

#### Sorting

We sort the array elements and compare the adjacent elements.
We can easily get the non-repeating element using the above approach.

A C++ snippet of the above approach is as below:

```cpp
sort(nums, nums + n);
vector<int> result;

for (int i = 0; i < n - 1; i = i + 2) {
    if (nums[i] != nums[i + 1]) {
        result.push_back(nums[i]);
        i = i - 1;
    }
}

if (result.size() == 1)
    result.push_back(nums[n - 1]);

return result;
```

The time complexity of the program is **O(nlog(n))**, and the space complexity
is **O(1)**.

#### HashMap

The problem can be solved in **O(n)** using a HashMap.
We run a loop over the array and count the number of occurrences
of each element in the array.

We iterate over the hash and print the two numbers that appeared only
once.

A C++ snippet of the above approach is as below:

```cpp
int n = nums.size();
vector<int> result;

if(n == 0) {
    return result;
}

map<int, int> m;

for(int i = 0; i < n; i++) {
    m[nums[i]]++;
}

vector<int> result;

for(auto i = m.begin(); i != m.end(); i++) {
    if(i->second == 1) {
        result.push_back(i->first);
    }
}

return result;
```

The time complexity of the program is **O(n)**, and the space complexity
is **O(n)**.

#### XOR operator

The program can be solve in **O(n)** time complexity and **O(1)**
space complexity using XOR operation.

Let a and b be the elements that appears exactly once in nums array.
We first compute the XOR of all the array elements.

```
xor = nums[0]^nums[1]^nums[2]....nums[n - 1]
```

All the bits that are set in the above *xor* variable will be
set in one non-repeating element either a or b.

We take the any set bit of *xor* and divide the elements of the array
in two sets. One set of elements with same bit set and another with the
same bit not set.

We do XOR of all the elements in the first set which will return the first
non-repeating element, and doing the same in another set will return the
second non-repeating element.

Let's check the algorithm first.

```
- set xorResult = nums[0]
  a = 0, b = 0, i = 0
  vector<int> result

- loop for i = 1; i < nums.size(); i++
  - xorResult ^= nums[i]

- set setBitNo = xorResult == INT_MIN ? 0 : xorResult & ~(xorResult - 1)

- loop for i = 0; i < nums.size(); i+=
  - if nums[i] & setBitNo
    - a ^= nums[i]
  - else
    - b ^= nums[i]

- result.push_back(a)
- result.push_back(b)

- return result
```

The time complexity of the above approach is **O(n)**, and the space complexity is **O(1)**.

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        int xorResult = nums[0];
        int a = 0, b = 0, i;
        vector<int> result;

        for(i = 1; i < nums.size(); i++) {
            xorResult ^= nums[i];
        }

        int setBitNo = xorResult == INT_MIN ? 0 : xorResult & ~(xorResult - 1);

        for(i = 0; i < nums.size(); i++) {
            if(nums[i] & setBitNo) {
                a ^= nums[i];
            } else {
                b ^= nums[i];
            }
        }

        result.push_back(a);
        result.push_back(b);
        return result;
    }
};
```

#### Golang solution

```go
func singleNumber(nums []int) []int {
    xorResult := 0

    for _, num := range nums {
        xorResult = xorResult ^ num
    }

    setBitNo := xorResult & (-xorResult)

    result := make([]int, 2)

    for _, num := range nums {
        if num & setBitNo == 0 {
            result[0] ^= num
        } else {
            result[1] ^= num
        }
    }

    return result
}
```

#### Javascript solution

```javascript
var singleNumber = function(nums) {
    let xorResult = 0;
    let a = 0, b = 0, i = 0;

    for(i = 0; i < nums.length; i++){
        xorResult ^= nums[i];
    }

    let setBitNo = xorResult & ~(xorResult - 1);

    for(i = 0; i < nums.length; i++) {
        if((nums[i] & setBitNo) === 0)
            a ^= nums[i];
        else
            b ^= nums[i];
    }

    return [a, b];
};
```

#### Dry Run

Let's dry-run our algorithm for **Example 1**.

```
Input: nums = [1, 2, 1, 3, 2, 5]

Step 1: xorResult = nums[0]
                  = 1

Step 2: int a = 0, b = 0, i
        vector<int> result

Step 3: loop for i = 1; i < nums.size(); i++
            xorResult ^= nums[i]

        The xorResult is 6 (0110)

Step 4: setBitNo = xorResult == INT_MIN ? 0 : xorResult & ~(xorResult - 1)
                 = 6 == INT_MIN ? 0 : xorResult & ~(xorResult - 1)
                 = false ? 0 : xorResult & ~(xorResult - 1)
                 = xorResult & ~(xorResult - 1)
                 = 6 & ~(6 - 1)
                 = 6 & ~5
                 = 6 & -6
                 = 2

Step 5: loop for i = 0; i < nums.size()
            0 < 6
            true

            if nums[i] & setBitNo
               nums[0] & 2
               1 & 2
               0001 & 0010
               0
               false
            else
               b ^= nums[i]
                  = b ^ nums[i]
                  = 0 ^ nums[0]
                  = 0 ^ 1
                  = 1
        i++
        i = 1

Step 6: loop i < nums.size()
            1 < 6
            true

            if nums[i] & setBitNo
               nums[1] & 2
               2 & 2
               0010 & 0010
               2
               true
               a ^= nums[i]
                  = a ^ nums[1]
                  = 0 ^ 2
                  = 2

        i++
        i = 2

Step 7: loop i < nums.size()
            2 < 6
            true

            if nums[i] & setBitNo
               nums[2] & 2
               1 & 2
               0001 & 0010
               0
               false
            else
               b ^= nums[i]
                  = b ^ nums[i]
                  = 1 ^ nums[2]
                  = 1 ^ 1
                  = 0
        i++
        i = 3

Step 8: loop i < nums.size()
            3 < 6
            true

            if nums[i] & setBitNo
               nums[3] & 2
               3 & 2
               0011 & 0010
               2
               true
                a ^= nums[i]
                  = a ^ nums[3]
                  = 2 ^ 3
                  = 1

        i++
        i = 4

Step 9: loop i < nums.size()
            4 < 6
            true

            if nums[i] & setBitNo
               nums[4] & 2
               2 & 2
               0010 & 0010
               2
               true
               a ^= nums[i]
                  = a ^ nums[4]
                  = 1 ^ 2
                  = 3

        i++
        i = 5

Step 10: loop i < nums.size()
            5 < 6
            true

            if nums[i] & setBitNo
               nums[5] & 2
               5 & 2
               0101 & 0010
               0
               false
            else
              b ^= nums[i]
                  = b ^ nums[i]
                  = 0 ^ nums[5]
                  = 0 ^ 5
                  = 5

        i++
        i = 6

Step 11: loop i < nums.size()
            6 < 6
            false

Step 12: result.push_back(a)
         result.push_back(3)
         result = [3]

         result.push_back(b)
         result.push_back(5)
         result = [3, 5]

         return result

We return the result as [3, 5]
```
