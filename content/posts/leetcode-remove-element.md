---
title: LeetCode - Remove Element
description: Remove element from input array using C++, Golang and Javascript.
date: 2021-10-28
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "remove element from input array, c++, golang, javascript"
---

## Problem statement

Given an integer array **nums** and an integer **val**, remove all occurrences of **val** in **nums** *in-place*. The relative order of the elements may be changed.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the **first part** of the array **nums**. More formally, if there are *k* elements after removing the duplicates, then the first k elements of **nums** should hold the final result. It does not matter what you leave beyond the first *k* elements.

Return *k* after placing the final result in the first *k* slots of **nums**.

Do **not** allocate extra space for another array. You must do this by **modifying the input array** in-place with O(1) extra memory.

**Custom Judge:**

The judge will test your solution with the following code:

```
int[] nums = [...]; // Input array
int val = ...; // Value to remove
int[] expectedNums = [...]; // The expected answer with correct length.
                            // It is sorted with no values equaling val.

int k = removeElement(nums, val); // Calls your implementation

assert k == expectedNums.length;
sort(nums, 0, k); // Sort the first k elements of nums
for (int i = 0; i < actualLength; i++) {
    assert nums[i] == expectedNums[i];
}
```

If all assertions pass, then your solution will be **accepted**.

Problem statement taken from: <a href='https://leetcode.com/problems/remove-element' target='_blank'>https://leetcode.com/problems/remove-element</a>

**Example 1:**

```
Input: nums = [3, 2, 2, 3], val = 3
Output: 2, nums = [2, 2, _, _]
Explanation: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

**Example 2:**

```
Input: nums = [0, 1, 2, 2, 3, 0, 4, 2], val = 2
Output: 5, nums = [0, 1, 4, 0, 3, _, _, _]
Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
Note that the five elements can be returned in any order.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

**Constraints:**

```
- 0 <= nums.length <= 100
- 0 <= nums[i] <= 50
- 0 <= val <= 100
```

### Explanation

#### Brute force approach

The brute force approach that first appears is to create a new array and copy all the elements
to this new array except **val**.

Then copy over this new array to the original array.
But since the problem statement already mentions we have to do this in place,
we cannot create a new array.

The time complexity of the above approach is **O(N)**,
but the space complexity is **O(N)** too.

#### Using two pointers

We can reduce the space complexity and modify the array in place using two
pointers.

Let's check the algorithm.

```
- if nums.size() == 0
  - return 0

- set i, j = 0

- loop for i = 0; i < nums.size() - 1; i++
  - if nums[i] != val
    - nums[j++] = nums[i] // assign nums[i] to nums[j] and then increment j.

- if nums[i] != val
  - nums[j++] = nums[i] // assign nums[i] to nums[j] and then increment j.

- return j
```

#### C++ solution

```cpp
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        if(nums.size() == 0){
            return 0;
        }

        int i, j = 0;

        for(i = 0; i < nums.size() - 1; i++){
            if(nums[i] != val){
                nums[j++] = nums[i];
            }
        }

        if(nums[i] != val){
            nums[j++] = nums[i];
        }

        return j;
    }
};
```

#### Golang solution

```go
func removeElement(nums []int, val int) int {
    if len(nums) == 0 {
        return 0
    }

    i, j := 0, 0

    for ; i < len(nums) - 1; i++ {
        if nums[i] != val {
            nums[j] = nums[i]
            j++
        }
    }

    if nums[i] != val {
        nums[j] = nums[i]
        j++
    }

    return j
}
```

#### Javascript solution

```javascript
var removeElement = function(nums, val) {
    if( nums.length == 0 ){
        return 0;
    }

    let i = 0, j = 0;

    for(; i < nums.length - 1; i++){
        if( nums[i] != val ){
            nums[j++] = nums[i];
        }
    }

    if( nums[i] != val ){
        nums[j++] = nums[i];
    }

    return j;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [3, 2, 2, 3], val = 3

Step 1: if nums.size() == 0
        4 == 0
        false

Step 2: set i, j = 0, 0

Step 3: loop for i = 0; i < nums.size() - 1
        i < 3
        0 < 3
        true

        nums[i] != val
        nums[0] != 3
        3 != 3
        false

        i++
        i = 1

Step 4: loop for i < nums.size() - 1
        i < 3
        1 < 3
        true

        nums[i] != val
        nums[1] != 3
        2 != 3
        true

        nums[j++] = nums[i]
        nums[j] = nums[1]
        nums[0] = 2
        j++
        j = 1

        i++
        i = 2

        nums = [2, 2, 2, 3]

Step 4: loop for i < nums.size() - 1
        i < 3
        2 < 3
        true

        nums[i] != val
        nums[1] != 3
        2 != 3
        true

        nums[j++] = nums[i]
        nums[j] = nums[1]
        nums[1] = 2
        j++
        j = 2

        i++
        i = 3

        nums = [2, 2, 2, 3]

Step 4: loop for i < nums.size() - 1
        i < 3
        3 < 3
        false


Step 5: if nums[i] != val
        nums[3] != 3
        3 != 3
        false

Step 6: return j

So we return the answer as 2.
```
