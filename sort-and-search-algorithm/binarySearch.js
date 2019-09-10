import {defaultCompare, Compare, swap} from "./unit";
import {quickSort} from './quickSort';

export function binarySearch(array, value, compareFn = defaultCompare) {
  array = quickSort(array);
  let length = array.length;
  let low = 0;
  let high = length - 1;
  while(low <= high) {
    let mid = Math.floor((low + high) / 2);
    if(compareFn(value, array[mid]) === Compare.LESS_THAN) {
      high = mid - 1;
    } else if(compareFn(value, array[mid]) === Compare.BIGGER_THAN) {
      low = mid + 1;
    } else {
      return mid;
    }
  }
  return false;
}