import {AVLTree} from './avlTree';
import {RedBlackNode} from './node';
import {Color} from './node';

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

export class RedBlackTree extends AVLTree {
  constructor(CompareFn = defaultCompare) {
    super(CompareFn);
  }

  //向红黑树中插入节点
  insert(key) {
    if(this.root == null) {
      this.root = new RedBlackNode(key);
      this.root.color = Color.BLACK;
    } else {
      let newNode = this.insertNode(this.root, key);
      this.fixTreeProperties(newNode);
    }
  }
                   
  //插入节点函数
  insertNode(node, key) {
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if(node.left == null) {
        node.left = new RedBlackNode(key);
        node.left.parent = node;
        return node.left;
      } else {
        return this.insertNode(node.left, key);
      }
    } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      if(node.right == null) {
        node.right = new RedBlackNode(key);
        node.right.parent = node;
        return node.right;
      } else {
        return this.insertNode(node.right, key);
      }
    } else {
      return node;
    }
  }

  //验证红黑树属性
  fixTreeProperties(node) {
    while(node && node.parent && node.isRed() && node.parent.isRed()) {
      let parent = node.parent;
      let grandParent = parent.parent;
      if(grandParent && grandParent.left == parent) {
        let uncle = grandParent.right;
        if(uncle && uncle.color === Color.RED) {
          uncle.color = Color.BLACK;
          parent.color = Color.BLACK;
          grandParent.color = Color.RED;
          node = grandParent;
        } else {
          if(node === parent.right) {
            this.rotationRR(parent);
            node = parent;
            parent = node.parent;
          }
          this.rotationLL(grandParent);
          parent.color = Color.BLACK;
          grandParent.color = Color.RED;
          node = parent;
        }
      } else if(grandParent && grandParent.right == parent) {
        let uncle = grandParent.left;
        if(uncle && uncle.color == Color.RED) {
          uncle.color = Color.BLACK;
          parent.color = Color.BLACK;
          grandParent.color = Color.RED;
          node = grandParent;
        } else {
          if(node === parent.left) {
            this.rotationLL(parent);
            node = parent;
            parent = node.parent;
          }
          this.rotationRR(grandParent);
          parent.color = Color.BLACK;
          grandParent.color = Color.RED;
          node = parent;
        }
      }
    }
    this.root.color = Color.BLACK;
  }

  rotationLL(node) {
    let temp = node.left;
    node.left = temp.right;
    if(temp.right && temp.right.key) {
      temp.right.parent = node;
    }
    temp.parent = node.parent;
    if(!node.parent) {
      this.root = temp;
    } else {
      if(node === node.parent.left) {
        node.parent.left = temp;
      } else {
        node.parent.right = temp;
      }
    }
    temp.right = node;
    node.parent = temp;
  }

  rotationRR(node) {
    let temp = node.right;
    node.right = temp.left;
    if(temp.left && temp.left.key) {
      temp.left.parent = node;
    }
    temp.parent = node.parent;
    if(!node.parent) {
      this.root = temp;
    } else {
      if(node === node.parent.left) {
        node.parent.left = temp;
      } else {
        node.parent.left = temp;
      }
    }
    temp.left = node;
    node.parent = temp;
  }
}