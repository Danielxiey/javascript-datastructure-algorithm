//数独解题器
function sudokuSolver(matrix) {
  if(solveSudoku(matrix) === true) {          //数独是否解出，若解出则返回数独矩阵
    return matrix;
  }
  return '无解';
}

const UNASSIGNED = 0;                         //定义一个常量表示该位置未填，实际上就是0
function solveSudoku(matrix) {
  let i = 0;
  let j = 0;
  let checkBlank = false;                     //指示数独矩阵中是否有未填项
  for(i = 0; i < matrix.length; i++) {
    for(j = 0; j < matrix[i].length; j++) {
      if(matrix[i][j] === UNASSIGNED) {       //若有未填项，则置标志位为true，跳出循环
        checkBlank = true;
        break;
      }
    }
    if(checkBlank === true) {                 
      break;
    }
  }

  if(checkBlank === false) {                 //循环检查结束标志位仍为false表明数独矩阵都已填
    return true;
  }

  for(let num = 1; num <= 9; num++) {        //逐个检查填入1到9是否可行
    if(isSafe(matrix, i, j , num)) {         //检查是否满足数独条件
      matrix[i][j] = num;
      if(solveSudoku(matrix)) {              //递归调用
        return true;
      }
      matrix[i][j] = UNASSIGNED;             //若无解则该位重新置为未填
    }
  }
  return false;
}

function isSafe(matrix, row, col, num) {
  if(!usedInRow(matrix, row, num) && !usedInCol(matrix, col, num) && !usedInMatrix(matrix, row - row % 3, col - col % 3, num)) {
    return true;
  }
  return false;
}

function usedInRow(matrix, row, num) {       //检查行
  for(let i = 0; i < matrix[row].length; i++) {
    if(num === matrix[row][i]) {
      return true;
    }
  }
  return false;
}

function usedInCol(matrix, col, num) {       //检查列
  for(let i = 0; i < matrix.length; i++) {
    if(num === matrix[i][col]) {
      return true;
    }
  }
  return false;
}

function usedInMatrix(matrix, startX, startY, num) {      //检查3*3矩阵
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
      if(num === matrix[startX + i][startY + j]) {
        return true;
      }
    }
  }
  return false;
}


//测试
const sudokuGrid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

console.log(sudokuSolver(sudokuGrid));