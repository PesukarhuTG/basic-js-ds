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
  let currentNode = l;
  let deletedNode = null;

  while (currentNode) {
    //перебираем все узлы
    //...если значение не равно указанному, то просто сдвигаем:
    if (currentNode.value !== k) {
      //помеченным узлом становится текущий
      deletedNode = currentNode;
      // а текущий перезаписываем на следующий узел
      currentNode = currentNode.next;

      //...если значение равно указанному, то удаляем узел:
    } else {
      if (deletedNode === null) {
        l = l.next;
        currentNode = l;
      } else {
        // перезаписываем, чтобы узел через один стал помеченным узлом.
        deletedNode.next = deletedNode.next.next;
        //а текущим стал следующий узел
        currentNode = currentNode.next;
      }
    }
  }
  return l
}

module.exports = {
  removeKFromList
};
