# Data Structures

Data structures can be neatly classified as either _contiguous_ or _linked_, depending upon whether they are based on arrays or pointers:

- _contiguously-allocated structures_ are composed of single slabs of memory, and include arrays, matrices, heaps, and hash tables
- _linked data structures_ are composed of distinct chunks of memory bound together by _pointers_, and include lists, trees and graph adjacency lists

## Arrays

The array is a fundamental contiguously-allocated data structure. Arrays are structures of fixed-size data records such that each element can be efficiently located by its index or (equivalent) address.

Advantages of contiguously-allocated arrays include:

- _constant-time access given by index_ because the index of each element maps directly to a particular memory address, we can access arbitrary data items instantly provided we know the index
- _space efficiency_ arrays consist purely of data, so no space is wasted with links or other formatting information. Further, end-of-record information is not needed because arrays are built from fixed-size records
- _memory locality_ a common programming idiom involves iterating through all the elements of a data structure. Array are good for this because they exhibit excellent memory locality. Physical continuity between successive data accesses helps exploit the high-speed cache memory on modern computer architectures

The downside of arrays is that we cannot adjust their size in the middle of a program's execution. Our program will fail soon as we try to add the (n + 1)st customer, if we only allocate room for n records. We can compensate by allocating extremely large arrays, but this can waste space, again restricting what our programs can do.

Actually, we can efficiently enlarge arrays as we need them, through the miracle of _dynamic arrays_. Suppose we start with an array of size 1, and double its size from _m_ to 2*m* each time we run out of space. This doubling process involves allocating a new contiguous array of size 2*m*, copying the contents of the old array to the lower half of the new one, and returning the space used by the old array to the storage allocation system.

## Pointers and Linked Structures

_Pointers_ are the connections that hold the pieces of linked structures together. Pointers represent the address of a location in memory. A variable storing a pointer to a given data item can provide more freedom than storing a copy of the item itself.

A pointer **p** is assumed to give the address in memory where a particular chunk of data is located. Pointer in C have types declared at compile time, denoting the data type of the items they can point to. We use **\*p** to denote the item that is pointed to by pointer **p**, and **&x** to denote the address of a particular variable **x**. A special **NULL** pointer value is used to denote structure-terminating or unassigned pointers.

All linked data structures share certain properties, as revealed by the following linked list type declaration:

```c
typedef struct list {
  item_type item;              /* data item */
  struct list *next;           /* point to successor */
} list;
```

In particular:

- each node in our data structure (here **list**) contains one or more data fields (here **item**) that retain the data that we need to store.
- each node contains a pointer field to at least one other node (here **next**). This means that much of the space used in linked data structures has to be devoted to pointer, not data.
- finally, we need a pointer to the head of the structure, so we know where to access it.

The list is the simplest linked structure.

The three basic operations supported by lists are searching, insertion, and deletion. In _doubly-linked lists_, each node points both to its predecessor and its successor element. This simplifies certain operations at a cost of an extra pointer field per node.

### Searching a list

Searching for item _x_ in a linked list can be done iteratively or recursively. We opt for recursively in the implementation below. If _x_ is in the list, it is either the first element or located in the smaller rest of the list. Eventually, we reduce the problem to searching in an empty list, which clearly cannot contain _x_.

```c
list *search_list(list *l, item_type x) {
  if (l == NULL) return(NULL);

  if (l->item ==x)
    return(l);
  else
    return(search_list(l->next, x));
}
```

### Insertion into a list

Insertion intor a singly-linked list is a nice exercise in pointer manipulation, as shown below. Since we have no need to maintain the list in any particular order, we might as well insert each new item in the simplest place. Insertion at the beginning of the list avoids any need to traverse the list, but does require us to update the pointer (denoted _l_) to the head of the data structure.

```c
void insert_list(list **l, item_type x) {
  list *p;

  p = malloc(sizeof(list));
  p->item = x;
  p->next = *l;
  *l = p;
}
```

**Note**: `malloc` function allocates a chunk of memory of sufficient size for a new node to contain _x_. Second, the funny double star (\*\*l) denotes that **l** is a _pointer to a pointer_ to a list node. Thus the last line, `*l=p` copies **p** to the place pointed to by **l**, which is the external variable maintaining access to the head of the list.

### Deletion from a list

Deletion from a linked list is somewhat more complicated. First, we must find a pointer to the _predecessor_ of the item to be deleted. We do this recursively:

```c
list *predecessor_list(list *l, item_type x) {
  if ((l == NULL) || (l->next == NULL)) {
    // predecessor sought on null list
    return(NULL);
  }

  if ((l->next)->item == x)
    return(l);
  else
    return(predecessor_list(l->next, x));
}
```

The predecessor is needed because it points to the doomed node, so its **next** pointer must be changed. The actual deletion operation is simple, once ruling out the case that the to-be-deleted element does not exist. Special care must be taken to reset the pointer to the head of the list (**l**) when the first element is deleted:

```c
delete_list(list *l, item_type x) {
  list *p;
  list *pred;
  list *search_list(*l, x);

  if (p != NULL) {
    pred = predecessor_list(*l, x);
    if (pred == NULL)
      *l = p->next;
    else
      pred->next = p->next;

    free(p);
  }
}
```

**Note**: C language requires explicit deallocation of memory, so we must **free** the deleted node after we are finished with it to return the memory to the system.

### Comparison

The relative advantages of linked lists over static arrays include:

- Overflow on linked structures can never occur unless the memory is actually full
- insertions and deletions are simpler than for contiguous (array) lists.
- with large records, moving pointers is easier and faster than moving the items themeselves

While the relative advantages of arrays include:

- linked structures require extra space for storing pointer fields
- linked lists do not allow efficient random access to items
- arrays allow better memory locality and cache performance than random pointer jumping

## Stacks and Queues

We use the the term _container_ to denote a data structure that permits storage and retrieval of data items _independent of content_. By contrast, dictionaries are abstract data types that retrieve based on key values or content.
Containers are distinguished by the particular retrieval order they support. In the two most important types of containers, this retrieval order depends on the insertion order:

- _Stacks_ - Support retrieval by last-in, first-out (LIFO) order. Stakcs are simple to implement and very efficient. For this reason, stacks are probably the right container to use when retrieval order doesn't matter at all, such as when processing batch jobs. The _put_ and _get_ operations for stacks are usually called _push_ and _pop_:

  - _Push(x,s)_: Insert item _x_ at the top of stack _s_.
  - _Pop(s)_: Return (and remove) the top item of stack _s_.
    LIFO order arises in many real-world contexts. People crammed into a subway car exit in LIFO order. Food inserted into my refridgerator usually exits the same way, despite the incentive of expiration dates. Algorithmically, LIFO tends to happen in the course of executing recursive algorightms.

- _Queues_ - Support retrieval in first in, first out (FIFO) order. This is surely the fairest way to control waiting times for services. You want the container holding jobs to be processed in FIFO order to minimize the _maximum_ time spent waiting. Note that the _average_ waiting time will be the same regardless of whether FIFO or LIFO is used. Many computing applications involve data items with infinite patience, which renders the question of maximum waiting time moot.

Queues are somewhat trickier to implement than stacks and thus are most appropriate for applications (like certain simulations) where the order is important. The _put_ and _get_ operations for queues are usually called _enqueue_ and _dequeue_.

- _Enqueue(x,q)_: Insert item _x_ at the back of queue _q_.
- _Dequeue(q)_: Return (and remove) the front item from queue _q_.

Stakcs and queues can be effectively implemented using either arrays or linked lists. The key issue is whether an upper bound on the size of the container is known in advance, thus permitting the use of a statistically-allocated array.

## Dictionaries

The _dictionary_ data type permits access to data items by content. You stick an item into a dictionary so you can find it when you need it.
The primary operations of dictionary support are:

- _Search(D,k)_ - Given a search key _k_, return a pointer to the element in dictionary _D_ whose key value is _k_, if one exists.
- _Insert(D,x)_ - Given a data item _x_, add it to the set in the dictionary _D_.
- _Delete(D,x)_ - Given a pointer to a given data item _x_ in the dictionary _D_, remove it from _D_.

Certain dictionary data structures also efficiently support other useful operations:

- _Max(D)_ or _Min(D)_ - Retrieve the item with the largest (or smallest) key from _D_. This enables the dictionary to serve as a priority queue.
- _Predecessor(D,x)_ or _Successor(D,x)_ - Retrieve the item from _D_ whose key is immediately before (or after) _x_ in sorted order. These enable use to iterate through the elements of the data structure.

Complexity

| Dictionary operation | Unsorted array | Sorted array | Singly unsorted | Double unsorted | Single sorted | Doubly sorted |
| :------------------- | :------------- | :----------- | :-------------- | :-------------- | :------------ | :------------ |
| Search(L,k)          | _O_(n)         | _O_(log n)   | _O_(n)          | _O_(n)          | _O_(n)        | _O_(n)        |
| Insert(L,x)          | _O_(1)         | _O_(n)       | _O_(1)          | _O_(1)          | _O_(n)        | _O_(n)        |
| Delete(L,x)          | _O_(1)\*       | _O_(n)       | _O_(n)\*        | _O_(1)          | _O_(n)\*      | _O_(1)        |
| Successor(L,x)       | _O_(n)         | _O_(1)       | _O_(n)          | _O_(n)          | _O_(1)        | _O_(1)        |
| Predecessor(L,x)     | _O_(n)         | _O_(1)       | _O_(n)          | _O_(n)          | _O_(n)\*      | _O_(1)        |
| Minimum(L)           | _O_(n)         | _O_(1)       | _O_(n)          | _O_(n)          | _O_(1)        | _O_(1)        |
| Maximum(L)           | _O_(n)         | _O_(1)       | _O_(n)          | _O_(n)          | _O_(1)\*      | _O_(1)        |

## Binary Search Trees

We have seen data structures that allow fast search or flexible update, but not fast search _and_ flexible update. Unsorted, doubly-linked lists supported insertion and deletion in _O_(1) time but search took linera time in the worst case. Sorted arrays uspport binary search and logarithmic query times, but at the cose of linear time update.

Binary search requires that we have fast access to _two elements_ -- specifically the media elements above and below the given node. To combine these ideas, we need a "linked list" with two pointer per node. This is the basic idea behind binary search trees.

A _rooted binary tree_ is recursively defined as either being (1) empty, or (2) consisting of a node called the root, together with two rooted binary trees called the left and right subtrees, respectively. The order among "brother" nodes matters in rooted trees, so left is different from right.

A binary _search_ tree labels each node in a binary tree with a single key such that for any node labeled _x_, all nodes in the left subtree of _x_ have keys < x while all nodes in the right subtree of _x_ have keys > _x_. This search tree labeling scheme is very special. For any binary tree on n nodes, and any set of _n_ kyes, there is exactly one labeling that makes it a binary search tree.

### Tree definition

Binary tree nodes have _left_ and _right_ pointer fields, an (optional) _parent_ pointer, and a data field.

```c
typedef struct tree {
  item_type item;
  struct tree *parent;
  struct tree *left;
  struct tree *right;
} tree;
```

The basic operations supported by binary trees are searching, traversal, insertion, and deletion.

### Searching in a Tree

The binary search tree labeling uniquely identifies where each key is located. Start at the root. Unless it contains the query key _x_, proceed either left or right depending upon whether _x_ occurs before or after the root key. This algorithm works because both the left and right subtrees of a binary search tree are themselves binary search trees. This recursive structure yields the recursive search algorithm below:

```c
tree *search_tree(tree *l, item_type x) {
  if (l == NULL) return(NULL);

  if (l->item == x) return(l);

  if (x < l->item)
    return(search_tree(l->left, x));
  else
    return(search_tree(l->right, x));
}
```

This search algorithm runs in _O_(h) time, where _h_ denotes the height of the tree.

### Minimun and Maximum Elements in a Tree

Implementing the _find-minimum_ operation requires knowing where the minimum element is in the tree. By definition, the smallest key must reside in the left subtree of the root, since all keys in the left subtree have values less than that of the root. Therefore, the minimum element must be the leftmost descendant of the root. Similarly, the maximum element must be the rightmost descendant of the root.

```c
tree *find_minimum(tree *t) {
  tree *min;

  if (t == NULL) return(NULL);

  min = t;
  while (min->left != NULL)
    min = min->left;
  return(min);
}
```

### Traversal in a Tree

Visiting all the nodes in a rooted binary tree proves to be an important component of many algorithms. It is a special case of traversing all the nodes and edges in graph.
A prime application of tree traversal is listing the labels of the tree nodes. Binary search trees make it easy to report the labels in sorted order. By definition, all the keys smaller than the root must lie in the left subtree of the root, and all keys bigger that the root in the right subtree. Thus, visiting the nodes recursively in accord with such a policy produces an _in-order_ traversal of the search tree:

```c
void traverse_tree(tree *l) {
  if (l !== NULL) {
    traverse_tree(l->left);
    process_item(l->item);
    traverse_tree(l->right);
  }
}
```

Each item is processed once during the course of traversal, which runs in _O_(n) time, where _n_ denotes the number of nodes in the tree.

Alternate traversal orders come from changing the position of **process_item** relative to the traversals of the left and right subtrees. Processing the item first yields a _pre-order_ traversal, while processing it last gives a _post-order_ traversal. These make relatively little sense with search trees, but prove useful when the rooted tree represents arithmetic or logical expression.

### Insertion in a Tree

There is only one place to insert an item _x_ into a binary search tree _T_ where we know we can find it again. We must replace the **NULL** pointer found in _T_ after an unsuccessful query for the key _k_.
This implementation uses recursion to combine the search and node insertion stages of key insertion. The three arguments to **insert_tree** are (1) a pointer **l** to the pointer linking the search subtree to the rest of the tree, (2) the key _x_ to be inserted, and (3) a parent pointer to the parent node containing **l**. The node is allocated and linked in on hitting the **NULL** pointer. Note that we pass the _pointer_ to the appropriate left/right pointer in the node during the search, so the assignment `*l = p;` links the new node into the tree:

```c
insert_tree(tree **l, item_type x, tree *parent) {
  tree *p;

  if (*l == NULL) {
    p = malloc(sizeof(tree));
    p->item = x;
    p->left = p->right = NULL;
    p->parent = parent;
    *l = p;
    return;
  }

  if (x < (*l)->item)
    insert_tree(&((*l)->left), x, *l);
  else
    insert_tree(&((*l)->right), x, *l);
}
```

Allocating the node and linking it in to the tree is a constant-time operation after the search has been performed in _O_(h) time.

### Deletion from a Tree

Deletion is somewhat trickier than insertion, because removing a node means appropriately linking its two descendant subtrees back into the tree somewhere else. There are three cases.

Leaf nodes have no children, and so may be deleted by simply clearing the pointer to the given node.

The case of the doomed node having one child is also straightforward. There is one parent and one grandchild, and we can link the grandchild directly to the parent without violating the in-order labeling property of the tree.

In the case of two children, our solution is to relabel this node with the key of its immediate successor in sorted order. This successor must be the smallest value in the right subtree, specifically the leftmost descendant in the right subtree. Moving this to the point of deletion results in a properly-labeled binary search tree, and reduces our deletion problem to physically removing a node with at most one child -- a case that has been resolved above.
