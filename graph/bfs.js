import {Graph} from './graph';
import {Queue} from '../queue-and-deque/queue';

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

//广度优先搜索
export function breadthFirstSearch(graph, startVertex, callback) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue();
  queue.enqueue(startVertex);
  while(!queue.isEmpty()) {
    let u = queue.dequeue();
    color[u] = Colors.GRAY;
    let neighbors = adjList.get(u);
    for(let i = 0; i < neighbors.length; i++) {
      if(color[neighbors[i]] === Colors.WHITE) {
        color[neighbors[i]] = Colors.GRAY;
        queue.enqueue(neighbors[i]);
      }
    }
    color[u] = Colors.BALCK;
    callback(u);
  }
}