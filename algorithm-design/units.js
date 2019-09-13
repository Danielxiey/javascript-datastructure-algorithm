export const Compare = {
  LESS_THAN: -1,
  EQUALS: 0,
  BIGGER_THAN: 1
}

export function defaultCompare(a, b) {
  if(a == b) {
    return Compare.EQUALS;
  } else {
    return a > b ? Compare.BIGGER_THAN : Compare.LESS_THAN;
  }
}