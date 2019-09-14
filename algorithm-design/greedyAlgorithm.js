import {countingSort} from '../sort-and-search-algorithm/countingSort';

//贪心算法求解最少硬币找零问题
function minCoinChange(coins, amount) {
  coins = countingSort(coins);
  let changes = [];
  while(amount > 0) {
    for(let i = coins.length - 1; i >= 0; i--) {
      let coin = coins[i];
      while(amount >= coin) {
        changes.push(coin);
        amount -= coin;
      }
    }
  }
  
  return changes;
}


//测试
console.log(minCoinChange([25,1,10,5], 36));     //最优解
console.log(minCoinChange([3,4,1],6));           //非最优解


//贪心算法求解分数背包问题
function knapSack(capacity, weights, values) {
  let totalValues = 0;
  while(capacity > 0) {
    for(let i = 0; i < weights.length; i++) {
      if(capacity >= weights[i]) {
        totalValues += values[i];
        capacity -= weights[i];
      } else {
        let rate = capacity / weights[i];
        totalValues += values[i] * rate;
        capacity -= capacity;
      }
    }
  }
  return totalValues;
}


//测试
console.log(knapSack(6, [2,3,4], [3,4,5]));