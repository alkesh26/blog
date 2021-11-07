---
title: LeetCode - Letter Combinations of a Phone Number
description: LeetCode - Letter combinations of a phone number using C++, Golang and Javascript.
date: 2021-08-08
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - letter combinations of a phone number, c++, golang, javascript"
---

![Container](./../telephone-keypad.png)

### Problem statement

Given a string containing digits from **2-9** inclusive,
return all possible letter combinations that the number could represent.
Return the answer in **any order**.

A mapping of digit to letters (just like on the telephone buttons) is given below.
Note that 1 does not map to any letters.

Problem statement taken from: <a href="https://leetcode.com/problems/letter-combinations-of-a-phone-number" target="_blank">https://leetcode.com/problems/letter-combinations-of-a-phone-number</a>

**Example 1:**

```
Input: digits = "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
```

**Example 2:**

```
Input: digits = ""
Output: []
```

**Example 3:**

```
Input: digits = "2"
Output: ["a", "b", "c"]
```

**Constraints:**

```
- 0 <= digits.length <= 4
- digits[i] is a digit in the range ['2', '9']
```

### Explanation

The problem can be solved using both iterative and recursion approaches.
We will discuss the recursive solution in the blog.

#### Recursion

Each digit (except 0 and 1) can represent 3 to 4 different alphabets.
To store this data we can use a hash map where the key will be the digit and
its value will be the corresponding string.

The recursive function will try all the alphabets,
mapped to the current digit in alphabetic order,
and again call the recursive function for the next digit and
will pass on the current output string.

For example,
if the number is 34,
digit 3 is mapped to "def".
Three recursive functions will be called
for each character d, e, and f.
And for digit 4 which is mapped to "ghi", we
append characters g, h, and i to all d, e, and f.
This will generate dg, dh, di, eg, eh, ei and
fg, fh, fi.

#### Algorithm

```
- initialize hashmap with key as digit and value with the corresponding string.

- initialize the result as an empty array.

- if digits.size() != 0
  - call recursive function generateCombination("", digits, 0)

- return result.

// generateCombination(current, digits, index)
- if index == digits.size
  - append current in result.

- else
  - currentDigit = digits[index]
  - string mapping = hashmap[currentDigit];
  - Loop
    - for(int i = 0; i < mapping.size(); i++) {
        generateCombination(current + mapping[i], digits, index + 1);
      }
```

#### C++ solution

```cpp
class Solution {
private:
    map<char, string> m = {
        {'2', "abc"}, {'3', "def"}, {'4', "ghi"},
        {'5', "jkl"}, {'6', "mno"}, {'7', "pqrs"},
        {'8', "tuv"}, {'9', "wxyz"}
    };

    vector<string> result;

public:
    vector<string> letterCombinations(string digits) {
        if(digits.size() != 0){
            generateCombination("", digits, 0);
        }

        return result;
    }

    void generateCombination(string current, string digits, int index) {
        if(index == digits.size()){
            result.push_back(current);
        } else {
            char currentDigit = digits[index];
            string mapping = m[currentDigit];
            for(int i = 0; i < mapping.size(); i++){
                generateCombination(current + mapping[i], digits, index+1);
            }
        }
    }
};
```

#### Golang solution

```go
var letters = [...]string{"", "", "abc", "def", "ghi", "jkl",
	"mno", "pqrs", "tuv", "wxyz"}

func letterCombinations(digits string) []string {
    if len(digits) == 0 {
		return nil
	}

	var result []string

    generateCombination("", digits, &result)

	return result
}

func generateCombination(current string, digits string, ans *[]string) {
	if len(digits) == 0 {
		*ans = append(*ans, current)
		return
	}

	currentDigit, _ := strconv.Atoi(string(digits[0]))

	for i := 0; i < len(letters[currentDigit]); i++ {
		generateCombination(current + string(letters[currentDigit][i]), digits[1:], ans)
	}
}
```

#### Javascript solution

```javascript
const map = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz',
    };

let result = [];

var letterCombinations = function(digits) {
    if (!digits) return [];

    let current = [];

    generateCombination(current, digits, 0);

    return result;
};

function generateCombination(current, digits, index) {
    if (index === digits.length) {
        result.push(current.join(''));
        return;
    }

    for (const char of map[digits[index]]) {
        current.push(char);
        generateCombination(current, digits, index + 1);
        current.pop();
    }
}
```

Let's dry-run our algorithm to see how the solution works.

```
Input: digits = "23"

Step 1: map<char, string> m = {
            {'2', "abc"}, {'3', "def"}, {'4', "ghi"},
            {'5', "jkl"}, {'6', "mno"}, {'7', "pqrs"},
            {'8', "tuv"}, {'9', "wxyz"}
        };

        vector<string> result;

Step 2: digits.size() == 0
        2 == 0
        false

Step 3: generateCombination("", digits, 0)

Step 4: index == digits.size()
        0 == 2
        false

        char currentDigit = digits[index];
        currentDigit = digits[0];
        currentDigit = "2"

        string mapping = m[currentDigit];
        mapping = m["2"]
        mapping = "abc"

        loop 1.0:
        for(int i = 0; i < mapping.size(); i++)
        0 < 2

        generateCombination(current + mapping[i], digits, index + 1)
        generateCombination("" + mapping[0], "23", 0 + 1)
        generateCombination("" + "a", "23", 0 + 1)
        generateCombination("a", "23", 1)

Step 5: generateCombination("a", "23", 1)
        index == digits.size()
        1 == 2
        false

        char currentDigit = digits[1];
        currentDigit = digits[1];
        currentDigit = "3"

        string mapping = m[currentDigit];
        mapping = m["3"]
        mapping = "def"

        loop 1.1:
        for(int i = 0; i < mapping.size(); i++)
        0 < 3

        generateCombination(current + mapping[i], digits, index + 1)
        generateCombination("a" + mapping[0], "23", 1 + 1)
        generateCombination("a" + "d", "23", 1 + 1)
        generateCombination("ad", "23", 2)

Step 6: generateCombination("ad", "23", 2)
        index == digits.size()
        2 == 2
        true

        result.push_back(current)
        result.push_back("ad")
        result = ["ad"]

Step 7: Algo flow returns to loop 1.1

        loop 1.2:
        for(int i = 0; i < mapping.size(); i++)
        // since i was 0 it is incremented i++ to 1

        i < mapping.size()
        1 < 3
        true

        generateCombination(current + mapping[i], digits, index + 1)
        generateCombination("a" + mapping[1], "23", 1 + 1)
        generateCombination("a" + "e", "23", 1 + 1)
        generateCombination("ae", "23", 2)

Step 8: generateCombination("ae", "23", 2)
        index == digits.size()
        2 == 2
        true

        result.push_back(current)
        result.push_back("ae")
        result = ["ad", "ae"]

Step 9: Algo flow returns to loop 1.2

        loop 1.3:
        for(int i = 0; i < mapping.size(); i++)
        // since i was 1 it is incremented i++ to 2

        i < mapping.size()
        2 < 3
        true

        generateCombination(current + mapping[i], digits, index + 1)
        generateCombination("a" + mapping[2], "23", 1 + 1)
        generateCombination("a" + "f", "23", 1 + 1)
        generateCombination("af", "23", 2)

Step 10: generateCombination("af", "23", 2)
        index == digits.size()
        2 == 2
        true

        result.push_back(current)
        result.push_back("af")
        result = ["ad", "ae", "af"]

Step 11: Algo flow returns to loop 1.3

        loop 1.4:
        for(int i = 0; i < mapping.size(); i++)
        // since i was 2 it is incremented i++ to 3

        i < mapping.size()
        3 < 3
        false

Step 12: Algo flow returns to loop 1.0

        loop 1.5:
        for(int i = 0; i < mapping.size(); i++)
        // since i was 0 it is incremented i++ to 1

        i < mapping.size()
        1 < 3
        true

        generateCombination(current + mapping[i], digits, index + 1)
        generateCombination("" + mapping[1], "23", 0 + 1)
        generateCombination("" + "b", "23", 0 + 1)
        generateCombination("b", "23", 1)

Step 13: generateCombination("b", "23", 1)

        index == digits.size()
        1 == 2
        false

        char currentDigit = digits[1];
        currentDigit = digits[1];
        currentDigit = "3"

        string mapping = m[currentDigit];
        mapping = m["3"]
        mapping = "def"

        loop 2.1:
        for(int i = 0; i < mapping.size(); i++)
        0 < 3

        generateCombination(current + mapping[i], digits, index + 1)
        generateCombination("b" + mapping[0], "23", 1 + 1)
        generateCombination("b" + "d", "23", 1 + 1)
        generateCombination("bd", "23", 2)

Step 14: generateCombination("bd", "23", 2)
        index == digits.size()
        2 == 2
        true

        result.push_back(current)
        result.push_back("bd")
        result = ["ad", "ae", "af", "bd"]

Step 15: Algo flow returns to loop 2.1

        loop 2.2:
        for(int i = 0; i < mapping.size(); i++)
        // since i was 0 it is incremented i++ to 1

        i < mapping.size()
        1 < 3
        true

        generateCombination(current + mapping[i], digits, index + 1)
        generateCombination("b" + mapping[1], "23", 1 + 1)
        generateCombination("b" + "e", "23", 1 + 1)
        generateCombination("be", "23", 2)

Step 16: generateCombination("be", "23", 2)
        index == digits.size()
        2 == 2
        true

        result.push_back(current)
        result.push_back("be")
        result = ["ad", "ae", "af", "bd", "be"]

Step 17: Algo flow returns to loop 2.2

        loop 2.3:
        for(int i = 0; i < mapping.size(); i++)
        // since i was 1 it is incremented i++ to 2

        i < mapping.size()
        2 < 3
        true

        generateCombination(current + mapping[i], digits, index + 1)
        generateCombination("b" + mapping[1], "23", 1 + 1)
        generateCombination("b" + "f", "23", 1 + 1)
        generateCombination("bf", "23", 2)

Step 18: generateCombination("bf", "23", 2)
        index == digits.size()
        2 == 2
        true

        result.push_back(current)
        result.push_back("bf")
        result = ["ad", "ae", "af", "bd", "be", "bf"]

// similar steps are triggered for c with d, e, and f.

The output is
["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
```
