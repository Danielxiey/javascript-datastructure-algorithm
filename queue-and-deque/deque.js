class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  //在双端队列前端添加新的元素(使用负值键名)
  addFront(element) {
    this.lowestCount--;
    this.items[this.lowestCount] = element;
  }

  //在双端队列前端添加新的元素(当作数组看待)
  /*
  addFront(element) {
    if(this.isEmpty()) {
      this.addBack(element);
    } else if(this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for(let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.items[0] = element;
      this.count++;
      this.lowestCount = 0;
    }
  }
  */

  //在双端队列后端添加新的元素
  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  //从双端队列前端移除第一个元素
  removeFront() {
    if(this.isEmpty()) {
      return undefined;
    }
    let result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  //从双端队列后端移除第一个元素
  removeBack() {
    if(this.isEmpty()) {
      return undefined;
    }
    this.count--;
    let result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  //返回双端队列前端的第一个元素
  peekFront() {
    if(this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  //返回双端队列后端的第一个元素
  peekBack() {
    if(this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  //返回双端队列中包含的元素个数
  size() {
    return this.count - this.lowestCount;
  }

  //如果双端队列中不包含任何元素，返回true，否则返回false
  isEmpty() {
    return this.size() === 0;
  }

  //清空双端队列
  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  //模拟toString方法，将双端队列中的元素以字符串形式返回
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