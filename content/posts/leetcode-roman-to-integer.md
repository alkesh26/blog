---
title: LeetCode Roman to Integer
description: LeetCode convert a roman string into number.
date: 2021-05-08
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - roman to integer, c++, golang, javascript"
---

### Problem statement

Roman numerals are represented by seven different symbols: **I**, **V**,
**X**, **L**, **C**, **D** and **M**.

```
Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
```

For example, **2** is written as **II** in Roman numeral, just two one's added together.
**12** is written as **XII**, which is simply **X + II**.
The number **27** is written as **XXVII**, which is **XX + V + II**.

Roman numerals are usually written largest to smallest from left to right.
However, the numeral for four is not **IIII**.
Instead, the number four is written as **IV**.
Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as **IX**.
There are six instances where subtraction is used:

- **I** can be placed before **V** (5) and **X** (10) to make 4 and 9.
- **X** can be placed before **L** (50) and C (100) to make 40 and 90.
- **C** can be placed before **D** (500) and M (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer.

Problem statement taken from: <a href="https://leetcode.com/problems/roman-to-integer" target="_blank">https://leetcode.com/problems/roman-to-integer</a>

**Example 1:**
```
Input: s = "III"
Output: 3
```

**Example 2:**
```
Input: s = "IV"
Output: 4
```

**Example 3:**
```
Input: s = "IX"
Output: 9
```

**Example 4:**
```
Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
```

**Example 5:**
```
Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```

**Constraints:**
```
- 1 <= s.length <= 15
- s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
- It is guaranteed that s is a valid roman numeral in the range [1, 3999].
```

### Explanation

The solution to this problem is simple.
We need to pay attention to the order of Roman characters
in the string.

We represent 4 by **IV** instead of **IIII**.
This gives a hint if we need to subtract the current value of the character
or add it to the total sum.

#### Algorithm

```
- initialize an hash map characterMap with keys as 'I', 'V', 'X', 'L', 'C', 'D', 'M'
  and value as 1, 5, 10, 50, 100, 500, 1000.
- return 0 if s.length() == 0.

- if s.length == 1, return characterMap[s[0]]

- set sum = characterMap[s[s.length() - 1]].
  - characterMap[s[s.length() - 1]] is the value of the last character in the string s.

- Loop for i = s.length() - 2; i >= 0; i--
  // if value of the current character is less than next character we subtract current value from sum
  - if characterMap[s[i]] < characterMap[s[i+1]]
    - subtract sum = sum - characterMap[s[i]]
  - else
    - add sum = sum + characterMap[s[i]]

- return sum
```

#### C++ solution

```cpp
class Solution {
public:
    int romanToInt(string s) {
        map<char, int> characterMap = {
            {'I', 1},
            {'V', 5},
            {'X', 10},
            {'L', 50},
            {'C', 100},
            {'D', 500},
            {'M', 1000}
        };

        int length = s.length();

        if(length == 0) {
            return 0;
        }

        if(length == 1){
            return characterMap[s[0]];
        }

        int sum = characterMap[s[length - 1]];
        for(int i = length - 2; i >= 0; i--){
            if(characterMap[s[i]] < characterMap[s[i+1]]){
                sum -= characterMap[s[i]];
            } else {
                sum += characterMap[s[i]];
            }
        }

        return sum;
    }
};
```

#### Golang solution

```go
func romanToInt(s string) int {
    characterMap := map[byte]int{
		'I': 1,
		'V': 5,
		'X': 10,
		'L': 50,
		'C': 100,
		'D': 500,
		'M': 1000,
	}

    length := len(s)

    if length == 0 {
        return 0
    }

    if length == 1 {
        return characterMap[s[0]]
    }

    sum := characterMap[s[length - 1]]

    for i := length - 2; i >= 0; i-- {
        if characterMap[s[i]] < characterMap[s[i+1]] {
            sum -= characterMap[s[i]]
        } else {
            sum += characterMap[s[i]]
        }
    }

    return sum
}
```

#### Javascript solution

```javascript
var romanToInt = function(s) {
    const characterMap = {
        'I': 1,
		'V': 5,
		'X': 10,
		'L': 50,
		'C': 100,
		'D': 500,
		'M': 1000
    };

    const length = s.length;

    if( length == 0 ) {
        return 0;
    }

    if( length == 1 ){
        return characterMap[s[0]];
    }

    var sum = characterMap[s[length - 1]];

    for( var i = length - 2; i >= 0; i-- ) {
        if( characterMap[s[i]] < characterMap[s[i + 1]] ) {
            sum -= characterMap[s[i]];
        } else {
            sum += characterMap[s[i]];
        }
    }

    return sum;
};
```

Let's dry-run our algorithm to see how the solution works.

```
s = "MCMXCIV"
map<char, int> characterMap = {
            {'I', 1},
            {'V', 5},
            {'X', 10},
            {'L', 50},
            {'C', 100},
            {'D', 500},
            {'M', 1000}
        };

length = s.length()
       = 7

Step 1: length == 0
        7 == 0
        false

Step 2: length == 1
        7 == 1
        false

Step 3: sum = characterMap[s[length - 1]]
            = characterMap[s[7 - 1]]
            = characterMap[s[6]]
            = characterMap['V']
            = 5

Step 4: for i = length - 2; i >= 0; i--
        i = 5
        5 >= 0

        characterMap[s[i]] < characterMap[s[i + 1]]
        characterMap[s[5]] < characterMap[s[6]]
        characterMap['I'] < characterMap['V']
        1 < 5
        true

        sum -= characterMap[s[i]]
             = characterMap[s[5]]
             = characterMap['I']
             = 1

        sum = 5 - 1
            = 4

        i--
        i = 4

Step 5: i >= 0
        i = 4
        4 >= 0

        characterMap[s[i]] < characterMap[s[i + 1]]
        characterMap[s[4]] < characterMap[s[5]]
        characterMap['C'] < characterMap['I']
        100 < 1
        false

        sum += characterMap[s[i]]
             = characterMap[s[4]]
             = characterMap['C']
             = 100

        sum = 4 + 100
            = 104

        i--
        i = 3

Step 6: i >= 0
        i = 3
        3 >= 0

        characterMap[s[i]] < characterMap[s[i + 1]]
        characterMap[s[3]] < characterMap[s[4]]
        characterMap['X'] < characterMap['C']
        10 < 100
        true

        sum -= characterMap[s[i]]
             = characterMap[s[3]]
             = characterMap['X']
             = 10

        sum = 104 - 10
            = 94

        i--
        i = 2

Step 7: i >= 0
        i = 2
        2 >= 0

        characterMap[s[i]] < characterMap[s[i + 1]]
        characterMap[s[2]] < characterMap[s[3]]
        characterMap['M'] < characterMap['X']
        1000 < 10
        false

        sum += characterMap[s[i]]
             = characterMap[s[2]]
             = characterMap['M']
             = 1000

        sum = 94 + 1000
            = 1094

        i--
        i = 1

Step 8: i >= 0
        i = 1
        1 >= 0

        characterMap[s[i]] < characterMap[s[i + 1]]
        characterMap[s[1]] < characterMap[s[2]]
        characterMap['C'] < characterMap['M']
        100 < 1000
        true

        sum -= characterMap[s[i]]
             = characterMap[s[1]]
             = characterMap['C']
             = 100

        sum = 1094 - 100
            = 994

        i--
        i = 0

Step 9: i >= 0
        i = 0
        0 >= 0

        characterMap[s[i]] < characterMap[s[i + 1]]
        characterMap[s[0]] < characterMap[s[1]]
        characterMap['M'] < characterMap['C']
        1000 < 100
        false

        sum += characterMap[s[i]]
             = characterMap[s[0]]
             = characterMap['M']
             = 100

        sum = 994 + 1000
            = 1994

        i--
        i = -1

Step 10: i >= 0
         i = -1
         -1 >= 0

return sum as 1994
```