import {Graph} from './graph';

const Colors = {
  WHITE: 0,
  GRAY: 1,
  BALCK: 2
}

//初始化节点颜色
function initializeColor(vertices) {
  let color = {};
  for(let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = Colors.WHITE;
  }
  return color;
}

function depthFirstSearchVisit(u, color, adjList, callback) {
  color[u] = Colors.GRAY;
  if(callback) {
    callback(u);
  }
  let neighbors = adjList.get(u);
  for(let i = 0; i < neighbors.length; i++) {
    if(color[neighbors[i]] === Colors.WHITE) {
      depthFirstSearchVisit(neighbors[i], color, adjList, callback);
    }
  }
  color[u] = Colors.BALCK;
}

//深度优先搜索
function depthFirstSearch(graph, callback) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);

  for(let i = 0; i < vertices.length; i++) {
    if(color[vertices[i]] === Colors.WHITE) {
      depthFirstSearchVisit(vertices[i], color, adjList, callback);
    }
  }
}