---
title: Max Sum of Rectangle No Larger Than K
description: Given a non-empty 2D matrix and an integer k find the max sum of a rectangle in the matrix such that its sum is no larger than k
date: 2023-06-29
hashtags: ["programming", "algorithms", "golang", "cpp", "javascript"]
categories: "given a non-empty 2D matrix and an integer k find the max sum of a rectangle in the matrix such that its sum is no larger than k, c++, golang, javascript, algorithms"
---

## Problem statement

Given an `m x n` matrix `matrix` and an integer `k`, return *the max sum of a rectangle in the matrix such that its sum is no larger than k*.

It is **guaranteed** that there will be a rectangle with a sum no larger than `k`.

Problem statement taken from: <a href='https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k' target='_blank'>https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k</a>.

**Example 1:**

![Container](./../sum-grid.png)

```
Input: matrix = [[1, 0, 1], [0, -2, 3]], k = 2
Output: 2
Explanation: Because the sum of the blue rectangle [[0, 1], [-2, 3]] is 2, and 2 is the max number no larger than k (k = 2).
```

**Example 2:**

```
Input: matrix = [[2, 2, -1]], k = 3
Output: 3
```

**Constraints:**

```
- m == matrix.length
- n == matrix[i].length
- 1 <= m, n <= 100
- -100 <= matrix[i][j] <= 100
- -10^5 <= k <= 10^5
```

**Follow up:** What if the number of rows is much larger than the number of columns?

### Solution

#### Approach 1: Brute force

The naive approach is to check all the possible submatrices from the input matrix to compute the max sum of rectangles no larger than K. For each submatrix, we check if the sum of its elements is less than or equal to k or not. We store the sum of the submatrix no larger than k and return the answer.

A C++ solution of this approach is as follows:

```cpp
class Solution {
public:
    int maxSumSubmatrix(vector<vector<int>>& matrix, int k) {
        int m = matrix.size();
        int n = matrix[0].size();
        int result = numeric_limits<int>::min();

        vector<vector<vector<vector<int>>>> computeSum(
            m,
            vector<vector<vector<int>>>(
                n,
                vector<vector<int>>(
                    m,
                    vector<int>(n, 0)
                )
            )
        );

        for (int rowLength = 0; rowLength < m; ++ rowLength) {
            for (int columnLength = 0; columnLength < n; ++columnLength) {
                for (int i = 0; i + rowLength < m; ++i) {
                    for (int j = 0; j + columnLength < n; ++j) {
                        if (rowLength == 0 && columnLength == 0) {
                            computeSum[i][j][i + rowLength][j + columnLength] =
                                matrix[i][j];
                        } else if (rowLength == 0) {
                            computeSum[i][j][i + rowLength][j + columnLength] =
                                computeSum[i][j][i + rowLength][j + columnLength - 1]
                                +
                                matrix[i + rowLength][j + columnLength];
                        } else if (columnLength == 0) {
                            computeSum[i][j][i + rowLength][j + columnLength] =
                                computeSum[i][j][i + rowLength - 1][j + columnLength]
                                +
                                matrix[i + rowLength][j + columnLength];
                        } else {
                            computeSum[i][j][i + rowLength][j + columnLength] =
                                computeSum[i][j][i + rowLength - 1][j + columnLength]
                                +
                                computeSum[i][j][i + rowLength][j + columnLength - 1]
                                -
                                computeSum[i][j][i + rowLength - 1][j + columnLength - 1]
                                +
                                matrix[i + rowLength][j + columnLength];
                        }

                        if (computeSum[i][j][i + rowLength][j + columnLength] == k) {
                            return k;
                        } else if (computeSum[i][j][i + rowLength][j + columnLength] < k) {
                            result = max(
                                result,
                                computeSum[i][j][i + rowLength][j + columnLength]
                            );
                        }
                    }
                }
            }
        }

        return result;
    }
};
```

The time complexity of this approach is **O(n ^ 4)**. The solution will time out for a huge matrix, which is not the optimal way.

#### Approach 2: Kanade algorithm

We can optimize the brute force approach by using the concept of the Kanade algorithm. **Kadane’s algorithm** finds a maximum sum contiguous subarray for a one-dimensional array in **O(n)** time. Using this concept, we will create an integer array that stores each row's prefix sums from column i to j where **0 < i < j < m**. We will run Kadane’s algorithm on each such array to get the maximum possible sum closest to **k** of any subarray in the same way as we did in approach 1.

Please refer to this post [Maximum Subarray](https://alkeshghorpade.me/post/leetcode-maximum-subarray) for understanding the **Kanade algorithm**.

Let's check the algorithm.

#### Algorithm

```
// maxSumSubmatrix(matrix, k)
- set m = matrix.length
      n = matrix[0].length
      result = INT_MIN

- loop for i = 0; i < n; i++
  // initialize sum of size m with all values in it as 0
  - vector<int> sum(m, 0)

  - loop for j = i; j < n; j++
    - loop for r = 0; r < m; r++
      - update sum[r] = sum[r] + matrix[r][j]
    - for end
  - for end

  - set result = max(result, computeMaxSubarraySum(sum, k))
- for end

- return result

// computeMaxSubarraySum(sum, k)
- set currentSum = 0
      maxSum = INT_MIN

- create set sumValues and insert the value 0
  set<int> sumValues
  sumValues.insert(0)

- loop for i = 0; i < sum.size; i++
  - update currentSum = currentSum + x

  - set auto it = sumValues.lower_bound(currentSum - k)

  - if it != sumValues.end()
    - update maxSum = max(maxSum, currentSum - *it)
  - if end

  - sumValues.insert(currentSum)
- for end

- return maxSum
```

The time complexity of this approach is **O(m * n ^ 2 * log(m))**. Where `m` is the number of rows and `n` is the number of columns in the input matrix. The space complexity is **O(n)**.

Let's check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int maxSumSubmatrix(vector<vector<int>>& matrix, int k) {
        int m = matrix.size(), n = matrix[0].size();
        int result = INT_MIN;

        for(int i = 0; i < n; i++) {
            vector<int> sum(m, 0);

            for(int j = i; j < n; j++) {
                for(int r = 0; r < m; r++) {
                    sum[r] += matrix[r][j];
                }

                result = max(result, computeMaxSubarraySum(sum, k));
            }
        }

        return result;
    }

    int computeMaxSubarraySum(vector<int> sum, int k) {
        int currentSum = 0;
        int maxSum = INT_MIN;
        set<int> sumValues;
        sumValues.insert(0);

        for(auto x: sum) {
            currentSum += x;

            auto it = sumValues.lower_bound(currentSum - k);
            if (it != sumValues.end()) {
                maxSum = max(maxSum, currentSum - *it);
            }

            sumValues.insert(currentSum);
        }

        return maxSum;
    }

};
```

#### Go solution

```go
func maxSumSubmatrix(matrix [][]int, k int) int {
	m, n := len(matrix), len(matrix[0])
	sum := make([]int, n)
	sumValues := make(sortedIntSet, n)
	result := math.MinInt32

	for startRow := range matrix {
		for i := range sum {
			sum[i] = 0
		}

		for row := startRow; row < m; row++ {
			for col, val := range matrix[row] {
				sum[col] += val
			}

			currentSum := 0
			maxSum := sum[0]

            for _, val := range sum {
				currentSum = max(currentSum + val, val)
				maxSum = max(maxSum, currentSum)
			}

			if maxSum <= k {
				result = max(result, maxSum)
				continue
			}

			currentSum = 0
			sumValues = sumValues[:1]
			sumValues[0] = 0

			for _, val := range sum {
				currentSum += val

				partnerIdx := sort.SearchInts(sumValues, currentSum-k)

                if partnerIdx != len(sumValues) {
					result = max(result, currentSum - sumValues[partnerIdx])
				}

				sumValues.insert(currentSum)
			}
		}
	}

	return result
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

type sortedIntSet []int

func (s *sortedIntSet) insert(x int) {
	i := sort.SearchInts(*s, x)

    if i == len(*s) {
		*s = append(*s, x)
	} else if (*s)[i] != x {
		*s = append(*s, 0)
		copy((*s)[i+1:], (*s)[i:])
		(*s)[i] = x
	}
}
```

#### JavaScript solution

```javascript
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var maxSumSubmatrix = function(matrix, k) {
    let m = matrix.length, n = matrix[0].length;
    let result = Number.MIN_VALUE;

    for(let i = 0; i < n; i++) {
        let sum = new Array(m).fill(0);

        for(let j = i; j < n; j++) {
            for(let r = 0; r < m; r++) {
                sum[r] += matrix[r][j];
            }

            result = Math.max(result, computeMaxSubarraySum(sum, k));
        }
    }

    return result;
};

var computeMaxSubarraySum = function(sum, k) {
    let currentSum = 0;
    let maxSum = Number.MIN_VALUE;
    let sumValues = new Set();
    sumValues.add(0);

    for(let r = 0; r < sum.length; r++) {
        currentSum += sum[r];

        let list = Array.from(sumValues);
        let it = list.lastIndexOf(currentSum - k)

        if (it > -1) {
            maxSum = Math.max(maxSum, currentSum - it);
        }

        sumValues.add(currentSum);
    }

    return maxSum;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: matrix = [[1, 0, 1], [0, -2, 3]]
       k = 2

// maxSumSubmatrix(matrix, k)
Step 1: m = matrix.size()
          = 2
        n = matrix[0].size()
          = 3
        result = INT_MIN

Step 2: loop for i = 0; i < n
          0 < 3
          true

          vector<int> sum(m, 0)
          sum = [0, 0]

          loop for j = i; j < n; j++
            loop for r = 0; r < m; r++
              sum[r] = sum[r] + matrix[r][j]
            for end
          for end

          so after the above loop
          sum = [1, 0]

          result = max(result, computeMaxSubarraySum(sum, k))

// computeMaxSubarraySum(sum, 2)
// computeMaxSubarraySum([1, 0], 2)
Step 3: set currentSum = 0
            maxSum = INT_MIN
            set<int> sumValues
            sumValues.insert(0)

            loop for auto x: sum
              currentSum = currentSum + x
                         = 0 + 1
                         = 1

              sumValues = [0]
              it = sumValues.lower_bound(currentSum - k)
                 = sumValues.lower_bound(1 - 2)
                 = sumValues.lower_bound(-1)
                 = -1

              sumValues.add(currentSum)
              sumValues.add(1)
              sumValues = [0, 1]

            loop for auto x: sum
              currentSum = currentSum + x
                         = 1 + 0
                         = 1

              sumValues = [0, 1]
              it = sumValues.lower_bound(currentSum - k)
                 = sumValues.lower_bound(1 - 2)
                 = sumValues.lower_bound(-1)
                 = -1

Step 4: return maxSum
        return INT_MIN

// maxSumSubmatrix(matrix, k)
Step 5: result = max(result, computeMaxSubarraySum(sum, k))
               = max(INT_MIN, INT_MIN)
               = INT_MIN
        i++
        i = 1

Step 6: loop for i < n
          1 < 3
          true

          vector<int> sum(m, 0)
          sum = [0, 0]

          loop for j = i; j < n; j++
            loop for r = 0; r < m; r++
              sum[r] = sum[r] + matrix[r][j]
            for end
          for end

          so after the above loop
          sum = [0, -2]

          result = max(result, computeMaxSubarraySum(sum, k))

We compute the same steps for the whole matrix.

We return the result, and the answer is 2.
```
