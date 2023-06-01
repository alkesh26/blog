---
title: Word Ladder - LeetCode
description: Given are the two distinct words beginWord and endWord, and a list denoting wordList of unique words of equal lengths. Find the length of the shortest transformation sequence from beginWord to endWord using C++, Golang, and JavaScript.
date: 2023-06-01
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - Given are the two distinct words beginWord and endWord, and a list denoting wordList of unique words of equal lengths. Find the length of the shortest transformation sequence from beginWord to endWord, c++, golang, javascript"
---

## Problem statement

A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:

* Every adjacent pair of words differs by a single letter.

* Every `si` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.

* `sk == endWord`

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, *return the **number of words** in the **shortest transformation sequence** from beginWord to endWord, or 0 if no such sequence exists.*

Problem statement taken from: <a href='https://leetcode.com/problems/word-ladder' target='_blank'>https://leetcode.com/problems/word-ladder</a>.

**Example 1:**

```
Input: beginWord = 'hit', endWord = 'cog', wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog']
Output: 5
Explanation: One shortest transformation sequence is 'hit' -> 'hot' -> 'dot' -> 'dog' -> cog', which is 5 words long.
```

**Example 2:**

```
Input: beginWord = 'hit', endWord = 'cog', wordList = ['hot', 'dot', 'dog', 'lot', 'log']
Output: 0
Explanation: The endWord 'cog' is not in wordList, therefore there is no valid transformation sequence.
```

**Constraints:**

```
- 1 <= beginWord.length <= 10
- endWord.length == beginWord.length
- 1 <= wordList.length <= 5000
- wordList[i].length == beginWord.length
- beginWord, endWord, and wordList[i] consist of lowercase English letters
- beginWord != endWord
- All the words in wordList are unique.
```

### Solutions for World Ladder

#### Approach 1

The idea is to use [BFS traversal](https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/). Two adjacent words can be considered as nodes of the graph. The count of the number of different characters between the two words can be considered as the distance. If the difference is 1, we return the count. Else we consider every other word in the wordList and check the difference. If the difference is 1, we push the word to the queue.

The algorithmic flow of this approach is as follows:

```
- i = 1
  q = new Queue()
  q.push(beginWord)
  set count = 1

- initialize set<string> s
  s.insert(begin)

- loop while !q.empty()
  - size = q.size()

  - for i = 0; i < size; i++
    - currentWord = q.first()
    - q.pop()

    - if currentWord == endWord
      - return count
    - end if

    // check stores the count of the number of characters different
    // in the currentWord and endWord
    - check = 0

    - for i = 0; i < currentWord.length; i++
      - if currentWord[i] != endWord[i]
        - count++
      - end if
    - end for

    // if the number of different characters is 1, this means
    // we have reached the endWord and return count
    - if check == 1
      - return count
    - end if

    // add the next word to the queue
    - loop for j = 0; j < wordList.size(); j++
      - set diff = 0

      - loop for k = 0; k < currentWord.size(); k++
        - if currentWord[k] != wordList[j][k]
          - increment diff++
        - end if
      - end for

      - if diff == 1
        - if
      - end if
    - end for
  - end for

- end while

// if we cannot reach the endWord, we return -1
- return -1
```

The time complexity of this approach is **O(n * n * m)**. Where m is the length of each string. The space complexity is **O(n)**, as we are using an additional space in terms of the queue.


#### Approach 2

Another approach is to use BFS traversal along with [Trie data structure](https://www.geeksforgeeks.org/introduction-to-trie-data-structure-and-algorithm-tutorials).

The algorithmic flow of this approach is as follows:

```
- set TrieNode *root =  new TrieNode

- q = new Queue()
  q.push(beginWord)

  // create a hash map of visited node
  unordered_map<string, int> map;

  - for i = 0; i < wordList.size; i++
    - map[wordList[i]] = 0
  - end for

  map[beginWord] = 1

  - loop while !q.empty()
    - currentWord = q.first()
    - q.pop()

    - if currentWord == endWord
      - return map[str]
    - end if

    // initialize allPossible vector
    - vector<string> allPossible

    - allPermutations(root, currentWord, allPossible)

    - loop for string x: allPossible
      - if map.count(x) == 0
        - q.push(x)
        - map[x] = map[str] + 1
      - end if
    - end for
  - end while
-

// allPermutations(root, currentWord, allPossible, currentString = '', changed = false, i = 0)
- if root == NULL
  - return
- end if

- if currentWord.size() == currentString.size()
  - if root -> endOfWord
    - allPossible.push_back(currentString)
    - return
  - end if
- end if

- loop for auto x: root -> children
  - currentString.push_back(x.first)

  - if x.first == currentWord[i]
    - allPermutations(x.second, currentWord, allPossible, currentString, changed, i + 1)
  - else if !changed
    - allPermutations(x.second, currentWord, allPossible, currentString, !changed, i + 1)
  - end if

  // BackTrack.
  currentString.pop_back();
- end for
```

Both the time and space complexity of this approach is **O(n * m * m)**. Where m is the length of each string.

#### Approach 3

Another approach to solving this problem via the BFS approach is using a Queue and Set. To find the shortest path, we start from the beginWord and push it into a queue. If the endWord is found, then we return that level of BFS. If we fail to find the endWord in the first iteration, we generate all the words by replacing each character in the string with `a` till `z`. When the endWord is found, we return the length of the shortest chain of words.

##### Algorithm

The algorithmic flow of this approach is as follows:

```
- create set set<string> s(wordList.begin(), wordList.end())

// If the target endWord is not
// present in the set return 0
- if s.find(endWord) == s.end()
  - return 0
- end if

// initialize queue and push the startWord
- queue<string> q
  q.push(beginWord)

- set result = 0
  initialize i, j, size
  char k
  string currentWord
  int wordLength = beginWord.size()

- loop while !q.empty
  - ++result
  - size = q.size()

  // update the queue while traversing with words
  // that are present in the set
  - loop for i = 0; i < size; i++
    - currentWord = q.front()
    - q.pop()

    // loop to traverse every character of the word
    - loop for j = 0; j < wordLength; j++
      - set char originalChar = currentWord[j]

      // replace the current character in the word
      // with every possible alphabhet
      - loop for k = 'a'; k <= 'z'; k++
        - set currentWord[j] = k

        // if we find the endWord, return result + 1
        - if currentWord == endWord
          - return result + 1
        - end if

        // if the currentWord is not in the set, continue
        // the loop else remove it from the set
        - if s.find(currentWord) == s.end()
          - continue
        - end if

        // push the newly generated word to the queue
        q.push(currentWord)
      - end for

      - currentWord[j] = originalChar
    - end for
  - end for

- end while

- return 0
```

The time complexity of the above approach is **O(n)**, and the space complexity is **O(1)**.

Check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        set<string> s(wordList.begin(), wordList.end());

        // If the target endWord is not
        // present in the set return 0
        if(s.find(endWord) == s.end()) {
            return 0;
        }

        queue<string> q;
        // push the beginWord to queue
        q.push(beginWord);

        int result = 0;
        int i, j, size;
        char k;
        string currentWord;
        int wordLength = beginWord.size();

        // While the queue is non-empty
        while(!q.empty()) {
            ++result;
            size = q.size();

            // update the queue while traversing with words
            // that are present in the set
            for(i = 0; i < size; i++) {
                currentWord = q.front();
                q.pop();

                // loop to traverse every character of the word
                for(j = 0; j < wordLength; j++) {
                    char originalChar = currentWord[j];

                    // replace the current character in the word
                    // with every possible alphabhet
                    for(k = 'a'; k <= 'z'; k++) {
                        currentWord[j] = k;

                        // if we find the endWord, return result + 1
                        if(currentWord == endWord) {
                            return result + 1;
                        }

                        // if the currentWord is not in the set, continue
                        // the loop else remove it from the set
                        if(s.find(currentWord) == s.end()) {
                            continue;
                        }
                        s.erase(currentWord);

                        // push the newly generated word to the queue
                        q.push(currentWord);
                    }

                    currentWord[j] = originalChar;
                }
            }
        }

        return 0;
    }
};
```

#### Golang solution

```go
func ladderLength(beginWord string, endWord string, wordList []string) int {
    s := make(map[string]bool)
    for _, word := range wordList {
        s[word] = true
    }

    // If the target endWord is not
    // present in the set return 0
    if _, ok := s[endWord]; !ok {
        return 0
    }

    q := []string{}
    // push the beginWord to queue
    q = append(q, beginWord)

    result := 0
    wordLength := len(beginWord)

    // While the queue is non-empty
    for len(q) > 0 {
        result += 1
        size := len(q)

        // update the queue while traversing with words
        // that are present in the set
        for i := 0; i < size; i++ {
            currentWord := q[0]
            q = q[1:]

            // loop to traverse every character of the word
            for j := 0; j < wordLength; j++ {
                originalChar := currentWord[j]

                // replace the current character in the word
                // with every possible alphabhet
                for k := 'a'; k <= 'z'; k++ {
                    currentWord = replaceAtIndex(currentWord, k, j)

                    // if we find the endWord, return result + 1
                    if currentWord == endWord {
                        return result + 1
                    }

                    // if the currentWord is not in the set, continue
                    // the loop else remove it from the set
                    if _, ok := s[currentWord]; !ok {
                        continue
                    }

                    delete(s, currentWord)

                    // push the newly generated word to the queue
                    q = append(q, currentWord)
                }

                currentWord = replaceAtIndex(currentWord, rune(originalChar), j)
            }
        }
    }

    return 0
}

func replaceAtIndex(in string, r rune, i int) string {
    out := []rune(in)
    out[i] = r
    return string(out)
}
```

#### JavaScript solution

```javascript
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function(beginWord, endWord, wordList) {
    var s = new Set(wordList);

    // If the target endWord is not
    // present in the set return 0
    if(!s.has(endWord)) {
        return 0;
    }

    // variable q will act as queue
    var q = [];
    // push the beginWord to queue
    q.push(beginWord);

    let result = 0;
    let i, j, size;
    let k;
    let currentWord;
    let wordLength = beginWord.length;

    // While the queue is non-empty
    while(q.length !== 0) {
        ++result;
        size = q.length;

        // update the queue while traversing with words
        // that are present in the set
        for(i = 0; i < size; i++) {
            currentWord = q.shift();

            // loop to traverse every character of the word
            for(j = 0; j < wordLength; j++) {
                let originalChar = currentWord[j];

                // replace the current character in the word
                // with every possible alphabhet
                for(k = 97; k <= 122; k++) {
                    currentWord = currentWord.substring(0, j) + String.fromCharCode(k) + currentWord.substring(j + 1);

                    // if we find the endWord, return result + 1
                    if(currentWord === endWord) {
                        return result + 1;
                    }

                    // if the currentWord is not in the set, continue
                    // the loop else remove it from the set
                    if(!s.has(currentWord)) {
                        continue;
                    }
                    s.delete(currentWord);

                    // push the newly generated word to the queue
                    q.push(currentWord);
                }

                currentWord = currentWord.substring(0, j) + originalChar + currentWord.substring(j + 1);
            }
        }
    }

    return 0;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: beginWord = 'hit', endWord = 'cog', wordList = ['hot', 'dot', 'dog', 'lot', 'log', 'cog']

Step 1: set<string> s(wordList.begin(), wordList.end())
        s = ['hot', 'dot', 'dog', 'lot', 'log', 'cog']

Step 2: if s.find(endWord) == s.end()
           s.find('cog') == s.end()
           false

Step 3: queue<string> q
        q = []
        q.push(startWord)
        q = ['hit']

        int result = 0
        int i, j, size
        char k
        string currentWord
        wordLength = beginWord.size()
                   = 'hit'.size()
                   = 3

Step 4: loop while !q.empty()
          q = ['hit']
          q.empty() = false
          !q.empty()
          true

          ++result
          result = 1

          size = q.size()
               = 1

          loop for i = 0; i < size;
            i < size
            0 < 1
            true

            currentWord = q.front()
                        = 'hit'

            q.pop()
            q = []

            loop for j = 0; j < wordLength
              j < wordLength
              0 < 3
              true

              originalChar = currentWord[j]
                           = 'hit'[0]
                           = 'h'

              loop for k = 'a'; k <= 'z';
                a <= 'z'
                true

                currentWord[j] = k
                currentWord[0] = 'a'
                currentWord = 'ait'

                if currentWord == endWord
                   'ait' == 'cog'
                   false

                if s.find(currentWord) == s.end()
                   s.find('ait') == s.end()
                   // as the set s does not include 'ait' so the condition is true
                   s = ['hot', 'dot', 'dog', 'lot', 'log', 'cog']
                   true

                   continue

                k++

                k = 'b'

                the loop continues till 'z' as we don't have any word
                'bit', 'cit',...'hit'...'zit' in the list.

            currentWord[j] = originalChar
            currentWord[0] = 'h'
            currentWord = 'hit'

            j++
            j = 1

            loop for j < wordLength
              j < wordLength
              1 < 3
              true

              originalChar = currentWord[j]
                           = 'hit'[1]
                           = 'i'

              loop for k = 'a'; k <= 'z';
                a <= 'z'
                true

                currentWord[j] = k
                currentWord[1] = 'a'
                currentWord = 'hat'

                if currentWord == endWord
                   'hat' == 'cog'
                   false

                if s.find(currentWord) == s.end()
                   s.find('hat') == s.end()
                   // as the set s does not include 'hat' so the condition is true
                   s = ['hot', 'dot', 'dog', 'lot', 'log', 'cog']
                   true

                   continue

                k++

                k = 'b'

                the loop continues till 'n' as we don't have any word
                'hbt', 'hct', 'hdt'..'hnt' in the list.

                when k = 'o'
                we get 'hot'

                currentWord[j] = k
                currentWord[1] = 'o'
                currentWord = 'hot'

                if currentWord == endWord
                   'hot' == 'cog'
                   false

                if s.find(currentWord) == s.end()
                   s.find('hot') == s.end()
                   // as the set s does include 'hot' so the condition is false
                   s = ['hot', 'dot', 'dog', 'lot', 'log', 'cog']
                   false

                s.erase(currentWord)
                s.erase('hot')
                s = ['dot', 'dog', 'lot', 'log', 'cog']

                q.push(currentWord)
                q.push('hot')
                q = ['hot']

                The loop continues till k is equal to `z` and the loop repeats.

The sequence we follow goes like
'hit' -> 'hot' -> 'dot' -> 'dog' -> 'cog'

We return the result as 5.
```
