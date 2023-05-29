---
title: LeetCode - Remove Duplicates from Sorted Array II
description: LeetCode - remove duplicates from sorted array ii using C++, Golang and Javascript.
date: 2022-01-29
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "remove duplicates from sorted array ii, c++, golang, javascript"
---

## Problem statement

Given an integer array *nums* sorted in **non-decreasing order**, remove some duplicates in-place such that each unique element appears **at most twice**. The **relative order** of the elements should be kept the **same**.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the **first part** of the array *nums*. More formally, if there are *k* elements after removing the duplicates, then the first *k* elements of *nums* should hold the final result. It does not matter what you leave beyond the first k elements.

Return *k after placing the final result in the first k slots of nums*.

Do not allocate extra space for another array. You must do this by **modifying the input array** in-place with O(1) extra memory.

**Custom Judge:**

The judge will test your solution with the following code:

```
int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
```

If all assertions pass, then your solution will be **accepted**.

Problem statement taken from: <a href='https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii' target='_blank'>https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii</a>

**Example 1:**

```
Input: nums = [1, 1, 1, 2, 2, 3]
Output: 5, nums = [1, 1, 2, 2, 3, _]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2, and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

**Example 2:**

```
Input: nums = [0, 0, 1, 1, 1, 1, 2, 3, 3]
Output: 7, nums = [0, 0, 1, 1, 2, 3, 3, _, _]
Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3, and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
```

**Constraints:**

```
- 1 <= nums.length <= 3 * 10^4
- -10^4 <= nums[i] <= 10^4
- nums is sorted in non-decreasing order.
```

### Explanation

We have seen a similar problem in our previous blog post
[Remove Duplicates from Sorted Array](https://alkeshghorpade.me/post/leetcode-remove-duplicates-from-sorted-array).
The only difference in this problem, we should keep the occurrences of unique elements at most twice.

If we observe the previous blog post algorithm,
we are comparing the current element ith index with the i-1th index element.

```cpp
int i = 0;

for(int j = 1; j < nums.size(); j++){
    if(nums[j] != nums[i]){
        i++;
        nums[i] = nums[j];
    }
}
```

The condition **if(nums[j] != nums[i])** compares the two neighbouring elements,
which resolves to **if(nums[i - 1] != nums[i])**.
Since we can keep at most two similar elements,
the condition will be similar to **if(nums[i - 1] != nums[i] || nums[i - 2] != nums[i])**.

Let's check the algorithm to get a clear picture.

```
- set k = 2, n = nums.size()

- if n <= 2
  - return n

- loop for i = 2; i < n; i++
  - if nums[i] != nums[k - 2] || nums[i] != nums[k - 1]
    - nums[k] = nums[i]
    - k++

- return k
```

We keep an integer **k** that updates the **kth** index of the array
only when the current element does not match
either of the two previous indexes.
If the kth index matches the k-1th and k-2th elements, we keep moving forward in the array.
Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int k = 2;
        int n = nums.size();

        if(n <= 2) {
            return n;
        }

        for(int i = 2; i < n; i++){
            if(nums[i] != nums[k - 2] || nums[i] != nums[k - 1]){
                nums[k] = nums[i];
                k++;
            }
        }

        return k;
    }
};
```

#### Golang solution

```go
func removeDuplicates(nums []int) int {
    k := 2
    n := len(nums)

    if n <= 2 {
        return n
    }

    for i := 2; i < n; i++ {
        if nums[i] != nums[k - 2] || nums[i] != nums[k - 1] {
            nums[k] = nums[i]
            k++
        }
    }

    return k
}
```

#### Javascript solution

```javascript
var removeDuplicates = function(nums) {
    let k = 2;
    let n = nums.length;

    if(n <= 2) {
        return n;
    }

    for(let i = 2; i < n; i++) {
        if(nums[i] != nums[k - 2] || nums[i] != nums[k - 1]) {
            nums[k] = nums[i];
            k++;
        }
    }

    return k;
};
```

Dry-run of our **C++** approach for this input **nums = [1, 1, 1, 2, 2, 3]** looks as below:

```
Input: nums = [1, 1, 1, 2, 2, 3]

Step 1: k = 2
        n = nums.size()
          = 6

Step 2: if n <= 2
           6 <= 2
           false

Step 3: loop for i = 2; i < n;
          2 < 6
          true

          if nums[i] != nums[k - 2] || nums[i] != nums[k - 1]
             nums[2] != nums[0] || nums[2] != nums[1]
             1 != 1 || 1 != 1
             false

          i++
          i = 3

Step 4: loop i < n
          3 < 6
          true

          if nums[i] != nums[k - 2] || nums[i] != nums[k - 1]
             nums[3] != nums[0] || nums[3] != nums[1]
             2 != 1 || 2 != 1
             true

             nums[k] = nums[i]
             nums[2] = nums[3]
             nums[2] = 2

             k++
             k = 3

             nums = [1, 1, 2, 2, 2, 3]

          i++
          i = 4

Step 5: loop i < n
          4 < 6
          true

          if nums[i] != nums[k - 2] || nums[i] != nums[k - 1]
             nums[4] != nums[1] || nums[4] != nums[2]
             2 != 1 || 2 != 2
             true

             nums[k] = nums[i]
             nums[3] = nums[4]
             nums[3] = 2

             k++
             k = 4

             nums = [1, 1, 2, 2, 2, 3]

          i++
          i = 5

Step 6: loop i < n
          5 < 6
          true

          if nums[i] != nums[k - 2] || nums[i] != nums[k - 1]
             nums[5] != nums[2] || nums[5] != nums[3]
             3 != 2 || 3 != 2
             true

             nums[k] = nums[i]
             nums[4] = nums[5]
             nums[4] = 3

             k++
             k = 5

             nums = [1, 1, 2, 2, 3, 3]

          i++
          i = 6

Step 7: loop i < n
          6 < 6
          false

Step 8: return k

So we return the answer as 5, and the array till the 5th index is [1, 1, 2, 2, 3].
```
