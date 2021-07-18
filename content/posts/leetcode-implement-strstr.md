---
title: LeetCode - Implement strStr()
description: LeetCode - Implement strStr() using C++, Golang and Javascript.
date: 2021-07-18
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - implement strStr(), c++, golang, javascript"
---

### Problem statement

Implement **strStr()**.

Return the index of the first occurrence of needle in haystack,
or **-1** if **needle** is not part of **haystack**.

**Clarification:**

What should we return when **needle** is an empty string?
This is a great question to ask during an interview.

For the purpose of this problem, we will return 0 when **needle** is an empty string.
This is consistent to C's **strstr()** and Java's **indexOf()**.

Problem statement taken from: <a href="https://leetcode.com/problems/implement-strstr" target="_blank">https://leetcode.com/problems/implement-strstr</a>

**Example 1:**

```
Input: haystack = "hello", needle = "ll"
Output: 2
```

**Example 2:**

```
Input: haystack = "aaaaa", needle = "bba"
Output: -1
```

**Example 3:**

```
Input: haystack = "", needle = ""
Output: 0
```

**Constraints:**

```
- 0 <= haystack.length, needle.length <= 5 * 10^4
- haystack and needle consist of only lower-case English characters.
```

### Explanation

#### Iterative implementation (Brute force)

The iteration approach is to use two nested for loops.
Outer loop will iterate over **haystack** and
for each index we match the **haystack** string with **needle** string.
If we reach the end of **needle** string we return the start index
else we return -1.

A C++ snippet of the above logic is as below.

```cpp
for (int i = 0; i <= haystack.length() - needle.length(); i++){
    int j;

    for (j = 0; j < needle.length(); j++) {
        if (needle.charAt(j) != haystack.charAt(i + j)) {
            break;
        }
    }

    if (j == needle.length()) {
        return i;
    }
}
```

The time complexity of the above program is **O(m*n)**.

#### Recursive implementation

We can solve the problem using recursive approach as below:

```cpp
int strStr(string haystack, string needle) {
    // ...basic condition check code

    for (int i = 0; i < haystack.length(); i++){
        if (haystack.charAt(i) == needle.charAt(0))
        {
            String s = strStr(haystack.substring(i + 1), needle.substring(1));
            return (s != null) ? haystack.charAt(i) + s : null;
        }
    }

    return null;
}
```

For very huge strings recursive approach is not suitable.

#### Using KMP Algorithm

We can use KMP algorithm to solve the problem in **O(m + n)** time.

Let's check the algorithm below:

```
- return 0 if needle.size == 0

- return -1 if haystack.size < needle.size

- set i = 0, j = 0
- initialize index

- loop while i < haystack.size
  - if haystack[i] == needle[j]
    - index = i

    - loop while haystack[i] == needle[j] && j < needle.size()
      - i++
      - j++

    - if j == needle.size
      - return index
    - else
      - j = 0
      - i = index + 1
  - else
    - i++

- return -1
```

##### C++ solution

```cpp
class Solution {
public:
    int strStr(string haystack, string needle) {
        if(needle.size() == 0){
            return 0;
        }

        if(haystack.size() < needle.size()){
            return -1;
        }

        int i = 0, j = 0;
        int index;
        while(i < haystack.size()){
            if(haystack[i] == needle[j]){
                index = i;
                while(haystack[i] == needle[j] && j < needle.size()){
                    i++;
                    j++;
                }
                if(j == needle.size()){
                    return index;
                } else {
                    j = 0;
                    i = index + 1;
                }
            } else {
                i++;
            }
        }

        return -1;
    }
};
```

##### Golang solution

```
func strStr(haystack string, needle string) int {
    needleLen := len(needle)
    haystackLen := len(haystack)

    if needleLen == 0 {
        return 0
    }

    if haystackLen < needleLen {
        return -1
    }

    i := 0
    j := 0
    index := 0

    for i < haystackLen {
        if haystack[i] == needle[j] {
            index = i

            for j < needleLen && haystack[i] == needle[j] {
                i++
                j++
            }

            if j == needleLen {
                return index
            } else {
                j = 0
                i = index + 1
            }
        } else {
            i++
        }
    }

    return -1
}
```

##### Javascript solution

```javascript
var strStr = function(haystack, needle) {
    if(needle.length == 0){
        return 0;
    }

    if(haystack.length < needle.length){
        return -1;
    }

    let i = 0, j = 0;
    let index;

    while( i < haystack.length ){
        if( haystack[i] == needle[j] ){
            index = i;
            while( haystack[i] == needle[j] && j < needle.length ){
                i++;
                j++;
            }

            if( j == needle.length ){
                return index;
            } else {
                j = 0;
                i = index + 1;
            }
        } else {
            i++;
        }
    }

    return -1;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: haystack = "hello", needle = "ll"

Step 1: needle.size() == 0
        false

Step 2: haystack.size() < needle.size()
        5 < 2
        false

Step 3: i, j, k = 0, 0, 0

Step 4: while i < haystack.size()
        0 < 5
        true

        haystack[i] == needle[j]
        haystack[0] == needle[0]
        'h' == 'l'
        false

        i++
        i = 1

Step 5: while i < haystack.size()
        1 < 5
        true

        haystack[i] == needle[j]
        haystack[1] == needle[0]
        'e' == 'l'
        false

        i++
        i = 2

Step 6: while i < haystack.size()
        2 < 5
        true

        haystack[i] == needle[j]
        haystack[2] == needle[0]
        'l' == 'l'
        true
        index = i
        index = 2

        j < needle.length && haystack[i] == needle[j]
        0 < 2 && haystack[2] == needle[0]
        true && 'l' == 'l'
        true

        i++;
        j++;

        i = 3
        j = 1

        j < needle.length && haystack[i] == needle[j]
        1 < 2 && haystack[3] == needle[1]
        true && 'l' == 'l'
        true

        i++;
        j++;

        i = 4
        j = 2

        j < needle.length && haystack[i] == needle[j]
        2 < 2
        false

Step 7: j == needle.length
        2 == 2
        true

The answer returned is index: 2
```
