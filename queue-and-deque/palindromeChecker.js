import {Deque} from './deque';

function palindromeChecker(str) {
  //对于undefined、null以及空字符串要判断为false
  if(str === undefined || str === null || (str !== null && str.length === 0)) {
    return false;
  }

  const checkString = new Deque();
  let simpleStr = str.toLowerCase().split(' ').join('');

  for(let i = 0; i < simpleStr.length; i++) {
    checkString.addBack(simpleStr[i]);
  }

  let isPalindrome = true;
  while(checkString.size() > 1 && isPalindrome) {
    let startLetter = checkString.removeFront();
    let endLetter = checkString.removeBack();
    if(startLetter !== endLetter) {
      isPalindrome = false;
    }
  }

  return isPalindrome;
}