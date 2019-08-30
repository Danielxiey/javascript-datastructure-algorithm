import {defaultEquals} from './defaultEquals';     //引入比较函数
import {Node} from './node';                       //引入链表中的节点类

export class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.head = undefined;
    this.count = 0;
    this.equalsFn = equalsFn;
  }

  //向链表尾部添加一个新元素
  push(element) {
    const node = new Node(element);
    if(this.head == null) {
      this.head = node;
    } else {
      let current = this.head;
      while(current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  //从特定位置移除一个元素，并返回该元素
  removeAt(index) {
    if(index >= 0 && index < this.count) {
      let current = this.head;
      if(index === 0) {
        this.head = current.next;
      } else {
        let previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    } else {
      return undefined;
    }
  }

  //返回链表中特定位置的元素
  getElementAt(index) {
    if(index >= 0 && index < this.count) {
      let current = this.head;
      for(let i = 0; i < index; i++) {
        current = current.next;
      }
      return current;
    } else {
      return undefined;
    }
  }

  //在任意位置插入元素
  insert(element, index) {
    if(index >= 0 && index <= this.count) {
      const node = new Node(element);
      if(index === 0) {
        node.next = this.head;
        this.head  = node;
      } else {
        let previous = this.getElementAt(index - 1);
        let current = previous.next;
        node.next = current;
        previous.next = node;
      }
      this.count++;
      return true;
    } else {
      return false;
    }
  }

  //返回一个元素的位置
  indexOf(element) {
    let current = this.head;
    let i = 0;
    for(let i = 0; i < this.count; i++) {
      if(this.equalsFn(current.element, element)) {
        return i;
      } else {
        current = current.next;
      }
    }
    return -1;
  }

  //从链表中移除元素
  remove(element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  }

  //返回链表的元素个数
  size() {
    return this.count;
  }

  //如果链表中不包含任何元素，返回true，否则返回false
  isEmpty() {
    return this.size() === 0;
  }

  //获得链表的第一个元素（头部）
  getHead() {
    return this.head;
  }

  //清空链表
  clear() {
    this.head = undefined;
    this.count = 0;
  }

  //将链表转换成一个字符串
  toString() {
    if(this.isEmpty()) {
      return '';
    }
    let current = this.head;
    let objectStr = `${current.element}`;
    while(current.next != null) {
      current = current.next;
      objectStr = `${objectStr}, ${current.element}`;
    } 
    return objectStr;
  }
  
}