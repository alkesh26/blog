---
title: LeetCode - Decode Ways
description: LeetCode - find number of ways in which an encoded message can be decoded using C++, Golang and Javascript.
date: 2021-11-04
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - find number of ways in which an encoded message can be decoded, c++, golang, javascript"
---

### Problem statement

A message containing letters from *A-Z* can be **encoded** into numbers using the following mapping:

```
'A' -> "1"
'B' -> "2"
...
'Z' -> "26"
```

To **decode** an encoded message,
all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways).
For example, *"11106"* can be mapped into:

```
"AAJF" with the grouping (1 1 10 6)

"KJF" with the grouping (11 10 6)
```

Note that the grouping (1 11 06) is invalid because "06" cannot be mapped into 'F' since "6" is different from "06".

Given a string *s* containing only digits, *return the **number** of ways to **decode** it*.

The answer is guaranteed to fit in a 32-bit integer.

Problem statement taken from: <a href='https://leetcode.com/problems/decode-ways' target='_blank'>https://leetcode.com/problems/decode-ways</a>

**Example 1:**

```
Input: s = "12"
Output: 2
Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).
```

**Example 2:**

```
Input: s = "226"
Output: 3
Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
```

**Example 3:**

```
Input: s = "0"
Output: 0
Explanation: There is no character that is mapped to a number starting with 0.
The only valid mappings with 0 are 'J' -> "10" and 'T' -> "20", neither of which start with 0.
Hence, there are no valid ways to decode this since all digits need to be mapped.
```

**Example 4:**

```
Input: s = "06"
Output: 0
Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06").
```

**Constraints:**

```
- 1 <= s.length <= 100
- s contains only digits and may contain leading zero(s).
```

### Explanation

#### Brute force solution

A naive approach is to generate all possible combinations and
count the number of correct sequences.

This approach is easy to implement but has time complexity of
**O(2^N)**.

#### Dynamic programming

The problem can be solved using dynamic programming approach.

Let's take the string **"12"**. We can decode the string in 2 ways
**[1, 2]** or **12**.
Now lets append *6* at the end of the string.
For the new string the decode ways are
2 + 1 = 3.
2 for the **[1, 2, 3]** or **[12, 3]** and
1 for **[1, 23]**.

We solved the subproblem first and used it's solution
to solve bigger problem. Thats nothing but dynamic programming
approach.

Let's check the algorithm.

```
- initialize count array: count[n + 1]
- set count[0] = count[1] = 1

- if s[0] == 0 // first character of string is 0
  - return 0

- loop for i = 2; i <= n; i++
  - set count[i] = 0

  // if string is "02" we should not count "02" as a valid case.
  // But if the previous char is greater than 0 we set the current index count same
  // as the previous index count.
  - if s[i - 1] > '0'
    - count[i] = count[i - 1]

  // if string is "32" it is not possible to map to any character.
  // hence we have (i - 2)th index for 1 or 2 and
  // if s[i - 2] is 2 we additionally check for (i - 1)th index to
  // be less than 7.
  - if s[i - 2] == '1' || (s[i - 2] == '2' && s[i - 1] < '7')
    - count[i] += count[i - 2]

- return count[n]
```

#### C++ solution

```cpp
class Solution {
public:
    int countWays(string s, int n){
        int count[n + 1];
        count[0] = 1;
        count[1] = 1;

        if(s[0] == '0')
            return 0;

        for(int i = 2; i <= n; i++){
            count[i] = 0;

            if(s[i - 1] > '0')
                count[i] = count[i - 1];

            if(s[i - 2] == '1' || (s[i - 2] == '2' && s[i - 1] < '7')){
                count[i] += count[i - 2];
            }
        }

        return count[n];
    }

public:
    int numDecodings(string s) {
        return countWays(s, s.size());
    }
};
```

#### Golang solution

```go
func numDecodings(s string) int {
    count := make([]int, len(s) + 1)
    count[0], count[1] = 1, 1

    if s[0] == '0' {
        return 0
    }

    for i := 2; i <= len(s); i++ {
        if s[i - 1] > '0' {
            count[i] = count[i - 1]
        }

        if s[i - 2] == '1' || (s[i - 2] == '2' && s[i - 1] < '7') {
            count[i] += count[i - 2]
        }
    }

    return count[len(s)]
}
```

#### Javascript solution

```javascript
var numDecodings = function(s) {
    let count = [];
    count[0] = 1;
    count[1] = 1;

    for(let i = 2; i <= s.length; i++){
        count[i] = 0;

        if(s[i - 1] > '0'){
            count[i] = count[i - 1];
        }

        if(s[i - 2] == '1' || (s[i - 2]) == '2' && s[i - 1] < '7'){
            count[i] += count[i - 2];
        }
    }

    return count[s.length];
};
```

Let's dry-run our algorithm to see how the solution works.

```
Input: s = "226"

Step 1: int count[n + 1]
        count[0] = count[1] = 1

Step 2: if s[0] == '0'
        '2' == '0'
        false

Step 3: loop for i = 2; i <= n;
        2 <= 3
        true

        if s[i - 1] > '0'
        s[2 - 1] > '0'
        s[1] > '0'
        '2' > '0'
        true

        count[i] = count[i - 1]
        count[2] = count[2 - 1]
                 = count[1]
                 = 1

        if s[i - 2] == '1' || (s[i - 2] == '2' && s[i - 1] < '7'))
        s[2 - 2] == '1'
        s[0] == '1'
        '2' == '1'
        false

        s[i - 2] == '2' && s[i - 1] < '7'
        s[2 - 2] == '2' && s[2 - 1] < '7'
        s[0] == '2' && s[1] < '7'
        '2' == '2' && '2' < '7'
        true

        count[2] = count[i] + count[i - 2]
                 = count[2] + count[2 - 2]
                 = 1 + 1
                 = 2

        i++
        i = 3

Step 4: loop for i <= n;
        3 <= 3
        true

        if s[i - 1] > '0'
        s[3 - 1] > '0'
        s[2] > '0'
        '6' > '0'
        true

        count[i] = count[i - 1]
        count[3] = count[3 - 1]
                 = count[2]
                 = 2

        if s[i - 2] == '1' || (s[i - 2] == '2' && s[i - 1] < '7'))
        s[3 - 2] == '1'
        s[1] == '1'
        '2' == '1'
        false

        s[i - 2] == '2' && s[i - 1] < '7'
        s[3 - 2] == '2' && s[3 - 1] < '7'
        s[1] == '2' && s[2] < '7'
        '2' == '2' && '6' < '7'
        true

        count[3] = count[i] + count[i - 2]
                 = count[3] + count[3 - 2]
                 = 2 + 1
                 = 3

        i++
        i = 4

Step 5: loop for i <= n;
        4 <= 3
        false

Step 6: return count[n]
        count[3] = 3

So the answer we return is 3.
```
