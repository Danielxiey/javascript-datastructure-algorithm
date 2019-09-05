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

//堆排序算法(输出从小到大排序的数组)
function heapSort(array, compareFn = defaultCompare) {
  let heapSize = array.length;
  buildMaxHeap(array, compareFn);
  while(heapSize > 1) {
    swap(array, 0, --heapSize);
    heapify(array, 0, heapSize, compareFn);
  }
  return array;
}

//构建最大堆
function buildMaxHeap(array, compareFn) {
  for(let i = Math.floor(array.length / 2); i >= 0; i--) {
    heapify(array, i, array.length, compareFn);
  }
  return array;
}

//下移函数，堆排序
function heapify(array, index, heapSize, compareFn) {
  let element = index;
  let leftIndex = index * 2 + 1;
  let rightIndex = index * 2 + 2;
  if(leftIndex < heapSize && compareFn(array[element], array[leftIndex]) === Compare.LESS_THAN) {
    element = leftIndex;
  }
  if(rightIndex < heapSize && compareFn(array[element], array[rightIndex]) === Compare.LESS_THAN){
    element = rightIndex;
  }
  if(element != index) {
    swap(array, element, index);
    heapify(array, element, heapSize, compareFn);
  }
}


// 交换函数
function swap(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}


//测试
const array = [7, 6, 3, 5, 4, 1, 2];

console.log('Before sorting: ', array);
console.log('After sorting: ', heapSort(array));