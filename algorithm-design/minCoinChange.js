//最少硬币找零问题
//coins数组参数中包含着可用的硬币面额，amount是要找零的金额
function minCoinChange(coins, amount) {
  const cache = [];                          //用于缓存计算结果，避免重复计算
  const makeChange = (amount) => {
    if(amount <= 0) {                        //如果要要找零的金额小于等于0，返回空数组
      return [];
    }
    if(cache[amount]) {                      //如果缓存中有该找零金额的最少方案，则返回
      return cache[amount];
    }

    let min = [];                         
    let newAmount = 0;
    let newMin = [];
    for(let i = 0; i < coins.length; i++) {  //依据硬币面额来解决问题
      let coin = coins[i];                   
      newAmount = amount - coin;             //扣除该面额硬币剩下的金额
      if(newAmount >= 0) {
        newMin = makeChange(newAmount);      //若剩下的金额大于等于0，递归调用makeChange方法
      }
      if(newAmount >= 0 && (newMin.length < min.length - 1 || !min.length) && (newMin.length || !newAmount)) {                      //检验剩余的金额要大于等于0，新的找零方案要更优化
        min = [coin].concat(newMin);         //组成新的找零方案
      }
    }
    return cache[amount] = min;              //将对应金额的找零方案存入缓存并返回
  }
  return makeChange(amount);
}


//测试
console.log(minCoinChange([1, 5, 10], 15)); // [5, 10]
console.log(minCoinChange([1, 3, 4], 6)); // [3, 3]
console.log(minCoinChange([1, 5, 10, 25], 36)); // [1, 10, 25]