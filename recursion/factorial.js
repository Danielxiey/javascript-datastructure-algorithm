//阶乘计算函数
//迭代版本
function factorialIterative(n) {
  if(typeof n == 'number' && n >= 0 && Math.floor(n) == n) {
    if(n === 1 || n === 0) {
      return 1;
    }
    let total = 1;
    for(let i = 2; i <= n; i++) {
      total *= i;
    }
    return total;
  }
}

//递归版本
function factorial(n) {
  if(typeof n == 'number' && n >= 0 && Math.floor(n) == n) {
    if(n === 1 || n === 0) {
      return 1;
    }
    return n * factorial(n - 1);
  } else {
    return undefined;
  }
}