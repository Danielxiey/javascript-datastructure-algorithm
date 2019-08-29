import {Stack} from './stack';

//十进制转二进制函数
function decimalToBinary(decNum) {
  const remStack = new Stack();
  let num = decNum;
  let rem;
  
  while(num > 0) {
    rem = Math.floor(num % 2);
    remStack.push(rem);
    num = Math.floor(num / 2);
  }

  let binary = '';
  while(!remStack.isEmpty()) {
    binary += remStack.pop();
  }

  return binary;
}

//测试
console.log(decimalToBinary(233));
console.log(decimalToBinary(10));
console.log(decimalToBinary(1000));