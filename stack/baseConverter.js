import {Stack} from './stack';

function baseConverter(decNum, base) {
  const remStack = new Stack();
  let num = decNum;
  let rem;
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  if(!(base >= 2 && base <= 36)) {
    return '';
  }

  while(num > 0) {
    rem = Math.floor(num % base);
    remStack.push(rem);
    num = Math.floor(num / base);
  }

  let baseString = '';
  while(!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }
  return baseString;
}

//测试
console.log(baseConverter(100345, 2));
console.log(baseConverter(100345, 8));
console.log(baseConverter(100345, 16));
console.log(baseConverter(100345, 35));