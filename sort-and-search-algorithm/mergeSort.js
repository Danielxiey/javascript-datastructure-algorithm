import {Compare, defaultCompare} from './unit';

function merge(left, right, compareFn) {
  let i = 0, j = 0;
  const result = [];
  while(i < left.length && j < right.length) {
    if(compareFn(left[i], right[j]) === Compare.LESS_THAN) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  if(i < left.length) {
    return result.concat(left.slice(i));
  } else {
    return result.concat(right.slice(j));
  }
}

export function mergeSort(array, compareFn = defaultCompare) {
  let length = array.length;
  if(length > 1) {
    let middle = Math.floor(length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, length);
    left = mergeSort(left, compareFn);
    right = mergeSort(right, compareFn);
    array = merge(left, right, compareFn);
  }
  return array;
}

