---
title: Insert Interval
description: You are given an array of non-overlapping intervals where intervals[i] = [starti, endi] represent the start, and the end of the ith interval and intervals is sorted in ascending order by starti. Insert a new interval into intervals.
date: 2023-06-08
hashtags: ["programming", "algorithms", "golang", "cpp", "javascript"]
categories: "insert a new interval into an array of non-overlapping sorted intervals, c++, golang, javascript"
---

## Problem statement

You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [starti, endi]` represent the start and the end of the `ith` interval and `intervals` is sorted in ascending order by `starti`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.

Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `starti` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return `intervals` after the insertion.

Problem statement taken from: <a href='https://leetcode.com/problems/insert-interval' target='_blank'>https://leetcode.com/problems/insert-interval</a>.

**Example 1:**

```
Input: intervals = [[1, 3], [6, 9]], newInterval = [2, 5]
Output: [[1, 5], [6, 9]]
```

**Example 2:**

```
Input: intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval = [4, 8]
Output: [[1, 2], [3, 10], [12, 16]]
Explanation: Because the new interval [4, 8] overlaps with [3, 5], [6, 7], [8, 10].
```

**Constraints:**

```
- 0 <= intervals.length <= 10^4
- intervals[i].length == 2
- 0 <= starti <= endi <= 10^5
- intervals is sorted by starti in ascending order.
- newInterval.length == 2
- 0 <= start <= end <= 10^5
```

### Solutions for Insert Interval

#### Approach 1: Handle all cases

When working on these kinds of problems, we first consider all the cases we need to handle when inserting a new interval. Here are the five cases we need to handle in our code:

Let's assume the new interval that gets inserted is [a, b].

1. **Case 1:** b < start value of first interval in list
   Insert the interval at the beginning of the list.
2. **Case 2:** end value of last interval in list < a
   Insert the interval at the end of the list
3. **Case 3:** a < (start value of first interval) and b > (end value of last interval)
   The new interval is a superset of this list. It contains all the intervals of the list. We return the new interval as a result.
4. **Case 4:** The new interval falls in between any two intervals in the list and is not overlapping with any interval
   We simply insert the interval in the correct position in the list. For eg.,

   ```
   Input: List : [23, 46], [49, 65], [100, 120]
   New interval : [70, 89]
   Output: [23, 46], [49, 65], [70, 89], [100, 120]
   ```
5. **Case 5:** When new interval overlaps with the intervals of the list
   We merge the new interval with overlapping intervals. To understand this case, please refer to the previous blog [Merge Intervals](https://alkeshghorpade.me/post/leetcode-merge-intervals).

A C++ snippet of this approach is as follows:

```cpp
vector<vector<int>> insertNewInterval (vector<vector<int>>& intervals, interval newInterval) {
    vector<vector<int>> result;
    int n = intervals.size();

    // if the set is empty, then simply insert newInterval and return.
    if (n == 0) {
        result.push_back(newInterval);
        return result;
    }

    // case 1 and case 2 (new interval is not overlapping with any interval)
    if (newInterval[1] < intervals[0][0] || newInterval[0] > intervals[n - 1][1]) {
        if (newInterval[1] < intervals[0][0])
            result.push_back(newInterval);

        for (int i = 0; i < n; i++)
            result.push_back(intervals[i]);

        if (newInterval[0] > intervals[n - 1][1])
            result.push_back(newInterval);

        return result;
    }

    // case 3 (New interval covers all existing)
    if (newInterval[0] <= intervals[0][0] && newInterval[1] >= intervals[n - 1][1]) {
        result.push_back(newInterval);
        return result;
    }

    // case 4 and case 5
    // Two cases need to check whether intervals overlap or not.
    bool overlap = true;

    for (int i = 0; i < n; i++) {
        overlap = doesOverlap(intervals[i], newInterval);
        if (!overlap) {
            result.push_back(intervals[i]);

            // case 4
            if (i < n && newInterval[0] > intervals[i][1] && newInterval[1] < intervals[i + 1][0])
                result.push_back(newInterval);

            continue;
        }

        // case 5: Merge Overlapping intervals.
        vector<int> temp;
        temp[0] = min(newInterval[0], intervals[i][0]);

        // Traverse the set until intervals are overlapping
        while (i < n && overlap) {
            // ending time of the newly merged interval is the maximum ending time of both
            // overlapping intervals.
            temp[1] = max(newInterval[1], intervals[i][1]);

            if (i == n - 1)
                overlap = false;
            else
                overlap = doesOverlap(intervals[i + 1], newInterval);
            i++;
        }

        i--;
        result.push_back(temp);
    }

    return result;
}

bool doesOverlap(vector<int> a, vector<int> b) {
    return (min(a[1], b[1]) >= max(a[0], b[0]));
}
```

The time complexity of this approach is **O(n)**, and the space complexity is **O(n)**.

#### Approach 2: Using Merge Intervals

As mentioned above, we can use the [Merge Intervals](https://alkeshghorpade.me/post/leetcode-merge-intervals) approach to solve this problem.

We insert the new interval in the list and use the merge intervals solution.

A C++ snippet of this approach is as follows:

```cpp
vector<vector<int>> merge(vector<vector<int>>& intervals, vector<int> newInterval) {
    intervals.push_back(newInterval);
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
```

The time complexity of this approach is **O(n * log n)**, because we are sorting the list. The space complexity is **O(1)**.

#### Approach 3: Using Stack

We use stack to identify the interval in which it can be merged or placed at the correct position.

The C++ snippet of this approach is as follows:

```cpp
vector<vector<int>> merge(vector<vector<int>>& intervals, vector<int> newInterval) {
    stack< pair<int, int> > st;

    // push the first interval to stack
    st.push(intervals[0]);

    // store the top element of the stack
    vector<int> top = st.top();

    // Checking is newInterval[0] is less than top[1]
    if (newInterval[0] < top[1]) {
        // pop the top element as it will merge with the
        // previous range
        st.pop();

        // re-assign top[0]
        top[0] = min(top[0], newInterval[0]);

        // re-assign top[1]
        top[1] = max(top[1], newInterval[1]);

        // push the current interval
        st.push(top);
    } else {
       st.push(newInterval);
    }

    // iterate from i = 1 to n - 1
    for (int i = 1; i < n; i++) {
        // store the top element of the stack st
        vector<int> top = st.top();

        // if intervals[i][0] is less than top[1]
        if (intervals[i][0] < top[1]) {
            st.pop();

            // re-assign top[0]
            top[0] = min(top[0], intervals[i][0]);

            // re-assign top[1]
            top[1] = max(top[1], intervals[i][1]);

            // push the current interval
            st.push(top);
        } else {
            st.push(intervals[i]);
        }
    }

    // storing the final intervals
    stack<vector<vector<int>>> result;

    // popping the stack elements
    while (st.empty() != true) {
        vector<int> element = st.top();
        st.pop();

        result.push(element);
    }

    return result;
}
```

The time complexity of this approach is **O(n)**, and the space complexity is **O(n)**.

#### Approach 4: Optimized solution without using additional space

We can solve this problem without using any additional space. In **Approach 1**, we handled five cases. We need to handle only cases 1 and 4 explicitly, and the rest of the cases can be handled in a single loop.

Let's check the algorithm first.

#### Algorithm

```
// set size of intervals array
- n = intervals.size()
  i = 0

// iterate over the intervals list till the new interval start value is less than
// any of the interval's end values in the list
- loop while i < n && intervals[i][1] < newInterval[0]

  // keep adding the intervals to the final result
  - result.push_back(intervals[i])

  - increment i; i++
- end while

// once we find the correct slot, now loop till the new interval end value is greater than
// any of the interval's start values in the list
- loop while i < n && newInterval[1] >= intervals[i][0]

  // this code will handle the merging of the intervals based on
  // new interval start and end values
  // we also update the values of the new interval
  - newInterval[0] = min(newInterval[0], intervals[i][0])
  - newInterval[1] = max(newInterval[1], intervals[i][1])

  - increment i; i++
- end while

// append the new interval to result
- result.push_back(newInterval)

// append the remaining intervals of the list to the result
- loop while i < n
  - result.push_back(intervals[i])
  - increment i; i++
- end while

- return result
```

The time complexity of this approach is **O(n)**, and the space complexity is **O(1)**.

Check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        int n = intervals.size(), i = 0;
        vector<vector<int>> result;

        while(i < n && intervals[i][1] < newInterval[0]){
            result.push_back(intervals[i]);
            i++;
        }

        while(i < n && newInterval[1] >= intervals[i][0]){
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }

        result.push_back(newInterval);

        while(i < n){
            result.push_back(intervals[i]);
            i++;
        }

        return result;
    }
};
```

#### Golang solution

```go
func insert(intervals [][]int, newInterval []int) [][]int {
    n, i := len(intervals), 0
    var result [][]int

    for i < n && intervals[i][1] < newInterval[0] {
        result = append(result, intervals[i])
        i++
    }

    for i < n && newInterval[1] >= intervals[i][0] {
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i++
    }

    result = append(result, newInterval)

    for i < n {
        result = append(result, intervals[i])
        i++
    }

    return result
}

func min(a, b int) int {
    if a < b {
        return a
    }

    return b
}

func max(a, b int) int {
    if a > b {
        return a
    }

    return b
}
```

#### JavaScript solution

```javascript
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    let n = intervals.length, i = 0;
    let result = [];

    while(i < n && intervals[i][1] < newInterval[0]){
        result.push(intervals[i]);
        i++;
    }

    while(i < n && newInterval[1] >= intervals[i][0]){
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }

    result.push(newInterval);

    while(i < n){
        result.push(intervals[i]);
        i++;
    }

    return result;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]]
       newInterval = [4, 8]

Step 1: n = intervals.size()
          = 5
        i = 0
        vector<vector<int>> result

Step 2: loop while i < n && intervals[i][1] < newInterval[0]
          0 < 5 && intervals[0][1] < newInterval[0]
          true && 2 < 4
          true

          result.push_back(intervals[i])
          result.push_back(intervals[0])
          result.push_back([1, 2])
          result = [[1, 2]]

          i++
          i = 1

        loop while i < n && intervals[i][1] < newInterval[0]
          1 < 5 && intervals[1][1] < newInterval[0]
          true && 5 < 4
          false

Step 3: loop while i < n && newInterval[1] >= intervals[i][0]
          1 < 5 && newInterval[1] >= intervals[1][0]
          true && 8 >= 3
          true

          newInterval[0] = Math.min(newInterval[0], intervals[i][0])
                         = Math.min(newInterval[0], intervals[1][0])
                         = Math.min(4, 3)
                         = 3

          newInterval[1] = Math.max(newInterval[1], intervals[i][1])
                         = Math.max(newInterval[1], intervals[1][1])
                         = Math.max(8, 5)
                         = 8

          newInterval = [3, 8]

          i++
          i = 2

        loop while i < n && newInterval[1] >= intervals[i][0]
          2 < 5 && newInterval[1] >= intervals[2][0]
          true && 8 >= 6
          true

          newInterval[0] = Math.min(newInterval[0], intervals[i][0])
                         = Math.min(newInterval[0], intervals[1][0])
                         = Math.min(3, 6)
                         = 3

          newInterval[1] = Math.max(newInterval[1], intervals[i][1])
                         = Math.max(newInterval[1], intervals[1][1])
                         = Math.max(8, 7)
                         = 8

          newInterval = [3, 8]

          i++
          i = 3

        loop while i < n && newInterval[1] >= intervals[i][0]
          3 < 5 && newInterval[1] >= intervals[3][0]
          true && 8 >= 8
          true

          newInterval[0] = Math.min(newInterval[0], intervals[i][0])
                         = Math.min(newInterval[0], intervals[3][0])
                         = Math.min(3, 8)
                         = 3

          newInterval[1] = Math.max(newInterval[1], intervals[i][1])
                         = Math.max(newInterval[1], intervals[3][1])
                         = Math.max(8, 10)
                         = 10

          newInterval = [3, 10]

          i++
          i = 4

        loop while i < n && newInterval[1] >= intervals[i][0]
          4 < 5 && newInterval[1] >= intervals[4][0]
          true && 8 >= 12
          false

Step 4: result.push_back(newInterval)
        result.push_back([3, 10])
        result = [[1, 2], [3, 10]]

Step 5: loop while i < n
          4 < 5
          true

          result.push_back(intervals[i])
          result.push_back(intervals[4])
          result.push_back([12, 16])
          result = [[1, 2], [3, 10], [12, 16]]

          i++
          i = 5

        loop while i < n
          5 < 5
          false

Step 6: return result

We return the answer as [[1, 2], [3, 10], [12, 16]].
```
