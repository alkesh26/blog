---
title: LeetCode - Remove Duplicates from Sorted Array
description: LeetCode - remove all duplicates from sorted array using C++, Golang and Javascript.
date: 2021-05-30
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - remove all duplicates from sorted array, c++, golang, javascript"
---

![Container](./../remove-duplicates.png)

## Problem statement

Given a sorted array **nums**, remove the duplicates in-place such that each element
appears only once and returns the new length.

Do not allocate extra space for another array,
you must do this by modifying the input array in-place with **O(1)** extra memory.

Problem statement taken from: <a href='https://leetcode.com/problems/remove-duplicates-from-sorted-array' target='_blank'>https://leetcode.com/problems/remove-duplicates-from-sorted-array</a>

**Example 1:**

```
Input: nums = [1, 1, 2]
Output: 2, nums = [1, 2]
Explanation: Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. It doesn't matter what you leave beyond the returned length.
```

**Example 2:**

```
Input: nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]
Output: 5, nums = [0, 1, 2, 3, 4]
Explanation: Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively. It doesn't matter what values are set beyond the returned length.
```

**Constraints:**

```
- 0 <= nums.length <= 3 * 10^4
- -10^4 <= nums[i] <= 10^4
- nums is sorted in ascending order.
```

### Explanation

#### Brute force

Well, the problem says to solve it without any extra space, but the first
brute force approach we get is to count the occurrence of distinct elements
and store it in a hash (or object).

The key will be the array element and, the value will be the number of times
the element appeared in the array.

We then iterate over the hash and store the keys in a new array.

The solution requires extra space for a new array and a new hash.

#### Two pointers

To improve the above approach, we can take the advantage of a sorted array here.
We can use two pointers **i** and **j**.
We keep incrementing **j** till the time **nums[i] == nums[j]**.

Let's check the algorithm below:

```
- return if nums size <= 1

- set i = 0

- Loop for j = 1; j < nums.size(); j++
  - if nums[j] != nums[i]
    - i++
    - nums[i] = nums[j]

- return i + 1
```

The time complexity of the above approach is **O(N)** and, space complexity is **O(1)**.

#### C++ solution

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if(nums.size() <= 1){
            return nums.size();
        }

        int i = 0;

        for(int j = 1; j < nums.size(); j++){
            if(nums[j] != nums[i]){
                i++;
                nums[i] = nums[j];
            }
        }

        return i + 1;
    }
};
```

#### Golang solution

```go
func removeDuplicates(nums []int) int {
    length := len(nums)

    if length <= 1 {
        return length
    }

    i := 0

    for j := 1; j < length; j++ {
        if nums[i] != nums[j] {
            i++
            nums[i] = nums[j]
        }
    }

    return i + 1
}
```

#### Javascript solution

```javascript
var removeDuplicates = function(nums) {
    const length = nums.length;

    if( length <= 1 ){
        return length;
    }

    let i = 0;

    for(let j = 1; j < length; j++){
        if( nums[i] != nums[j] ){
            i++;
            nums[i] = nums[j];
        }
    }

    return i + 1;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
nums = [0,0,1,1,1,2,2,3,3,4]

Step 1: length = nums.size()
               = 10

Step 2: length <= 1
            10 <= 1
            false

Step 3: i = 0

Step 4: Loop for j = 1; 1 < 10
        nums[i] != nums[j]
        nums[0] != nums[1]
        0 != 0
        false

        j++
        j = 2

Step 5: Loop for j = 2; 2 < 10
        nums[i] != nums[j]
        nums[0] != nums[2]
        0 != 1
        true

        i++
        i = 1

        nums[i] = nums[j]
        nums[1] = nums[2]
        nums[1] = 1

        j++
        j = 3

Step 6: Loop for j = 3; 3 < 10
        nums[i] != nums[j]
        nums[1] != nums[3]
        1 != 1
        false

        j++
        j = 4

Step 7: Loop for j = 4; 4 < 10
        nums[i] != nums[j]
        nums[1] != nums[4]
        1 != 1
        false

        j++
        j = 5

Step 8: Loop for j = 5; 5 < 10
        nums[i] != nums[j]
        nums[1] != nums[5]
        1 != 2
        true

        i++
        i = 2

        nums[i] = nums[j]
        nums[2] = nums[5]
        nums[2] = 2

        j++
        j = 6

Step 9: Loop for j = 6; 6 < 10
        nums[i] != nums[j]
        nums[2] != nums[6]
        2 != 2
        false

        j++
        j = 7

Step 10: Loop for j = 7; 7 < 10
         nums[i] != nums[j]
         nums[2] != nums[7]
         2 != 3
         true

         i++
         i = 3

         nums[i] = nums[j]
         nums[3] = nums[7]
         nums[3] = 3

         j++
         j = 8

Step 11: Loop for j = 8; 8 < 10
         nums[i] != nums[j]
         nums[3] != nums[8]
         3 != 3
         false

         j++
         j = 9

Step 12: Loop for j = 9; 9 < 10
         nums[i] != nums[j]
         nums[3] != nums[9]
         3 != 4
         true

         i++
         i = 4

         nums[i] = nums[j]
         nums[4] = nums[9]
         nums[4] = 4

         j++
         j = 10

Step 13: Loop for j = 10; 10 < 10
         false

Step 14: return i + 1
         return 4 + 1 = 5
```
