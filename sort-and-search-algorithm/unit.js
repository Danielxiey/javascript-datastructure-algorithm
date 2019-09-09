export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1
}

export function defaultCompare(a, b) {
  if(a == b) {
    return 0;
  } else {
    return a > b ? Compare.BIGGER_THAN : Compare.LESS_THAN;
  }
}

export function swap(array, index1, index2) {
  let temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

export function createArray(size) {
  const array = [];
  for(let i = size; i > 0; i--) {
    array[size - i] = i;
  }
  return array;
}