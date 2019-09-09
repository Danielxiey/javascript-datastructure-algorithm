const INF = Number.MAX_SAFE_INTEGER;

function initializeCost(graph) {
  const cost = [];
  for(let i = 0; i < graph.length; i++) {
    cost[i] = [];
    for(let j = 0; j < graph.length; j++) {
      if(graph[i][j] == 0) {
        cost[i][j] = INF;
      } else {
        cost[i][j] = graph[i][j];
      }
    }
  }
  return cost;
}

function find(i, parent) {
  while(parent[i]) {
    i = parent[i];
  }
  return i;
}

function union(u, v, parent) {
  if(u != v) {
    parent[v] = u;
    return true;
  } else {
    return false;
  }
}

function kruskal(graph) {
  const parent = [];
  let a, b, u, v;
  let ne = 0;
  const cost = initializeCost(graph);
  while(ne < graph.length - 1) {
    let min = INF;
    for(let i = 0; i < graph.length; i++) {
      for(let j = 0; j < graph.length; j++) {
        if(cost[i][j] < min) {
          min = cost[i][j];
          a = u = i;
          b = v = j;
        }
      }
    }

    u = find(u, parent);
    v = find(v, parent);
    if(union(u , v , parent)) {
      ne++;
      cost[a][b] = cost[b][a] = INF;
    }
  }
  return parent;
}


//测试
const graph = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0]
];

console.log('********* Kruskal Algorithm - Minimum Spanning Tree ***********');

const parent = kruskal(graph);

console.log('Edge   Weight');
for (let i = 1; i < graph.length; i++) {
  console.log(parent[i] + ' - ' + i + '   ' + graph[i][parent[i]]);
}
