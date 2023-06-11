---
title: Implement LRU Cache
description: Design a data structure and algorithm to implement an LRU caching strategy.
date: 2023-06-11
hashtags: ["programming", "algorithms", "golang", "cpp", "javascript"]
categories: "design a data structure and algorithm to implement an LRU caching strategy, c++, golang, javascript"
---

## Problem statement

Design a data structure that follows the constraints of a [Least Recently Used (LRU) cache](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU).

Implement the **LRUCache** class:

* `LRUCache(int capacity)` Initialize the LRU cache with positive size `capacity`.

* `int get(int key)` Return the value of the key if the `key` exists, otherwise return `-1`.

* `void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, evict the least recently used key.

The functions `get` and `put` must each run in `O(1)` average time complexity.

Problem statement taken from: <a href='https://leetcode.com/problems/lru-cache' target='_blank'>https://leetcode.com/problems/lru-cache</a>.

**Example 1:**

```
Input
['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get']
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1 = 1}
lRUCache.put(2, 2); // cache is {1 = 1, 2 = 2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1 = 1, 3 = 3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4 = 4, 3 = 3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
```

**Constraints:**

```
- 1 <= capacity <= 3000
- 0 <= key <= 10^4
- 0 <= value <= 10^5
- At most 2 * 10^5 calls will be made to get and put.
```

### What is an LRU cache?

A cache provides a high-speed data storage layer which stores a subset of data. It ensures future requests for the same data get served faster than fetching the data from the primary storage location.

When our application's data size is vast, we cannot cache the whole data. Caching complete data is also not optimal and cost-effective, so we only store the subset of data in the cache. But what data goes into the cache depends entirely on the application, because of which we have different caching mechanisms.

A [Least Recently Used (LRU) cache](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU) is one such type of caching. LRU is a cache eviction algorithm that organizes the elements in order of use. LRU will remove the element that has not been referenced or used for a long time.

![Container](./../lru.png)
Source: Geeksforgeeks

As seen in the above image, the cache size is 3, and initially, it's empty. We add 1 to the cache, and it gets stored at the beginning of the cache. We next add 2 and 3 to the cache. 3 gets added at the front of the cache list, and 1 gets stored at the tail of the cache. When we try to add 1 to the cache again, we see the cache is full. The least recently used element, which is 2, is present at the tail end of the cache. We remove the element and insert 1 at the front of the cache.

### How to implement an LRU cache?

As seen in the above image, we know that the elements get added to a queue, and we follow FIFO (First-In-First-Out) approach.
* We need to use the Queue data structure. The queue will have a limited capacity.
* Whenever an element gets added, we add it to the head of the queue.
* When the queue size is complete, and we want to add a new element, we pop the elements from the tail of the queue.
* Adding and removing the elements to the queue must be done in constant time. It can be solved using a [Doubly Linked List](https://www.geeksforgeeks.org/data-structures/linked-list/doubly-linked-list/).
* Since it's a cache, we also need to ensure the element we are looking for can be fetched quickly, in **O(1)** time. It can be done using a HashMap. Apart from storing elements in the doubly linked list, we also store them in the HashMap.

LRU cache will be a combination of Doubly Linked List and HashMap.

### Algorithm for LRU

We need to follow these basic steps since we know what data structures to use for implementing an LRU.

* If the key is present in the HashMap, we call that a cache hit, and we return the value
* If the key is absent, it's a cache-miss; we must follow these two steps
    a. Add the new element in front of the queue.
    b. Add a new entry for the element in the HashMap and update the head.
* If it's a cache-hit
    a. We remove the element from the queue and add it as the head of the queue.
    b. We update the HashMap with a new reference to the head of the list.

Let's check the algorithm below:

#### Algorithm

```
// define a Node struct
- struct Node {
      // since it's a doubly linked list, a node will have two pointers
      // next and prev that stores the address of the next and previous nodes
      // of the linked list.

      // key is the element we search
      // value is the data we want to store in the cache for this key
      Public: {
          Node *next;
          Node *prev;
          int value;
          int key;
      }
  }

// define the class LRU Cache
- class LRUCache
    Public: {
        // initialize the head and tail of the doubly linked list
        Node *head = new Node()
        Node *tail = new Node()

        // create a HashMap that stores the element and helps in fetching
        // the data in **O(1)** time.
        unordered_map<int, Node*> nodeMap

        // the size of the doubly linked list
        int capacity

        // function to initialize the LRU cache class
        // Since the cache is empty
        // we point the head next to tail and tail previous to head
        LRUCache(int capacity) {
            this->capacity = capacity;
            head->next = tail;
            tail->prev= head;
        }

        // function to get the element from the cache
        // the function expects a key element
        int get(int key) {
            // if the element is present in the cache, a cache-hit
            // we remove the element from the doubly linked list
            // and place it at the head of the list.

            // if it's a cache hit, in this case, we just return -1.

            if(nodeMap.find(key) != nodeMap.end()){
                Node* node = nodeMap[key];
                removeNode(node);
                addNode(node);
                return node->value;
            } else {
                return -1;
            }
        }

        // function to add the element in the cache
        void put(int key, int value) {
            // if the key is present in the cache
            // we update the value associated with the key.
            // We remove the node from the list
            // and since it was recently searched, we update
            // it as the head of the queue

            // if the key is not present in the cache
            // we first check if the cache is full
            // if the cache is full we remove the tail from the
            // list and remove the associated key from the hash map,
            // since it was not searched recently.

            // we add the new element as the head of the cache
            // and create an entry in the hash map
            if(nodeMap.find(key) != nodeMap.end()){
                Node* node = nodeMap[key];
                node->value = value;
                removeNode(node);
                addNode(node);
            } else {
                if(nodeMap.size() == capacity) {
                    Node* node = tail->prev;
                    removeNode(node);
                    nodeMap.erase(node->key);
                }

                Node* node = new Node();
                node->value = value;
                node->key = key;
                addNode(node);
                nodeMap[key] = node;
            }
        }

        // function to create a new entry in the list
        // the new element will be head of the list
        void addNode(Node* node){
            node->next = head->next;
            node->prev = head;
            (node->next)->prev = node;
            head->next = node;
        }

        // function to remove the tail node from the list
        void removeNode(Node* node){
            Node* prevNode = node->prev;
            Node* nextNode = node->next;
            prevNode->next = nextNode;
            nextNode->prev = prevNode;
        }
    }
```

The time complexity for searching, adding and deleting an element is **O(1)**. The space complexity is **O(n)** since we are using an additional space HashMap and a Doubly Linked list.

Check out our solutions in **C++**, **Golang**, and **JavaScript**.

#### C++ solution

```cpp
struct Node{
    public:
        Node* next;
        Node* prev;
        int value;
        int key;
};

class LRUCache {
public:
    Node* head = new Node();
    Node* tail = new Node();
    unordered_map<int, Node*> nodeMap;
    int capacity;

    LRUCache(int capacity) {
        this->capacity = capacity;
        head->next = tail;
        tail->prev= head;
    }

    int get(int key) {
        if(nodeMap.find(key) != nodeMap.end()){
            Node* node = nodeMap[key];
            removeNode(node);
            Node* temp = head;
            addNode(node);
            temp = head;
            temp = tail;
            return node->value;
        } else {
            Node* temp = head;
            temp = tail;
            return -1;
        }
    }

    void put(int key, int value) {
        if(nodeMap.find(key) != nodeMap.end()){
            Node* node = nodeMap[key];
            node->value = value;
            removeNode(node);
            addNode(node);
        } else {
            if(nodeMap.size() == capacity) {
                Node* node = tail->prev;
                removeNode(node);
                nodeMap.erase(node->key);
            }

            Node* node = new Node();
            node->value = value;
            node->key = key;
            addNode(node);
            Node* temp = head;
            temp=tail;
            nodeMap[key] = node;
        }
    }

    void addNode(Node* node){
        node->next = head->next;
        node->prev = head;
        (node->next)->prev = node;
        head->next = node;
        Node* temp = head;
    }

    void removeNode(Node* node){
        Node* prevNode = node->prev;
        Node* nextNode = node->next;
        prevNode->next = nextNode;
        nextNode->prev = prevNode;
        Node* temp = head;
        temp = tail;
    }
};
```

#### Golang solution

```go
type Node struct {
    next *Node
    prev *Node
    value int
    key int
}

type LRUCache struct {
    nodeMap map[int]*Node
    head, tail *Node
    capacity int
}

func Constructor(capacity int) LRUCache {
    head := &Node{nil, nil, 0, 0}
    tail := &Node{nil, nil, 0, 0}
    head.next = tail
    tail.next = head

    return LRUCache {
        capacity: capacity,
        nodeMap: make(map[int]*Node),
        head: head,
        tail: tail,
    }
}

func (this *LRUCache) Get(key int) int {
    if node, ok := this.nodeMap[key]; ok {
        this.removeNode(node)
        this.addNode(node)
        return node.value
    } else {
        return -1
    }
}

func (this *LRUCache) Put(key int, value int)  {
    if node, ok := this.nodeMap[key]; ok {
        node.value = value
        this.removeNode(node)
        this.addNode(node)
    } else {
        if len(this.nodeMap) == this.capacity {
            node = this.tail.prev
            this.removeNode(node)
            delete(this.nodeMap, node.key)
        }

        node := &Node{nil, nil, 0, 0}
        node.value = value
        node.key = key
        this.addNode(node)
        this.nodeMap[key] = node
    }
}

func (this *LRUCache) addNode(node *Node) {
    node.prev = this.head
    node.next = this.head.next
    node.next.prev = node
    this.head.next = node
}

func (this *LRUCache) removeNode(node *Node) {
    prevNode := node.prev
    nextNode := node.next
    prevNode.next = nextNode
    nextNode.prev = prevNode
}
```

#### JavaScript solution

```javascript
class Node {
    /**
     * @param {number} value
     * @param {Node} prev
     * @param {Node} next
     * @return {void}
     */
    constructor(key = 0, value = 0, prev = null, next = null) {
        this.key = key;
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.head = new Node(Infinity, Infinity);
    this.tail = new Node(-Infinity, -Infinity);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.nodeMap = new Map([
        [this.head.key, this.head],
        [this.tail.key, this.tail],
    ]);
};

/**
 * @param {Node} node
 * @return {void}
 */
LRUCache.prototype.addNode = function (node) {
    node.prev = null;
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
};

/**
 * @param {Node} node
 * @return {void}
 */
LRUCache.prototype.removeNode = function (node) {
    const { prev, next } = node;

    if (prev && next) {
        [prev.next, next.prev] = [next, prev];
    } else if (prev) {
        prev.next = null;
        this.tail = prev;
    } else if (next) {
        next.prev = null;
        this.head = next;
    }
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    const node = this.nodeMap.get(key);

    if (!node) {
        return -1;
    }

    this.removeNode(node);
    this.addNode(node);

    return node.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    const node = new Node(key, value);

    if (this.nodeMap.has(key)) {
        this.removeNode(this.nodeMap.get(key));
    }

    this.addNode(node);
    this.nodeMap.set(key, node);
    const n = this.nodeMap.size - this.capacity;

    for (i = 0; i < n; ++i) {
        this.nodeMap.delete(this.tail.key);
        this.removeNode(this.tail);
    }

    return null;
};
```


