---
title: LeetCode - Maximum Product of Three Numbers
description: LeetCode - find three numbers whose product is maximum using C++, Golang and Javascript.
date: 2021-11-25
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - find three numbers whose product is maximum, c++, golang, javascript"
---

## Problem statement

Given an integer array **nums**, *find three numbers whose product is maximum and return the maximum product*.

Problem statement taken from: <a href='https://leetcode.com/problems/maximum-product-of-three-numbers' target='_blank'>https://leetcode.com/problems/maximum-product-of-three-numbers</a>

**Example 1:**

```
Input: nums = [1, 2, 3]
Output: 6
```

**Example 2:**

```
Input: nums = [1, 2, 3, 4]
Output: 24
```

**Example 3:**

```
Input: nums = [-1, -2, -3]
Output: -6
```

**Constraints:**

```
- 3 <= nums.length <= 10^4
- -1000 <= nums[i] <= 1000
```

### Explanation

There are multiple ways we can solve this problem.
Let's explore all the solutions from worst-case to best-case.

#### Brute force: 3 Nested loops

A simple solution is to check every triplet of the array using
three nested loops.

A C++ snippet of this approach will look as below:

```cpp
for (int i = 0; i < n - 2; i++)
    for (int j = i + 1; j < n - 1; j++)
        for (int k = j + 1; k < n; k++)
            max_product = max(max_product, arr[i] * arr[j] * arr[k]);
```

As seen above, the time complexity is **O(N^3)** and, space complexity is **O(1)**.

#### Using additional space

We can reduce the time complexity to **O(N)** using additional space.

1. We construct four arrays leftMax[], rightMax[], leftMin[] and rightMin[] of same size as input array.
2. We fill the above four arrays as below:
   - leftMax[i] will contain maximum element on left of arr[i] excluding arr[i]. For index 0, left will contain -1.
   - leftMin[i] will contain minimum element on left of arr[i] excluding arr[i]. For index 0, left will contain -1.
   - rightMax[i] will contain maximum element on right of arr[i] excluding arr[i]. For index n - 1, right will contain -1.
   - rightMin[i] will contain minimum element on right of arr[i] excluding arr[i]. For index n - 1, right will contain -1.
3. For all array indexes i except first and last index, compute maximum of arr[i]*x*y where x can be leftMax[i] or leftMin[i] and y can be rightMax[i] or rightMin[i].
4. Return the maximum from step 3.

A C++ snippet of this approach will look as below:

```cpp
vector<int> leftMin(n, -1);
vector<int> rightMin(n, -1);
vector<int> leftMax(n, -1);
vector<int> rightMax(n, -1);

for (int i = 1; i < n; i++){
    leftMax[i] = max_sum;
    if (arr[i] > max_sum)
        max_sum = arr[i];

    leftMin[i] = min_sum;
    if (arr[i] < min_sum)
        min_sum = arr[i];
}

for (int j = n - 2; j >= 0; j--){
    rightMax[j] = max_sum;
    if (arr[j] > max_sum)
        max_sum = arr[j];

    rightMin[j] = min_sum;
    if (arr[j] < min_sum)
        min_sum = arr[j];
}

for (int i = 1; i < n - 1; i++){
    int max1 = max(arr[i] * leftMax[i] * rightMax[i], arr[i] * leftMin[i] * rightMin[i]);
    int max2 = max(arr[i] * leftMax[i] * rightMin[i], arr[i] * leftMin[i] * rightMax[i]);

    max_product = max(max_product, max(max1, max2));
}
```

The space complexity of this approach is **O(N)**.

#### Using sort

We can reduce the space complexity by sorting the array and
consider the maximum between the product of the last three elements of
the array and the product of the first two elements and the last element.

A C++ snippet of this approach will look as below:

```cpp
sort(arr, arr + n);

return max(arr[0] * arr[1] * arr[n - 1], arr[n - 1] * arr[n - 2] * arr[n - 3]);
```

The time complexity of this approach is **O(NlogN)** and, space complexity is **O(N)**.

#### Using five variables

The problem can be solved using five variables.
Three variables will store the maximum values in an array.
And the remaining two will store the minimum values present in the array.

Let's check the algorithm:

```
- set max1, max2 and max3 to INT_MIN
  set min1, min2 to INT_MAX

- loop for i = 0; i < nums.size(); i++
  - if nums[i] < min1
    - set min2 = min1
    - set min1 = nums[i]
  - else if nums[i] < min2
    - set min2 = nums[i]

  - if nums[i] > max1
    - set max3 = max2
    - set max2 = max1
    - set max1 = nums[i]
  - else if nums[i] > max2
    - set max3 = max2
    - set max2 = nums[i]
  - else if nums[i] > max3
    - set max3 = nums[i]

- return max(min1 * min2 * max1, max1 * max2 * max3)
```

#### C++ solution

```cpp
class Solution {
public:
    int maximumProduct(vector<int>& nums) {
        int max1 = INT_MIN, max2 = INT_MIN, max3 = INT_MIN;
        int min1 = INT_MAX, min2 = INT_MAX;

        for(int i = 0; i < nums.size(); i++){
            if(nums[i] < min1){
                min2 = min1;
                min1 = nums[i];
            } else if(nums[i] < min2){
                min2 = nums[i];
            }

            if(nums[i] > max1){
                max3 = max2;
                max2 = max1;
                max1 = nums[i];
            } else if(nums[i] > max2){
                max3 = max2;
                max2 = nums[i];
            } else if(nums[i] > max3){
                max3 = nums[i];
            }
        }

        return max(min1*min2*max1, max1*max2*max3);
    }
};
```

#### Golang solution

```go
const MAXINT = math.MaxInt32
const MININT = math.MinInt32

func maximumProduct(nums []int) int {
    max1, max2, max3 := MININT, MININT, MININT
    min1, min2 := MAXINT, MAXINT

    for i := 0; i < len(nums); i++ {
        if nums[i] < min1 {
            min2 = min1
            min1 = nums[i]
        } else if nums[i] < min2 {
            min2 = nums[i]
        }

        if nums[i] > max1 {
            max3 = max2
            max2 = max1
            max1 = nums[i]
        } else if nums[i] > max2 {
            max3 = max2
            max2 = nums[i]
        } else if nums[i] > max3 {
            max3 = nums[i]
        }
    }

    return int(math.Max(float64(min1 *min2 * max1), float64(max1 * max2 * max3)))
}
```

#### Javascript solution

```javascript
var maximumProduct = function(nums) {
    let min1 = Number.POSITIVE_INFINITY, min2 = Number.POSITIVE_INFINITY;
    let max1 = Number.NEGATIVE_INFINITY, max2 = Number.NEGATIVE_INFINITY, max3 = Number.NEGATIVE_INFINITY;

    for(let i = 0; i < nums.length; i++) {
        if( nums[i] < min1 ) {
            min2 = min1;
            min1 = nums[i];
        } else if( nums[i] < min2 ) {
            min2 = nums[i];
        }

        if( nums[i] > max1 ) {
            max3 = max2;
            max2 = max1;
            max1 = nums[i];
        } else if( nums[i] > max2 ) {
            max3 = max2;
            max2 = nums[i];
        } else if( nums[i] > max3 ) {
            max3 = nums[i];
        }
    }

    return Math.max(min1 * min2 * max1, max1 * max2 * max3 );
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [-6, 5, 1, 2, 3, -4, 9]

Step 1: int max1 = INT_MIN, max2 = INT_MIN, max3 = INT_MIN;
        int min1 = INT_MAX, min2 = INT_MAX;

Step 2: loop for int i = 0; i < nums.size()
        i < nums.size()
        0 < 7
        true

        if nums[i] < min1
           nums[0] < INT_MAX
           -6 < INT_MAX
           true

           - min2 = min1
                  = INT_MAX
           - min1 = nums[i]
                  = nums[0]
                  = -6

        if nums[i] > max1
           nums[0] > INT_MIN
           -6 > INT_MIN
           true

           - max3 = max2
                  = INT_MIN
           - max2 = max1
                  = INT_MIN
           - max1 = nums[i]
                  = nums[0]
                  = -6

        i++
        i = 1

Step 3: loop for int i = 0; i < nums.size()
        i < nums.size()
        1 < 7
        true

        if nums[i] < min1
           nums[1] < INT_MAX
           1 < -6
           false
        else if nums[i] < min2
           5 < INT_MAX
           true

           - min2 = nums[i]
                  = 5


        if nums[i] > max1
           nums[1] > -6
           5 > -6
           true

           - max3 = max2
                  = INT_MIN
           - max2 = max1
                  = -6
           - max1 = nums[i]
                  = nums[1]
                  = 5

        i++
        i = 2

Step 4: loop for int i = 0; i < nums.size()
        i < nums.size()
        2 < 7
        true

        if nums[i] < min1
           nums[2] < -6
           1 < -6
           false
        else if nums[i] < min2
           1 < 5
           true

           - min2 = nums[2]
                  = 1


        if nums[i] > max1
           nums[2] > 5
           1 > 5
           false

        else if nums[i] > max2
           nums[2] > -6
           1 > -6
           true

           - max3 = max2
                  = -6
           - max2 = nums[i]
                  = nums[2]
                  = 1

        i++
        i = 3

Step 5: loop for int i = 0; i < nums.size()
        i < nums.size()
        3 < 7
        true

        if nums[i] < min1
           nums[3] < -6
           2 < -6
           false
        else if nums[i] < min2
           2 < 1
           false

        if nums[i] > max1
           nums[3] > 5
           2 > 5
           false

        else if nums[i] > max2
           nums[3] > 1
           2 > 1
           true

           - max3 = max2
                  = 1
           - max2 = nums[i]
                  = nums[3]
                  = 2

        i++
        i = 4

Step 6: loop for int i = 0; i < nums.size()
        i < nums.size()
        4 < 7
        true

        if nums[i] < min1
           nums[4] < -6
           3 < -6
           false
        else if nums[i] < min2
           3 < 1
           false

        if nums[i] > max1
           nums[4] > 5
           3 > 5
           false

        else if nums[i] > max2
           nums[4] > 2
           3 > 2
           true

           - max3 = max2
                  = 2
           - max2 = nums[i]
                  = nums[4]
                  = 3

        i++
        i = 5

Step 7: loop for int i = 0; i < nums.size()
        i < nums.size()
        5 < 7
        true

        if nums[i] < min1
           nums[5] < -6
           -4 < -6
           false
        else if nums[i] < min2
           -4 < 1
           true

           - min2 = nums[i]
                  = -4

        if nums[i] > max1
           nums[5] > 5
           -4 > 5
           false

        else if nums[i] > max2
           nums[5] > 3
           -4 > 3
           false

        else if nums[i] > max3
           nums[5] > 2
           -4 > 2
           false

        i++
        i = 6

Step 8: loop for int i = 0; i < nums.size()
        i < nums.size()
        6 < 7
        true

        if nums[i] < min1
           nums[6] < -6
           9 < -6
           false
        else if nums[i] < min2
           9 < -4
           false

        if nums[i] > max1
           nums[6] > 5
           9 > 5
           true

           - max3 = max2
                  = 3
           - max2 = max1
                  = 5
           - max1 = nums[i]
                  = nums[6]
                = 9

        i++
        i = 7

Step 9: loop for int i = 0; i < nums.size()
        i < nums.size()
        7 < 7
        false

Step 10: return max(min1 * min2 * max1, max1 * max2 * max3)
                max(-6 * -4 * 9, 9 * 5 * 3)
                max(216, 135)
                = 216

So we return the answer as 216.
```
