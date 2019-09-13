//背包问题,寻找最佳方案使得装入背包的物品总重量不超过背包容量。且总价值最大
//capacity是背包容量，weights是物品重量数组，values是物品价值数组，n代表物品号
function knapSack(capacity, weights, values, n) {
  const ks = [];                            //初始化寻找解决方案的矩阵
  for(let i = 0; i <= n; i++) {             //行代表物品，列代表背包容量
    ks[i] = [];
  }

  for(let i = 0; i <= n; i++) {
    for(let w = 0; w <= capacity; w++) {   
      if(i == 0 || w == 0) {                //当物品号是0，或者背包容量是0时置为0
        ks[i][w] = 0;
      } else {
        if(weights[i - 1] <= w) {           //当物品小于当前背包容量才有可能是解决方案中的一部分
          let a = values[i - 1] + ks[i - 1][w - weights[i -1]];
          let b = ks[i-1][w];
          ks[i][w] = a > b ? a : b;        //比较加入当前物品后的价值与之前的背包中物品的价值
        } else {
          ks[i][w] = ks[i - 1][w];         //使用之前的值
        }
      }
    }
  }
  findValues(capacity, n, ks, weights, values);     //输出背包最大价值的物品组成
  return ks[n][capacity];
}

function findValues(capacity, n, ks, weights, values) {
  let i = n;
  let w = capacity;
  console.log('构成解的物品：');
  while(ks[i][w] > 0) {
    if(ks[i][w] != ks[i - 1][w]) {
      console.log(`物品${i}可以是解的一部分w,v: ${weights[i - 1]}, ${values[i - 1]}`);
      i--;
      w = w - weights[i - 1];
    } else {
      i--;
    }
  }
}

//测试
const values = [3,4,5];
const weights = [2,3,4];
const capacity = 5;
const n = values.length;
console.log(knapSack(capacity, weights, values, n));
