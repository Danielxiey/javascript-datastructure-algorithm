import {Node} from './node';
import {LinkedList} from './linkedList';
import {defaultEquals} from './defaultEquals';

export class CircularLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
  }

  //向循环链表尾部添加一个新元素
  push(element) {
    const node = new Node(element);
    if(super.isEmpty()) {
      this.head = node;
    } else {
      let current = super.getElementAt(this.count - 1);
      current.next = node;
    }
    node.next = this.head;
    this.count++;
  }
  
  //在任意位置插入元素
  insert(element, index) {
    if(index >= 0 && index <= this.count) {
      const node = new Node(element);
      if(index === 0) {
        if(super.isEmpty()) {
          this.head = node;
          node.next = this.head;
        } else {
          let tail = super.getElementAt(this.count - 1);
          node.next = this.head;
          this.head = node;
          tail.next = node;
        }
      } else {
        let previous = super.getElementAt(index - 1);
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

  //从特定位置移除一个元素，并返回该元素
  removeAt(index) {
    if(index >= 0 && index < this.count) {
      let current = this.head;
      if(index === 0) {
        if(this.count === 1) {
          this.head = undefined;
        } else {
          let tail = super.getElementAt(this.count - 1);
          this.head = current.next;
          tail.next = this.head;
        }
      } else {
        let previous = super.getElementAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    } else {
      return undefined;
    }
  }
}