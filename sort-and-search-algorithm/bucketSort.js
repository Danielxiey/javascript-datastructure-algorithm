import {insertionSort} from './insertionSort';

function createBuckets(array, bucketSize) {
  let min = array[0], max = array[0];
  for(let i = 1; i < array.length; i++) {
    if(array[i] < min) {
      min = array[i];
    } else if(array[i] > max) {
      max = array[i];
    }
  }

  const buckets = [];
  let bucketCount = Math.floor((max - min) / bucketSize) + 1;
  for(let i = 0; i < bucketCount; i++) {
    buckets[i] = [];
  }

  for(let i = 0; i < array.length; i++) {
    let bucketIndex = Math.floor((array[i] - min) / bucketSize);
    buckets[bucketIndex].push(array[i]);
  }
  return buckets;
}

function sortBuckets(buckets) {
  const sortArray = [];
  for(let i = 0; i < buckets.length; i++) {
    if(buckets[i].length != 0) {
      insertionSort(buckets[i]);
      sortArray.push(...buckets[i]);
    }
  }
  return sortArray;
}

export function bucketSort(array, bucketSize = 5) {
  if(array.length < 2) {
    return array;
  }
  const buckets = createBuckets(array, bucketSize);
  return sortBuckets(buckets);
}