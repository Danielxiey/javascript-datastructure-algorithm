import {Compare, defaultCompare, swap} from './unit';

export function selectionSort(array, compareFn = defaultCompare) {
  let minIndex;
  for(let i = 0; i < array.length - 1; i++) {
    minIndex = i;
    for(let j = i + 1; j < array.length; j++) {
      if(compareFn(array[minIndex], array[j]) === Compare.BIGGER_THAN) {
         minIndex = j;
      }
    }
    if(i != minIndex) {
      swap(array, i, minIndex);
    }
  }
  return array;
}
