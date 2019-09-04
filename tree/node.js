export class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

export const Color = {
  RED: 'red',
  BLACK: 'black'
}

export class RedBlackNode extends Node {
  constructor(key) {
    super(key);
    this.color = Color.RED;
    this.parent = null;
  }

  isRed() {
    return this.color === Color.RED;
  }
}