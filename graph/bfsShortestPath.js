import {Graph} from './graph';
import {Queue} from '../queue-and-deque/queue';
import {Stack} from '../stack/stack';

const Colors = {
  WHITE: 0,
  GRAY: 1,
  BALCK: 2
}

//初始化节点颜色
function initializeColor(vertices) {
  const color = {};
  for(let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
}

//初始化节点距离
function initializeDistance(vertices) {
  const distance = {};
  for(let i = 0; i < vertices.length; i++) {
    distance[vertices[i]] = 0;
  }
  return distance;
}

//初始化前溯节点距离
function initializePredecessors(vertices) {
  const predecessors = {};
  for(let i = 0; i < vertices.length; i++) {
    predecessors[vertices[i]] = null;
  }
  return predecessors;
}

//使用BFS寻找指定顶点到其它顶点之间的最短距离
function bfsShortestPath(graph, startVertex) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const distance = initializeDistance(vertices);
  const predecessors = initializePredecessors(vertices);

  const queue = new Queue();
  queue.enqueue(startVertex);
  while(!queue.isEmpty()) {
    const u = queue.dequeue();
    color[u] = Colors.GRAY;
    let neighbors = adjList.get(u);
    for(let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i];
      if(color[w] === Colors.WHITE) {
        color[w] = Colors.GRAY;
        distance[w] = distance[u] + 1;
        predecessors[w] = u;
        queue.enqueue(w);
      }
    }
    color[u] = Colors.BALCK;
  }

  return {
    distance,
    predecessors
  }
}

//测试
const graph = new Graph();

const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

for (let i = 0; i < myVertices.length; i++) {
  graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log('********* printing graph ***********');

console.log(graph.toString());

console.log('********* sorthest path - BFS ***********');
const shortestPathA = bfsShortestPath(graph, myVertices[0]);
console.log(shortestPathA.distance);
console.log(shortestPathA.predecessors);

let s = '';
for(let i = 0; i < myVertices.length; i++) {
  let v = myVertices[i];
  if(v != 'A') {
    let stack = new Stack();
    stack.push(v);
    let w = shortestPathA.predecessors[v];
    while(w != null) {
      stack.push(w);
      w = shortestPathA.predecessors[w];
    }
    s += `${stack.pop()}`;
    while(!stack.isEmpty()) {
      s += ` - ${stack.pop()}`;
    }
    s += `\n`;
  }
}

console.log(s);