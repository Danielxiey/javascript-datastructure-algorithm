import {Compare, defaultCompare} from './unit';
import {quickSort} from './quickSort';
const DOES_NOT_EXIT = -1;

function lesserOrEquals(a, b, compareFn = defaultCompare) {
  if(compareFn(a, b) === Compare.LESS_THAN || compareFn(a, b) === Compare.EQUALS) {
    return true;
  } else {
    return false;
  }
}

function biggerOrEquals(a, b, compareFn = defaultCompare) {
  if(compareFn(a, b) === Compare.BIGGER_THAN || compareFn(a, b) === Compare.EQUALS) {
    return true;
  } else {
    return false;
  }
}

export function interpolationSearch(array, value, compareFn = defaultCompare) {
  array = quickSort(array);
  let low = 0;
  let high = array.length - 1;
  let delta = -1;
  let position = -1;
  while(low <= high && lesserOrEquals(array[low], value) && biggerOrEquals(array[high], value)) {
    delta = (value - array[low]) / (array[high] - array[low]);
    position = low + Math.floor((high - low) * delta); 
    if(compareFn(value, array[position]) === Compare.LESS_THAN) {
      high = position - 1;
    } else if(compareFn(value, array[position]) === Compare.BIGGER_THAN) {
      low = position + 1;
    } else {
      return position;
    }
  }
  return DOES_NOT_EXIT;
}
