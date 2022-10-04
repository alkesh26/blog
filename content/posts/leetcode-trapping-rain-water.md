---
title: LeetCode - Trapping rain water
description: LeetCode - compute units of water trapped in an elevation map using C++, Golang and Javascript.
date: 2021-12-19
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - compute units of water trapped in an elevation map, c++, golang, javascript"
---

### Problem statement

Given *n* non-negative integers representing an elevation map where the width of each bar is *1*,
compute how much water it can trap after raining.

Problem statement taken from: <a href='https://leetcode.com/problems/trapping-rain-water' target='_blank'>https://leetcode.com/problems/trapping-rain-water</a>

**Example 1:**

![Container](./../rain-water-trap.png)

```
Input: height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]. In this case, 6 units of rain water (blue section) are being trapped.
```

**Example 2:**

```
Input: height = [4, 2, 0, 3, 2, 5]
Output: 9
```

**Constraints:**

```
- n == height.length
- 1 <= n <= 2 * 10^4
- 0 <= height[i] <= 10^5
```

### Explanation

#### Brute force approach

The simplest solution is to compute the maximum level of water each element of the array can
store. Which equals the minimum-maximum height of bars on both sides minus its height.

A C++ snippet of the above approach will look as below:

```cpp
int maxWater(int arr[], int n) {
    int res = 0;

    for (int i = 1; i < n - 1; i++) {

        int left = arr[i];
        for (int j = 0; j < i; j++)
           left = max(left, arr[j]);

        int right = arr[i];
        for (int j = i + 1; j<n; j++)
           right = max(right, arr[j]);

        res = res + (min(left, right) - arr[i]);
    }
    return res;
}
```

The time complexity of the above approach is **O(N^2)** since we are using two nested for
loops. The space complexity is **O(1)**.

#### Dynamic programming approach

In the brute force approach, we iterated the left and right parts of the array
repeatedly to compute the water storage. But we can store this maximum value.

We create two arrays called left and right. We keep updating the max left and max right
as we iterate over the array.

For calculating the final result, we use the below formula:

```
ans += min(left_max[i], right_max[i]) - height[i]
```

A C++ snippet of the above approach looks as below:

```
int ans = 0;
int size = height.size();

vector<int> left_max(size), right_max(size);
left_max[0] = height[0];

for (int i = 1; i < size; i++) {
    left_max[i] = max(height[i], left_max[i - 1]);
}

right_max[size - 1] = height[size - 1];

for (int i = size - 2; i >= 0; i--) {
    right_max[i] = max(height[i], right_max[i + 1]);
}

for (int i = 1; i < size - 1; i++) {
    ans += min(left_max[i], right_max[i]) - height[i];
}
return ans;
```

The time complexity of this approach is **O(N)**. We used two arrays, left and right so,
the space complexity for this approach is **O(N)**.

#### Space optimized dynamic programming approach.

We can optimize the above solution by using two simple variables
instead of two arrays. Water trapped at any element can be computed
using the below formula:

```
ans += min(max_left, max_right) – arr[i]
```

We can move the left pointer and right pointer accordingly.

Let's check the algorithm:

```
- set low = 0, high = height.size() - 1, res = 0
  set low_max = 0, high_max = 0

- loop while low <= high
  - if height[low] < height[high]
    - if height[low] > low_max
      - set low_max = height[low]
    - else
      - update res += low_max - height[low]
    - update low++
  - else
    - if height[high] > high_max
      - set high_max = height[high]
    - else
      - update res += high_max - height[high]
    - update high--

- return res
```

#### C++ solution

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int low = 0, high = height.size() - 1, res = 0;
        int low_max = 0, high_max = 0;

        while(low <= high){
            if(height[low] < height[high]){
                if (height[low] > low_max){
                    low_max = height[low];
                } else {
                    res += low_max - height[low];
                }
                low++;
            } else {
                if (height[high] > high_max){
                    high_max = height[high];
                } else {
                    res += high_max - height[high];
                }
                high--;
            }
        }

        return res;
    }
};
```

#### Golang solution

```go
func trap(height []int) int {
    low, high, res := 0, len(height) - 1, 0
    low_max, high_max := 0, 0

    for low <= high {
        if height[low] < height[high] {
            if height[low] > low_max {
                low_max = height[low]
            } else {
                res += low_max - height[low]
            }
            low++
        } else {
            if height[high] > high_max {
                high_max = height[high]
            } else {
                res += high_max - height[high]
            }
            high--
        }
    }

    return res
}
```

#### Javascript solution

```javascript
var trap = function(height) {
    let low = 0, high = height.length - 1, res = 0;
    let low_max = 0, high_max = 0;

    while( low <= high ) {
        if( height[low] < height[high] ) {
           if( height[low] > low_max ) {
               low_max = height[low];
           } else {
               res += low_max - height[low];
           }

           low++;
        } else {
            if( height[high] > high_max ) {
                high_max = height[high];
            } else {
                res += high_max - height[high];
            }

            high--;
        }
    }

    return res;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: height = [4, 2, 0, 3, 2, 5]

Step 1: int low = 0, high = height.size() - 1, res = 0
        low = 0, high = 5, res = 0
        int low_max = 0, high_max = 0

Step 2: loop while low <= high
        0 <= 5
        true

        if height[low] < height[high]
           height[0] < height[5]
           4 < 5
           true

           if height[low] > low_max
              height[0] > 0
              4 > 0
              true

              set low_max = height[low]
                          = height[0]
                          = 4

        low++
        low = 1

Step 3: loop while low <= high
        1 <= 5
        true

        if height[low] < height[high]
           height[1] < height[5]
           2 < 5
           true

           if height[low] > low_max
              height[1] > 4
              2 > 4
              false

              res = res + low_max - height[low]
                  = 0 + 4 - 2
                  = 2

        low++
        low = 2

Step 4: loop while low <= high
        2 <= 5
        true

        if height[low] < height[high]
           height[2] < height[5]
           0 < 5
           true

            if height[low] > low_max
               height[2] > 4
               0 > 4
               false

               res = res + low_max - height[low]
                   = 2 + 4 - 0
                   = 6

        low++
        low = 3

Step 5: loop while low <= high
        3 <= 5
        true

        if height[low] < height[high]
           height[3] < height[5]
           3 < 5
           true

           if height[low] > low_max
              height[3] > 4
              3 > 4
              false

              res = res + low_max - height[low]
                   = 6 + 4 - 3
                   = 7

        low++
        low = 4

Step 6: loop while low <= high
        4 <= 5
        true

        if height[low] < height[high]
           height[4] < height[5]
           2 < 5
           true

           if height[low] > low_max
              height[4] > 4
              2 > 4
              false

              res = res + low_max - height[low]
                   = 7 + 4 - 2
                   = 9

        low++
        low = 5

Step 7: loop while low <= high
        5 <= 5
        true

        if height[low] < height[high]
           height[5] < height[5]
           5 < 5
           false

           if height[high] > high_max
              height[5] > 0
              5 > 0
              true

              high_max = height[high]
                       = height[5]
                       = 5

        high--
        high = 4

Step 8: loop while low <= high
        5 <= 4
        false

Step 9: return res

So the answer we return is 9.
```
