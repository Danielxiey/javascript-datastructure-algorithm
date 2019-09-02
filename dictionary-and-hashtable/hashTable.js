import {defaultToString} from './defaultToString';
import {ValuePair} from './valuePair';

export class HashTable {
  constructor(toStrFn = defaultToString) {
    this.table = {};
    this.toStrFn = toStrFn;
  }

  //定义散列函数
  loseloseHashCode(key) {
    if(typeof key === 'number') {
      return key;
    } else {
      let hash = 0;
      let tableKey = this.toStrFn(key);
      for(let i = 0; i < tableKey.length; i++) {
        hash += tableKey.charCodeAt(i);
      }
      return hash % 37;
    }
  }

  //传入key获得hashcode
  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  //向散列表增加一个新的项(也能更新散列表)
  put(key, value) {
    if(key != null && value != null) {
      let position = this.hashCode(key);
      let valuePair = new ValuePair(key, value);
      this.table[position] = valuePair;
      return true;
    } else {
      return false;
    }
  }

  //根据键值从散列表中移除值
  remove(key) {
    let hashCode = this.hashCode(key);
    if(this.table[hashCode]) {
      delete this.table[hashCode];
      return true;
    } else {
      return false;
    }
  }

  //返回根据键值检索到的特定的值
  get(key) {
    let valuePair = this.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value;
  }

  //返回散列表中元素的个数
  size() {
    return Object.keys(this.table).length;
  }

  //判断散列表是否为空
  isEmpty() {
    return this.size() === 0;
  }

  //删除该散列表中的所有值
  clear() {
    this.table = {};
  }

  //模拟toString()方法
  toString() {
    if(this.isEmpty()) {
      return '';
    } else {
      let keys = Object.keys(this.table);
      let objectStr = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
      for(let i = 1; i < keys.length; i++) {
        objectStr = `${objectStr},{${keys[i]} => ${this.table[keys[i]].toString()}}`;
      }
      return objectStr;
    }
  }
}