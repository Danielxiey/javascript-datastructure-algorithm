const INF = Infinity;

function floydWarshall(graph) {
  const distance = [];
  for(let i = 0; i < graph.length; i++) {
    distance[i] = [];
    for(let j = 0; j < graph.length; j++) {
      if(i == j) {
        distance[i][j] = 0;
      } else if(graph[i][j] == 0) {
        distance[i][j] = INF;
      } else {
        distance[i][j] = graph[i][j];
      }
    }
  }

  for(let k = 0; k < graph.length; k++) {
    for(let i = 0; i < graph.length; i++) {
      for(let j = 0; j < graph.length; j++) {
        if(distance[i][k] + distance[k][j] < distance[i][j]) {
          distance[i][j] = distance[i][k] + distance[k][j];
        }
      }
    }
  }

  return distance;
}


//测试
const graph = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 2, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
];

console.log('********* Floyd-Warshall Algorithm - All-Pairs Shortest Path ***********');

let dist = floydWarshall(graph);
console.log(dist);

let s = '';
for (let i = 0; i < dist.length; ++i) {
  s = '';
  for (var j = 0; j < dist.length; ++j) {
    if (dist[i][j] === INF) s += 'INF ';
    else s += dist[i][j] + '   ';
  }
  console.log(s);
}