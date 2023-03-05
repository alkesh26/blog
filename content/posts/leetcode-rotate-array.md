---
title: LeetCode - Rotate Array
description: LeetCode - rotate array to right by k steps using C++, Golang, and Javascript.
date: 2022-07-03
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - rotate array to right by k steps, c++, golang, javascript"
---

## Problem statement

Given an array, rotate the array to the right by **k** steps, where **k** is non-negative.

Problem statement taken from: <a href='https://leetcode.com/problems/rotate-array/' target='_blank'>https://leetcode.com/problems/rotate-array/</a>.

**Example 1:**

```
Input: nums = [1, 2, 3, 4, 5, 6, 7], k = 3
Output: [5, 6, 7, 1, 2, 3, 4]

Explanation:
rotate 1 steps to the right: [7, 1, 2, 3, 4, 5, 6]
rotate 2 steps to the right: [6, 7, 1, 2, 3, 4, 5]
rotate 3 steps to the right: [5, 6, 7, 1, 2, 3, 4]
```

**Example 2:**

```
Input: nums = [-1, -100, 3, 99], k = 2
Output: [3, 99, -1, -100]

Explanation:
rotate 1 steps to the right: [99, -1, -100, 3]
rotate 2 steps to the right: [3, 99, -1, -100]
```

**Constraints:**

```
- 1 <= nums.length <= 10^5
- -2^31 <= nums[i] <= 2^31 - 1
- 0 <= k <= 10^5
```

### Explanation

#### Brute force solution

The brute force approach is to create a temporary(temp) array
and
store the first k elements in the temp array.
We then shift the rest of the array by k places
and
append back the tmp array to the original array.

The flow will look as below:

```
Input nums[] = [1, 2, 3, 4, 5, 6, 7], k = 2

1) Store the first k elements in a temp array
   temp[] = [1, 2]

2) Shift rest of the nums[]
   nums[] = [3, 4, 5, 6, 7, 6, 7]

3) Store back the k elements
   nums[] = [3, 4, 5, 6, 7, 1, 2]
```

The time complexity of the above approach is **O(N)**
and
space complexity is **O(k)**.

#### Rotate one by one

If we want to avoid using extra space,
we can rotate the array elements one by one.

We store the first element of the array in temp variable
and shift nums[1] to nums[0], nums[2] to nums[1]... till the
last element nums[n - 1] is shifted to nums[n - 2].

We repeat the above procedure k times.

The time complexity of the above approach is **O(N*k)**
and
space complexity if **O(1)**.

#### Reversing an array

The problem can be solved in **O(N)** time by reversing array in parts.
We consider array in two parts
part1 = nums[0..k - 1]
and
part2 = nums[k..n - 1].

We reverse the elements present in the part1 array.
We then reverse the part2 array elements.
In the end, we reverse the entire array.

Let's check the algorithm to see how this solution works.

```
// rotate(nums, k)
- set n = nums.size()

- return if n == 1 or k == 0

- update k = k % n
  This is done when k is greater than n.
  eg n = 8, k = 12
  k = k % n
    = 12 % 8
    = 4

- call reverseArray(nums, 0, n - 1)
- call reverseArray(nums, 0, k - 1)
- call reverseArray(nums, k, n - 1)

// reverseArray(nums, start, end)
- while start < end
  - swap(nums[start], nums[end])
  - start++
  - end--
```

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    void reverseArray(vector<int>& nums, int start, int end) {
        while(start < end) {
            std::swap(nums[start], nums[end]);
            start++;
            end--;
        }
    }

    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        if(n == 1 || k == 0) {
            return;
        }

        k = k % n;
        reverseArray(nums, 0, n - 1);
        reverseArray(nums, 0, k - 1);
        reverseArray(nums, k, n - 1);
    }
};
```

#### Golang solution

```go
func reverseArray(nums []int, start, end int) {
    for start < end {
        tmp := nums[start]
        nums[start] = nums[end]
        nums[end] = tmp
        start++
        end--
    }
}

func rotate(nums []int, k int)  {
    n := len(nums)

    if n == 1 || k == 0 {
        return
    }

    k = k % n

    reverseArray(nums, 0, n - 1)
    reverseArray(nums, 0, k - 1)
    reverseArray(nums, k, n - 1)
}
```

#### Javascript solution

```javascript
var reverseArray = function(nums, start, end) {
    while(start < end) {
        let tmp = nums[start];
        nums[start] = nums[end];
        nums[end] = tmp;
        start++;
        end--;
    }
}

var rotate = function(nums, k) {
    let n = nums.length;

    if( n == 1 || k == 0 ) {
        return;
    }

    k = k % n;
    reverseArray(nums, 0, n - 1);
    reverseArray(nums, 0, k - 1);
    reverseArray(nums, k, n - 1);
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [1, 2, 3, 4, 5, 6, 7]
       k = 3

// rotate function
Step 1: n = nums.size()
          = 7

Step 2: n == 1 || k == 0
        7 == 1 || 3 == 0
        false

Step 3: k = k % n
          = 3 % 7
          = 3

Step 4: reverseArray(nums, 0, n - 1)
        reverseArray(nums, 0, 6)

// reverseArray(nums, start, end)
Step 5: while start < end
        0 < 6
        true

        swap(nums[0], nums[6])
        nums = [7, 2, 3, 4, 5, 6, 1]

        start++
        start = 1
        end--
        end = 5

Step 6: while start < end
        1 < 5
        true

        swap(nums[1], nums[5])
        nums = [7, 6, 3, 4, 5, 2, 1]

        start++
        start = 2
        end--
        end = 4

Step 7: while start < end
        2 < 4
        true

        swap(nums[2], nums[4])
        nums = [7, 6, 5, 4, 3, 2, 1]

        start++
        start = 3
        end--
        end = 3

Step 8: while start < end
        3 < 3
        false

// rotate function
Step 9: reverseArray(nums, 0, k - 1)
        reverseArray(nums, 0, 2)

// reverseArray(nums, start, end)
Step 10: while start < end
         0 < 2
         true

         swap(nums[0], nums[2])
         nums = [5, 6, 7, 4, 3, 2, 1]

         start++
         start = 1
         end--
         end = 1

Step 11: while start < end
         1 < 1
         false

// rotate function
Step 12: reverseArray(nums, k, n - 1)
         reverseArray(nums, 3, 6)

// reverseArray(nums, start, end)
Step 13: while start < end
         3 < 6
         true

         swap(nums[3], nums[6])
         nums = [5, 6, 7, 1, 3, 2, 4]

         start++
         start = 4
         end--
         end = 5

Step 14: while start < end
         4 < 5
         true

         swap(nums[4], nums[5])
         nums = [5, 6, 7, 1, 2, 3, 4]

         start++
         start = 5
         end--
         end = 4

Step 15: while start < end
         5 < 4
         false

// rotate function
no more steps to execute

We return the final array as [5, 6, 7, 1, 2, 3, 4].
```
