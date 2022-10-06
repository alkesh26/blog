---
title: LeetCode Longest Palindromic Substring
description: LeetCode longest palindromic substring in C++, Golang and Javascript.
date: 2021-04-04
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - longest palindromic substring, c++, golang, javascript"
---

### Problem statement

Given a string **s**, return the longest palindromic substring in **s**.

Problem statement taken from: <a href='https://leetcode.com/problems/longest-palindromic-substring' target='_blank'>https://leetcode.com/problems/longest-palindromic-substring</a>

**Example 1:**
```
Input: s = 'babad'
Output: 'bab'
Note: 'aba' is also a valid answer.
```

**Example 2:**
```
Input: s = 'cbbd'
Output: 'bb'
```

**Example 3:**
```
Input: s = 'a'
Output: 'a'
```

**Example 4:**
```
Input: s = 'ac'
Output: 'a'
```

**Constraints:**
```
- 1 <= s.length <= 1000
- s consist of only digits and English letters (lower-case and/or upper-case)
```


### Explanation

A palindrome is a string that reads the same in both directions.
For example, **s = 'madam'** is a palindrome
but **s = 'code'** is not a palindrome.

#### Brute force

A brute force solution is to generate all possible substrings and
verify if the substring is palindrome or not.

```cpp
// Generate all substring
for(int i = 0; i < s.size() - 1; i++){
    for(int j = i + 1; j < s.size(); j++){
        checkIfPalindrome(s, i, j);
    }
}
```

Generating all possible substrings using two for loops as shown above
will take **O(N2)** time.

Verifying a string is palindrome or not will take **O(N)** time.
Hence the total time complexity will be **O(N3)**.

#### Dynamic Programming

The above time complexity can be reduced by using Dynamic programming.
Instead of generating all possible substrings, we find if a given
substring is a palindrome and expand it across both directions.

Consider a case **ababa**. We know **bab** is a palindrome and, **ababa** will
be a palindrome since the left and right letters are the same.

We define a 2D array **T(i, j)** as follows:

```
T(i, j) = {
            true,      if the substring s[i]...s[j] is a palindrome
            false,     otherwise
          }

Hence,
T(i, j) = (T(i + 1, j - 1) and s[i] == s[j]) // the bab and ababa case

Base cases:
// each character in a string is a palindrome.
T(i, i)     = true

// palindrome string like 'aa', 'bb' of length 2.
T(i, i + 1) = true  if ( s[i] == s[i + 1] )
```

The time complexity reduced to **O(N2)** but, the space complexity increased
to **O(N2)** as we need a 2D array to store the result.

#### Expand around the corner

We can solve this in **O(N2)** time using only a constant space.

We use a similar concept as mentioned in the above Dynamic Programming section
where we expand around the center of the substring and keep
updating the maximum length that we have identified so far.

##### Algorithm

```
- Assign stringLength = length of string s
- return s if string is empty or stringLength == 0
- Set maxLength = 1.
- Set low, high and start to 0.
  - low will act as the left index of a substring.
  - high will act as the right index of a substring.
  - start will store the index of the longest palindromic substring.
- Loop for i = 1; i < stringLength; i++
  // check for even length palindrome substring
  - set low = i - 1
  - set right = i
  - Loop while low >= 0 and high < stringLength && s[low] == s[high]
    - if high - low + 1 > maxLength
      - maxLength = high - low + 1
      - start = low
    - decrement low--
    - increment high++

  // check for odd length palindrome substring
  - set low = i - 1
  - set right = i + 1
  - Loop while low >= 0 and high < stringLength && s[low] == s[high]
    - if high - low + 1 > maxLength
      - maxLength = high - low + 1
      - start = low
    - decrement low--
    - increment high++

- return s[start : start + maxLength]
```

#### C++ solution

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        if(s == '' || s.size() == 0){
            return '';
        }

        int maxLength = 1;
        int i, j;
        int low, high;
        int start = 0;

        for(i = 1; i < s.size(); i++){
            // check for even length palindrome substring
            low = i - 1;
            high = i;

            while(low >= 0 && high < s.size() && s[low] == s[high]){
                if(high - low + 1 > maxLength) {
                    start = low;
                    maxLength = high - low + 1;
                }
                low--;
                high++;
            }

            // check for odd length palindrome substring
            low = i - 1;
            high = i + 1;

            while(low >= 0 && high < s.size() && s[low] == s[high]){
                if(high - low + 1 > maxLength) {
                    start = low;
                    maxLength = high - low + 1;
                }
                low--;
                high++;
            }
        }

        return s.substr(start, maxLength);
    }
};
```

#### Golang solution

```go
func longestPalindrome(s string) string {
    stringLength := len(s)

    if s == '' || stringLength == 0 {
        return s
    }

    maxLength := 1
    low, high, start := 0, 0, 0

    for i := 1; i < stringLength; i++ {
        // check for even length palindrome substring
        low = i - 1
        high = i

        for ;low >= 0 && high < stringLength && s[low] == s[high]; {
            if high - low + 1 > maxLength {
                start = low
                maxLength = high - low + 1
            }
            low--
            high++
        }

        // check for odd length palindrome substring
        low = i - 1
        high = i + 1

        for ;low >= 0 && high < stringLength && s[low] == s[high]; {
            if high - low + 1 > maxLength {
                start = low
                maxLength = high - low + 1
            }
            low--
            high++
        }
    }

    return s[start:start+maxLength]
}
```

#### Javascript solution

```javascript
var longestPalindrome = function(s) {
    const stringLength = s.length;

    if( s === '' || stringLength == 0 ){
        return s;
    }

    let maxLength = 1;
    let low, high;
    let start = 0;

    for(i = 1; i < stringLength; i++){
        // check for even length palindrome substring
        low = i - 1;
        high = i;

        while(low >= 0 && high < stringLength && s[low] === s[high]){
            if( high - low + 1 > maxLength ){
                start = low;
                maxLength = high - low + 1;
            }
            low--;
            high++;
        }

        // check for odd length palindrome substring
        low = i - 1;
        high = i + 1;

        while(low >= 0 && high < stringLength && s[low] === s[high]){
            if( high - low + 1 > maxLength ){
                start = low;
                maxLength = high - low + 1;
            }
            low--;
            high++;
        }
    }

    return s.substring(start, start + maxLength);
};
```

Let's dry-run our algorithm to see how the solution works.

```
s = 'babad'
stringLength = 5
maxLength = 1
low, high, start = 0, 0, 0

Step 1: i = 1, i < 5
        // check for even length palindrome substring
        low = 0
        high = 1

        low >= 0 and high < 5 is but s[i] != s[j] as 'b' != 'a'

        // check for odd length palindrome substring
        low = 0
        high = 2

        low >= 0 and high < 5 and s[i] == s[j] as 'b' == 'b'
          high - low + 1 > maxLength (2 - 0 + 1 > 1)
            start = low which is 0
            maxLength = high - low + 1 = 3

          low-- is -1
          high++ is 3

        low is -1 so this fails
        low >= 0 and high < 5 and s[i] == s[j]

Step 2: i = 2, i < 5
        // check for even length palindrome substring
        low = 1
        high = 2

        low >= 0 and high < 5 is but s[i] != s[j] as 'a' != 'b'

        // check for odd length palindrome substring
        low = 1
        high = 3

        low >= 0 and high < 5 is and s[i] == s[j] as 'a' == 'a'
          high - low + 1 > maxLength (3 - 1 + 1 > 3) false

Step 3: i = 3, i < 5
        // check for even length palindrome substring
        low = 2
        high = 3

        low >= 0 and high < 5 is but s[i] != s[j] as 'b' != 'a'

        // check for odd length palindrome substring
        low = 2
        high = 3

        low >= 0 and high < 5 is but s[i] != s[j] as 'b' == 'd'

Step 4: i = 4, i < 5
        // check for even length palindrome substring
        low = 3
        high = 4

        low >= 0 and high < 5 is but s[i] != s[j] as 'a' != 'd'

        // check for odd length palindrome substring
        low = 3
        high = 5

        high is 5 so this fails
        low >= 0 and high < 5 is but s[i] != s[j] as 'b' == 'd'

As start is 0 and maxLength is 3
s.substring(start, start + maxLength)
'babad'.substring(0, 3)
=> 'bab'
```
