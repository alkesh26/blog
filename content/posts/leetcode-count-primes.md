---
title: LeetCode - Count Primes
description: LeetCode - return number of primes strictly less than n using C++, Golang and Javascript.
date: 2021-12-16
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "return number of primes strictly less than n, c++, golang, javascript"
---

## Problem statement

Given an integer *n*, return *the number of prime numbers that are strictly less than n*.

**Example 1:**

```
Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.
```

**Example 2:**

```
Input: n = 0
Output: 0
```

**Example 3:**

```
Input: n = 1
Output: 0
```

**Constraints**

```
- 0 <= n <= 5 * 10^6
```

### Explanation

#### Brute force approach

The simplest solution is to check every number from 3 to n and verify if it's prime or not.

A C++ snippet of this approach will look as below:

```cpp
bool isPrime(int n){
    if (n <= 1)
        return false;

    for (int i = 2; i < n; i++)
        if (n % i == 0)
            return false;

    return true;
}

int printPrime(int n){
    // since 2 is prime we set count to 1
    int count = 1;

    for (int i = 3; i < n; i++) {
        if (isPrime(i))
            count++;
    }

    return count;
}
```

The time complexity of the above approach is **O(N^2)**.

#### Square root approach

The brute approach can be optimized further by iterating till the square root of the number.

Let's check this approach using C++.

```cpp
bool isPrime(int n){
    if (n <= 1)
        return false;
    if (n <= 3)
        return true;

    if (n % 2 == 0 || n % 3 == 0)
        return false;

    for (int i = 5; i * i <= n; i = i + 6)
        if (n % i == 0 || n % (i + 2) == 0)
            return false;

    return true;
}

int printPrime(int n){
    int count = 0;

    for (int i = 2; i < n; i++) {
        if (isPrime(i))
            count++;
    }

    return count;
}
```

The time complexity of this approach reduces to **O(N^(3/2))**.

#### Sieve of Eratosthenes

The best approach is to use the Sieve of Eratosthenes algorithm.

Let's check the algorithm:

```
- return 0 if n <= 2

- initialize bool primes array
  bool primes[n]

- initialize i, j and set count = 0

- set all primes array value to true
  - loop for i = 2; i < n; i++
    - primes[i] = true

- loop for i = 2; i <= sqrt(n); i++
  - if primes[i]
    - loop for j = i + i; j < n; j += i
      - primes[j] = false

- count all primes[i] = true
  loop for i = 2; i < n; i++
    - if primes[i]
      - count = count + 1

- return count
```

The time complexity of this approach is O(N * loglog(N)).

#### C++ solution

```cpp
class Solution {
public:
    int countPrimes(int n) {
        if(n <= 2)
            return 0;

        bool primes[n];
        int i, j, count = 0;

        for(i = 2; i < n; i++){
            primes[i] = true;
        }

        for(i = 2; i <= sqrt(n); i++){
            if(primes[i]){
                for(j = i+i; j < n; j += i)
                    primes[j] = false;
            }
        }

        for(i = 2; i < n; i++)
            if(primes[i])
                count++;

        return count;
    }
};
```

#### Golang solution

```go
func countPrimes(n int) int {
    if n <= 2 {
        return 0
    }

    primes := make([]bool, n)
    count := 0

    for i := 2; i < n; i++ {
        primes[i] = true
    }

    for i := 2; i <= int(math.Sqrt(float64(n))); i++ {
        if primes[i] {
            for j := i+i; j < n; j += i {
                primes[j] = false
            }
        }
    }

    for i := 2; i < n; i++{
        if primes[i] {
            count++
        }
    }

    return count
}
```

#### Javascript solution

```javascript
var countPrimes = function(n) {
    if( n <= 2 ) {
        return 0;
    }

    let primes = [];
    let i, j, count = 0;

    for( i = 2; i < n; i++ ){
        primes[i] = true;
    }

    for( i = 2; i <= Math.sqrt(n); i++ ){
        if( primes[i] ){
            for( j = i + i; j < n; j += i )
                primes[j] = false;
        }
    }

    for( i = 2; i < n; i++ )
        if( primes[i] )
            count++;

    return count;
};
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: n = 10

Step 1: if n <= 2
        10 < 2
        false

Step 2: bool primes[n]
        int i, j, count = 0

Step 3: loop for(i = 2; i < n; i++){
            primes[i] = true
        }

        so all values from primes[0] to primes[9] are set to true.

Step 4: loop for i = 2; i <= sqrt(n)
          i <= sqrt(10)
          2 <= 3
          true

          if primes[2]
            true

          loop for j = i + i; j < n
            j = i + i
              = 4

            j < n
            4 < 10
            true

            primes[j] = false
            primes[4] = false

            j += i
            j = j + i
              = 4 + 2
              = 6

            j < n
            6 < 10
            true

            primes[j] = false
            primes[6] = false

            j += i
            j = j + i
              = 6 + 2
              = 8

            j < n
            8 < 10
            true

            primes[j] = false
            primes[8] = false

            j += i
            j = j + i
              = 8 + 2
              = 10

            j < n
            10 < 10
            false

            i++
            i = 3

Step 5: i <= sqrt(10)
        3 <= 3
        true

        if primes[3]
            true

        loop for j = i + i; j < n
             j = i + i
               = 6

        j < n
        6 < 10
        true

        primes[j] = false
        primes[6] = false

        j += i
        j = j + i
          = 6 + 3
          = 9

        j < n
        9 < 10
        true

        primes[j] = false
        primes[9] = false

        j += i
        j = j + i
          = 9 + 3
          = 12

        j < n
        12 < 10
        false

        i++
        i = 4

Step 6: i <= sqrt(10)
        4 <= 3
        false

Step 7: loop for i = 2; i < n; i++
              if primes[i]
                count++

        primes from index 2
        = [true, true, false, true, false, true, false, false]
        so count of true is 4.

Step 8: return count

So we return the answer as 4.
```
