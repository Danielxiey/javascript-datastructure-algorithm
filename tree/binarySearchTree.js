import {Node} from './node.js';

const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
}

const defaultCompare = function(a, b) {
  if(a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.root = null;
    this.compareFn = compareFn;
  }

  //向树中插入一个新的节点
  insert(key) {
    if(this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }  
  }

  //插入节点函数
  insertNode(node, key) {
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if(node.left == null) {
        node.left = new Node(key);
      } else{
        this.insertNode(node.left, key);
      }
    } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      if(node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  //获取根节点
  getRoot() {
    return this.root;
  }

  //通过中序遍历方式遍历所有节点
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }

  //中序遍历函数
  inOrderTraverseNode(node, callback) {
    if(node != null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node);
      this.inOrderTraverseNode(node.right, callback);
    }
  }
  
  //通过先序遍历方式遍历所有节点
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }

  //先序遍历函数
  preOrderTraverseNode(node, callback) {
    if(node != null) {
      callback(node);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  //通过后序遍历方式遍历所有节点
  postOrderTraverse(callback) {
    this.lastOrderTraverseNode(this.root, callback);
  }

  //后序遍历函数
  postOrderTraverseNode(node, callback) {
    if(node != null) {
      this.lastOrderTraverseNode(node.left, callback);
      this.lastOrderTraverseNode(node.right, callback);
      callback(node);
    }
  }

  //搜索树中的最小值
  min() {
    return this.minNode(this.root);
  }

  //搜索最小值函数
  minNode(node) {
    if(node != null) {
      let current = node;
      while(current.left != null) {
        current = current.left;
      }
      return current;
    } else {
      return null;
    }
  }

  //搜索树中的最大值
  max() {
    return this.maxNode(this.root);
  }

  //搜索最大值函数
  maxNode(node) {
    if(node != null) {
      let current = node;
      while(current.right != null) {
        current = current.right;
      }
      return current;
    } else {
      return null;
    }
  }

  //搜索一个特定的值
  search(key) {
    return this.searchNode(this.root, key);
  }

  //搜索特定值的函数
  searchNode(node, key) {
    if(node != null) {
      if(this.compareFn(key, node.key) === 0) {
        return true;
      } else if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
        return this.searchNode(node.left, key);
      } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
        return this.searchNode(node.right, key);
      }
    }
    return false;
  }

  //从树中移除某个节点
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  //移除节点函数
  removeNode(node, key) {
    if(node != null) {
      if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
        node.left = this.removeNode(node.left, key);
        return node;
      } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
        node.right = this.removeNode(node.right, key);
        return node;
      } else {
        if(node.left == null && node.right == null) {
          node = null;
          return node;
        }
        if(node.left == null) {
          node = node.right;
          return node;
        } else if(node.right == null) {
          node = node.left;
          return node;
        } else {
          let aux = this.minNode(node.right);
          node.key = aux.key;
          node.right = this.removeNode(node.right, aux.key);
          return node;
        }
      }
    } else {
      return null;
    }
  }
}