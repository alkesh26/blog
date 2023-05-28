---
title: LeetCode - Largest Number
description: LeetCode - arrange numbers of array to form largest number using C++, Golang and Javascript.
date: 2021-12-26
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - arrange numbers of array to form largest number, c++, golang, javascript"
---

## Problem statement

Given a list of non-negative integers *nums*, arrange them such that they form the largest number and return it.

Since the result may be very large, so you need to return a string instead of an integer.

Problem statement taken from: <a href='https://leetcode.com/problems/largest-number' target='_blank'>https://leetcode.com/problems/largest-number</a>

**Example 1:**

```
Input: nums = [10, 2]
Output: '210'
```

**Example 2:**

```
Input: nums = [3, 30, 34, 5, 9]
Output: '9534330'
```

**Constraints:**

```
- 1 <= nums.length <= 100
- 0 <= nums[i] <= 10^9
```

### Explanation

#### Sorting using a custom comparator

To construct the largest number, we need to place the largest digits at the most significant bit.

We need to convert each integer to a string and then sort the array of strings.
**Note** We cannot perform sorting on the number of integers. For e.g., if we have numbers [9, 30, 15]
and sort them in descending order it will result in [30, 15, 9] and the number constructed is
30159. The largest number is 93015.

Let's check the algorithm:

```
// largestNumber function
- if nums.size() == 0
  - return ''

- initialize vector<string> numbers
  i = 0

- loop for i < nums.size(); i++
  // convert integer to string and push in the array
  - numbers.push_back(std::to_string(nums[i]))

- sort(numbers.begin(), numbers.end(), cmp)

- set ans = ''

- loop for i = 0; i < numbers.size(); i++
  - ans = ans + numbers[i]

- return ans[0] == '0' ? '0' : ans

// cmp function
cmp(string a, string b)
- return a + b > b + a
```

#### C++ solution

```cpp
class Solution {
static bool cmp(string a, string b){
    return a + b > b + a;
};

public:
    string largestNumber(vector<int>& nums) {
        if(nums.size() == 0){
            return '';
        }

        vector<string> numbers;
        int i = 0;

        for(; i < nums.size(); i++){
            numbers.push_back(std::to_string(nums[i]));
        }

        sort(numbers.begin(), numbers.end(), cmp);
        string ans = '';

        for(i = 0; i < numbers.size(); i++){
            ans += numbers[i];
        }

        return ans[0] == '0' ? '0' : ans;
    }
};
```

#### Golang solution

```go
func largestNumber(nums []int) string {
    if len(nums) == 0 {
        return ''
    }

    numbers := make([]string, len(nums))
    i := 0

    for i < len(nums) {
        numbers = append(numbers, strconv.Itoa(nums[i]))
        i++
    }

    sort.Slice(numbers, func(a, b int) bool { return numbers[a] + numbers[b] > numbers[b] + numbers[a] })

    ans := ''

    for _, v := range numbers { ans += v }

    if ans[0] == '0' {
        return '0'
    }

    return ans
}
```

#### Javascript solution

```javascript
var largestNumber = function(nums) {
    if( nums.length == 0 ) {
        return '';
    }

    let numbers = [];

    for( let i = 0; i < nums.length; i++ ) {
        numbers.push(nums[i].toString());
    }

    numbers.sort(function (x, y) {
        return x + y > y + x ? -1 : 1;
    });

    let ans = '';

    for( i = 0; i < numbers.length; i++ ){
        ans += numbers[i];
    }

    return ans[0] == '0' ? '0' : ans;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [3, 30, 34, 5, 9]

Step 1: nums.size() == 0
        5 == 0
        false

Step 2: vector<string> numbers;
        int i = 0;

Step 3: loop i < nums.size()
        0 < 5
        true

        numbers.push_back(std::to_string(nums[i]))

        so the loop iterates from 0 to 4, and we append the string numbers

        numbers = ['3', '30', '34', '5', '9']

Step 4: sort(numbers.begin(), numbers.end(), cmp)

// in cmp function
Step 5: return a + b > b + a

        so for first two element we check
        '3' + '30' > '30' + '3'
        '330' > '303'
        true

        '3' + '34' > '34' + '3'
        '334' > '343'
        false

        '5' + '34' > '34' + '5'
        '534' > '345'
        true

        '9' + '5' > '5' + '9'
        '95' > '59'
        true

        The final array is ['9', '5', '34', '3', '30'].

Step 6: string ans = ''

Step 7: loop for(i = 0; i < numbers.size(); i++)
            - ans += numbers[i]
        ans is set to '9534330'

Step 8: ans[0] == '0'
        '9' == '0'
        false
        return ans

So we return the result as '9534330'.
```
