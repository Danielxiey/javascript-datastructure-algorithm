//斐波那契函数
//迭代版本
function fibonacciIterative(n) {
  if(typeof n == 'number' && n >= 0 && Math.floor(n) == n) {
    if(n == 0) {
      return 0;
    }
    if(n <= 2) {
      return 1;
    }
    let fib1 = 1, fib2 = 1, fib;
    for(let i = 3; i <= n; i++) {
      fib = fib1 + fib2;
      fib1 = fib2;
      fib2 = fib
    }
    return fib;
  } else {
    return undefined;
  }
}

//递归版本
function fibonacci(n) {
  if(typeof n == 'number' && n >= 0 && Math.floor(n) == n) {
    if(n == 0) {
      return 0;
    }
    if(n <= 2) {
      return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  } else {
    return undefined;
  }
}

//记忆化斐波那契函数(递归)
function fibonacciMemoization(n) {
  const memo = [0, 1];
  const fibonacci = (n) => {
    if(memo[n] != null) return memo[n];
    return memo[n] = fibonacci(n - 1) + fibonacci(n - 2);
  }
  return fibonacci(n);
}