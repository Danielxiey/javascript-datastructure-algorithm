export class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  //向队列尾部添加新的项
  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  //移除队列的第一项并返回被移除的元素
  dequeue() {
    if(this.isEmpty()) {
      return undefined;
    }
    let result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  //返回队列中第一个元素
  peek() {
    if(this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  //返回队列中包含的元素个数
  size() {
    return this.count - this.lowestCount;
  }

  //如果队列中不包含任何元素，返回true，否则返回false
  isEmpty() {
    return this.size() === 0;
  }

  //清空队列
  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  //模拟toString方法，将队列中的元素以字符串形式返回
  toString() {
    if(this.isEmpty()) {
      return '';
    }
    let objectStr = `${this.items[this.lowestCount]}`;
    for(let i = this.lowestCount + 1; i < this.count; i++) {
      objectStr = `${objectStr}, ${this.items[i]}`;
    }
    return objectStr;
  }
}