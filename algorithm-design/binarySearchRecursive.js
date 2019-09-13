import {Compare, defaultCompare} from './units';
import {quickSort} from '../sort-and-search-algorithm/quickSort';
const DOES_NOT_EXIT = -1;

function binarySearchRecursive(array, value, low, high, compareFn) {
  if(low <= high) {
    let mid = Math.floor((low + high) / 2);
    if(compareFn(value, array[mid]) === Compare.LESS_THAN) {
      return binarySearchRecursive(array, value, low, mid - 1, compareFn);
    } else if(compareFn(value, array[mid]) === Compare.BIGGER_THAN) {
      return binarySearchRecursive(array, value, mid + 1, high, compareFn);
    } else {
      return mid;
    }
  }
  return DOES_NOT_EXIT;
} 

export function binarySearch(array, value, compareFn = defaultCompare) {
  array = quickSort(array);
  return binarySearchRecursive(array, value, 0, array.length - 1, compareFn);
}