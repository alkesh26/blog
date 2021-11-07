---
title: LeetCode Median of Two Sorted Arrays
description: LeetCode median of two sorted arrays solution in C++, Golang and Javascript.
date: 2021-08-22
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - median of two sorted arrays, c++, golang, javascript"
---

### Problem statement

Given two sorted arrays **nums1**
and
**nums2** of size
**m**
and
**n**
respectively,
return **the median** of the two sorted arrays.

The overall run time complexity should be **O(log (m+n))**.

Problem statement taken from: <a href="https://leetcode.com/problems/median-of-two-sorted-arrays" target="_blank">https://leetcode.com/problems/median-of-two-sorted-arrays</a>

**Example 1:**
```
Input: nums1 = [1, 3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1, 2, 3] and median is 2.
```

**Example 2:**
```
Input: nums1 = [1, 2], nums2 = [3, 4]
Output: 2.50000
Explanation: merged array = [1, 2, 3, 4] and median is (2 + 3) / 2 = 2.5.
```

**Example 3:**
```
Input: nums1 = [0, 0], nums2 = [0, 0]
Output: 0.00000
```

**Example 4:**
```
Input: nums1 = [], nums2 = [1]
Output: 1.00000
```

**Example 5:**
```
Input: nums1 = [2], nums2 = []
Output: 2.00000
```

**Constraints:**
```
- nums1.length == m
- nums2.length == n
- 0 <= m <= 1000
- 0 <= n <= 1000
- 1 <= m + n <= 2000
- -10^6 <= nums1[i], nums2[i] <= 10^6
```

### Explanation

#### Brute force solution

The simplest linear solution is to create a new array.
Since the given arrays are sorted merge the sorted arrays in an efficient way.

Once they are merged
1. if **m + n** is odd,
the median is **(m + n)/2** index in the new array.
2. if **m + n** is even,
the median will be average of elements at index **((m+n)/2 – 1)** and **(m+n)/2**.

A small C++ code snippet will look as below:

```cpp
int i = 0; // index of input array ar1[]
int j = 0; // index of input array ar2[]
int count;
int m1 = -1, m2 = -1;

if((m + n) % 2 == 1) {
    for (count = 0; count <= (n + m)/2; count++) {
        if(i != n && j != m)
        {
            m1 = (ar1[i] > ar2[j]) ? ar2[j++] : ar1[i++];
        }
        else if(i < n)
        {
            m1 = ar1[i++];
        }
        // for case when j<m,
        else
        {
            m1 = ar2[j++];
        }
    }
    return m1;
} else {
    for (count = 0; count <= (n + m)/2; count++) {
        m2 = m1;
        if(i != n && j != m)
        {
            m1 = (ar1[i] > ar2[j]) ? ar2[j++] : ar1[i++];
        }
        else if(i < n)
        {
            m1 = ar1[i++];
        }
        // for case when j<m,
        else
        {
            m1 = ar2[j++];
        }
    }
    return (m1 + m2)/2;
}
```

#### Binary Search

We can avoid creating an additional array of size **m + n**.
Since the two arrays are sorted we can use binary search to divide the array
and
find the median.

#### Algorithm

```
- initialize m = nums1.size, n = nums2.size

- if m > n
    call the algorithm for (nums2, nums1) sequence

- initialize starts = 0, ends = m, partitionX, partitionY,
  maxLeftX, maxLeftY, minRightX, minRightY.

- loop while( starts <= ends )

  - set partitionX = (starts + ends)/2

  - set partitionY = ((m + n + 1)/2 - partitionX)

  - set maxLeftX = partitionX == 0 ? INT_MIN : nums1[partitionX - 1]
        minRightX = partitionX == m ? INT_MAX : nums1[partitionX]

  - set maxLeftY = partitionY == 0 ? INT_MIN : nums2[partitionY - 1]
        minRightY = partitionY == n ? INT_MAX : nums2[partitionY]

  - if maxLeftX <= minRightY && maxLeftY <= minRightX
    // when the above case is satisfied,
    // we need to find the median based on array size is even or odd

    - if (m + n) % 2 == 0
      // if array size is even we need to add the max value from left side
      // with min value from right side
      - return (max(maxLeftX, maxLeftY) + min(minRightX, minRightY))/2
    - else
      // if array size is odd we return the max of the two array's left hand-side value.
      - return max(maxLeftX, maxLeftY)

  - else if maxLeftX > minRightY

    // means we have to decrease size of A's partition
    - ends = partitionX - 1

  - else

    // means we have to set starts to A's partition + 1
    - starts = partitionX + 1
```

#### C++ solution

```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size();
        int n = nums2.size();

        if(m > n){
            return findMedianSortedArrays(nums2, nums1);
        }

        int starts = 0;
        int ends = m;
        int partitionX, partitionY;
        int maxLeftX, maxLeftY;
        int minRightX, minRightY;

        while(starts <= ends){
            partitionX = (starts + ends)/2;
            partitionY = ((m + n + 1)/2 - partitionX);

            maxLeftX = partitionX == 0 ? INT_MIN : nums1[partitionX - 1];
            minRightX = partitionX == m ? INT_MAX : nums1[partitionX];

            maxLeftY = partitionY == 0 ? INT_MIN : nums2[partitionY - 1];
            minRightY = partitionY == n ? INT_MAX : nums2[partitionY];

            if(maxLeftX <= minRightY && maxLeftY <= minRightX){
                if((m+n)%2 == 0){
                    return double(max(maxLeftX, maxLeftY) + min(minRightX, minRightY))/2;
                } else {
                    return double(max(maxLeftX, maxLeftY));
                }
            } else if (maxLeftX > minRightY){
                ends = partitionX - 1;
            } else {
                starts = partitionX + 1;
            }
        }
    }
};
```

#### Golang solution

```go
var (
    maxInt = int(^uint(0) >> 1)
    minInt = -maxInt - 1
)


func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {
    m, n := len(nums1), len(nums2)

    if m > n {
        return findMedianSortedArrays(nums2, nums1)
    }

    middle := (m + n + 1)/2
    starts, ends := 0, m
    var partitionX, partitionY, maxLeftX, maxLeftY, minRightX, minRightY int

    for starts <= ends {
        partitionX = (starts + ends)/2
        partitionY = middle - partitionX
        maxLeftX = maxLeft(partitionX, nums1)
        maxLeftY = maxLeft(partitionY, nums2)
        minRightX = minRight(partitionX, nums1)
        minRightY = minRight(partitionY, nums2)

        if maxLeftX <= minRightY && maxLeftY <= minRightX {
            left := max(maxLeftX, maxLeftY)
            if (m + n) % 2 != 0 {
                return float64(left)
            }
            right := min(minRightX, minRightY)
            return float64((left + right))/2.0
        }
        if maxLeftX > minRightY {
            ends = partitionX-1
            continue
        }
        starts = partitionX+1
        continue
    }

    if n%2 != 0 {
        return float64(nums2[n / 2])
    }
    return float64(nums2[n / 2] + nums2[n / 2 - 1])/2.0
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

func maxLeft(position int, array []int) int {
    if position-1 < 0 || position-1 >= len(array) {
        return minInt
    }
    return array[position-1]
}

func minRight(position int, array []int) int {
    if position < 0 || position >= len(array) {
        return maxInt
    }
    return array[position]
}
```

#### Javascript solution

```javascript
var findMedianSortedArrays = function(nums1, nums2) {
    if(nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }

    let m = nums1.length;
    let n = nums2.length;
    let starts = 0, ends = m;

    while(starts <= ends) {
        const partitionX = (starts + ends) >> 1;
        const partitionY = ((m + n + 1) >> 1) - partitionX;

        const maxLeftX = partitionX == 0 ? Number.NEGATIVE_INFINITY : nums1[partitionX - 1]
        const maxLeftY = partitionY == 0 ? Number.NEGATIVE_INFINITY : nums2[partitionY - 1]

        const minRightX = partitionX == nums1.length ? Number.POSITIVE_INFINITY : nums1[partitionX]
        const minRightY = partitionY == nums2.length ? Number.POSITIVE_INFINITY : nums2[partitionY ]

        if(maxLeftX <= minRightY && maxLeftY <= minRightX) {
            const lowMax = Math.max(maxLeftX, maxLeftY);
            if(( m + n ) % 2 == 1)
                return lowMax;
            return (lowMax + Math.min(minRightX, minRightY)) / 2;
        } else if(maxLeftX < minRightY) {
            starts = partitionX + 1;
        } else
            ends = partitionX - 1;
    }
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: nums1 = [1, 3], nums2 = [2]

Step 1: m = nums1.size()
        m = 2

        n = nums2.size()
        n = 1

Step 2: m > n
        2 > 1
        true

        return findMedianSortedArrays(nums2, nums1);

Step 3: m = num1.size()
        m = 1

        n = nums2.size()
        n = 2

Step 4: m > n
        1 > 2
        false

Step 5: starts = 0
        ends = m
        ends = 1

        declare partitionX, partitionY, maxLeftX, maxLeftY, minRightX, minRightY

Step 6: starts <= ends
        0 <= 1
        partitionX = (starts + ends)/2
                   = (0 + 1)/2
                   = 0

        partitionY = ((m + n + 1)/2 - partitionX)
                   = (1 + 2 + 1)/2 - 0
                   = 4/2
                   = 2

        maxLeftX = partitionX == 0 ? INT_MIN : nums1[partitionX - 1]
                 = 0 == 0
                 = true
                 = INT_MIN

        minRightX = partitionX == m ? INT_MAX : nums1[partitionX]
                  = 0 == 1
                  = false
                  = nums1[0]
                  = 2

        maxLeftY = partitionY == 0 ? INT_MIN : nums2[partitionY - 1]
                 = 2 == 0
                 = false
                 = nums2[partitionY - 1]
                 = nums2[2 - 1]
                 = nums2[1]
                 = 3

        minRightY = partitionY == n ? INT_MAX : nums2[partitionY]
                  = 2 == 2
                  = true
                  = INT_MAX

        if maxLeftX <= minRightY && maxLeftY <= minRightX
           INT_MIN <= INT_MAX && 3 <= 2
           true && false

        else if maxLeftX > minRightY
                INT_MIN > INT_MAX
                false
        else
            starts = partitionX + 1
            starts = 0 + 1
            starts = 1

Step 7: starts <= ends
        1 <= 1

        partitionX = (starts + ends)/2
                   = (1 + 1)/2
                   = 1

        partitionY = ((m + n + 1)/2 - partitionX)
                   = (1 + 2 + 1)/2 - 1
                   = 4/2 - 1
                   = 2 - 1
                   = 1

        maxLeftX = partitionX == 0 ? INT_MIN : nums1[partitionX - 1]
                 = 1 == 0
                 = true
                 = nums1[partitionX - 1]
                 = nums1[1 - 1]
                 = nums1[0]
                 = 2

        minRightX = partitionX == m ? INT_MAX : nums1[partitionX]
                  = 1 == 1
                  = true
                  = INT_MAX

        maxLeftY = partitionY == 0 ? INT_MIN : nums2[partitionY - 1]
                 = 1 == 0
                 = false
                 =  nums2[partitionY - 1]
                 = nums2[1 - 1]
                 = nums2[0]
                 = 1

        minRightY = partitionY == n ? INT_MAX : nums2[partitionY]
                  = 1 == 2
                  = false
                  = nums2[partitionY]
                  = nums2[1]
                  = 3

        if maxLeftX <= minRightY && maxLeftY <= minRightX
           2 <= 3 && 1 <= 3
           true && true
           true

           (m + n) % 2 == 0
           (2 + 1) % 2 == 0
           3 % 2 == 0
           1 == 0
           false

           return double(max(maxLeftX, maxLeftY))
                  double(max(2, 1))
                  double(2)

So we return 2.0000.
```
