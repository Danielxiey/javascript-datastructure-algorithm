import {defaultEquals} from './defaultEquals';
import {DoublyNode} from './node';

export class DoublyLinkedList {
  constructor(equalsFn = defaultEquals) {
    this.head = undefined;
    this.tail = undefined;
    this.count = 0;
    this.equalsFn = equalsFn;
  }

  //向双向链表尾部添加一个新元素
  push(element) {
    const node = new DoublyNode(element);
    if(this.isEmpty()) {
      this.head = node;
      this.tail = node;
    } else {
      let current = this.tail;
      current.next = node;
      node.prev = current;
      this.tail = node;
    }
    this.count++;
  }

  //在任意位置插入元素
  insert(element, index) {
    if(index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      if(index === 0) {
        if(this.isEmpty()) {
          this.head = node;
          this.tail = node;
        } else {
          let current = this.head;
          node.next = current;
          current.prev = node;
          this.head = node;
        }
      } else if(index === this.count) {
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      } else {
        let previous = this.getElementAt(index - 1);
        let current = previous.next;
        node.next = current;
        previous.next = node;
        current.prev = node;
        node.prev = previous;
      }
      this.count++;
      return true;
    } else {
      return false;
    }
  }

  //从特定位置移除一个元素，并返回该元素
  removeAt(index) {
    if(index >= 0 && index < this.count) {
      let current = this.head;
      if(index === 0) {
        if(this.count === 1) {
          this.head = undefined;
          this.tail = undefined;
        } else {
          this.head = current.next;
          this.head.prev = undefined;
        }
      } else if(index === this.count - 1) {
        current = this.tail;
        let previous = current.prev;
        previous.next = undefined;
        this.tail = previous;
      } else {
        let previous = this.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
        current.next.prev = previous;
      }
      this.count--;
      return current.element;
    } else {
      return undefined;
    }
  }

  //从双向链表中移除元素，并返回
  remove(element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  }

  //返回一个元素的位置
  indexOf(element) {
    let current = this.head;
    for(let i = 0; i < this.count; i++) {
      if(this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
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

  //返回双向链表的元素个数
  size() {
    return this.count;
  }

  //如果双向链表中不包含任何元素，返回true，否则返回false
  isEmpty() {
    return this.count === 0;
  }

  //获得双向链表的第一个元素（头部）
  getHead() {
    return this.head;
  }

  //获得双向链表的最后一个元素（尾部）
  getTail() {
    return this.tail;
  }

  //清空双向链表
  clear() {
    this.head = undefined;
    this.tail = undefined;
    this.count = 0;
  }

  //将双向链表输出为一个字符串
  toString() {
    if(this.isEmpty()) {
      return '';
    }
    let current = this.head;
    let objectStr = `${current.element}`;
    for(let i = 1; i < this.size(); i++) {
      current = current.next;
      objectStr = `${objectStr}, ${current.element}`;
    }
    return objectStr;
  }

  //将双向链表反向输出成一个字符串
  inverseToString() {
    if(this.isEmpty()) {
      return '';
    } else {
      let current = this.tail;
      let objectStr = `${current.element}`;
      for(let i = 1; i < this.size(); i++) {
        current = current.prev;
        objectStr = `${objectStr}, ${current.element}`;
      }
      return objectStr;
    }
  }
}