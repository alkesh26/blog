---
title: LeetCode Two Sum
description: LeetCode two sum solution in C++ and Golang.
date: 2021-02-28
hashtags: ["leetcode", "algorithms", "golang", "cpp"]
categories: "leetcode - two sum, c++, golang"
---

### Problem statement

Given an array of integers **nums** and an integer **target**, return indices of the two numbers such that they add up to **target**.

You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.

Problem statement taken from: <a href='https://leetcode.com/problems/two-sum' target='_blank'>https://leetcode.com/problems/two-sum</a>

**Example 1:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Example 2:**
```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Example 3:**
```
Input: nums = [8,2,6,9,10], target = 7
Output: []
```


### Explanation

#### Brute force

A brute force solution is to use two nested loops.

We use an outer loop with iterator **i** to visit each element of the array and
inner loop with iterator **j** to check if there is any other element that adds up to the target.

A small code block in C++ will look like this.

```cpp
for (int i = 0; i < nums.length; i++){
    for (int j = i + 1; j < nums.length; j++){
        if (nums[i] + nums[j] == target){
            return new int[] { i, j };
        }
    }
}
```

The time complexity for the above code is **O(N²)** and hence the solution is
not efficient.

#### Sorting

The approach here is to sort the array first using two pointers.

A detailed solution can be found
[here](https://alkeshghorpade.me/post/geeks-for-geeks-pair-in-array-with-sum-equal-to-target).

#### Hash Map

The problem can be solved in **O(N)** time, using extra space.

We can use a [Hash table / HashMap](https://en.wikipedia.org/wiki/Hash_table). The HashMap
will store the array element as a key and the value will be the index at which the element is stored.

##### Algorithm

```
- Create a new HashMap
- Iterate over the array
  - Subtract current array element from target
  - Check if the above difference exists in HashMap
    - If YES, then return the current index and the value of the difference in HashMap
    - If NO, then store the current element as HashMap key and current index as its value
- Return empty array as a result if nums array iteration is completed in the above step
```

#### C++ solution

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        map<int, int> umap;
        int difference;

        for(int i = 0; i < nums.size(); i++ ){
            difference = target - nums.at(i);
            if(umap.find(difference) != umap.end()) {
                vector<int> v{umap[difference], i};
                return v;
            } else {
                umap[nums.at(i)] = i;
            }
        }

        return vector<int> {};
    }
};
```

#### Golang solution

```go
func twoSum(nums []int, target int) []int {
    record := make(map[int]int)

    for index, num := range nums {
        difference := target - num
        if res, ok := record[difference]; ok {
            return []int{index, res}
        }
        record[num] = index
    }

    return []int{}
}
```
