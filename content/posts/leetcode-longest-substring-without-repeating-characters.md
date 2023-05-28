---
title: LeetCode Longest Substring Without Repeating Characters
description: LeetCode longest substring without repeating characters in C++, Golang and Javascript.
date: 2021-03-28
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - longest substring without repeating characters, c++, golang, javascript"
---

## Problem statement

Given a string **s**, find the length of the longest substring without repeating characters.

Problem statement taken from: <a href='https://leetcode.com/problems/longest-substring-without-repeating-characters' target='_blank'>https://leetcode.com/problems/longest-substring-without-repeating-characters</a>

**Example 1:**
```
Input: s = 'abcabcbb'
Output: 3
Explanation: The answer is 'abc', with the length of 3.
```

**Example 2:**
```
Input: s = 'bbbbb'
Output: 1
```

**Example 3:**
```
Input: s = 'pwwkew'
Output: 3
```

**Example 4:**
```
Input: s = ''
Output: 0
```

**Constraints:**
```
- s consists of English letters, digits, symbols and spaces.
- 0 <= s.length <= 5 * 10^4
```

### Explanation

#### Brute force

A brute force solution will be to iterate through all possible substrings of the input
string.
Let's say we have a function **checkUniqueString** which returns true or false based on
a string that has all unique characters or not.

We generate all possible substrings using two nested **for** loops and inside which we call
**checkUniqueString** function.

A small code block in C++ will look like this.

```cpp
int n = s.length();

for (int i = 0; i < n; i++){
    for (int j = i; j < n; j++){
        if (checkUniqueString(s, i, j)){
            // logic for updating the max length substring
        }
    }
}
```

**checkUniqueString** will iterate over the string once to check for any repeating character.
Hence it will take **O(N)** time.

The above two nested **for** loops will take **O(N²)** time.
The total time complexity is **O(N3)**.

#### Sliding Window

The sliding window approach is widely used in many arrays and string problems.
The above brute force approach can be optimized using a sliding window.

A sliding window is a range of elements in the array/string that is defined by
start and end indices, i.e., **[i, j) (left index included, right index excluded)**.
The window can be used to slide its range in a certain direction.
So if we right shift the window to right by 1 element then
**[i, j)** will change to **[i + 1, j + 1)**.

#### Algorithm

Initially, the window size is 0 as we have pointed **left** and **right** at the first index.
We keep on incrementing **right** till we find a repeated character in the string.
When **right** finds a repeated character, we found the maximum size of substrings
without duplicate characters starting at index **left**.

We keeping doing for all elements of the string till we reach the end.

```
- Initialize variables left, right, and ans to 0.
- Create an array named as chars of length 128.
  This will store the number of times an element appeared in an array.
- Loop while ( right < s.length() )
  - set char r = s[right]
  - increment chars[r]++
  - Loop while ( chars[r] > 1 )
    - set char l = s[left]
    - decrement chars[l]--
    - increment left++
  - set maximum till now in ans.
    ans = max(ans, right - left + 1)
  - increment right++
- return ans
```

The time complexity of the above solution is **O(N)**.

### Optimized sliding window

The above solution can be optimized further.
Instead of iterating over each index of the string,
we define a mapping of the characters to its index.
Then we skip all the characters immediately when we find a repeated character.

#### C++ solution

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int ans = 0;
        unordered_map<char, int> map;

        for(int i = 0, j = 0; j < s.size(); j++){
            if(map.find(s[j]) != map.end()){
                i = max(map[s[j]], i);
            }
            ans = max(ans, j - i + 1);
            map[s[j]] = j + 1;
        }

        return ans;
    }
};
```

#### Golang solution

```go
func lengthOfLongestSubstring(s string) int {
    m := make(map[byte]int)
    i, ans := 0, 0

    for j := 0; j < len(s); j++ {
        if v, ok := m[s[j]]; ok {
            if v > i {
                i = v
            }
        }

        if j - i + 1 > ans {
            ans = j - i + 1
        }
        m[s[j]] = j + 1
    }

    return ans
}
```

#### Javascript solution

```javascript
var lengthOfLongestSubstring = function(s) {
    var mapping = {};
    var i = 0;
    var ans = 0;

    for(var j = 0; j < s.length; j++){
        if(mapping[s[j]]) {
            if(mapping[s[j]] > i) {
                i = mapping[s[j]];
            }
        }

        if(j - i + 1 > ans){
            ans = j - i + 1;
        }
        mapping[s[j]] = j + 1;
    }

    return ans;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
s = 'abcdeafb'
m = map()
ans = 0

Step 1: i = 0, j = 0
        s[j] = 'a'
        m['a'] = j + 1 = 1
        ans = max(ans, j - i + 1) = max(0, 0 - 0 + 1) = 1

Step 2: i = 0, j = 1
        s[j] = 'b'
        m['b'] = j + 1 = 2
        ans = max(ans, j - i + 1) = max(1, 1 - 0 + 1) = 2

Step 3: i = 0, j = 2
        s[j] = 'c'
        m['c'] = j + 1 = 3
        ans = max(ans, j - i + 1) = max(2, 2 - 0 + 1) = 3

Step 4: i = 0, j = 3
        s[j] = 'd'
        m['d'] = j + 1 = 4
        ans = max(ans, j - i + 1) = max(3, 3 - 0 + 1) = 4

Step 5: i = 0, j = 4
        s[j] = 'e'
        m['e'] = j + 1 = 5
        ans = max(ans, j - i + 1) = max(4, 4 - 0 + 1) = 5

Step 6: i = 0, j = 5
        s[j] = 'a'
        m['a'] is 1
        set i = max(i, m['a']) = max(0, 1) = 1
        ans = max(ans, j - i + 1) = max(5, 5 - 1 + 1) = 5
        m['a'] = 6

Step 7: i = 1, j = 6
        s[j] = 'f'
        m['f'] = j + 1 = 7
        ans = max(ans, j - i + 1) = max(5, 6 - 1 + 1) = 6

Step 8: i = 1, j = 7
        s[j] = 'b'
        m['b'] is 2
        set i = max(i, m['a']) = max(1, 2) = 2
        ans = max(ans, j - i + 1) = max(6, 7 - 2 + 1) = 6

So the answer is 6.
```