const INF = Number.MAX_SAFE_INTEGER;

function minDistance(distance, visited) {
  let minDis = INF;
  let minIndex = -1;
  for(let i = 0; i < distance.length; i++) {
    if(!visited[i] && distance[i] != INF && distance[i] < minDis) {
      minDis = distance[i];
      minIndex = i;
    }
  }
  return minIndex;
}

function dijkstra(graph, src) {
  const distance = [];
  const visited = [];
  for(let i = 0; i < graph.length; i++) {
    distance[i] = INF;
    visited[i] = false;
  }

  distance[src] = 0;
  for(let i = 0; i < graph.length - 1; i++) {
    let u = minDistance(distance, visited);
    visited[u] = true;
    for(let j = 0; j < graph.length; j++) {
      if(!visited[j] && distance[u] != INF && graph[u][j] != 0 && distance[u] + graph[u][j] < distance[j]) {
        distance[j] = distance[u] + graph[u][j];
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

console.log("********* Dijkstra's Algorithm - Shortest Path ***********");

var dist = dijkstra(graph, 0);
console.log(dist);

for (i = 0; i < dist.length; i++){
    console.log(i + '\t\t' + dist[i]);
}