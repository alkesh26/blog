---
title: LeetCode - Count of Smaller Numbers After Self
description: LeetCode - return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i] using C++, Golang, and JavaScript.
date: 2023-04-01
hashtags: ["leetcode", "algorithms", "golang", "cpp", "javascript"]
categories: "leetcode - return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i], c++, golang, javascript"
---

## Problem statement

Given an integer array `nums`, return an *integer array counts where counts[i] is the number of smaller elements to the right of nums[i]*.

Problem statement taken from: <a href='https://leetcode.com/problems/count-of-smaller-numbers-after-self' target='_blank'>https://leetcode.com/problems/count-of-smaller-numbers-after-self</a>

**Example 1:**

```
Input: nums = [5, 2, 6, 1]
Output: [2, 1, 1, 0]
Explanation:
To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is only 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller element.
```

**Example 2:**

```
Input: nums = [-1]
Output: [0]
```

**Example 3:**

```
Input: nums = [-1, -1]
Output: [0, 0]
```

**Constraints:**

```
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4
```

### Explanation

#### Brute force solution

A naive approach is to use nested loops. The outer loop selects all the elements from left to right. The inner loop iterates through all the elements on the right side of the selected element and update the count of elements less than the number.

A C++ snippet of this approach is as below:

```cpp
vector<int> countSmaller(vector<int>& nums) {
    int i, j;
    vector<int> ans;
    int n = nums.size();

    for (i = 0; i < n; i++)
        ans[i] = 0;

    for (i = 0; i < n; i++) {
        for (j = i + 1; j < n; j++) {
            if (nums[j] < nums[i])
                ans[i]++;
        }
    }
}
```

The time complexity of this approach is **O(n^2)**. The space complexity is **O(n)**.

#### AVL tree

In this approach, we use a Self-balancing Binary Search Tree, an AVL tree.

We iterate the array from right to left and insert the elements one by one in the AVL tree. While inserting a new key in the AVL tree, we compare the element with the root value of the tree. If the element is greater than the root, then all the nodes in the left subtree are smaller than the element. We add the size of the left subtree to the element being inserted. We recursively follow the same approach for all the nodes.

A C++ snippet of this approach is as follows:

```cpp
struct node {
    int key;
    struct node* left;
    struct node* right;
    int height;
    int size;
};

int height(struct node* node) {
    return node != NULL ? node->height : 0;
}

int size(struct node* node) {
    return node != NULL ? node->size : 0;
}

int max(int a, int b) { return (a > b) ? a : b; }

struct node* newNode(int key) {
    struct node* node = (struct node*)malloc(sizeof(struct node));
    node->key = key;
    node->left = NULL;
    node->right = NULL;
    node->height = 1;
    node->size = 1;

    return node;
}

struct node* rightRotate(struct node* y) {
    struct node* leftTree = y->left;
    struct node* T2 = leftTree->right;

    leftTree->right = y;
    y->left = T2;

    y->height = max(height(y->left), height(y->right)) + 1;
    leftTree->height = max(height(leftTree->left), height(leftTree->right)) + 1;

    y->size = size(y->left) + size(y->right) + 1;
    leftTree->size = size(leftTree->left) + size(leftTree->right) + 1;

    return x;
}

struct node* leftRotate(struct node* x) {
    struct node* y = x->right;
    struct node* T2 = y->left;

    y->left = x;
    x->right = T2;

    x->height = max(height(x->left), height(x->right)) + 1;
    y->height = max(height(y->left), height(y->right)) + 1;

    x->size = size(x->left) + size(x->right) + 1;
    y->size = size(y->left) + size(y->right) + 1;

    return y;
}

int getBalance(struct node* node) {
    return node != NULL ? height(node->left) - height(node->right) : 0;
}

struct node* insert(struct node* node, int key, int* count) {
    if (node == NULL)
        return (newNode(key));

    if (key < node->key)
        node->left = insert(node->left, key, count);
    else {
        node->right = insert(node->right, key, count);
        *count = *count + size(node->left) + 1;
    }

    node->height = max(height(node->left), height(node->right)) + 1;
    node->size = size(node->left) + size(node->right) + 1;

    int balance = getBalance(node);

    if (balance > 1 && key < node->left->key)
        return rightRotate(node);

    if (balance < -1 && key > node->right->key)
        return leftRotate(node);

    if (balance > 1 && key > node->left->key) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }

    if (balance < -1 && key < node->right->key) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}

void constructLower(int nums[]) {
    int i, j;
    int n = nums.size();
    struct node* root = NULL;

    for (i = 0; i < n; i++)
        ans[i] = 0;

    for (i = n - 1; i >= 0; i--) {
        root = insert(root, nums[i], &ans[i]);
    }
}
```

The time complexity of this approach is **O(n * log(n))**. The space complexity is **O(n)**.

#### Merge Sort

The idea is to use the MergeSort algorithm. When merging back the array, as we do in merge sort, we sort the array elements in descending order and keep track of the smaller elements.

We know how the merge sort work, let's check the algorithm first.

#### Algorithm

```
//countSmaller(nums)
- initialize vector pair v
  set n = nums.size
  set ans = vector<int> ans(n, 0)

- loop for i = 0; i < n; i++
  // push the element and the index
  - v.push_back({ nums[i], i })
- for end

- mergesort(v, ans, 0, n - 1)

- return ans

// mergesort(v, ans, i, j)
- if i < j
  - set mid = (i + j) / 2

  //recursively call left half of the array
  - mergesort(v, ans, i, mid)

  //recursively call right half of the array
  - mergesort(v, ans, mid + 1, j)

  // merge the array and sort the elements
  - merge(v, ans, i, mid, j)
- if end

// merge(v, ans, l, mid, h)
- initialize vector pair temp
  set i = l
  set j = mid + 1

- loop while i < mid + 1 && j <= h
  - if v[i].first > v[j].first
    // add up all the elements that are less than this element
    // and these elements are present in the 2nd half of the array
    - set ans[v[i].second] += (h - j + 1)

    - temp.push_back(v[i])

    - increment i, i++
  - else
    - temp.push_back(v[j])

    - increment j, j++
  - if end
- while end

- loop while i <= mid
  - temp.push_back(v[i])
  - i++
- while end

- loop while j <= h
  - temp.push_back(v[j])
  - j++
- while end

- loop for k = 0, i = l; i <= h; i++, k++
  - v[i] = temp[k]
- for end
```

The time complexity of this approach is **O(n * log(n))**. The space complexity is **O(n)**.

Let's check our algorithm in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
class Solution {
public:
    void merge(vector<pair<int, int>> &v, vector<int> &ans, int l, int mid, int h) {
        vector<pair<int, int>> temp;
        int i = l;
        int j = mid + 1;

        while (i < mid + 1 && j <= h) {
            if (v[i].first > v[j].first) {
                ans[v[i].second] += (h - j + 1);
                temp.push_back(v[i]);
                i++;
            } else {
                temp.push_back(v[j]);
                j++;
            }
        }

        while (i <= mid)
            temp.push_back(v[i++]);

        while (j <= h)
            temp.push_back(v[j++]);

        for (int k = 0, i = l; i <= h; i++, k++)
            v[i] = temp[k];
    }

    void mergesort(vector<pair<int, int>> &v, vector<int> &ans, int i, int j) {
        int mid;

        if(i < j) {
            mid = (i + j) / 2;

            mergesort(v, ans, i, mid);

            mergesort(v, ans, mid + 1, j);

            merge(v, ans, i, mid, j);
        }
    }

    vector<int> countSmaller(vector<int>& nums) {
        vector<pair<int, int>> v;
        int n = nums.size();
        vector<int> ans(n, 0);

        for (int i = 0; i < n; i++) {
            v.push_back({nums[i], i});
        }

        mergesort(v, ans, 0, n - 1);

        return ans;
    }
};
```

#### Golang solution

```go
type Pair struct {
	Val   int
	Index int
}

func merge(v []Pair, ans []int, l, mid, h int) {
	temp := make([]Pair, h - l +1)
	i, j, k := l, mid + 1, 0

    for i <= mid && j <= h {
		if v[i].Val > v[j].Val {
            ans[v[i].Index] += h - j + 1
			temp[k] = v[i]
			i++

		} else {
			temp[k] = v[j]
			j++
		}

		k++
	}

	for i <= mid {
		temp[k] = v[i]
		i++
		k++
	}
	for j <= h {
		temp[k] = v[j]
		j++
		k++
	}

	for i := l; i <= h; i++ {
		v[i] = temp[i - l]
	}
}

func mergeSort(v []Pair, ans []int, i, j int) {
	if i < j {
		mid := (i + j)/2
		mergeSort(v, ans, i, mid)
		mergeSort(v, ans, mid + 1, j)
		merge(v, ans, i, mid, j)
	}
}

func countSmaller(nums []int) []int {
	n := len(nums)
	ans := make([]int, n)
	v := make([]Pair, n)
	for index, value := range nums {
		v[index] = Pair{value, index}
	}

	mergeSort(v, ans, 0, n - 1)

	return ans
}
```

#### JavaScript solution

```javascript
var merge = function(v, ans, l, mid, h) {
    let temp = [];
    let i = l, j = mid + 1;

    while(i < mid + 1 && j <= h) {
        if(j < v.length && v[i][0] > v[j][0]) {
            ans[v[i][1]] += (h - j + 1);
            temp.push(v[i]);
            i++;
        } else {
            temp.push(v[j]);
            j++;
        }
    }

    while (i <= mid)
        temp.push(v[i++]);

    while (j <= h)
        temp.push(v[j++]);

    for (let k = 0, i = l; i <= h; i++, k++)
        v[i] = temp[k];
}

var mergesort = function(v, ans, i, j) {
    let mid;

    if(i < j) {
        mid = Math.round((i + j) / 2)-1;

        mergesort(v, ans, i, mid);

        mergesort(v, ans, mid + 1, j);

        merge(v, ans, i, mid, j);
    }
}

var countSmaller = function(nums) {
    let v = [];
    let n = nums.length;
    let ans = new Array(n);

    for(let i = 0; i < n; i++) {
        let x = [nums[i], i];
        v.push(x);
    }

    for(let i = 0; i < n; i++) {
        ans[i] = 0;
    }

    mergesort(v, ans, 0, n - 1);

    return ans;
};
```

Let's dry-run our algorithm for a few examples to see how the solution works.

```
Input: nums = [5, 2, 6, 1]

// countSmaller
Step 1: vector<pair<int, int>> v

        int n = nums.size()
              = 4

        vector<int> ans(n, 0)

Step 2: loop for int i = 0; i < n; i++
            v.push_back({nums[i], i});
        for end

        v will be [[5, 0], [2, 1], [6, 2], [1, 3]]

Step 3: mergesort(v, ans, 0, n - 1)
        mergesort(v, ans, 0, 3)

// mergesort(v, ans, 0, 3)
Step 4: if i < j
         0 < 3
         true

         mid = i + j / 2
             = 0 + 3 / 2
             = 1

         mergesort(v, ans, i, mid)
         mergesort(v, ans, 0, 1)

// mergesort(v, ans, 0, 1)
Step 5: if i < j
         0 < 1
         true

         mid = i + j / 2
             = 0 + 1 / 2
             = 0

         mergesort(v, ans, i, mid)
         mergesort(v, ans, 0, 0)

// mergesort(v, ans, 0, 0)
Step 6: if i < j
         0 < 1
         false

         we rollback to step 5

// mergesort(v, ans, 0, 1)
Step 7: if i < j
         0 < 1
         true

         mid = i + j / 2
             = 0 + 1 / 2
             = 0

         mergesort(v, ans, i, mid)
         mergesort(v, ans, 0, 0)    // evaluated in Step 6

         mergesort(v, ans, mid + 1, j)
         mergesort(v, ans, 0 + 1, 3)
         mergesort(v, ans, 1, 3)

// mergesort(v, ans, 1, 3)
Step 8: if i < j
         1 < 3
         true

         mid = i + j / 2
             = 1 + 3 / 2
             = 2

         mergesort(v, ans, i, mid)
         mergesort(v, ans, 1, 2)

         This recursion occurs till we get each element as
         [5], [2], [6], [1]

         We then reach a step where we first merge 6 and 1 and call
         merge(v, ans, i, mid, j)
         merge(v, ans, 2, 2, 3)

// merge(v, ans, 2, 2, 3)
Step 9: vector<pair<int, int>> temp
        int i = l
              = 2
        int j = mid + 1
              = 2 + 1
              = 3

        loop while i < mid + 1 && j <= h
          2 < 2 + 1 && 3 <= 3
          true

          if v[i].first > v[j].first
             v[2].first > v[3].first
             6 > 1
             true

             ans[v[i].second] = ans[v[i].second] + (h - j + 1)
             ans[v[2].second] = ans[v[2].second] + 3 - 3 + 1
                              = 0 + 1
                              = 1
             ans = [0, 0, 1, 0]

             temp.push_back(v[i])
             temp = [[6, 2]]

             i++
             i = 3

          if end

        loop while i < mid + 1 && j <= h
          3 < 2 + 1 && 3 <= 3
          false

        loop while i <= mid
          3 <= 2
          false

        loop while j <= h
          3 <= 3
          true

          temp.push_back(v[j])
          temp.push_back(v[3])
          temp = [[6, 2], [1, 3]]

          j++
          j = 4

        loop while j <= h
          4 <= 3
          false

        loop for int k = 0, i = l; i <= h;
          k = 0
          i = 2

          i <= h
          2 <= 3

          v[i] = temp[k]
          v[2] = temp[0]
               = [6, 2]

          i++
          i = 3

          k++
          k = 1

        loop for i <= h
          3 <= 3
          true

          k = 1
          i = 3

          v[i] = temp[k]
          v[3] = temp[1]
               = [1, 3]

          i++
          i = 4

          k++
          k = 2

        loop for i <= h
          4 <= 3
          false

        We backtrack to step where we merge 5 and 2.

        We then backtrack to step where we merge [5, 2] and [6, 1]

We keep updating the ans array and get the final result as [2, 1, 1, 0].
```
