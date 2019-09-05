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

export class MinHeap {
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
    if(index === 0) {
      return undefined;
    } else {
      return Math.floor((index - 1) / 2);
    }
  }

  //向堆中插入一个新的值
  insert(value) {
    if(this.heap == null) {
      this.heap.push(value);
      return true;
    } else {
      this.heap.push(value);
      let index = this.heap.length - 1;
      this.siftUp(index);
      return true;
    }
  }

  //节点上移函数
  siftUp(index) {
    let element = index;
    let parent = this.getParentIndex(element);
    while(element > 0 && this.compareFn(this.heap[parent], this.heap[element]) === Compare.BIGGER_THAN) {
        this.swap(this.heap, parent, element);
        element = parent;
        parent = this.getParentIndex(element);
    }
  }

  //交换节点的值
  swap(array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
  }

  //从堆中找到最小值
  findMinimum() {
    if(this.isEmpty()) {
      return undefined;
    } else {
      return this.heap[0];
    }
  }

  //移除堆中的最小值,并返回被移除的值
  extract() {
    if(this.isEmpty()) {
      return undefined;
    } else if(this.size() === 1) {
      return this.heap.shift();
    }else {
      let removeValue = this.heap.shift();
      this.heap.unshift(this.heap.pop());
      this.siftDown(0);
      return removeValue;
    }
  }

  //下移函数
  siftDown(index) {
    let element = index;
    let leftIndex = this.getLeftIndex(index);
    let rightIndex = this.getRightIndex(index);     
    if(this.heap[leftIndex] && this.compareFn(this.heap[element], this.heap[leftIndex]) === Compare.BIGGER_THAN) {
      element = leftIndex;
    }
    if(this.heap[rightIndex] && this.compareFn(this.heap[element], this.heap[rightIndex]) === Compare.BIGGER_THAN) {
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