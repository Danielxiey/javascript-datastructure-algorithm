import {swap} from './unit.js';

function fisherYates(array) {
  for(let i = array.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    swap(array, i, randomIndex);
  }
  return array;
}

const array = [10,9,8,7,6,5,4,3,2,1];
console.log(fisherYates(array));