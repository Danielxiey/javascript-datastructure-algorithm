import {BinarySearchTree} from './binarySearchTree.js';
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

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
}

export class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
  }

  //获取节点的高度
  getNodeHeight(node) {
    if(node == null) {
      return -1;
    } else {
      return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
    }
  }

  //获取某个节点的平衡因子
  getBalanceFactor(node) {
    let heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch(heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
        break;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
        break;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
        break;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
        break;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  //LL旋转
  rotationLL(node) {
    let temp = node.left;
    node.left = temp.right;
    temp.right = node;
    return temp;
  }

  //RR旋转
  rotationRR(node) {
    let temp = node.right;
    node.right = temp.left;
    temp.left = node;
    return temp;
  }

  //LR旋转
  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    this.rotationLL(node);
  }

  //RL旋转
  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    this.rotationRR(node);
  }

  //向AVL树插入节点
  insert(key) {
    this.root = this.insertNode(this.root, key);
  }

  //插入节点函数
  insertNode(node, key) {
    //插入节点
    if(node == null) {
      return new Node(key);
    } else {
      if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
        if(node.left == null) {
          node.left = new Node(key);
        } else {
          node.left = this.insertNode(node.left, key);
        }
      } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
        if(node.right == null) {
          node.right = new Node(key);
        } else {
          node.right = this.insertNode(node.right, key);
        }
      } else {
        return node;
      }
    }

    //检验平衡因子
    let balancedFactor = this.getBalanceFactor(node);
    if(balancedFactor === BalanceFactor.UNBALANCED_LEFT) {
      if(this.getBalanceFactor(node.left) === BalanceFactor.BALANCED || this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        node = this.rotationLL(node);
      } else {
        node = this.rotationLR(node);
      }
    } else if(balancedFactor == BalanceFactor.UNBALANCED_RIGHT) {
      if(this.getBalanceFactor(node.right) === BalanceFactor.BALANCED || this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        node = this.rotationRR(node);
      } else {
        node = this.rotationRL(node);
      }
    }
    return node;
  }

  //从AVL树移除一个节点
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  //移除节点函数
  removeNode(node, key) {
    if(node == null) {
      return null;
    }
    if(this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
    } else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
    } else {
      if(node.left == null && node.right == null) {
        return null;
      }
      if(node.left == null) {
        return node.right;
      } else if(node.right == null) {
        return node.left;
      } else {
        let aux = this.minNode(node.right);
        node.key = aux.key;
        node.right = this.removeNode(node.right, aux.key);
        return node;
      }
    }

    //检测平衡因子
    let balancedFactor = this.getBalanceFactor(node);
    if(balancedFactor === BalanceFactor.UNBALANCED_LEFT) {
      if(this.getBalanceFactor(node.left) === BalanceFactor.BALANCED || this.getBalanceFactor(node.left) === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
        node = this.rotationLL(node);
      } else {
        node = this.rotationLR(node);
      }
    }else if(balancedFactor === balancedFactor.UNBALANCED_RIGHT) {
      if(this.getBalanceFactor(node.right) === BalanceFactor.BALANCED || this.getBalanceFactor(node.right) === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
        node = this.rotationRR(node);
      } else {
        node = this.rotationRL(node);
      }
    }
    return node;
  }

}