---
title: LeetCode - Subarray Sum Equals K
description: LeetCode - return the total number of subarrays whose sum equals to k using C++, Golang, and JavaScript.
date: 2023-03-16
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - the total number of subarrays whose sum equals to k, c++, golang, javascript"
---

## Problem statement

Given an array of integers `nums` and an integer `k`, return *the total number of subarrays whose sum equals to k*.

A subarray is a contiguous **non-empty** sequence of elements within an array.

Problem statement taken from: <a href='https://leetcode.com/problems/subarray-sum-equals-k' target='_blank'>https://leetcode.com/problems/subarray-sum-equals-k</a>

**Example 1:**

```
Input: nums = [1, 1, 1], k = 2
Output: 2
```

**Example 2:**

```
Input: nums = [1, 2, 3], k = 3
Output: 2
```

**Constraints:**

```
- 1 <= nums.length <= 2 * 10^4
- -1000 <= nums[i] <= 1000
- -10^7 <= k <= 10^7
```

### Explanation

#### Brute Force approach

The brute force approach is evaluate the sum of each subarray. If the sum equals `k`, we increment the subarray count by 1.

A C++ snippet of this approach is as follows:

```cpp
int count = 0;

for (int i = 0; i < n; i++) {
    int sum = 0;

    for (int j = i; j < n; j++) {
      sum += arr[j];

      if (sum == k)
        count++;
    }
}

return count
```

The time complexity of the above approach is **O(n^2)**. The space-complexity is **O(1)**.

#### Efficient approach

The time complexity can be reduced to **O(n)**, by using a HashMap. While traversing the array we store the sum so far in a variable currentSumTillNow. We maintain the different values of currentSumTillNow we encounter while traversing in a HashMap. If the value of the currentSumTillNow till now is equal to the sum at any instance we increment the count of the subarray by 1.

When the value of the currentSumTillNow exceeds the sum, we evaluate currentSumTillNow - sum. If this value is present in the HashMap, we exclude the number of subarrays we encountered previously. We increment the count of number of the subarrays by 1 even in the case when currentSumTillNow equals k.

Let's check the algorithm first.

#### Algorithm

```
- initialize map previousSum
  set count = 0, currentSumTillNow = 0

- loop for i = 0; i < nums.size(); i++
  - update currentSumTillNow = currentSumTillNow + nums[i]

  - if currentSumTillNow == k
    - update count = count + 1
  - if end

  - if previousSum.find(currentSumTillNow - k) != previousSum.end()
    - count = count + previousSum[currentSumTillNow - k]
  - if end

  - update previousSum[currentSumTillNow] = previousSum[currentSumTillNow] + 1
- for end

- return count
```

The time complexity of the above approach is **O(n)**. We are using an additional space in form of HashMap, so the space complexity is **O(n)**.

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> previousSum;
        int count = 0, currentSumTillNow = 0;

        for(int i = 0; i < nums.size(); i++) {
            currentSumTillNow += nums[i];

            if(currentSumTillNow == k) {
                count++;
            }

            if(previousSum.find(currentSumTillNow - k) != previousSum.end()) {
                count += previousSum[currentSumTillNow - k];
            }

            previousSum[currentSumTillNow]++;
        }

        return count;
    }
};
```

#### Golang solution

```go
func subarraySum(nums []int, k int) int {
    previousSum := make(map[int]int)
    count, currentSumTillNow := 0, 0

    for i := 0; i < len(nums); i++ {
        currentSumTillNow += nums[i]

        if currentSumTillNow == k {
            count++
        }

        if previousSum[currentSumTillNow - k] > 0 {
            count += previousSum[currentSumTillNow - k]
        }

        previousSum[currentSumTillNow]++
    }

    return count
}
```

#### JavaScript solution

```javascript
var subarraySum = function(nums, k) {
    let previousSum = new Map();
    let count = 0, currentSumTillNow = 0;

    for(let i = 0; i < nums.length; i++) {
        currentSumTillNow += nums[i];

        if(currentSumTillNow === k) {
            count++;
        }

        if(previousSum.has(currentSumTillNow - k)) {
            count += previousSum.get(currentSumTillNow - k);
        }

        let value = previousSum.get(currentSumTillNow);

        if (value === null)
            previousSum.set(currentSumTillNow, 1);
        else
            previousSum.set(currentSumTillNow, value + 1);
    }

    return count;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [1, 2, 3]
       k = 3

Step 1: unordered_map<int, int> previousSum
        count = 0, currentSumTillNow = 0

Step 2: loop for i = 0; i < nums.size()
          0 < 3
          true

          currentSumTillNow = currentSumTillNow + nums[i]
                            = 0 + nums[0]
                            = 0 + 1
                            = 1

          if currentSumTillNow == k
            1 == 3
            false

          if previousSum.find(currentSumTillNow - k) != previousSum.end()
             previousSum.find(1 - 3) != previousSum.end()
             previousSum.find(-2) != previousSum.end()
             false

          previousSum[currentSumTillNow]++
          previousSum[1]++
          previousSum[1] = 1
          previousSum = { 1: 1 }

          i++
          i = 1

Step 3: loop for i < nums.size()
          1 < 3
          true

          currentSumTillNow = currentSumTillNow + nums[i]
                            = 1 + nums[1]
                            = 1 + 2
                            = 3

          if currentSumTillNow == k
            3 == 3
            true

            count = count + 1
                  = 0 + 1
                  = 1

          if previousSum.find(currentSumTillNow - k) != previousSum.end()
             previousSum.find(3 - 3) != previousSum.end()
             previousSum.find(0) != previousSum.end()
             false

          previousSum[currentSumTillNow]++
          previousSum[3]++
          previousSum[3] = 1
          previousSum = { 1: 1, 3: 1 }

          i++
          i = 2

Step 4: loop for i < nums.size()
          2 < 3
          true

          currentSumTillNow = currentSumTillNow + nums[i]
                            = 3 + nums[2]
                            = 3 + 3
                            = 6

          if currentSumTillNow == k
            6 == 3
            true

          if previousSum.find(currentSumTillNow - k) != previousSum.end()
             previousSum.find(6 - 3) != previousSum.end()
             previousSum.find(3) != previousSum.end()
             true

             count = count + previousSum[currentSumTillNow - k]
                   = 1 + previousSum[6 - 3]
                   = 1 + 1
                   = 2

          previousSum[currentSumTillNow]++
          previousSum[6]++
          previousSum[6] = 1
          previousSum = { 1: 1, 3: 1, 6: 1}

          i++
          i = 3

Step 5: loop for i < nums.size()
          3 < 3
          false

Step 6: return count

We return the answer as 2.
```
