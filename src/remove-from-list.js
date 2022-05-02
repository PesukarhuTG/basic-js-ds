const { NotImplementedError } = require('../extensions/index.js');

const { ListNode } = require('../extensions/list-node.js');

/**
 * Given a singly linked list of integers l and an integer k,
 * remove all elements from list l that have a value equal to k.
 *
 * @param {List} l
 * @param {Number} k
 * @return {List}
 *
 * @example
 * For l = [3, 1, 2, 3, 4, 5] and k = 3,
 * the output should be [1, 2, 4, 5]
 *
 * Singly - linked lists are already defined using interface
 * class ListNode {
 *   constructor(x) {
 *     this.value = x;
 *     this.next = null;
 *   }
 * }
 */
function removeKFromList(l, k) {
  let currentListNode = l; //для перемещения по списку
  let prevElem = null; //предыдущий элемент null, тк его не существует

  const toString = () => {
    console.log(JSON.stringify(currentListNode));
  }

  //пока мы не дошли до конца списка
  while (currentListNode) {
    //ЕСЛИ НЕ НАШЛИ СОВПАДЕНИЕ
    if (currentListNode.value !== k) {
      prevElem = currentListNode; //предыдущий узел передвигаем на место текущего
      currentListNode = currentListNode.next; //текущий узел передвигается на следующий
      //toString();
    } else {
      //ЕСЛИ СОВПАДЕНИЕ НАШЛИ И НАХОДИМСЯ В НАЧАЛЕ СПИСКА
      if (prevElem === null) {
        l = l.next; //начальный список сдвигаем на позицию вперед
        currentListNode = l; //обновляем значение current на новое
        //toString();
      } else {
        //ЕСЛИ СОВПАДЕНИЕ НАШЛИ И НАХОДИМСЯ НЕ В НАЧАЛЕ СПИСКА
        prevElem.next = currentListNode.next; //предыдущему элементу даем ссылку на next текущего (как бы перешагивая)
        currentListNode = currentListNode.next; //текущий узел передвигается на следующий
        //toString();
      }
    }
  }
  //console.log(JSON.stringify(l));
  return l;
}

module.exports = {
  removeKFromList
};
