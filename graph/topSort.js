import {Graph} from './graph';

const Colors = {
  WHITE: 0,
  GRAY: 1,
  BALCK: 2
}


function initializeColor(vertices) {
  let color = {};
  for(let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
}


function depthFirstSearchVisit(u, d, f, p, time, color, adjList) {
  color[u] = Colors.GRAY;
  d[u] = ++time.count;
  let neighbors = adjList.get(u);
  for(let i = 0; i < neighbors.length; i++) {
    if(color[neighbors[i]] === Colors.WHITE) {
      depthFirstSearchVisit(neighbors[i], d, f, p, time, color, adjList);
      p[neighbors[i]] = u;
    }
  }
  color[u] = Colors.BALCK;
  f[u] = ++time.count;
}


function depthFirstSearch(graph) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const discovery = {};
  const finished = {};
  const predecessors = {};

  for(let i = 0; i < vertices.length; i++) {
    discovery[vertices[i]] = 0;
    finished[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }

  const time = {count: 0};

  for(let i = 0; i < vertices.length; i++) {
    if(color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], discovery, finished, predecessors, time, color, adjList);
    }
  }

  return {
    discovery,
    finished,
    predecessors
  }
}


//测试
const graph = new Graph(true); // directed graph

const myVertices = ['A', 'B', 'C', 'D', 'E', 'F'];
for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('F', 'E');

const result = depthFirstSearch(graph);
console.log('discovery', result.discovery);
console.log('finished', result.finished);
console.log('predecessors', result.predecessors);

const fTime = result.finished;
let s = '';
for(let i = 0; i < myVertices.length; i++) {
  let max = 0;
  let maxName = null;
  for(let j = 0; j < myVertices.length; j++) {
    if(fTime[myVertices[j]] > max) {
      max = fTime[myVertices[j]];
      maxName = myVertices[j];
    }
  }
  if(i == 0) {
    s += maxName;
  } else {
    s += ' - ' + maxName;
  }
  delete fTime[maxName];
}

console.log(s);