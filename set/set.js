export class Set {
  constructor() {
    this.items = {};
  }

  //向集合添加一个新元素
  add(element) {
    if(!this.has(element)) {
      this.items[element] = element;
      return true;
    } else {
      return false;
    }
  }

  //从集合移除一个元素
  delete(element) {
    if(this.has(element)) {
      delete this.items[element];
      return true;
    } else {
      return false;
    }
  }

  //检测某个元素是否存在于集合中
  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  //移除集合中的所有元素
  clear() {
    this.items = {};
  }

  //返回集合所包含元素的数量
  size() {
    //使用了ES6语法
    return Object.keys(this.items).length;

    //使用ES5语法，所有浏览器支持
    /*
    let count = 0;
    for(let key in this.items) {
      if(this.has(key)) {     //要判断是否是对象自身拥有的属性，in运算符会回溯原型链 
        count++;
      }
    }
    return count;
    */
  }

  //返回一个包含集合中所有值(元素)的数组
  values() {
    //使用ES6语法
    return Object.values(this.items);
    
    //使用ES5语法，所有浏览器支持
    /*
    let values = [];
    for(let key in this.items) {
      if(this.has(key)) {      //要判断是否是对象自身拥有的属性，in运算符会回溯原型链
        values.push(this.items[key]);
      } 
    }
    return values;
    */
  }

  //并集运算
  union(otherSet) {
    const newSet = new Set();
    this.values().forEach(value => newSet.add(value));
    otherSet.values().forEach(value => newSet.add(value));
    return newSet;
  }

  //交集运算
  intersection(otherSet) {
    const newSet = new Set();
    let smallerSet = this;
    let biggerSet = otherSet;
    if(this.size() > otherSet.size()) {
      smallerSet = otherSet;
      biggerSet = this;
    }
    smallerSet.values().forEach(value => {
      if(biggerSet.has(value)) {
        newSet.add(value);
      }
    });
    return newSet;
  }

  //差集运算
  difference(otherSet) {
    const newSet = new Set();
    this.values().forEach(value => {
      if(!otherSet.has(value)) {
        newSet.add(value);
      }
    });
    return newSet;
  }

  //子集运算
  isSubsetOf(otherSet) {
    const newSet = new Set();
    let isSubset = true; 
    this.values().every(value => {
      if(!otherSet.has(value)) {
        isSubset = false;
        return false;
      }
      return true;
    });
    return isSubset;
  }
}