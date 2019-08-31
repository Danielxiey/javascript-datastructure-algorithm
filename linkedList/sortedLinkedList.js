import {LinkedList} from './linkedList';
import {defaultEquals} from './defaultEquals';

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

export class SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn);
    this.compareFn = compareFn;
  }

  //push方法改写
  push(element) {
    this.insert(element);
  }

  //插入节点
  insert(element, index = 0) {
    if(this.isEmpty()) {
      super.insert(element, 0);
    } else {
      let position = this.getIndexNextSortedElement(element);
      super.insert(element, position);
    }
  }

  //获得要插入的位置
  getIndexNextSortedElement(element) {
    let current = this.head;
    let i = 0;
    for(;i < this.count; i++) {
      if(this.compareFn(element, current.element) === Compare.LESS_THAN) {
        return i;
      }
      current = current.next;
    }
    return i;
  }
}