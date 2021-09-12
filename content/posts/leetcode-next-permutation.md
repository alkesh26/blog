---
title: LeetCode - Next Permutation
description: LeetCode - Next Permutation using C++, Golang and Javascript.
date: 2021-09-12
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - next permutation, c++, golang, javascript"
---

### Problem statement

Implement **next permutation**,
which rearranges numbers into the lexicographically next greater permutation of numbers.

If such an arrangement is not possible,
it must rearrange it as the lowest possible order (i.e., sorted in ascending order).

The replacement must be in place and use only constant extra memory.

Problem statement taken from: <a href="https://leetcode.com/problems/next-permutation" target="_blank">https://leetcode.com/problems/next-permutation</a>

**Example 1:**

```
Input: nums = [1, 2, 3]
Output: [1, 3, 2]
```

**Example 2:**

```
Input: nums = [3, 2, 1]
Output: [1, 2, 3]
```

**Example 3:**

```
Input: nums = [1, 1, 5]
Output: [1, 5, 1]
```

**Example 4:**

```
Input: nums = [1]
Output: [1]
```

**Constraints:**

```
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 100
```

### Explanation

#### Brute force approach

Brute force approach is to find all possible permutations of the array elements
and find out the permutation which is the next largest one.

The problem here is,
we are generating all permutations of the array elements and
it takes lot of time.

The time complexity of this approach is **O(N!)**
and space complexity is **O(N)**.

#### Single pass approach

For a given sequence which is in descending order as below

[8, 5, 3, 2, 1]

there is no next larger permutation possible.
This gives us a hint on identifying the next larger permutation.

We need to find the first pair of two successive numbers
**nums[i]** and **nums[i − 1]**, from the right, which satisfy
**nums[i] > nums[i − 1]**.

Once we find the index **i - 1**, we need to replace the number
**nums[i - 1]** with the number which is just larger than itself
among the numbers lying to its right section **nums[i]..nums[nums.size() - 1]**,
say **nums[j]**.

We swap the numbers **nums[i - 1]** and **nums[j]**.
We reverse all the numbers from index **i** and **nums.size() - 1**.

##### Algorithm

```
- return if nums.size() <= 1
- set n = nums.size(), i = n - 1
- loop while i > 0
  - if nums[i] > nums[i - 1]
    - break

- if i <= 0
  - i = 0

- set x = ( i == 0 ) ? nums[i] : nums[i - 1]
- smallest = i

- loop for j = i + 1; j < n; j++
  - nums[j] > x && nums[j] < nums[smallest]
    - smallest = j

- swap(&nums[smallest], (i == 0 ? &nums[i] : &nums[i - 1]));

- sort(nums.begin() + i, nums.end());
```

##### C++ solution

```cpp
class Solution {
public: void swap(int *a, int *b)
    {
        int temp = *a;
        *a = *b;
        *b = temp;
    }
public:
    void nextPermutation(vector<int>& nums) {
        if(nums.size() <= 1){
            return;
        }

        int n = nums.size();
        int i = n - 1;
        for(;i > 0; i--){
            if(nums[i] > nums[i-1])
                break;
        }

        if(i <= 0){
            i = 0;
        }

        int x = (i == 0 ? nums[i] : nums[i - 1]);
        int smallest = i;

        for(int j = i + 1; j < n; j++){
            if(nums[j] > x && nums[j] < nums[smallest])
                smallest = j;
        }

        swap(&nums[smallest], (i == 0 ? &nums[i] : &nums[i - 1]));

        // we can also use reverse
        sort(nums.begin() + i, nums.end());
    }
};
```

##### Golang solution

```go
func reverse(nums []int) {
    for i := 0; i < len(nums); i++ {
        j := len(nums) - 1 - i
        if i >= j {
            break
        }

        nums[i], nums[j] = nums[j], nums[i]
    }
}

func nextPermutation(nums []int)  {
    i := 0
    for i = len(nums) - 2; i >= 0; i-- {
        if nums[i] < nums[i + 1] {
            break
        }
    }

    if i == -1 {
        reverse(nums)
        return
    }

    var j int
    for j = len(nums)-1; j > i; j-- {
        if nums[j] > nums[i] {
            break
        }
    }

    nums[i], nums[j] = nums[j], nums[i]
    reverse(nums[i + 1:])
}
```

##### Javascript solution

```javascript
var nextPermutation = function(nums) {
    if (nums === null || nums.length === 0) {
        return nums;
    }

    let index = -1;
    for (let i = nums.length - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            index = i;
            break;
        }
    }

    if (index >= 0) {
        for (let i = nums.length - 1; i > index; i--) {
            if (nums[i] > nums[index]) {
                let temp = nums[i];
                nums[i] = nums[index];
                nums[index] = temp;
                break;
            }
        }
    }

    let start = index + 1;
    let end = nums.length - 1;
    while (start < end) {
        let temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++;
        end--;
    }
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [1, 2, 3, 6, 5, 4]
Output: [1, 2, 4, 3, 5, 6]

Step 1: nums.size() <= 1
        6 <= 1
        false

Step 2: n = nums.size()
        n = 6

        i = n - 1
          = 6 - 1
          = 5

Step 3: loop for i > 0
        5 > 0
        true

        if nums[i] > nums[i - 1]
           nums[5] > nums[4]
           4 > 5
           false

        i--
        i = 4

Step 4: loop for i > 0
        4 > 0
        true

        if nums[i] > nums[i - 1]
           nums[4] > nums[3]
           5 > 6
           false

        i--
        i = 3

Step 5: loop for i > 0
        3 > 0
        true

        if nums[i] > nums[i - 1]
           nums[3] > nums[2]
           6 > 3
           true

           break

Step 6: i <= 0
        3 <= 0
        false

Step 7: x = (i == 0 ? nums[i] : nums[i - 1])
          = (3 == 0 ? nums[3] : nums[2])
          = (false ? nums[3] : nums[2])
          = nums[2]
          = 3

        smallest = i
                 = 3

Step 8: loop for(j = i + 1; j < n; j++)
        j = 3 + 1
          = 4

        j < n
        4 < 6
        true

        nums[j] > x && nums[j] < nums[smallest]
        nums[4] > 3 && nums[4] < nums[3]
        5 > 3 && 5 < 6
        true

        smallest = j
                 = 4

        j++
        j = 5

Step 9: loop for(j = i + 1; j < n; j++)
        j < n
        5 < 6
        true

        nums[j] > x && nums[j] < nums[smallest]
        nums[5] > 3 && nums[5] < nums[4]
        4 > 3 && 4 < 6
        true

        smallest = j
                 = 5

        j++
        j = 6

Step 10: loop for(j = i + 1; j < n; j++)
         j < 6
         6 < 6
         false

Step 11: swap(&nums[smallest], (i == 0 ? &nums[i] : &nums[i - 1]));
         swap(&nums[5], 3 == 0 ? &nums[3] : &nums[2])
         swap(&nums[5], &nums[2])
         swap(3, 4)

         [1, 2, 4, 6, 5, 3]

Step 12: reverse(nums[i], nums[n - 1])
         reverse(nums[3], nums[5])

         [1, 2, 4, 3, 5, 6]
```
