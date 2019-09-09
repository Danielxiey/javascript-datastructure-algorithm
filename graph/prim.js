const INF = Number.MAX_SAFE_INTEGER;

function minKeys(keys, visited) {
  let minKeys = INF;
  let minIndex = -1;
  for(let i = 0; i < keys.length; i++) {
    if(!visited[i] && keys[i] != INF && keys[i] < minKeys) {
      minKeys = keys[i];
      minIndex = i;
    }
  }
  return minIndex;
}

function prim(graph) {
  const keys = [];
  const visited = [];
  const parent = [];
  for(let i = 0; i < graph.length; i++) {
    keys[i] = INF;
    visited[i] = false;
  }

  keys[0] = 0;
  parent[0] = -1;
  for(let i = 0; i < graph.length - 1; i++) {
    let u = minKeys(keys, visited);
    visited[u] = true;
    for(let j = 0; j < graph.length; j++) {
      if(!visited[j] && graph[u][j] != 0 && graph[u][j] < keys[j]) {
        keys[j] = graph[u][j];
        parent[j] = u;
      }
    }
  }
  return parent;
}

const graph = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0]
];

console.log("********* Prim's Algorithm - Minimum Spanning Tree ***********");

const parent = prim(graph);

console.log('Edge   Weight');
for (let i = 1; i < graph.length; i++) {
  console.log(parent[i] + ' - ' + i + '   ' + graph[i][parent[i]]);
}
