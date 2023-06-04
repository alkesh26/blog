---
title: Kth Largest Element in an Array
description: Find the Kth Largest element in an Array using C++, Golang, and JavaScript.
date: 2023-06-04
hashtags: ["programming", "algorithms", "golang", "cpp", "javascript"]
categories: "find the Kth largest element in an array, c++, golang, javascript"
---

## Problem statement

Given an integer array `nums` and an integer `k`, *return the Kth largest element in the array*.

Note that it is the `Kth` largest element in the sorted order, not the `Kth` distinct element.

You must solve it in `O(n)` time complexity.

Problem statement taken from: <a href='https://leetcode.com/problems/Kth-largest-element-in-an-array' target='_blank'>https://leetcode.com/problems/Kth-largest-element-in-an-array</a>.

**Example 1:**

```
Input: nums = [3, 2, 1, 5, 6, 4], k = 2
Output: 5
```

**Example 2:**

```
Input: nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4
Output: 4
```

**Constraints:**

```
- 1 <= k <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4
```

### Solutions for Kth Largest Element in an Array

#### Approach 1: Bubble sort

We can use [Bubble sort](https://www.geeksforgeeks.org/bubble-sort/) to find the Kth largest element in an array.

1. We modify the Bubble sort to run the outer loop at most K times.
2. At the end of the last loop, print the K - 1 th element.

A C++ snippet of this approach is as follows:

```cpp
// A function to implement bubble sort
void bubbleSort(vector<int>& nums, int n){
    int i, j;

    // run the outer loop k - 1 times
    for (i = 0; i < k; i++)
        for (j = 0; j < n - i - 1; j++)
            if (nums[j] > nums[j + 1])
                swap(nums[j], nums[j + 1]);

    return nums[k - 1];
}
```

The time complexity of Bubble sort is **O(n ^ 2)**. But in this case, we are running the outer loop k times. The time complexity of this approach is **O(n * k)**.

We are not using additional space, so the space complexity is **O(1)**.

#### Approach 2: Sorting

The naive approach is to sort the given array in descending order and return the k - 1 index (0 – Based indexing) element.

A C++ snippet of the above approach looks as below:

```cpp
// C++ code for K largest elements in an array
int findKthLargest(vector<int>& nums, int k) {
    int n = nums.size();

    sort(nums, nums + n, greater<int>());

    return nums[k - 1];
}
```

The time complexity of this approach is **O(n * log(n))** and the space complexity is **O(1)**.

#### Approach 3: Min-Heap

We create a [Min Heap](https://en.wikipedia.org/wiki/Min-max_heap) of size K and compare the root of the Min Heap with other elements on the array. If the element is greater than the root, we swap the values and heapify the heap.

We need to execute the following steps to find the Kth largest element in an array:

1. Build a Min Heap for the first k elements of the array: nums[0] to nums[k - 1].
2. Iterater over the remaining elements from nums[k] to nums[n - 1].
3. Compare the array element with the root of the heap.
4. If the element is greater than the root, heapify the heap else, do nothing.
5. After the above steps are done, our Min heap has the K largest elements of the array, and the root is the Kth largest element.

A C++ snippet of this approach is as follows:

```cpp
int swap(int& x, int& y) {
    int temp = x;
    x = y;
    y = temp;
}

// Min Heap Class
class MinHeap {
    int size;
    int* arr;

public:
    MinHeap(int size, int input[]);
    void heapify(int i);
    void buildHeap();
};

MinHeap::MinHeap(int size, int input[]) {
    this->size = size;
    this->arr = input;

    buildHeap();
}

// Min Heapify function, that assumes
// 2 * i + 1 and 2 * i + 2 are min heap and
// fix min heap property for i
void MinHeap::heapify(int i) {
    // if Leaf Node, simply return
    if (i >= size / 2)
        return;

    int smallest;

    // index of left node
    int left = 2 * i + 1;

    // index of right node
    int right = 2 * i + 2;

    // Select minimum from left node and
    // current node i, and store the minimum
    // index in smallest variable
    smallest = arr[left] < arr[i] ? left : i;

    // If right child exist, compare and
    // update the smallest variable
    if (right < size)
        smallest = arr[right] < arr[smallest] ? right : smallest;

    // If Node i violates the min heap
    // property, swap  current node i with
    // smallest to fix the min-heap property
    // and recursively call heapify for node smallest.
    if (smallest != i) {
        swap(arr[i], arr[smallest]);
        heapify(smallest);
    }
}

// Build Min Heap
void MinHeap::buildHeap() {
    // Calling Heapify for all non leaf nodes
    for (int i = size / 2 - 1; i >= 0; i--) {
        heapify(i);
    }
}

int findKthLargest(vector<int>& nums[], int size, int k) {
    // create Min Heap for given array with only k elements
    MinHeap* m = new MinHeap(k, nums);

    // Loop For each element in array
    // after the kth element
    for (int i = k; i < size; i++) {
        // if current element is smaller
        // than minimum element, do nothing
        // and continue to next element
        if (nums[0] > nums[i])
            continue;

        // Otherwise Change minimum element to
        // current element, and call heapify to
        // restore the heap property
        else {
            nums[0] = nums[i];
            m->heapify(0);
        }
    }

    // now min heap contains k maximum elements, print the root element as it is the
    // Kth largest element of the array
    return nums[0];
}
```

The time complexity of this approach is **O(n * log k)** and the space complexity is **O(k)**.

#### Approach 4: Priority Queue

Instead of Min Heap, we can use a [Priority queue](https://www.geeksforgeeks.org/priority-queue-in-cpp-stl) to get the Kth largest element.

**Note:** A Priority Queue is implemented as Max Heap by default in C++.

We need to execute the following steps to find the Kth largest element in an array:

1. Iterate over the array and insert the elements in the priority queue.
2. If the queue size exceeds k, pop the element from the priority queue.
3. Once we have iterated over the array, return the top element of the priority queue.

A C++ snippet of this approach is as follows:

```cpp
int findKthLargest(vector<int>& nums, int k) {
    // initialize priority queue
    priority_queue<int, vector<int>, greater<int>> pq;

    // push all the elements
    for (int i = 0; i < nums.size(); i++) {
        pq.push(nums[i]);

        // if the queue side exceeds k, pop the top element
        if (pq.size() > k) {
            pq.pop();
        }
    }

    // return the top element of the priority queue
    return pq.top();
}
```

The time complexity of this approach is **O(n * log k)** and the space complexity is **O(k)**.

#### Approach 5: Using a Binary Search Tree

We can create a [Binary Search Tree](https://www.geeksforgeeks.org/introduction-to-binary-search-tree-data-structure-and-algorithm-tutorials/) from the array elements and get the K largest elements of the array.

We need to execute the following steps:

1. Create a BST by iterating over the array elements.
2. Traverse the BST in reverse inorder for K times.
3. Return the Kth largest element.

A C++ snippet of this approach is as follows:

```cpp
struct Node {
    int data;
    struct Node* left;
    struct Node* right;
};

class Tree {
public:
    Node* root = NULL;
    void addNode(int data) {
        Node* newNode = new Node();
        newNode->data = data;

        if (!root) {
            root = newNode;
        } else {
            Node* cur = root;
            while (cur) {
                if (cur->data > data) {
                    if (cur->left) {
                        cur = cur->left;
                    } else {
                        cur->left = newNode;
                        return;
                    }
                } else {
                    if (cur->right) {
                        cur = cur->right;
                    } else {
                        cur->right = newNode;
                        return;
                    }
                }
            }
        }
    }

    void printGreatest(int& K, vector<int>& sol, Node* node) {
        if (!node || K == 0)
            return;

        printGreatest(K, sol, node->right);

        if (K <= 0)
            return;

        sol.push_back(node->data);
        K--;

        printGreatest(K, sol, node->left);
    }
};

int findKthLargest(vector<int>& nums, int k) {
    vector<int> sol;
    Tree tree = new Tree();

    for (int i = 0; i < nums.size(); i++) {
        tree.addNode(nums[i]);
    }

    tree.printGreatest(k, sol, tree.root);

    return sol[k - 1];
}
```

The time complexity of this approach is **O(n * log(n))**. The space complexity is **O(n)**.

#### Approach 6: Using Quick Sort

We can modify the [Quick Sort algorithm](https://www.geeksforgeeks.org/quick-sort) to find the Kth largest element. Let's check the algorithm directly.

##### Algorithm

```
// findKthLargest(vector<int>& nums, int k)
- set n = nums.size()

- if n == 1
  - return nums[0]
- end if

- set l = 0, h = n - 1
  target = n - k

- loop while l <= h
  - set pivot = partition(nums, l, h)

  - if pivot < target
    - set l = pivot + 1
  - else if pivot > target
    - set h = pivot - 1
  - else
    - return nums[pivot]
  - end if
- end while

- return -1

// partition(vector<int> &nums, int l, int h)
- set high = nums[h]
      start = l

- loop for i = l; i < h; i++
  - if nums[i] < high
    - swap(nums[start], nums[i])
    - start++
  - end if
- end for

- swap(nums[start], nums[h])

- return start
```

The time complexity of the above approach is **O(n * log(n))**, and the space complexity is **O(1)**.

Check out our solutions in **C++**, **Golang**, and **Javascript**.

#### C++ solution

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        int n = nums.size();

        // if nums size is 1 return the first element
        if (n == 1) {
            return nums[0];
        }

        int l = 0, h = n - 1;

        // set target to n - k
        int target = n - k;

        while (l <= h) {
            // set pivot with the value returned by partition function
            int pivot = partition(nums, l, h);

            // if the pivot is less than the target, search the right side
            if (pivot < target) {
                l = pivot + 1;
            } else if (pivot > target) {
                // if the pivot is greater than the target, search the left side
                h = pivot - 1;
            } else {
                // if the pivot is equal to the target, return nums[pivot]
                return nums[pivot];
            }
        }

        return -1;
    }

    int partition(vector<int> &nums, int l, int h) {
        int high = nums[h];
        int start = l;

        for (int i = l; i < h; i++) {
            // if nums[i] is less than high, then swap nums[start] with nums[i]
            if (nums[i] < high) {
                swap(nums[start], nums[i]);
                start++;
            }
        }

        //swap nums[start] with nums[h]
        swap(nums[start], nums[h]);

        return start;
    }
};
```

#### Golang solution

```go
func findKthLargest(nums []int, k int) int {
    n := len(nums)

    // if nums size is 1 return the first element
    if n == 1 {
        return nums[0]
    }

    l, h := 0, n - 1

    // set target to n - k
    target := n - k

    for l <= h {
        // set pivot with the value returned by partition function
        pivot := partition(nums, l, h)

        // if the pivot is less than the target, search the right side
        if pivot < target {
            l = pivot + 1
        } else if pivot > target {
            // if the pivot is greater than the target, search the left side
            h = pivot - 1
        } else {
            // if the pivot is equal to the target, return nums[pivot]
            return nums[pivot]
        }
    }

    return -1
}

func partition(nums []int, l, h int) int {
    high := nums[h]
    start := l

    for i := l; i < h; i++ {
        if nums[i] < high {
            // if nums[i] is less than high, then swap nums[start] with nums[i]
            nums[start], nums[i] = nums[i], nums[start]
            start++
        }
    }

    //swap nums[start] with nums[h]
    nums[start], nums[h] = nums[h], nums[start]

    return start
}
```

#### JavaScript solution

```javascript
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    let n = nums.length;

    // if nums size is 1 return the first element
    if (n == 1) {
        return nums[0];
    }

    let l = 0, h = n - 1;

    // set target to n - k
    let target = n - k;

    while (l <= h) {
        // set pivot with the value returned by partition function
        let pivot = partition(nums, l, h);

        // if the pivot is less than the target, search the right side
        if (pivot < target) {
            l = pivot + 1;
        } else if (pivot > target) {
            // if the pivot is greater than the target, search the left side
            h = pivot - 1;
        } else {
            // if the pivot is equal to the target, return nums[pivot]
            return nums[pivot];
        }
    }

    return -1;
};

var partition = function(nums, l, h) {
    let high = nums[h];
    let start = l;

    for (let i = l; i < h; i++) {
        // if nums[i] is less than high, then swap nums[start] with nums[i]
        if (nums[i] < high) {
            [nums[start], nums[i]] = [nums[i], nums[start]];
            start++;
        }
    }

    //swap nums[start] with nums[h]
    [nums[start], nums[h]] = [nums[h], nums[start]];

    return start;
}
```

#### Dry Run

Let's dry-run our algorithm to see how the solution works.

```
Input: nums = [3, 2, 1, 5, 6, 4]
       k = 2

// findKthLargest(vector<int>& nums, int k)
Step 1: n = nums.size()
          = 6

Step 2: if n == 0
           6 == 0
           false

Step 3: l = 0
        h = n - 1
          = 6 - 1
          = 5

        target = n - k
               = 6 - 2
               = 4

Step 4: loop while l <= h
          0 <= 5
          true

          pivot = partition(nums, l, h)
                = partition(nums, 0, 5)

// partition(nums, 0, 5)
Step 5: high = nums[h]
             = nums[5]
             = 4
        start = l
              = 0

        loop for i = l; i < h
          i < h
          0 < 5
          true

          if nums[i] < high
            nums[0] < 4
            3 < 4
            true

            swap(nums[start], nums[i])
            swap(nums[0], nums[0])
            nums = [3, 2, 1, 5, 6, 4]

            start++
            start = 1

            i++
            i = 1

        loop for i < h
          i < h
          1 < 5
          true

          if nums[i] < high
            nums[1] < 4
            2 < 4
            true

            swap(nums[start], nums[i])
            swap(nums[1], nums[1])
            nums = [3, 2, 1, 5, 6, 4]

            start++
            start = 2

            i++
            i = 2

        loop for i < h
          i < h
          2 < 5
          true

          if nums[i] < high
            nums[2] < 4
            1 < 4
            true

            swap(nums[start], nums[i])
            swap(nums[2], nums[2])
            nums = [3, 2, 1, 5, 6, 4]

            start++
            start = 3

            i++
            i = 3

        loop for i < h
          i < h
          3 < 5
          true

          if nums[i] < high
            nums[3] < 4
            5 < 4
            false

            i++
            i = 4

        loop for i < h
          i < h
          4 < 5
          true

          if nums[i] < high
            nums[4] < 4
            6 < 4
            false

            i++
            i = 5

        loop for i < h
          i < h
          5 < 5
          false

        swap(nums[start], nums[h])
        swap(nums[3], nums[5])
        swap(5, 4)
        nums = [3, 1, 2, 4, 6, 5]


        return start
        return 3

// findKthLargest(vector<int>& nums, int k)
Step 6: pivot = partition(nums, 0, 5)
              = 3

Step 7: if pivot < target
           3 < 4
           true

           l = pivot + 1
             = 3 + 1
             = 4

Step 8 loop while l <= h
         4 <= 5
         true

         pivot = partition(nums, l, h)
               = partition(nums, 4, 5)

// partition(nums, 4, 5)
Step 9: high = nums[h]
             = nums[5]
             = 5
        start = l
              = 4

        loop for i = l; i < h
          i < h
          4 < 5
          true

          if nums[i] < high
             nums[4] < 5
             6 < 5
             false

          i++
          i = 5

        loop for i < h
          5 < 5
          false

        swap(nums[start], nums[h])
        swap(nums[4], nums[5])
        swap(6, 5)

        nums = [3, 1, 2, 4, 5, 6]

        return start
        return 4

// findKthLargest(vector<int>& nums, int k)
Step 10: pivot = partition(nums, 4, 5)
               = 4

Step 11: if pivot < target
           4 < 4
           false
         else if pivot > target
           4 > 4
           false
         else
           return nums[4]
           return 5

We return the answer as 5.
```
