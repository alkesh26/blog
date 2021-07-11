---
title: LeetCode - Merge Two Sorted Array
description: LeetCode - Merge two sorted arrays using C++, Golang and Javascript.
date: 2021-07-11
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - merge two sorted arrays, c++, golang, javascript"
---

![Container](./../merge-two-sorted-array.png)

### Problem statement

You are given two integer arrays **nums1** and **nums2**, sorted in **non-decreasing** order,
and two integers **m** and **n**,
representing the number of elements in **nums1** and **nums2** respectively.

**Merge** **nums1** and **nums2** into a single array sorted in **non-decreasing order**.

The final sorted array should not be returned by the function,
but instead,
be stored inside the array **nums1**.
To accommodate this,
**nums1** has a length of **m + n**,
where the first **m** elements denote the elements that should be merged,
and the last **n** elements are set to **0** and should be ignored.
**nums2** has a length of **n**.

Problem statement taken from: <a href="https://leetcode.com/problems/merge-sorted-array" target="_blank">https://leetcode.com/problems/merge-sorted-array</a>

**Example 1:**

```
Input: nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3
Output: [1, 2, 2, 3, 5, 6]
Explanation: The arrays we are merging are [1, 2, 3] and [2, 5, 6].
The result of the merge is [1, 2, 2, 3, 5, 6] with the underlined elements coming from nums1.
```

**Example 2:**

```
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].
```

**Example 3:**

```
Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1.
The 0 is only there to ensure the merge result can fit in nums1.
```

**Constraints:**

```
- nums1.length == m + n
- nums2.length == n
- 0 <= m, n <= 200
- 1 <= m + n <= 200
- -10^9 <= nums1[i], nums2[j] <= 10^9
```

### Explanation

The brute-force approach for the problem is to create a new array
nums3 and keep adding elements from the two sorted arrays.
Once all the elements from nums1 and nums2 are added to nums3
we copy back nums3 to nums1.

But the above solution will take an extra space of **O(m + n)**.
We need to sort the elements without any extra space.

The idea is to iterate both the arrays from right to left
and keeping adding the elements to nums1 from right.

Let's check the algorithm below:

```
- set i = m - 1, j = n - 1, k = m + n - 1

- loop for i >= 0 && j >= 0
  - if nums1[i] > nums2[j]
    - set nums1[k] = nums1[i--]
  - else
    - set nums1[k] = nums2[j--]

- loop while i >= 0
  - set nums1[k--] = nums1[i--]

- loop while j >= 0
  - set nums1[k--] = nums2[j--]
```

##### C++ solution

```cpp
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int i = m - 1, j = n - 1, k = m + n - 1;

        for(; i >=0 && j >=0; k--){
            if(nums1[i] >= nums2[j]){
                nums1[k] = nums1[i--];
            } else {
                nums1[k] = nums2[j--];
            }
        }


        while(i >= 0) {
            nums1[k--] = nums1[i--];
        }

        while(j >= 0) {
            nums1[k--] = nums2[j--];
        }
    }
};
```

##### Golang solution

```go
func merge(nums1 []int, m int, nums2 []int, n int)  {
    i := m - 1
    j := n - 1
    k := m + n - 1

    for ; i >= 0 && j >= 0; k-- {
        if nums1[i] >= nums2[j] {
            nums1[k] = nums1[i]
            i--
        } else {
            nums1[k] = nums2[j]
            j--
        }
    }

    for i >= 0 {
        nums1[k] = nums1[i]
        k--
        i--
    }

    for j >= 0 {
        nums1[k] = nums2[j]
        k--
        j--
    }
}
```

##### Javascript solution

```javascript
var merge = function(nums1, m, nums2, n) {
    let i, j, k;

    for(i = m - 1, j = n - 1, k = m + n - 1; i >= 0 && j >= 0; k--){
        if(nums1[i] >= nums2[j]){
            nums1[k] = nums1[i--];
        } else {
            nums1[k] = nums2[j--];
        }
    }

    while(i >= 0) {
        nums1[k--] = nums1[i--];
    }

    while(j >= 0) {
        nums1[k--] = nums2[j--];
    }
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input:
nums1 = [1, 2, 3, 0, 0, 0]
m = 3

nums2 = [2, 5, 6]
n = 3

Step 1: i = m - 1
          = 3 - 1
          = 2

        j = n - 1
          = 3 - 1
          = 2

        k = m + n - 1
          = 3 + 3 - 1
          = 5

Step 2: loop for i >= 0 && j >= 0
        2 >= 0 && 2 >= 0
        true

        if nums1[i] >= nums2[j]
        nums1[2] >= nums2[2]
        3 > 6
        false

        nums1[k] = nums2[j--]
        nums1[5] = 3

        j--
        j = 1

        k--
        k = 4

        nums1 = [1, 2, 3, 0, 0, 6]

Step 3: loop for i >= 0 && j >= 0
        2 >= 0 && 1 >= 0
        true

        if nums1[i] >= nums2[j]
        nums1[2] >= nums2[1]
        3 > 5
        false

        nums1[k] = nums2[j--]
        nums1[4] = 6

        j--
        j = 0

        k--
        k = 3

        nums1 = [1, 2, 3, 0, 5, 6]

Step 4: loop for i >= 0 && j >= 0
        2 >= 0 && 0 >= 0
        true

        if nums1[i] >= nums2[j]
        nums1[2] >= nums2[0]
        3 > 2
        true

        nums1[k] = nums1[i--]
        nums1[3] = 3

        i--
        i = 1

        k--
        k = 2

        nums1 = [1, 2, 3, 3, 5, 6]

Step 5: loop for i >= 0 && j >= 0
        1 >= 0 && 0 >= 0
        true

        if nums1[i] >= nums2[j]
        nums1[1] >= nums2[0]
        2 >= 2
        true

        nums1[k] = nums1[i--]
        nums1[2] = 2

        i--
        i = 0

        k--
        k = 1

        nums1 = [1, 2, 2, 3, 5, 6]

Step 6: loop for i >= 0 && j >= 0
        0 >= 0 && 0 >= 0
        true

        if nums1[i] >= nums2[j]
        nums1[0] >= nums2[0]
        1 >= 2
        false

        nums1[k] = nums2[j--]
        nums1[1] = 2

        j--
        j= -1

        k--
        k = 0

        nums1 = [1, 2, 2, 3, 5, 6]

Step 7: loop for i >= 0 && j >= 0
        0 >= 0 && -1 >= 0
        false

Step 8: for i >= 0
        0 >= 0
        true

        nums1[k--] = nums1[i--]
        nums1[0] = nums1[0]
        nums1[0] = 1

        k--
        k = -1

        i--
        i = -1

Step 9: for j >= 0
        -1 >= 0
        false

So the answer is [1, 2, 2, 3, 5, 6].
```
