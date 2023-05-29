---
title: LeetCode - Merge Intervals
description: LeetCode - merge all overlapping intervals and return an array of non-overlapping intervals using C++, Golang and Javascript.
date: 2022-01-13
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "merge all overlapping intervals and return an array of non-overlapping intervals, c++, golang, javascript"
---

## Problem statement

Given an array of *intervals* where *intervals[i] = [starti, endi]*,
merge all overlapping intervals,
and
*return an array of the non-overlapping intervals that cover all the intervals in the input*.

Problem statement taken from: <a href='https://leetcode.com/problems/merge-intervals' target='_blank'>https://leetcode.com/problems/merge-intervals</a>

**Example 1:**

```
Input: intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
Output: [[1, 6], [8, 10], [15, 18]]
Explanation: Since intervals [1, 3] and [2, 6] overlaps, merge them into [1, 6].
```

**Example 2:**

```
Input: intervals = [[1, 4], [4, 5]]
Output: [[1, 5]]
Explanation: Intervals [1, 4] and [4, 5] are considered overlapping.
```

**Constraints:**

```
- 1 <= intervals.length <= 10^4
- intervals[i].length == 2
- 0 <= starti <= endi <= 10^4
```

### Explanation

#### Brute force

Brute force approach is to start from the first interval and compare it every other
interval. If it overlaps with any other interval, remove that other interval
and merge the other in the first interval.

We repeat these same steps for the remaining intervals after first.
The time complexity of this approach is **O(N^2)**.

#### Efficient solution: Sorting

An efficient way is to first sort the time intervals by start time.
Once the intervals are sorted, we merge all intervals in linear time.
If interval[i] overlaps with interval[i - 1], then we combine these two
intervals. If not, we add this interval to final answer.

Let's check the algorithm below:

```
- sort the intervals array sort(intervals.begin(), intervals.end())

- initialize vector result

- loop for interval in intervals
  - if result.empty() || result.back()[1] < interval[0]
    - result.push_back({interval[0], interval[1]})
  - else
    - result.back()[1] = max(result.back()[1], interval[1])

- return result
```

#### C++ solution

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());

        vector<vector<int>> result;

        for(auto interval: intervals){
            if(result.empty() || (result.back()[1] < interval[0])){
                result.push_back({interval[0], interval[1]});
            } else {
                result.back()[1] = max(result.back()[1], interval[1]);
            }
        }

        return result;
    }
};
```

#### Golang solution

```go
func merge(intervals [][]int) [][]int {
    result := [][]int{}

    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })

    for i, interval := range intervals {
        if i == 0 {
            result = append(result, interval)
            continue
        }

        lastInterval := result[len(result) - 1]

        if lastInterval[1] < interval[0] {
            result = append(result, interval)
        } else if interval[1] > lastInterval[1] {
            lastInterval[1] = interval[1]
        }
    }

    return result
}
```

#### Javascript solution

```javascript
var merge = function(intervals) {
    intervals.sort((i, j) => {
        return i[0] - j[0];
    })

    let result = [];

    for(let i = 0; i < intervals.length; i++) {
        if(i == 0) {
            result.push(intervals[i]);
            continue
        }

        let lastInterval = result[result.length - 1];
        if(lastInterval[1] < intervals[i][0]) {
            result.push(intervals[i]);
        } else if (lastInterval[1] > intervals[i][0]) {
            lastInterval[1] = intervals[i][1];
        }
    }

    return result;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]

Step 1: sort(intervals.begin(), intervals.end())
        - intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]

Step 2: vector<vector<int>> result

Step 3: loop for(auto interval: intervals)
        interval = [1, 3]

        - if result.empty() || (result.back()[1] < interval[0])
             true // as result is empty array
          - result.push_back({interval[0], interval[1]})
            result = [[1, 3]]

Step 4: for(auto interval: intervals)
        interval = [2, 6]

        - if result.empty() || (result.back()[1] < interval[0])
             false || (3 < 2)
             false || false
             false

        - else
          - result.back()[1] = max(result.back()[1], interval[1])
            result.back()[1] = max(3, 6)
            result.back()[1] = 6

            result = [[1, 6]]

Step 5: for(auto interval: intervals)
        interval = [8, 10]

        - if result.empty() || (result.back()[1] < interval[0])
             false || (6 < 8)
             false || true
             true
          - result.push_back({interval[0], interval[1]})
            result.push_back({8, 10})

            result = [[1, 6], [8, 10]]

Step 6: for(auto interval: intervals)
        interval = [15, 18]

        - if result.empty() || (result.back()[1] < interval[0])
             false || (10 < 15)
             false || true
             true

          - result.push_back({interval[0], interval[1]})
            result.push_back({15, 18})

            result = [[1, 6], [8, 10], [15, 18]]

Step 7: loop ends

Step 9: return result

So we return the result as [[1, 6], [8, 10], [15, 18]].
```
