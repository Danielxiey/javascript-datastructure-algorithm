//迷宫老鼠问题
function ratInMaze(maze) {
  const solution = [];                            //定义一个路径矩阵，并初始化
  for(let i = 0; i < maze.length; i++) {
    solution[i] = [];
    for(let j = 0; j < maze[i].length; j++) {
      solution[i][j] = 0;
    }
  }

  if(findPath(maze, 0, 0, solution)) {           //如果找到路径就返回路径矩阵，否则进行提示
    return solution;
  }
  return 'No Path Found';
}

function findPath(maze, x, y, solution) {   
  let n = maze.length;
  if(x == n - 1 && y == n - 1) {            //如果处于路径矩阵的最后一个位置，且值为1，则找到路径
    solution[x][y] = 1;
    return true;
  }

  if(isSafe(maze, x, y)) {                     //确保当前路径老鼠可行
    solution[x][y] = 1;
    if(findPath(maze, x + 1, y, solution)) {   //递归调用，查询下一个移动点是否有可行路径
      return true;
    }
    if(findPath(maze, x, y + 1, solution)) {
      return true;
    }
    solution[x][y] = 0;                        //如果当前路径每一种可能都不可行，则进行回溯
    return false;
  }
  return false;
}

function isSafe(maze, x, y) {                  //检查当前路径是否可行的矩阵
  let n = maze.length;
  if(x >= 0 && x < n && y >= 0 && y < n && maze[x][y] == 1) {
    return true;
  }
  return false;
}


//测试
const maze = [
  [1,0,0,0],
  [1,1,1,1],
  [0,1,0,0],
  [0,1,1,1]
];

console.log(ratInMaze(maze));