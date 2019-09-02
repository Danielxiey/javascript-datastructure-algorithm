//使用分离链接法解决散列表冲突
import {defaultToString} from './defaultToString';
import {ValuePair} from './valuePair';
import {HashTable} from './hashTable';
import {LinkedList} from '../linkedList/linkedList';

export class HashTableSeparateChaining extends HashTable {
  constructor(toStrFn = defaultToString) {
    super(toStrFn);
  }

  //向散列表增加一个新的项(也能更新散列表)
  put(key, value) {
    if(key != null && value != null) {
      let position = this.hashCode(key);
      if(this.table[position] == null) {
        this.table[position] = new LinkedList(); 
      }
      this.table[position].push(new ValuePair(key, value));
      return true;
    } else {
      return false;
    }
  }

  //返回根据键值检索到的特定的值
  get(key) {
    let position = this.hashCode(key);
    let linkedList = this.table[position];
    if(linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while(current != null) {
        if(current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  }

  //根据键值从散列表中移除值
  remove(key) {
    let position = this.hashCode(key);
    let linkedList = this.table[position];
    if(linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while(current != null) {
        if(current.element.key === key) {
          linkedList.remove(current.element);
          if(linkedList.isEmpty()) {
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }
}