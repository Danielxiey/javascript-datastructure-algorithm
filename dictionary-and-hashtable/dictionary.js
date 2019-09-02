import {defaultToString} from './defaultToString';
import {ValuePair} from './valuePair';

export class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.table = {};
    this.toStrFn = toStrFn;
  }

  //向字典中添加新元素。如果key已经存在，那么已存在的value会被新的值覆盖
  set(key, value) {
    if(key != null && value != null) {
      let tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    } else {
      return false;
    }
  }

  //通过使用键值作为参数来从字典中移除键值对应的数据值
  remove(key) {
    if(this.hasKey(key)) {
      let tableKey = this.toStrFn(key);
      delete this.table[tableKey];
      return true;
    } else {
      return false;
    }
  }

  //如果某个键值存在于该字典中，返回true，否则返回false
  hasKey(key) {
    let tableKey = this.toStrFn(key);
    if(Object.prototype.hasOwnProperty.call(this.table, tableKey)) {
      return true;
    } else {
      return false;
    }
  }

  //通过以键值作为参数查找特定的数值并返回
  get(key) {
    if(this.hasKey(key)) {
      let tableKey = this.toStrFn(key);
      return this.table[tableKey].value;
    } else {
      return undefined;
    }
  }

  //删除该字典中的所有值
  clear() {
    this.table = {};
  }

  //返回字典所包含值的数量
  size() {
    return Object.keys(this.table).length;
  }

  //判断字典是否为空
  isEmpty() {
    return this.size() === 0;
  }

  //将字典所包含的所有键名以数组形式返回
  keys() {
    return Object.keys(this.table);
  }

  //将字典所包含的所有数值以数组形式返回
  values() {
    let values = [];
    Object.values(this.table).forEach(item => {
      values.push(item.value);
    });
    return values;
  }

  //将字典中所有[键，值]对返回
  keyValues() {
    return Object.values(this.table);  
  }

  //迭代字典中所有的键值
  forEach(callbackFn) {
    let valuePairs = Object.values(this.table);
    for(let i = 0; i < valuePairs.length; i++) {
      let result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if(result === false) {
        break;
      }
    }
  }

  //模拟toString方法
  toString() {
    if(this.isEmpty()) {
      return '';
    } else {
      let valuePairs = Object.values(this.table);
      let objectStr = `${valuePairs[0].toString()}`;
      for(let i = 1; i < valuePairs.length; i++) {
        objectStr = `${objectStr},${valuePairs[i].toString()}`;
      }
      return objectStr;
    }
  }
}