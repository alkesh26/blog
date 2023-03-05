---
title: LeetCode - Product of Array Except Self
description: LeetCode - product of array except self using C++, Golang and Javascript.
date: 2021-10-17
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - product of array except self, c++, golang, javascript"
---

## Problem statement

Given an integer array **nums**,
return *an array* **answer** such that answer[i]
*is equal to the product of all the elements of nums except nums[i]*.

The product of any prefix or suffix of nums is **guaranteed** to fit in a 32-bit integer.

You must write an algorithm that runs in **O(n)** time and without using the division operation.

Problem statement taken from: <a href='https://leetcode.com/problems/product-of-array-except-self' target='_blank'>https://leetcode.com/problems/product-of-array-except-self</a>

**Example 1:**

```
Input: nums = [1, 2, 3, 4]
Output: [24, 12, 8, 6]
```

**Example 2:**

```
Input: nums = [-1, 1, 0, -3, 3]
Output: [0, 0, 9, 0, 0]
```

**Constraints:**

```
- 2 <= nums.length <= 10^5
- -30 <= nums[i] <= 30
- The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
```

**Follow up**: Can you solve the problem in O(1) extra space complexity?
(The output array does not count as extra space for space complexity analysis.)

### Explanation

#### Brute force approach

As per the problem statement,
we cannot use the division operator.
The first approach we can think off is to use
two nested for loops and multiple the two numbers
when indexes does not match.

A small C++ snippet of the above solution will look as below:

```cpp
vector<int> answer(nums.size(), 0);

for(int i = 0; i < nums.size(); i++){
    product = 1;

    for(int j = 0; j < nums.size(); j++){
        if(i != j){
            product *= nums[j];
        }
    }

    answer[i] = product;
}
```

The issue with the above approach is the time complexity.
The time complexity of the above approach is **O(N^2)**.

#### Linear approach

We can optimize the above solution to **O(N)** by evaluating
the products of the element from left to right and
from right to left.

Let's check the algorithm

```
- initialize vector<int>answer, i
- set product = 1

- loop for i = 0; i < nums.size(); i++
  - append answer.push_back(product)
  - set product = product * nums[i]

- reset product = 1

- loop for i = nums.size() - 1; i >= 0; i--
  - set answer[i] = answer[i]*product
  - product *= nums[i]

- return answer
```

#### C++ solution

```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        vector<int> answer;
        int product = 1, i;

        for(i = 0; i < nums.size(); i++){
            answer.push_back(product);
            product *= nums[i];
        }

        product = 1;
        for(i = nums.size() - 1; i >= 0; i--){
            answer[i] *= product;
            product *= nums[i];
        }

        return answer;
    }
};
```

#### Golang solution

```go
func productExceptSelf(nums []int) []int {
    answer := make([]int, len(nums))
    product := 1

    for i := 0; i < len(nums); i++ {
        answer[i] = product
        product *= nums[i]
    }

    product = 1

    for i := len(nums) - 1; i >= 0; i-- {
        answer[i] *= product
        product *= nums[i]
    }

    return answer
}
```

#### Javascript solution

```javascript
var productExceptSelf = function(nums) {
    var answer = [];
    let product = 1;

    for(let i = 0; i < nums.length; i++){
        answer[i] = product;
        product *= nums[i];
    }

    product = 1;

    for(let i = nums.length - 1; i >= 0; i--){
        answer[i] *= product;
        product *= nums[i];
    }

    return answer;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [1, 2, 3, 4]

Step 1: vector<int> answer
        int product = 1, i

Step 2: loop for i = 0; i < nums.size()
        0 < 4
        true

        answer.push_back(product)
        answer.push_back(1)
        answer = [1]

        product *= nums[i]
        product = product * nums[0]
                = 1 * 1
                = 1

        i++
        i = 1

Step 3: loop for i < nums.size()
        1 < 4
        true

        answer.push_back(product)
        answer.push_back(1)
        answer = [1, 1]

        product *= nums[i]
        product = product * nums[1]
                = 1 * 2
                = 2

        i++
        i = 2

Step 4: loop for i < nums.size()
        2 < 4
        true

        answer.push_back(product)
        answer.push_back(2)
        answer = [1, 1, 2]

        product *= nums[i]
        product = product * nums[2]
                = 2 * 3
                = 6

        i++
        i = 3

Step 5: loop for i < nums.size()
        3 < 4
        true

        answer.push_back(product)
        answer.push_back(6)
        answer = [1, 1, 2, 6]

        product *= nums[i]
        product = product * nums[3]
                = 6 * 4
                = 24

        i++
        i = 4

Step 6: loop for i < nums.size()
        4 < 4
        false

Step 7: product = 1

Step 8: loop for i = nums.size() - 1; i >= 0
        i = 4 - 1 = 3
        i >= 0
        3 >= 0
        true

        answer[i] *= product
                  = answer[3] * product
                  = 6 * 1
                  = 6

        product *= nums[i]
                 = product * nums[3]
                 = 1 * 4
                 = 4

        i--
        i = 2

Step 9: loop for i >= 0
        2 >= 0
        true

        answer[i] *= product
                  = answer[2] * product
                  = 2 * 4
                  = 8

        product *= nums[i]
                 = product * nums[2]
                 = 4 * 3
                 = 12

        i--
        i = 1

Step 10: loop for i >= 0
        1 >= 0
        true

        answer[i] *= product
                  = answer[1] * product
                  = 1 * 12
                  = 12

        product *= nums[i]
                 = product * nums[1]
                 = 12 * 2
                 = 24

        i--
        i = 0

Step 11: loop for i >= 0
        0 >= 0
        true

        answer[i] *= product
                  = answer[0] * product
                  = 1 * 24
                  = 24

        product *= nums[i]
                 = product * nums[0]
                 = 24 * 1
                 = 24

        i--
        i = -1

Step 12: loop for i >= 0
         -1 >= 0
         false

Step 13: return answer

So the answer is [24, 12, 8, 6]
```
