import {Compare, defaultCompare} from './unit';

export function insertionSort(array, compareFn = defaultCompare) {
  for(let i = 1; i < array.length; i++) { 
    let j = i;
    let temp = array[j];
    while(j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = temp;
  }
  return array;
}