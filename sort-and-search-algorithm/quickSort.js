import {Compare, defaultCompare, swap} from './unit';

function quick(array, left, right, compareFn) {
  if(array.length > 1) {
    let index = partition(array, left, right, compareFn);
    if(left < index - 1) {
      array = quick(array, left, index - 1, compareFn);
    }
    if(index < right) {
      array = quick(array, index, right, compareFn);
    }
  }
  return array;
}

function partition(array, left, right, compareFn) {
  let i = left;
  let j = right;
  let pivot = array[Math.floor((left + right) / 2)];
  while(i <= j) {
    while(compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++;
    }
    while(compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--;
    }
    if(i <= j) {
      swap(array, i, j);
      i++;
      j--;
    }
  }
  return i;
}

export function quickSort(array, compareFn = defaultCompare) {
  return quick(array, 0, array.length - 1, compareFn);
}