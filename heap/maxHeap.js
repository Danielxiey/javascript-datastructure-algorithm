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

class MaxHeap {
  constructor(compareFn = defaultCompare) {
    this.heap = [];
    this.compareFn = compareFn;
  }

  //获取左子节点的位置
  getLeftIndex(index) {
    return 2 * index + 1;
  }

  //获取右子节点的位置
  getRightIndex(index) {
    return 2 * index + 2;
  }

  //获取父节点的位置
  getParentIndex(index) {
    if(this.heap.length == 1) {
      return undefined;
    } else {
      return Math.floor((index - 1) / 2);
    }
  }

  //向堆中插入一个新的值
  insert(value) {
    if(value == null) {
      return false;
    } else {
      if(this.isEmpty()) {
        this.heap.push(value);
      } else {
        this.heap.push(value);
        let index = this.heap.length - 1;
        this.siftUp(index);
      }
      return true;
    }
  }

  //上移函数
  siftUp(index) {
    let element = index;
    let parent = this.getParentIndex(index);
    while(element > 0 && this.compareFn(this.heap[element], this.heap[parent]) === Compare.BIGGER_THAN) {
      this.swap(this.heap, element, parent);
      element = parent;
      parent = this.getParentIndex(element);
    }
  }

  //交换函数
  swap(array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  }

  //返回堆中的最大值
  findMaximun() {
    if(this.isEmpty()) {
      return undefined;
    } else {
      return this.heap[0];
    }
  }

  //从堆中移除最大值，并返回这个值
  extract() {
    if(this.isEmpty()) {
      return undefined;
    } else {
      if(this.size() === 1) {
        return this.heap.shift();
      } else {
        let removeValue = this.heap.shift();
        this.heap.unshift(this.heap.pop());
        this.siftDown(0);
        return removeValue;
      }
    }
  }

  //下移函数
  siftDown(index) {
    let element = index;
    let leftIndex = this.getLeftIndex(element);
    let rightIndex  = this.getRightIndex(element);
    if(this.heap[leftIndex] && this.compareFn(this.heap[element], this.heap[leftIndex]) === Compare.LESS_THAN) {
      element = leftIndex;
    }
    if(this.heap[rightIndex] && this.compareFn(this.heap[element], this.heap[rightIndex]) === Compare.LESS_THAN) {
      element = rightIndex;
    }
    if(element != index) {
      this.swap(this.heap, index, element);
      this.siftDown(element);
    }
  }

  //获取堆中元素的个数
  size() {
    return this.heap.length;
  }

  //判断堆是否为空
  isEmpty() {
    return this.size() === 0;
  }

  //清空堆中的元素
  clear() {
    this.heap = [];
  }

  //作为数组输出
  getAsArray() {
    return this.heap;
  }
}


//测试
const maxHeap = new MaxHeap();

maxHeap.insert(2);
maxHeap.insert(3);
maxHeap.insert(4);
maxHeap.insert(5);

maxHeap.insert(1);

console.log(maxHeap.getAsArray());

console.log('Heap size: ', maxHeap.size()); // 5
console.log('Heap is empty: ', maxHeap.isEmpty()); // false
console.log('Heap min value: ', maxHeap.findMaximun()); // 5

maxHeap.insert(6);
maxHeap.insert(9);
maxHeap.insert(10);
maxHeap.insert(14);

console.log(maxHeap.getAsArray());

console.log('Extract minimum: ', maxHeap.extract());
console.log(maxHeap.getAsArray());