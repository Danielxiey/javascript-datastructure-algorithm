function getMaxValue(array) {
  let max = array[0];
  for(let i = 1; i < array.length; i++) {
    if(array[i] > max) {
      max = array[i];
    }
  }
  return max;
}

export function countingSort(array) {
  if(array.length < 2) {
    return array;
  }

  let max = getMaxValue(array);
  const counts = new Array(max + 1);
  for(let i = 0; i < array.length; i++) {
    if(!counts[array[i]]) {
      counts[array[i]] = 0;
    }
    counts[array[i]]++;
  }

  let sortIndex = 0;
  for(let i = 0; i < counts.length; i++) {
    while(counts[i] > 0) {
      array[sortIndex++] = i;
      counts[i]--; 
    }
  }
  return array;
}