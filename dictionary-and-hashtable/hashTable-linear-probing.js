//使用线性探查法解决散列表冲突
import {defaultToString} from './defaultToString';
import {ValuePair} from './valuePair';
import {HashTable} from './hashTable';

export class HashTableLinearProbing extends HashTable {
  constructor(toStrFn = defaultToString) {
    super(toStrFn);
  }

  //向散列表增加一个新的项(也能更新散列表)
  put(key, value) {
    if(key != null && value != null) {
      let position = this.hashCode(key);
      if(this.table[position] == null) {
        this.table[position] = new ValuePair(key, value);
      } else {
        let index = position + 1;
        while(this.table[index] != null) {
          index++;
        }
        this.table[index] = new ValuePair(key, value);
      }
      return true;
    } else {
      return false;
    }
  }

  //返回根据键值检索到的特定的值
  get(key) {
    let position = this.hashCode(key);
    if(this.table[position] != null) {
      if(this.table[position].key === key) {
        return this.table[position].value;
      } else {
        let index = position + 1;
        while(this.table[index] != null) {
          if(this.table[index].key === key) {
            return this.table[index].value;
          }
          index++;
        }
      }
    }
    return undefined;
  }

  //根据键值从散列表中移除值
  remove(key) {
    let position = this.hashCode(key);
    if(this.table[position] != null)  {
      if(this.table[position].key === key) {
        delete this.table[position];
        this.verifyRemoveSideEffect(key, position);
        return true;
      } else {
        let index = position + 1;
        while(this.table[index] != null) {
          if(this.table[index].key === key) {
            delete this.table[index];
            this.verifyRemoveSideEffect(key, index);
            return true;
          }
          index++;
        }
      }
    }
    return false;
  }

  //消除删除操作的副作用(移动元素法)
  verifyRemoveSideEffect(key, position) {
    let hash = this.hashCode(key);
    let index = position + 1;
    while(this.table[index] != null) {
      let hashCode = this.hashCode(this.table[index].key);
      if(hashCode <= hash || hashCode <= position) {
        this.table[position] = this.table[index];
        position = index;
        delete this.table[index];
      }
      index++;
    }
  }
}