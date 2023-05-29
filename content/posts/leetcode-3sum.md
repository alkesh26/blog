---
title: LeetCode 3Sum
description: LeetCode 3Sum solution in C++ and Golang.
date: 2021-03-14
hashtags: ["leetcode", "algorithms", "golang", "cpp"]
categories: "3 sum leetcode, golang, c++"
---

## Problem statement

Given an array **nums** of n integers, are there elements **a**, **b**, **c**
in **nums** such that **a + b + c = 0**?
Find all unique triplets in the array which gives the sum of zero.

**Note:** The solution set must not contain duplicate triplets.

Problem statement taken from: <a href='https://leetcode.com/problems/3sum/' target='_blank'>https://leetcode.com/problems/3sum/</a>

**Example 1:**
```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
```

**Example 2:**
```
Input: nums = []
Output: []
```

**Example 3:**
```
Input: nums = [0]
Output: []
```

### Explanation

#### Brute force

A brute force solution is to use three nested loops.

A C++ code block will look as below:

```cpp
for (int i = 0; i < nums.length; i++){
    for (int j = i + 1; j < nums.length; j++){
        for (int k = j + 1; k < nums.length; k++){
            if (nums[i] + nums[j] + nums[k] == 0){
                // Logic for checking unique triplets
            }
        }
    }
}
```

The time complexity for the above code is **O(N3)** and, hence the solution is
not efficient.

For large arrays, the above solution will give **Timeout exceeded** error.

#### Sorting

We can reduce the time complexity to **O(N²)** by sorting the array first.
The algorithm is similar to what we have used in earlier
[blog](https://alkeshghorpade.me/post/geeks-for-geeks-pair-in-array-with-sum-equal-to-target)
post.

##### Algorithm

```
- Sort the array in ascending order.
- Set a variable size to array length.
- Initialize three variables sum, p and q.
- Loop while(i < size - 2)
  // here we are skipping the duplicate elements
  - if ( i > 0 && nums[i] == nums[i-1] ) then continue
  - Set p = i + 1 and q = size - 1
  - Loop while(p < q)
    - assign sum = nums[i] + nums[p] + nums[q]
    - if ( sum == 0 ) then add the triplets to the result
    - if ( sum > 0 ) then q--
    - else if ( sum < 0 ) then p++
    - else if ( sum == 0 ) then
      - p++
      // here we are skipping the duplicate elements by incrementing p
      - while (p < q && nums[p] == nums[p-1])
        - p++
- Return the result
```

#### C++ solution

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());

        int size = nums.size();
        vector<vector<int>> answer;
        int sum = 0, p, q;

        for(int i = 0; i < size-2; i++){
            if( i > 0 && nums[i] == nums[i-1]){
                continue;
            }

            p = i + 1;
            q = size - 1;
            while(p < q){
                sum = nums[i] + nums[p] + nums[q];
                if(sum == 0){
                    vector<int> tmp;
                    tmp.push_back(nums[i]);
                    tmp.push_back(nums[p]);
                    tmp.push_back(nums[q]);
                    answer.push_back(tmp);
                }
                if(sum < 0){
                    p += 1;
                } else if (sum > 0){
                    q -= 1;
                } else if(sum == 0){
                    p++;q--;
                    while(p < q && nums[p] == nums[p-1]){
                        p++;
                    }
                }
            }
        }

        return answer;
    }
};
```

#### Golang solution

```go
func threeSum(nums []int) [][]int {
    sort.Ints(nums)
    length := len(nums)
    var result [][]int
    var sum, p, q int

    for i := 0; i < length - 2; i++ {
        if  i > 0 && nums[i] == nums[i-1]{
            continue
        }

        p = i + 1
        q = length - 1
        for p < q {
            sum = nums[i] + nums[p] + nums[q]
            if sum == 0 {
                var subArray []int
                subArray = append(subArray, nums[i])
                subArray = append(subArray, nums[p])
                subArray = append(subArray, nums[q])

                result = append(result, subArray)
            }
            if sum > 0 {
                q -= 1
            } else if sum < 0 {
                p += 1
            } else if sum == 0 {
                p++
                q--
                for p < q && nums[p] == nums[p-1] {
                    p++
                }
            }
        }
    }

    return result
}
```

The algorithm involves two major parts for computing time complexity.
Time complexity for **sorting** average  is **O(NlogN)** and
the time complexity for finding the triplets is **O(N²)**.

Hence the total time complexity is **O(NlogN)** + **O(N²)** ≈ **O(N²)**.
