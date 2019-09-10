function countingSortForRadix(array, significantDigit, radixBase, min) {
  const buckets = [];
  for(let i = 0; i < radixBase; i++) {
    buckets[i] = 0;
  }

  for(let i = 0; i < array.length; i++) {
    let bucketIndex = Math.floor((array[i] - min) / significantDigit % radixBase);
    buckets[bucketIndex]++;
  }

  for(let i = 1; i < radixBase; i++) {
    buckets[i] += buckets[i - 1];
  }

  const sortArray = [];
  for(let i = array.length - 1; i >= 0; i--) {
    let bucketIndex = Math.floor((array[i] - min) / significantDigit % radixBase);
    sortArray[--buckets[bucketIndex]] = array[i];
  }
  return sortArray;
}

export function radixSort(array, radixBase = 10) {
  if(array.length < 2) {
    return array;
  }
  let min = array[0], max = array[0];
  for(let i = 0; i < array.length; i++) {
    if(array[i] < min) {
      min = array[i];
    } else if(array[i] > max) {
      max = array[i];
    }
  }

  let significantDigit = 1;
  while((max - min) / significantDigit >= 1) {
    array = countingSortForRadix(array, significantDigit, radixBase, min);
    significantDigit *= radixBase;
  } 
  return array;
}