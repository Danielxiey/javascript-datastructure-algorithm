//使用ES6原生的Set类实现并集运算
const union = (setA, setB) => {
  const unionAB = new Set();
  setA.forEach(value => unionAB.add(value));
  setB.forEach(value => unionAB.add(value));
  return unionAB;
}

//使用ES6原生的Set类实现交集运算
const intersection = (setA, setB) => {
  const interSectionSet = new Set();
  let smallerSet = setA;
  let biggerSet = setB;
  if(setA.size > setB.size) {
    smallerSet = setB;
    biggerSet = setA;
  }
  smallerSet.forEach(value => {
    if(biggerSet.has(value)) {
      interSectionSet.add(value);
    }
  });
  return interSectionSet;
}

//使用ES6原生的Set类实现差集运算
const difference = (setA, setB) => {
  const differenceSet = new Set();
  setA.forEach(value => {
    if(!setB.has(value)) {
      differenceSet.add(value);
    }
  });
  return differenceSet;
}

//使用ES6原生的Set类实现子集运算
const isSubsetOf = (setA, setB) => {
  let isSubset = true;
  [...setA].every(value => {     //使用扩展运算符将集合A转为数组，从而使用every()方法
    if(!setB.has(value)) {
      isSubset = false;
      return false;
    }
    return true;
  });
  return isSubset;
}