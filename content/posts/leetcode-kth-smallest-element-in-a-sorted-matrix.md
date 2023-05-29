---
title: LeetCode - Kth Smallest Element in a Sorted Matrix
description: LeetCode - return the kth smallest element in the matrix using C++, Golang, and JavaScript.
date: 2023-03-04
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "return the kth smallest element in the matrix, c++, golang, javascript"
---

## Problem statement

Given an `n x n` `matrix` where each of the rows and columns is sorted in ascending order, return *the kth smallest element in the matrix*.

Note that it is the `kth` smallest element **in the sorted order**, not the `kth` **distinct** element.

You must find a solution with a memory complexity better than `O(n^2)`.

Problem statement taken from: <a href='https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix' target='_blank'>https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix</a>

**Example 1:**

```
Input: matrix = [[1, 5, 9], [10, 11, 13], [12, 13, 15]], k = 8
Output: 13
Explanation: The elements in the matrix are [1, 5, 9, 10, 11, 12, 13, 13, 15], and the 8th smallest number is 13
```

**Example 2:**

```
Input: matrix = [[-5]], k = 1
Output: -5
```

**Constraints:**

```
- n == matrix.length == matrix[i].length
- 1 <= n <= 300
- -10^9 <= matrix[i][j] <= 10^9
- All the rows and columns of matrix are guaranteed to be sorted in non-decreasing order.
- 1 <= k <= n2
```

**Follow up:**

* Could you solve the problem with a constant memory (i.e., `O(1)` memory complexity)?

* Could you solve the problem in `O(n)` time complexity? The solution may be too advanced for an interview but you may find reading this paper fun.

### Explanation

#### Brute force approach

The easiest approach is to use an additional 1D array. We iterate the matrix row or column wise and store the elements in an array. We sort the array and return the `k - 1` element of the array.

A C++ snippet of the above approach is as follows:

```cpp
int kthSmallest(vector<vector<int>>& matrix, int k) {
    int n = matrix.size();
    int m = matrix[0].size();
    vector<int> array;

    for(int i = 0; i < n; i++) {
        for(int j = 0; j < m; j++) {
            array.push_back(matrix[i][j]);
        }
    }

    sort(array.begin(), array.end());

    return array[k - 1];
}
```

The time and space complexity of the above approach is **O(n * m)**.

#### Priority Queue

C++ has an inbuilt priority queue data structure. Priority queues are implemented using heaps, and in maximum priority queues, the maximum element is always at the top of the heap.

We store all the elements in the priority queue. The maximum element will be at the top of the priority queue. We keep using the pop function **n * m - k** times. **pop** function removes the top element from the heap. After **n * m - k** times the topmost element will be the kth smallest element in the queue.

A C++ snippet of the above approach is as follows:

```cpp
int kthSmallest(vector<vector<int>>& matrix, int k) {
    int n = matrix.size();
    int m = matrix[0].size();
    priority_queue<int> pq;

    for(int i = 0; i < n; i++) {
        for(int j = 0; j < m; j++) {
            pq.push(input[i][j]);
        }
    }

    for(int i = 0; i < n * m - k; i++){
        pq.pop();
    }

    return pq.top();

}
```

The time and space complexity of this approach is **O(n * m)**.

#### Binary Search

The input matrix is sorted row-wise and column-wise. We can utilize this information to reduce our time and space complexity of the algorithm.

The idea is to divide the matrix into two parts using the middle element as a point of reference. We count the number of elements that are less than or equal to the middle element. If the count is smaller than k, we check the 2nd half of the matrix and if count is greater than k, we check the 1st half.

Let's check the algorithm for this approach.

#### Algorithm

```
// kthSmallest function
- set n = matrix.size(), m = matrix[0].size()
      low = matrix[0][0], high = matrix[n - 1][m - 1]
  initialize mid, greaterThanOrEqualMid

- loop while low <= high
  - set mid = low + (high - low) / 2

  - set greaterThanOrEqualMid = getElementsGreaterThanOrEqualMid(matrix, n, mid)

  - if greaterThanOrEqualMid >= k
    - update high = mid - 1
  - else
    - update low = mid + 1
  - if end

- while end

- return low

// getElementsGreaterThanOrEqualMid function
- set count = 0
  initialize greaterThanMid

- loop for i = 0; i < n; i++
  - if matrix[i][0] > mid
    - return count

  - if matrix[i][n - 1] <= mid
    - count = count + n
    - continue

  - set greaterThanMid = 0

  - loop for j = n / 2; j >= 1; j /= 2
    - loop while greaterThanMid + j < n && matrix[i][greaterThanMid + j] <= mid
      - update greaterThanMid = greaterThanMid + j
    - while end
  - for end

  - set count = count + greaterThanMid + 1
- for end

- return count
```

The time complexity of this approach is `O(y * n * log(n))`, where `y =  log(abs(matrix[0][0] - matrix[n - 1][n - 1]))`. The space complexity is `O(1)`.

#### C++ solution

```cpp
class Solution {
public:
    int getElementsGreaterThanOrEqualMid(vector<vector<int>>& matrix, int n, int mid) {
        int count = 0;
        int greaterThanMid;

        for(int i = 0; i < n; i++) {
            if(matrix[i][0] > mid) {
                return count;
            }

            if(matrix[i][n - 1] <= mid) {
                count += n;
                continue;
            }

            greaterThanMid = 0;

            for(int j = n / 2; j >= 1; j /= 2) {
                while(greaterThanMid + j < n && matrix[i][greaterThanMid + j] <= mid) {
                    greaterThanMid += j;
                }
            }

            count += greaterThanMid + 1;
        }

        return count;
    }

    int kthSmallest(vector<vector<int>>& matrix, int k) {
        int n = matrix.size();
        int m = matrix[0].size();
        int low = matrix[0][0];
        int high = matrix[n - 1][m - 1];
        int mid, greaterThanOrEqualMid;

        while(low <= high) {
            mid = low + (high - low) / 2;

            greaterThanOrEqualMid = getElementsGreaterThanOrEqualMid(matrix, n, mid);

            if (greaterThanOrEqualMid >= k)
                high = mid - 1;
            else
                low = mid + 1;
        }

        return low;
    }
};
```

#### Golang solution

```go
func getElementsGreaterThanOrEqualMid(matrix [][]int, n, mid int) int {
    count, greaterThanMid := 0, 0

    for i := 0; i < n; i++ {
        if matrix[i][0] > mid {
            return count
        }

        if matrix[i][n - 1] <= mid {
            count += n
            continue
        }


        greaterThanMid = 0

        for j := n / 2; j >= 1; j /= 2 {
            for greaterThanMid + j < n && matrix[i][greaterThanMid + j] <= mid {
                greaterThanMid += j
            }
        }

        count += greaterThanMid + 1
    }

    return count
}

func kthSmallest(matrix [][]int, k int) int {
    n, m := len(matrix), len(matrix[0])
    low, high := matrix[0][0], matrix[n - 1][m - 1]
    mid, greaterThanOrEqualMid := 0, 0

    for low <= high {
        mid = low + (high - low) / 2

        greaterThanOrEqualMid = getElementsGreaterThanOrEqualMid(matrix, n, mid)

        if greaterThanOrEqualMid >= k {
            high = mid - 1
        } else {
            low = mid + 1
        }
    }

    return low
}
```

#### JavaScript solution

```javascript
var getElementsGreaterThanOrEqualMid = function(matrix, n, mid) {
    let count = 0, greaterThanMid = 0;

    for(let i = 0; i < n; i++) {
        if(matrix[i][0] > mid) {
            return count;
        }

        if(matrix[i][n - 1] <= mid) {
            count += n;
            continue;
        }

        greaterThanMid = 0;

        for(let j = n / 2; j >= 1; j /= 2) {
            while(greaterThanMid + j < n && matrix[i][greaterThanMid + j] <= mid) {
                greaterThanMid += j;
            }
        }

        count += greaterThanMid + 1;
    }

    return count;
}

var kthSmallest = function(matrix, k) {
    let n = matrix.length, m = matrix[0].length;
    let low = matrix[0][0], high = matrix[n - 1][m - 1];
    let mid, greaterThanOrEqualMid;

    while(low <= high) {
        mid = low + parseInt((high - low) / 2, 10);

        greaterThanOrEqualMid = getElementsGreaterThanOrEqualMid(matrix, n, mid);

        if(greaterThanOrEqualMid >= k) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return low;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: matrix = [[1, 5, 9], [10, 11, 13], [12, 13, 15]]
       k = 8

// kthSmallest function
Step 1: n = matrix.size()
          = 3
        m = matrix[0].size()
          = 3
        low = matrix[0][0]
            = 1
        high = matrix[n - 1][m - 1]
             = matrix[3 - 1][3 - 1]
             = matrix[2][2]
             = 15
        int mid, greaterThanOrEqualMid

Step 2: loop while low <= high
          1 <= 15
          true

          mid = low + (high - low) / 2
              = 1 + (15 - 1) / 2
              = 1 + 7
              = 8

          greaterThanOrEqualMid = getElementsGreaterThanOrEqualMid(matrix, n, mid)
                                = getElementsGreaterThanOrEqualMid(matrix, 3, 8)

// getElementsGreaterThanOrEqualMid function
Step 3: count = 0
        greaterThanMid

        loop for i = 0; i < n; i++
          if matrix[i][0] > mid
             matrix[0][0] > 8
             1 > 8
             false

          if matrix[i][n - 1] <= mid
             matrix[0][2] <= 8
             9 <= 8
             false

          greaterThanMid = 0

          loop for j = n / 2; j >= 1; j /= 2
            j = 3/2 = 1
            j >= 1
            1 >= 1
            true

            loop while greaterThanMid + j < n && matrix[i][greaterThanMid + j] <= mid
              0 + 1 < 3 && matrix[0][0 + 1] <= mid
              1 < 3 && 5 <= 8
              true

                greaterThanMid = greaterThanMid + j
                               = 0 + 1
                               = 1

            loop while greaterThanMid + j < n && matrix[i][greaterThanMid + j] <= mid
              1 + 1 < 3 && matrix[0][1 + 1] <= mid
              2 < 3 && 9 <= 8
              false

            j = j / 2
              = 1 / 2
              = 0

          loop for j = n / 2; j >= 1
            0 >= 1
            false

          count = count + greaterThanMid + 1
                = 0 + 1 + 1
                = 2

          i++
          i = 1

        loop for i < n
          1 < 3
          true

          if matrix[i][0] > mid
             matrix[1][0] > 8
             10 > 8
             true

             return count

             return 2

// kthSmallest function
Step 4: greaterThanOrEqualMid = getElementsGreaterThanOrEqualMid(matrix, n, mid)
                              = 2

        if greaterThanOrEqualMid >= k
          2 >= 8
          false
        else
          low = mid + 1
              = 8 + 1
              = 9

Step 5: loop while low <= high
          9 <= 15
          true

          mid = low + (high - low) / 2
              = 9 + (15 - 9) / 2
              = 9 + 3
              = 12

          greaterThanOrEqualMid = getElementsGreaterThanOrEqualMid(matrix, n, mid)
                                = getElementsGreaterThanOrEqualMid(matrix, 3, 12)

// getElementsGreaterThanOrEqualMid function
Step 6: count = 0
        greaterThanMid

        loop for i = 0; i < n; i++
          0 < 3
          true

            if matrix[i][0] > mid
              matrix[0][0] > 12
              1 > 12
              false

            if matrix[i][n - 1] <= mid
              matrix[0][2] <= 12
              9 <= 12
              true

              count = count + n
                    = 0 + 3
                    = 3

              continue

          i++
          i = 1

        loop for i < n
          1 < 3
          true

          if matrix[i][0] > mid
            matrix[1][0] > 12
            10 > 12
            false

          if matrix[i][n - 1] <= mid
            matrix[1][2] <= 12
            13 <= 12
            false

          greaterThanMid = 0

          loop for j = n / 2; j >= 1; j /= 2
            j = 3/2 = 1
            j >= 1
            1 >= 1
            true

            loop while greaterThanMid + j < n && matrix[i][greaterThanMid + j] <= mid
              0 + 1 < 3 && matrix[0][0 + 1] <= 12
              1 < 3 && 5 <= 12
              true

                greaterThanMid = greaterThanMid + j
                               = 0 + 1
                               = 1

            loop while greaterThanMid + j < n && matrix[i][greaterThanMid + j] <= mid
              1 + 1 < 3 && matrix[1][1 + 1] <= 12
              2 < 3 && 13 <= 12
              false

          count = count + greaterThanMid + 1
                = 3 + 1 + 1
                = 5

          i++
          i = 2

        loop for i < n
          2 < 3
          true

          if matrix[i][0] > mid
            matrix[2][0] > 12
            12 > 12
            false

          if matrix[i][n - 1] <= mid
            matrix[2][2] <= 12
            15 <= 12
            false

          greaterThanMid = 0

          loop for j = n / 2; j >= 1; j /= 2
            j = 3/2 = 1
            j >= 1
            1 >= 1
            true

            loop while greaterThanMid + j < n && matrix[i][greaterThanMid + j] <= mid
              0 + 1 < 3 && matrix[2][0 + 1] <= 12
              1 < 3 && 13 <= 12
              false

            j = j / 2
              = 1 / 2
              = 0

          loop for j >= 1
            0 >= 1
            false

          count = count + greaterThanMid + 1
                = 5 + 0 + 1
                = 6

          i++
          i = 3

        loop for i < n
          3 < 3
          false

        return count
        return 6

// kthSmallest function
Step 7: greaterThanOrEqualMid = getElementsGreaterThanOrEqualMid(matrix, n, mid)
                              = 6

        if greaterThanOrEqualMid >= k
          6 >= 8
          false
        else
          low = mid + 1
              = 12 + 1
              = 13

Step 8: loop while low <= high
          13 <= 15
          true

          mid = low + (high - low) / 2
              = 13 + (15 - 13) / 2
              = 13 + 1
              = 14

          greaterThanOrEqualMid = getElementsGreaterThanOrEqualMid(matrix, n, mid)
                                = getElementsGreaterThanOrEqualMid(matrix, 3, 14)

We return the above step and return the answer as 13.
```
