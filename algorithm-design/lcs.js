//最长公共子序列
function lcs(strX, strY) {
  let m = strX.length;
  let n = strY.length;
  let l = [];                               //用于记录最长公共子序列长度
  let solution = [];                        //用于记录最长公共子序列的检索路径

  for(let i = 0; i <= m; i++) {             //初始化两个矩阵
    l[i] = [];
    solution[i] = [];
    for(let j = 0; j <= n; j++) {
      l[i][j] = 0;
      solution[i][j] = 0; 
    }
  }

  for(let i = 1; i <= m; i++) {                  
    for(let j = 1; j <= n; j++) {
      if(strX[i - 1] === strY[j - 1]) {    //若两个字符串同一位置的字符相同时的处理
        l[i][j] = l[i - 1][j - 1] + 1;
        solution[i][j] = 'diagnol';
      } else {                             //两个字符串同一位置的字符不相同时的处理
        let a = l[i - 1][j];
        let b = l[i][j - 1];
        l[i][j] = a >= b ? a : b;
        solution[i][j] = l[i][j] === l[i - 1][j] ? 'top' : 'left';
      }
    }
  }

  const printResult = (solution, m, n) => {    //输出最长公共子序列结果
    let answer = '';
    let i = m;
    let j = n;
    while(solution[i][j] != 0) {
      if(solution[i][j] === 'diagnol') {
        answer = strX[i - 1] + answer;
        i--;
        j--;
      } else if(solution[i][j] === 'top') {
        i--
      } else if(solution[i][j] === 'left') {
        j--;
      }
    }

    return answer;
  }

  return printResult(solution, m, n);
}

//测试
console.log(lcs('acbacd', 'abcadf'));