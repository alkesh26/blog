---
title: LeetCode - Compare Version Numbers
description: LeetCode - compare two versions, compare revisions in the left-to-right order using C++, Golang, and Javascript.
date: 2022-09-25
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - compare two versions, compare revisions in the left-to-right order, c++, golang, javascript"
---

### Problem statement

Given two version numbers, *version1* and *version2*, compare them.

Version numbers consist of **one or more revisions** joined by a dot *'.'*. Each revision consists of **digits** and may contain leading **zeros**. Every revision contains **at least one character**. Revisions are **0-indexed from left to right**, with the leftmost revision being revision 0, the next revision being revision 1, and so on. For example *2.5.33* and *0.1* are valid version numbers.

To compare version numbers, compare their revisions in **left-to-right order**. Revisions are compared using their **integer value ignoring any leading zeros**. This means that revisions *1* and *001* are considered **equal**. If a version number does not specify a revision at an index, then **treat the revision as 0**. For example, version *1.0* is less than version *1.1* because their revision 0s are the same, but their revision 1s are *0* and *1* respectively, and *0 < 1*.

Return the following:

If *version1 < version2*, return *-1*.
If *version1 > version2*, return *1*.
Otherwise, return *0*.

Problem statement taken from: <a href='https://leetcode.com/problems/compare-version-numbers' target='_blank'>https://leetcode.com/problems/compare-version-numbers</a>

**Example 1:**

```
Input: version1 = '1.01', version2 = '1.001'
Output: 0
Explanation: Ignoring leading zeroes, both '01' and '001' represent the same integer '1'.
```

**Example 2:**

```
Input: version1 = '1.0', version2 = '1.0.0'
Output: 0
Explanation: version1 does not specify revision 2, which means it is treated as '0'.
```

**Example 3:**

```
Input: version1 = '0.1', version2 = '1.1'
Output: -1
Explanation: version1's revision 0 is '0', while version2's revision 0 is '1'. 0 < 1, so version1 < version2.
```

**Constraints:**

```
- 1 <= version1.length, version2.length <= 500
- version1 and version2 only contain digits and '.'
- version1 and version2 are valid version numbers.
- All the given revisions in version1 and version2 can be stored in a 32-bit integer.
```

### Explanation

We cannot compare the strings because of the dots. We traverse through the strings and separate numeric parts.
If the numeric parts are equal, we compare the next numeric part.

Let's check the algorithm now.

```
- set vnum1 = 0, vnum2 = 0

- loop for i = 0, j = 0 && i < version1.length && j < version2.length
  - loop while i < version1.length && version1[i] != '.'
    - set vnum1 = vnum1 * 10 + (version1[i] - '0')
    - increment i++

  - loop while j < version2.length && version2[j] != '.'
    - set vnum2 = vnum2 * 10 + (version2[j] - '0')
    - increment j++

  - if vnum1 > vnum2
    - return 1
  - else if vnum2 > vnum1
    - return -1

  - set vnum1 = 0, vnum2 = 0
  - increment i++
  - increment j++

- for end

- return 0
```

This function's time complexity is **O(n)**, and the space complexity is **O(1)**.

Let's check our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int compareVersion(string version1, string version2) {
        int vnum1 = 0, vnum2 = 0;

        for(int i = 0, j = 0; i < version1.length() || j < version2.length();) {
            while(i < version1.length() && version1[i] != '.') {
                vnum1 = vnum1*10 + (version1[i] - '0');
                i++;
            }

            while(j < version2.length() && version2[j] != '.') {
                vnum2 = vnum2*10 + (version2[j] - '0');
                j++;
            }

            if(vnum1 > vnum2) {
                return 1;
            } else if(vnum2 > vnum1) {
                return -1;
            }

            vnum1 = 0;
            vnum2 = 0;
            i++;
            j++;
        }

        return 0;
    }
};
```

#### Golang solution

```go
func compareVersion(version1 string, version2 string) int {
    vnum1, vnum2 := 0, 0
    i, j := 0, 0

    for i < len(version1) || j < len(version2) {
        for i < len(version1) && version1[i] != '.' {
            vnum1 = vnum1 * 10 + int(version1[i] - '0')
            i++
        }

        for j < len(version2) && version2[j] != '.' {
            vnum2 = vnum2 * 10 + int(version2[j] - '0')
            j++
        }

        if vnum1 > vnum2 {
            return 1
        } else if vnum2 > vnum1 {
            return -1
        }

        vnum1, vnum2 = 0, 0
        i++
        j++
    }

    return 0;
}
```

#### Javascript solution

```javascript
var compareVersion = function(version1, version2) {
    let vnum1 = 0, vnum2 = 0;

    for(let i = 0, j = 0; i < version1.length || j < version2.length;) {
        while(i < version1.length && version1[i] != '.') {
            vnum1 = vnum1 * 10 + parseInt(version1[i] - '0');
            i++;
        }

        while(j < version2.length && version2[j] != '.') {
            vnum2 = vnum2 * 10 + parseInt(version2[j] - '0');
            j++;
        }

        if(vnum1 > vnum2) {
            return 1;
        } else if(vnum2 > vnum1) {
            return -1;
        }

        vnum1 = 0, vnum2 = 0;
        i++;
        j++;
    }

    return 0;
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: version1 = '1.01'
       version2 = '1.001'

Step 1: vnum1 = 0, vnum2 = 0

Step 2: loop for i = 0, j = 0; i < version1.length() || j < version2.length()
          i < version1.length() || j < version2.length()
          0 < 4 || 0 < 5
          true

          loop while i < version1.length() && version1[i] != '.'
            0 < 4 && version1[0] != '.'
            true && '1' != '.'
            true

            vnum1 = vnum1 * 10 + (version1[i] - '0')
                  = 0 * 10 + version1[0] - '0'
                  = 0 + 1
                  = 1

            i++
            i = 1

            i < version1.length() && version1[i] != '.'
            1 < 4 && version1[1] != '.'
            true && '.' != '.'
            false

          loop while j < version2.length() && version2[j] != '.'
            0 < 5 && version2[0] != '.'
            true && '1' != '.'
            true

            vnum1 = vnum1 * 10 + (version2[j] - '0')
                  = 0 * 10 + version2[j] - '0'
                  = 0 + 1
                  = 1

            j++
            j = 1

            if vnum1 > vnum2
              1 > 1
              false
            else if vnum2 > vnum1
              1 > 1
              false

            vnum1 = 0
            vnum2 = 0

            i++
            i = 2

            j++
            j = 2

Step 3: loop for i < version1.length() || j < version2.length()
          i < version1.length() || j < version2.length()
          2 < 4 || 2 < 5
          true

          loop while i < version1.length() && version1[i] != '.'
            2 < 4 && version1[2] != '.'
            true && '0' != '.'
            true

            vnum1 = vnum1 * 10 + (version1[i] - '0')
                  = 0 * 10 + version1[2] - '0'
                  = 0 + 0
                  = 0

            i++
            i = 3

            i < version1.length() && version1[i] != '.'
            3 < 4 && version1[3] != '.'
            true && '1' != '.'
            true

            vnum1 = vnum1 * 10 + (version1[i] - '0')
                  = 0 * 10 + version1[3] - '0'
                  = 0 + 1
                  = 0

            i++
            i = 4

            i < version1.length()
            4 < 4
            false

          loop while j < version2.length() && version2[j] != '.'
            2 < 5 && version2[2] != '.'
            true && '0' != '.'
            true

            vnum2 = vnum2 * 10 + (version2[j] - '0')
                  = 0 * 10 + version2[2] - '0'
                  = 0 + 0
                  = 0

            j++
            j = 3

            j < version2.length() && version2[j] != '.'
            3 < 5 && version2[3] != '.'
            true && '0' != '.'
            true

            vnum2 = vnum2 * 10 + (version2[j] - '0')
                  = 0 * 10 + version2[3] - '0'
                  = 0 + 1
                  = 0

            j++
            j = 4

            j < version2.length() && version2[j] != '.'
            4 < 5 && version2[4] != '.'
            true && '1' != '.'
            true

            vnum2 = vnum2 * 10 + (version2[j] - '0')
                  = 0 * 10 + version2[4] - '0'
                  = 0 + 1
                  = 1

            j++
            j = 5

            j < version2.length()
            5 < 5
            false

            if vnum1 > vnum2
              1 > 1
              false
            else if vnum2 > vnum1
              1 > 1
              false

            vnum1 = 0
            vnum2 = 0

            i++
            i = 5

            j++
            j = 6

Step 4: loop for i < version1.length() || j < version2.length()
          5 < 4 || 6 < 5
          false

Step 5:  return 0

We return the answer as 0.
```
