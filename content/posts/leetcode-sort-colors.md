---
title: LeetCode - Sort Colors
description: LeetCode - Sort colors represented as integers using C++, Golang and Javascript.
date: 2021-07-04
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - sort colors represented as integers 0 1 and 2, c++, golang, javascript"
---

![Container](./../sort-colors.png)

### Problem statement

Given an array **nums** with **n** objects colored red,
white, or blue, sort them **in-place** so that objects of the same color are adjacent,
with the colors in the order red, white, and blue.

We will use the integers **0**, **1**, and **2** to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

Problem statement taken from: <a href="https://leetcode.com/problems/sort-colors" target="_blank">https://leetcode.com/problems/sort-colors</a>

**Example 1:**

```
Input: nums = [2, 0, 2, 1, 1, 0]
Output: [0, 0, 1, 1, 2, 2]
```

**Example 2:**

```
Input: nums = [2, 0, 1]
Output: [0, 1, 2]
```

**Example 3:**

```
Input: nums = [0]
Output: [0]
```

**Example 4:**

```
Input: nums = [1]
Output: [1]
```

**Constraints:**

```
- n == nums.length
- 1 <= n <= 300
- nums[i] is 0, 1, or 2
```

### Explanation

#### Simple counting

The simple approach will be to count the occurrences of each integer 0, 1
and 2 using three different variables.

Using the above three count variables we fill in the array.

A small C++ snippet of the approach will look like this:

```cpp
for (int i = 0; i < n; i++) {
    if (arr[i] == 0)
        count0++;
    if (arr[i] == 1)
        count1++;
    if (arr[i] == 2)
        count2++;
}

for (int i = 0; i < count0; i++)
    arr[i] = 0;

for (int i = count0; i < (count0 + count1); i++)
    arr[i] = 1;

for (int i = (count0 + count1); i < n; i++)
    arr[i] = 2;
```

The time complexity of the above program is O(N).
But in the above approach, we iterate the array twice.

#### Dutch national flag problem

We can use the approach of
[Dutch national flag problem](http://users.monash.edu/~lloyd/tildeAlgDS/Sort/Flag/).
The problem was posed with three colors,
here we have 0, 1, and 2.
The array is divided into four sections to solve this problem.

Let's check the algorithm:

```
-  Keep three indices low = 1, mid = 1 and, high = N and, there are four ranges,
   1 to low (the range containing 0),
   low to mid (the range containing 1),
   mid to high (the range containing unknown elements) and
   high to N (the range containing 2).

-  Traverse the array from start to end and mid is less than high. (Loop counter is i)

-  if element == 0
  - swap the element with the element at index low and update low = low + 1 and mid = mid + 1

-  if element == 1
  - set mid = mid + 1

-  if element == 2
  - swap the element with the element at index high and update high = high – 1.
  - set i = i – 1.

- return array
```

The time complexity of the program is **O(N)** as we iterate the array only once.
Space complexity is **O(1)** because we do not use any other additional data structures.

##### C++ solution

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;

        while(mid <= high){
            switch (nums[mid]){
                case 0:
                    swap(nums[low++], nums[mid++]);
                    break;
                case 1:
                    mid++;
                    break;
                case 2:
                    swap(nums[mid], nums[high--]);
                    break;
            }
        }
    }
};
```

##### Golang solution

```go
func sortColors(nums []int)  {
    low := 0
    mid := 0
    high := len(nums) - 1

    for mid <= high {
        switch (nums[mid]) {
            case 0:
                tmp := nums[low]
                nums[low] = nums[mid]
                nums[mid] = tmp
                low++
                mid++
                break
            case 1:
                mid++
                break
            case 2:
                tmp := nums[mid]
                nums[mid] = nums[high]
                nums[high] = tmp
                high--
                break
        }
    }
}
```

##### Javascript solution

```javascript
var sortColors = function(nums) {
    function swap(i, j) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
    }

    let low = 0;
    let high = nums.length - 1;
    let mid = 0;

    while (mid <= high) {
    const n = nums[mid];

      if (n === 0) {
        swap(mid, low);
        low++;
        mid++;
      } else if (n === 2) {
        swap(mid, high);
        high--;
      } else {
        mid++;
      }
    }
};
```

Let's dry run the problem

```
Input: nums = [2, 0, 2, 1, 1, 0]

Step 1: low = 0
        mid = 0
        high = nums.length() - 1
             = 6 - 1
             = 5

Step 2: loop while mid < = high
        0 <= 5
        true

        switch (nums[mid])
        nums[mid] = nums[0]
                  = 2

        case 2:
        swap(nums[mid], nums[high--])
        swap(nums[0], nums[5])
        swap(2, 0)

        nums = [0, 0, 2, 1, 1, 2]

        high--
        high = 4

Step 3: loop while mid < = high
        0 <= 4
        true

        switch (nums[mid])
        nums[mid] = nums[0]
                  = 0

        case 0:
        swap(nums[low++], nums[mid++])
        swap(nums[0], nums[0])
        swap(0, 0)

        nums = [0, 0, 2, 1, 1, 2]
        low++
        mid++

        low = 1
        mid = 1

Step 4: loop while mid < = high
        1 <= 4
        true

        switch (nums[mid])
        nums[mid] = nums[1]
                  = 0

        case 0:
        swap(nums[low++], nums[mid++])
        swap(nums[1], nums[1])
        swap(1, 1)

        nums = [0, 0, 2, 1, 1, 2]
        low++
        mid++

        low = 2
        mid = 2

Step 5: loop while mid < = high
        2 <= 4
        true

        switch (nums[mid])
        nums[mid] = nums[2]
                  = 2

        case 2:
        swap(nums[mid], nums[high--])
        swap(nums[2], nums[4])
        swap(2, 1)

        nums = [0, 0, 1, 1, 2, 2]

        high--
        high = 3

Step 6: loop while mid < = high
        2 <= 3
        true

        switch (nums[mid])
        nums[mid] = nums[2]
                  = 1

        case 1:
        mid++
        mid = 3

Step 7: loop while mid < = high
        3 <= 3
        true

        switch (nums[mid])
        nums[mid] = nums[3]
                  = 1

        case 1:
        mid++
        mid = 4

Step 8: loop while mid < = high
        4 <= 3
        false

The result is [0, 0, 1, 1, 2, 2]
```
