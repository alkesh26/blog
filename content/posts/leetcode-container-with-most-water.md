---
title: LeetCode Container With Most Water
description: LeetCode container with most water in C++, Golang and Javascript.
date: 2021-05-02
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - container with most water, c++, golang, javascript"
---

### Problem statement

Given **N** non-negative integers **a1, a2, ..., an**,
where each represents a point at coordinate **(i, ai)**.
**N** vertical lines are drawn such that the two endpoints of the line
**i** is at **(i, ai)** and **(i, 0)**.
Find two lines, which, together with the x-axis forms a container,
such that the container contains the most water.

Problem statement taken from: <a href="https://leetcode.com/problems/container-with-most-water" target="_blank">https://leetcode.com/problems/container-with-most-water</a>

**Example 1:**

![Container](./../container.png)
```
Input: height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
Output: 49
```

**Example 2:**
```
Input: height = [1, 1]
Output: 1
```

**Example 3:**
```
Input: height = [4, 3, 2, 1, 4]
Output: 16
```

**Example 4:**
```
Input: height = [1, 2, 1]
Output: 2
```

**Constraints:**
```
- N == height.length
- 2 <= N <= 10^5
- 0 <= height[i] <= 10^4
```

### Explanation

#### Brute force

A brute force approach is to consider the area of every possible pair of lines
and find out the maximum among them.

A C++ snippet of the approach will look like below:

```cpp
public class Solution {
    public int maxArea(int[] height) {
        int ans = 0;

        for (int i = 0; i < height.length; i++)
            for (int j = i + 1; j < height.length; j++)
                ans = Math.max(ans, Math.min(height[i], height[j]) * (j - i));

        return ans;
    }
}
```

The time complexity of the approach is **O(N^2)** since we are running
two nested for loops and considering every subset of the array.

#### Two pointer

The time complexity can be reduced by using two-pointers.
We know that the farther the lines more area will be obtained.
But the area formed between the lines will be constrained
by the height of the shorter line.

##### Algorithm

```
- set left and right pointer to 0 and last index of array height
- set ans = 0. Variable ans holds the max area of our solution

// Iterate array from both ends and
- Loop while left < right
  - get the area between to indices
    - area = min(height[left], height[right])*(right - left)
  - get the maximum of ans and area and update ans
    - ans = max(ans, area)
  - increment left or right based on which of the index value is minimum.
    - if height[left] < height[right]
      - increment left++
    - else
      - increment right++

- return ans
```

##### C++ solution

```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0;
        int right = height.size() - 1;

        int ans = 0;

        while(left < right){
            ans = max(ans, min(height[left], height[right])*(right-left));

            if(height[left] < height[right]){
                left += 1;
            } else {
                right -= 1;
            }
        }

        return ans;
    }
};
```

##### Golang solution

```go
func maxArea(height []int) int {
    left, right := 0, len(height) - 1
    area := 0

    for left < right {
        area = max(area, min(height[left], height[right])*(right - left))

        if height[left] < height[right] {
            left++
        } else {
            right--
        }
    }

    return int(area)
}

func max(a, b int) int{
    if a > b {
        return a
    }
    return b
}

func min(a, b int) int{
    if a < b {
        return a
    }
    return b
}
```

##### JavaScript Solution

```javascript
var maxArea = function(height) {
    if (height.length < 2){
        return 0;
    }

    let left = 0;
    let right = height.length - 1;
    let ans = 0;

    while (left < right) {
        ans = Math.max(ans, Math.min(height[left], height[right]) * (right - left) );

        if (height[left] < height[right]){
            left += 1;
        } else {
            right -= 1;
        }
    }

    return ans;
};
```

Let's dry-run our algorithm to see how the solution works.

```
height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
left = 0
right = height.size() - 1
      = 9
ans = 0

Step 1: left < right
        0 < 8
        true

        ans = max(ans, min(height[left], height[right])*(right-left));
            = max(0, min(1, 7)*(8-0))
            = max(0, 1*8)
            = max(0, 8)
            = 8

        height[left] < height[right]
        1 < 7
        true
        left++ = 1

Step 2: left < right
        1 < 8
        true

        ans = max(ans, min(height[left], height[right])*(right-left));
            = max(8, min(8, 7)*(8-1))
            = max(8, 7*7)
            = max(8, 49)
            = 49

        height[left] < height[right]
        8 < 7
        false
        right-- = 7

Step 3: left < right
        1 < 7
        true

        ans = max(ans, min(height[left], height[right])*(right-left));
            = max(49, min(8, 3)*(7-1))
            = max(49, 3*6)
            = max(49, 18)
            = 49

        height[left] < height[right]
        8 < 3
        false
        right-- = 6

Step 4: left < right
        1 < 6
        true

        ans = max(ans, min(height[left], height[right])*(right-left));
            = max(49, min(8, 8)*(6-1))
            = max(49, 8*5)
            = max(49, 40)
            = 49

        height[left] < height[right]
        8 < 8
        false
        right-- = 5

Step 5: left < right
        1 < 5
        true

        ans = max(ans, min(height[left], height[right])*(right-left));
            = max(49, min(8, 4)*(5-1))
            = max(49, 4*4)
            = max(49, 16)
            = 49

        height[left] < height[right]
        8 < 4
        false
        right-- = 4

Step 6: left < right
        1 < 4
        true

        ans = max(ans, min(height[left], height[right])*(right-left));
            = max(49, min(8, 5)*(4-1))
            = max(49, 5*3)
            = max(49, 15)
            = 49

        height[left] < height[right]
        8 < 5
        false
        right-- = 3

Step 7: left < right
        1 < 3
        true

        ans = max(ans, min(height[left], height[right])*(right-left));
            = max(49, min(8, 2)*(3-1))
            = max(49, 2*2)
            = max(49, 4)
            = 49

        height[left] < height[right]
        8 < 2
        false
        right-- = 2

Step 8: left < right
        1 < 2
        true

        ans = max(ans, min(height[left], height[right])*(right-left));
            = max(49, min(8, 6)*(2-1))
            = max(49, 6*1)
            = max(49, 6)
            = 49

        height[left] < height[right]
        8 < 6
        false
        right-- = 1

Step 9: left < right
        1 < 1
        false

return ans as 49
```
