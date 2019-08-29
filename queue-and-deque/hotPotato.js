import {Queue} from './queue';

function hotPotato(elementsList, num) {
  const gamers = new Queue();
  const eliminateList = [];

  for(let i = 0; i < elementsList.length; i++) {
    gamers.enqueue(elementsList[i]);
  }

  while(gamers.size() > 1) {
    for(let i = 0; i < num; i++) {
      gamers.enqueue(gamers.dequeue());
    }
    eliminateList.push(gamers.dequeue());
  }
  
  //输出游戏结果
  for(let i = 0; i < eliminateList.length; i++) {
    console.log(`${eliminateList[i]}被淘汰了！`);
  }
  console.log(`${gamers.dequeue()}是胜出者！`);
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl']; 
hotPotato(names, 7);