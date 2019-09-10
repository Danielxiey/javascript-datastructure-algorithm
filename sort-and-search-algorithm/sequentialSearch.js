import {defaultEquals} from './unit';
const DOES_NOT_EXIT = -1;

export function sequentialSearch(array, value, equalsFn = defaultEquals) {
  for(let i = 0; i < array.length; i++) {
    if(equalsFn(array[i], value)) {
      return i;
    }
  }
  return DOES_NOT_EXIT;
}