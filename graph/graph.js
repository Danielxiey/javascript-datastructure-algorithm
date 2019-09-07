import {Dictionary} from '../dictionary-and-hashtable/dictionary';

export class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = [];
    this.adjList = new Dictionary();   
  }

  //向图中添加一个新的顶点
  addVertex(v) {
    if(!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  //向图中添加一条新的边
  addEdge(v, w) {
    if(!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
    if(!this.vertices.includes(w)) {
      this.vertices.push(w);
      this.adjList.set(w, []);
    }
    this.adjList.get(v).push(w);
    if(!this.isDirected) {
      this.adjList.get(w).push(v);
    }
  }

  //返回顶点列表
  getVertices() {
    return this.vertices;
  }

  //返回邻接表
  getAdjList() {
    return this.adjList;
  }

  //输出邻接表
  toString() {
    let s = '';
    for(let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      let adjList = this.adjList.get(this.vertices[i]);
      for(let j = 0; j < adjList.length; j++) {
        s += `${adjList[j]} `;
      }
      s += `\n`;
    }
    return s;
  }
}