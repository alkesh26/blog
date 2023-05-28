---
title: LeetCode - Longest Consecutive Subsequence
description: LeetCode - return the length of the longest consecutive elements sequence in C++, Golang, and Javascript.
date: 2022-12-24
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode return the length of the longest consecutive elements sequence, c++, golang, javascript"
---

## Problem statement

Given an unsorted array of integers *nums*, return *the length of the longest consecutive elements sequence*.

You must write an algorithm that runs in *O(n)* time.

Problem statement taken from: <a href='https://leetcode.com/problems/longest-consecutive-sequence' target='_blank'>https://leetcode.com/problems/longest-consecutive-sequence</a>

**Example 1:**

```
Input: nums = [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
```

**Example 2:**

```
Input: nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]
Output: 9
```

**Constraints:**

```
- 0 <= nums.length <= 10^5
- -10^9 <= nums[i] <= 10^9
```

### Explanation

#### Sorting

The naive solution is to sort the array and find the longest consecutive elements.
After sorting the array, we remove the duplicate elements.
We run a loop that counts the current number and maximum length of the consecutive elements.
If the current number is not a consecutive element of the previous one,
we reset the counter to 1 and update the maximum length.

A C++ snippet of the above approach is as below:

```cpp
int ans = 0, count = 0;

sort(array, array + n);

vector<int> v;
v.push_back(array[0]);

for (int i = 1; i < n; i++) {
    if (array[i] != array[i - 1])
        v.push_back(array[i]);
}

for (int i = 0; i < v.size(); i++) {
    if (i > 0 && v[i] == v[i - 1] + 1)
        count++;
    else
        count = 1;

    ans = max(ans, count);
}

return ans;
```

The time complexity of the above approach is **O(n(logn))** and space complexity is **O(n)**.

#### HashMap

We can reduce the time complexity to **O(n)** by using a HashMap.
Let's check the algorithm directly.

```
- set n = nums.size()

- if n == 0
    return 0

- initialize map: map<int, int> m

- loop for i = 0; i < n; i++
  - m[nums[i]]++

- set prev = m.begin()
      maxLength = 1
      result = 0

- loop for i = m.begin(); i < m.end(); i++
  - if prev->first + 1 == i->first
    - maxLength++
  - else
    - result = max(result, maxLength)
    - maxLength = 1

  - prev = i

- return max(result, maxLength)
```

The time complexity of the above approach is **O(n)**, and the space complexity is **O(n)**.

Let's check our algorithm in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        int n = nums.size();
        if(n == 0) return 0;

        map<int, int> m;

        for(int i = 0; i < n; i++) {
            m[nums[i]];
        }

        auto prev = m.begin();
        int maxLength = 1, result = 0;

        for(auto i = m.begin(); i != m.end(); i++) {
            if(prev->first + 1 == i->first) {
                maxLength++;
            } else {
                result = max(result, maxLength);
                maxLength = 1;
            }

            prev = i;
        }

        return max(result, maxLength);
    }
};
```

#### Golang solution

```go
func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func longestConsecutive(nums []int) int {
    n := len(nums)
    if n == 0 {
        return 0
    }

    m := make(map[int]int)

    for i := 0; i < n; i++ {
        m[nums[i]]++
    }

    maxLength, result := 1, 0

    for num := range m {
        if _, ok := m[num-1]; !ok {
            currNum := num
            maxLength = 1

            for {
                if _, ok := m[currNum+1]; ok {
                    currNum += 1
                    maxLength += 1
                } else {
                    break
                }
            }

            result = max(result, maxLength)
        }
    }

    return result
}
```

#### Javascript solution

```javascript
var longestConsecutive = function(nums) {
    const n = nums.length;
    if(n === 0) {
        return 0
    }

    let set = new Set(nums)

    let maxLength = 1, result = 0

    for(let num of set) {
        if(set.has(num - 1)) {
            continue;
        }

        let current = num
        maxLength = 1

        while(set.has(current + 1)){
            current++
            maxLength++
        }

        result = Math.max(result, maxLength)
    }

    return result
};
```

#### Dry Run

Let's dry-run our algorithm for **Example 1**.

```
Input: nums = [100, 4, 200, 1, 3, 2]

Step 1: int n = nums.size()
            n = 6

Step 2: n == 0
        6 == 0
        false

Step 3: map<int, int> m
        for(int i = 0; i < n; i++) {
            m[nums[i]];
        }

        m = {
            100: 0,
            4: 0,
            200: 0,
            1: 0,
            3: 0,
            2: 0,
        }

Step 4: prev = m.begin()
             = 1
        maxLength = 1
        result = 0

Step 5: loop for i = m.begin(); i != m.end()
            i = 1
            1 != m.end()
            true

            if prev->first + 1 == i->first
               1 + 1 == 1
               2 == 1
               false

            else
                result = max(result, maxLength)
                       = max(0, 1)
                       = 1

                maxLength = 1

            prev = i
                 = 1

            i++
            i -> 2

Step 6: loop for i != m.end()
            i = 2
            2 != m.end()
            true

            if prev->first + 1 == i->first
               1 + 1 == 2
               2 == 2
               true

               maxLength++
               maxLength = 2

            prev = i
                 = 2

            i++
            i -> 3

Step 7: loop for i != m.end()
            i = 3
            3 != m.end()
            true

            if prev->first + 1 == i->first
               2 + 1 == 3
               3 == 3
               true

               maxLength++
               maxLength = 3

            prev = i
                 = 3

            i++
            i -> 4

Step 8: loop for i != m.end()
            i = 4
            4 != m.end()
            true

            if prev->first + 1 == i->first
               3 + 1 == 4
               4 == 4
               true

               maxLength++
               maxLength = 4

            prev = i
                 = 4

            i++
            i -> 100

Step 9: loop for i != m.end()
            i = 100
            100 != m.end()
            true

            if prev->first + 1 == i->first
               4 + 1 == 100
               5 == 100
               false

            else
                result = max(result, maxLength)
                       = max(1, 4)
                       = 4

                maxLength = 1

            prev = i
                 = 100

            i++
            i -> 200

Step 10: loop for i != m.end()
            i = 200
            200 != m.end()
            true

            if prev->first + 1 == i->first
               100 + 1 == 200
               101 == 200
               false

            else
                result = max(result, maxLength)
                       = max(4, 4)
                       = 4

                maxLength = 4

            prev = i
                 = 200

            i++
            i -> end

Step 11: loop for i != m.end()
            false

Step 12: return max(result, maxLength)

We return the answer as 4.
```
