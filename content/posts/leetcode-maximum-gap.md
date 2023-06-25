---
title: Maximum Gap
description: Given an integer array nums return the maximum difference between two successive elements in its sorted form.
date: 2023-06-25
hashtags: ["programming", "algorithms", "golang", "cpp", "javascript"]
categories: "given an integer array nums return the maximum difference between two successive elements in its sorted form, c++, golang, javascript, algorithms"
---

## Problem statement

Given an integer array `nums`, return *the maximum difference between two successive elements in its sorted form*. If the array contains less than two elements, return 0.

You must write an algorithm that runs in linear time and uses linear extra space.

Problem statement taken from: <a href='https://leetcode.com/problems/maximum-gap' target='_blank'>https://leetcode.com/problems/maximum-gap</a>.

**Example 1:**

```
Input: nums = [3, 6, 9, 1]
Output: 3
Explanation: The sorted form of the array is [1, 3, 6, 9], either (3, 6) or (6, 9) has the maximum difference 3.
```

**Example 2:**

```
Input: nums = [10]
Output: 0
Explanation: The array contains less than 2 elements, therefore return 0.
```

**Constraints:**

```
- 1 <= nums.length <= 10^5
- 0 <= nums[i] <= 10^9
```

### Solution

#### Approach 1: Brute force

The brute force approach sorts the array and finds the maximum difference between two adjacent elements. The time complexity of this approach is **O(n)**, and the space complexity is **O(1)**.

A C++ snippet of this approach is as below:

```cpp
int maximumGap(vector<int>& nums) {
    int n = nums.size();

    if(n <= 1) {
        return 0;
    }

    sort(nums.begin(), nums.end());
    int maxDifference = INT_MIN;

    for(int i = 0; i < n - 1; i++) {
        maxDifference = max(maxDifference, nums[i + 1] - nums[i]);
    }

    return maxDifference;
}
```

#### Approach 2: Pigeonhole Sorting

The problem statement mentions solving the problem in linear time, using linear extra space. We can use the concept of [Pigeonhole Sorting](https://en.wikipedia.org/wiki/Pigeonhole_sort). Pigeonhole algorithm is suitable for sorting lists of elements where the number of elements and possible key values is approximately the same. It requires **O(n + Range)** time, where n is the number of elements in the input array and `Range` is the number of possible values in the array.

The flow of this algorithm is as follows:

```
- Find the minimum and maximum values in the array. We get the difference between the maximum and minimum value, which we call range. `range = maximum - minimum + 1`.

- Create an array of empty values (pigeonholes) with a size range.

- Iterate over the input array and insert each element in its pigeonhole. An element nums[i] is inserted in the hole at index nums[i] - min.

- Iterate over the pigeonhole array in order and insert the elements from the non-empty pigeonhole back into the original array.
```

We apply the above approach to find the maximum gap between two successive elements in the sorted array.

Let's check the algorithm.

#### Algorithm

```
- set maximum = nums[0]
      minimum = nums[0]
      n = nums.size()

- if n <= 1
  - return 0
- end if

- loop for i = 1; i < n; i++
  // set maximum and minimum
  - maximum = max(maximum, nums[i])
  - minimum = min(minimum, nums[i])
- end for

// create arrays to store maximum and minimum values in n-1 buckets of range
- vector<int> maxBucket(n - 1, INT_MIN)
- vector<int> minBucket(n - 1, INT_MAX)

// calculate the range
- range = ceil((maximum - minimum) / (n - 1))

// traverse through the input array and insert the element in the appropriate bucket
// if the bucket is empty else, update bucket values
- loop for i = 0; i < n; i++
  - if nums[i] == maximum || nums[i] == minimum
    - continue
  - end if

  // compute the index of the bucket
  - index = ((nums[i] - minimum) / range)

  - maxBucket[index] = max(maxBucket[index], nums[i])
  - minBucket[index] = min(minBucket[index], nums[i])
- end for

// find the maximum gap between the maximum value
// of the previous bucket minus a minimum of the current bucket.
- set previousValue = minimum
      maximumGap = 0

- loop for i = 0; i < n - 1; i++
  - if minBucket[i] == INT_MAX
    - continue
  - end if

  - maximumGap = max(maximumGap, minBucket[i] - previousValue)
  - previousValue = maxBucket[i]
- end for

- set maximumGap = max(maximumGap, maximum - previousValue)

- return maximumGap
```

The time complexity of this approach is **O(n)**, and the space complexity if **O(n)**.

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int maximumGap(vector<int>& nums) {
        int maximum = nums[0], minimum = nums[0];
        int n = nums.size(), i;

        if(n <= 1) {
            return 0;
        }

        // find the maximum and minimum in nums[]
        for(int i = 1; i < n; i++) {
            maximum = max(maximum, nums[i]);
            minimum = min(minimum, nums[i]);
        }

        // create arrays to store maximum and minimum values in n-1 buckets of range.
        vector<int> maxBucket(n - 1, INT_MIN);
        vector<int> minBucket(n - 1, INT_MAX);

        // calculate the range
        int range = ceil((maximum - minimum) / (n - 1));

        // traverse through the input array and insert the element in the appropriate bucket
        // if the bucket is empty else, update bucket values
        for (i = 0; i < n; i++) {
            if (nums[i] == maximum || nums[i] == minimum)
                continue;

            // compute the index of the bucket
            int index = ((nums[i] - minimum) / range);

            maxBucket[index] = max(maxBucket[index], nums[i]);
            minBucket[index] = min(minBucket[index], nums[i]);
        }

        // find the maximum gap between the maximum value
        // of the previous bucket minus a minimum of the current bucket.
        int previousValue = minimum;
        int maximumGap = 0;

        for (i = 0; i < n - 1; i++) {
            if (minBucket[i] == INT_MAX)
                continue;

            maximumGap = max(maximumGap, minBucket[i] - previousValue);
            previousValue = maxBucket[i];
        }

        maximumGap = max(maximumGap, maximum - previousValue);

        return maximumGap;
    }
};
```

#### Go solution

```go
func maximumGap(nums []int) int {
    maximum, minimum := nums[0], nums[0]
    n, i := len(nums), 0

    if n <= 1 {
        return 0
    }

    // find the maximum and minimum in nums[]
    for i = 1; i < n; i++ {
        maximum = max(maximum, nums[i])
        minimum = min(minimum, nums[i])
    }

    // create arrays to store maximum and minimum values in n-1 buckets of range.
    maxBucket := make([]int, n - 1)
    minBucket := make([]int, n - 1)

    for j := range maxBucket {
        maxBucket[j] = math.MinInt32
        minBucket[j] = math.MaxInt32
    }

    // calculate the range
    rangeValue := int(math.Ceil(float64(maximum - minimum) / float64(n - 1)))

    // traverse through the input array and insert the element in the appropriate bucket
    // if the bucket is empty else, update bucket values
    for i = 0; i < n; i++ {
        if nums[i] == maximum || nums[i] == minimum {
            continue
        }

        index := ((nums[i] - minimum) / rangeValue)

        maxBucket[index] = max(maxBucket[index], nums[i])
        minBucket[index] = min(minBucket[index], nums[i])
    }

    // find the maximum gap between the maximum value
    // of the previous bucket minus a minimum of the current bucket
    previousValue, maximumGap := minimum, 0

    for i = 0; i < n - 1; i++ {
        if minBucket[i] == math.MaxInt32 {
            continue
        }

        maximumGap = max(maximumGap, minBucket[i] - previousValue)
        previousValue = maxBucket[i]
    }

    return max(maximumGap, maximum - previousValue)
}

func max(a, b int) int {
    if a > b {
        return a
    }

    return b
}

func min(a, b int) int {
    if a < b {
        return a
    }

    return b
}
```

#### JavaScript solution

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumGap = function(nums) {
    let maximum = nums[0], minimum = nums[0];
    let n = nums.length, i;

    if(n <= 1) {
        return 0;
    }

    // find the maximum and minimum in nums[]
    for(i = 1; i < n; i++) {
        maximum = Math.max(maximum, nums[i]);
        minimum = Math.min(minimum, nums[i]);
    }

    // create arrays to store maximum and minimum values in n-1 buckets of range.
    let maxBucket = new Array(n - 1).fill(Number.MIN_SAFE_INTEGER);
    let minBucket = new Array(n - 1).fill(Number.MAX_SAFE_INTEGER);

    // calculate the range
    let range = Math.ceil((maximum - minimum) / (n - 1));

    // traverse through the input array and insert the element in the appropriate bucket
    // if the bucket is empty else, update bucket values
    for (i = 0; i < n; i++) {
        if (nums[i] == maximum || nums[i] == minimum)
            continue;

        // compute the index of the bucket
        let index = ((nums[i] - minimum) / range);

        maxBucket[index] = Math.max(maxBucket[index], nums[i]);
        minBucket[index] = Math.min(minBucket[index], nums[i]);
    }

    // find the maximum gap between the maximum value
    // of the previous bucket minus a minimum of the current bucket.
    let previousValue = minimum;
    let maximumGap = 0;

    for (i = 0; i < n - 1; i++) {
        if (minBucket[i] == Number.MAX_SAFE_INTEGER)
            continue;

        maximumGap = Math.max(maximumGap, minBucket[i] - previousValue);
        previousValue = maxBucket[i];
    }

    maximumGap = Math.max(maximumGap, maximum - previousValue);

    return maximumGap;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [3, 6, 9, 1]

Step 1: maximum = nums[0]
                = 3
        minimum = nums[0]
                = 3
        n = nums.size()
          = 4

Step 2: if n <= 1
           4 <= 1
           false

Step 3: // find the maximum and minimum in nums[]
        loop for int i = 1; i < n; i++

        // at the end of this loop we get max
        // and min
        maximum = 9
        minimum = 1

Step 4: vector<int> maxBucket(n - 1, INT_MIN)
        maxBucket = [INT_MIN, INT_MIN, INT_MIN]

        vector<int> minBucket(n - 1, INT_MAX)
        minBucket = [INT_MAX, INT_MAX, INT_MAX]

Step 5: range = ceil((maximum - minimum) / (n - 1))
              = ceil(9 - 1 / 4 - 1)
              = ceil(8 / 3)
              = 2

Step 6: loop for i = 0; i < n
          0 < 4
          true

          if nums[i] == maximum || nums[i] == minimum
             nums[0] == 9 || nums[0] == 1
             3 == 9 || 3 == 1
             false

          index = ((nums[i] - minimum) / range)
                = ((nums[0] - 1) / 2)
                = (3 - 1) / 2
                = 1

          maxBucket[index] = max(maxBucket[index], nums[i])
          maxBucket[1] = max(maxBucket[1], nums[0])
                       = max(INT_MIN, 3)
                       = 3
          maxBucket = [INT_MIN, 3, INT_MIN]

          minBucket[index] = min(minBucket[index], nums[i])
          minBucket[1] = max(minBucket[1], nums[0])
                       = max(INT_MAX, 3)
                       = 3
          minBucket = [INT_MAX, 3, INT_MIN]

          i++
          i = 1

        loop for i < 4
          1 < 4
          true

          if nums[i] == maximum || nums[i] == minimum
            nums[1] == 9 || nums[1] == 1
            6 == 9 || 6 == 1
            false

          index = ((nums[i] - minimum) / range)
                = ((nums[1] - 1) / 2)
                = (6 - 1) / 2
                = 2

          maxBucket[index] = max(maxBucket[index], nums[i])
          maxBucket[2] = max(maxBucket[2], nums[1])
                       = max(INT_MIN, 6)
                       = 6
          maxBucket = [INT_MIN, 3, 6]

          minBucket[index] = min(minBucket[index], nums[i])
          minBucket[2] = max(minBucket[2], nums[1])
                       = max(INT_MAX, 6)
                       = 6
          minBucket = [INT_MAX, 3, 6]

          i++
          i = 2

        loop for i < 4
          2 < 4
          true

          if nums[i] == maximum || nums[i] == minimum
            nums[2] == 9 || nums[2] == 1
            9 == 9 || 9 == 1
            true
            continue

          i++
          i = 3

        loop for i < 4
          3 < 4
          true

          if nums[i] == maximum || nums[i] == minimum
            nums[3] == 9 || nums[3] == 1
            1 == 9 || 1 == 1
            true
            continue

          i++
          i = 4

        loop for i < 4
          4 < 4
          false

Step 7: previousValue = minimum
                      = 1
        maximumGap = 0

Step 8: loop for i = 0; i < n - 1
          0 < 4 - 1
          0 < 3
          true

          if minBucket[i] == INT_MAX
             minBucket[0] == INT_MAX
             true

             continue

          i++
          i = 1

        loop for i < n - 1
          1 < 4 - 1
          1 < 3
          true

          if minBucket[i] == INT_MAX
             minBucket[1] == INT_MAX
             3 == INT_MAX
             false

          maximumGap = max(maximumGap, minBucket[i] - previousValue)
                     = max(0, minBucket[1] - previousValue)
                     = max(0, 3 - 1)
                     = max(0, 2)
                     = 2

          previousValue = maxBucket[i]
                        = maxBucket[1]
                        = 3

          i++
          i = 2

        loop for i < n - 1
          2 < 4 - 1
          2 < 3
          true

          if minBucket[i] == INT_MAX
             minBucket[1] == INT_MAX
             6 == INT_MAX
             false

          maximumGap = max(maximumGap, minBucket[i] - previousValue)
                     = max(2, minBucket[2] - previousValue)
                     = max(2, 6 - 3)
                     = max(2, 3)
                     = 3

          previousValue = maxBucket[i]
                        = maxBucket[2]
                        = 6

          i++
          i = 3

        loop for i < n - 1
          3 < 4 - 1
          3 < 3
          false

Step 9: maximumGap = max(maximumGap, maximum - previousValue)
                   = max(3, 9 - 6)
                   = max(3, 3)
                   = 3

Step 10: return maximumGap

We return the answer as 3.
```
