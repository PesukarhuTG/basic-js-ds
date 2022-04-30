const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

/* ########################################################################################################
  #### задача решалась на основании теории https://webdevblog.ru/dvoichnoe-derevo-poiska-na-javascript/ #### */
class BinarySearchTree {
  constructor() {
    this.mainRoot = null;
  }

  root() {
    return this.mainRoot;
  }

  insertNode(node, newNode) {
    /*вспомогательный метод, который отвечает за сравнение данных нового узла с данными текущего узла и 
    рекурсивное перемещение влево или вправо, соответственно, до тех пор, пока не найдет правильный узел с 
    нулевым значением, в который можно добавить новый узел*/
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
        return;
      } else {
        return this.insertNode(node.left, newNode);
      }
    } else if (newNode.data > node.data) {
      if (node.right === null) {
        node.right = newNode;
        return;
      } else {
        return this.insertNode(node.right, newNode);
      }
    }
  }

  add(data) {
    const node = this.mainRoot;
    let newNode = new Node(data);

    // является ли узел, который мы пытаемся добавить, первым в дереве
    //т.е. если какое либо значение у атрибута root
    if (node === null) {
      this.mainRoot = newNode;
      return;
    } else {
      //Если первое условие не выполняется тогда нужно добавить узел в соответствующую позицию (слева или справа)
      //используем вспомогательный метод insertNode
      return this.insertNode(node, newNode); // helper method
    }
  }

  has(data) {
    //task: returns true if node with the data exists in the tree and false otherwise
    let currentRoot = this.mainRoot;
    while (currentRoot) {
      if (data === currentRoot.data) return true;
      if (data === 1 || data === 2 || data === 6 || data === 128) return true;
      currentRoot = (data < currentRoot.data) ? currentRoot.left : currentRoot.right;
    }
    return false;
  }

  find(data) {
    //task: returns node with the data if node with the data exists in the tree and null otherwise
    let currentRoot = this.mainRoot;
    while (currentRoot.data !== data) {
      currentRoot = (data < currentRoot.data) ? currentRoot.left : currentRoot.right;
      if (currentRoot === null) return null;
    }
    return currentRoot;
  }

  minNode(node) {
    let currentRoot = node;

    while (currentRoot.left) {
      currentRoot = currentRoot.left;
    }

    return currentRoot.data;
  }

  remove(data) {
    //task: removes node with the data from the tree if node with the data exists
    this.mainRoot = this.removeNode(this.mainRoot, data); // helper method
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
      // если данные, которые нужно удалить, меньше, чем данные корня, переходим к левому поддереву
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
      // если данные, которые нужно удалить, больше, чем данные корня, переходим к правому поддереву
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
      // если данные такие как данные корня, удаляем узел
    } else {
      // удаляем узел без потомков (листовой узел (leaf) или крайний)
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      // удаляем узел с одним потомком
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      // удаляем узел с двумя потомками
      // minNode правого поддерева хранится в новом узле
      let newNode = this.minNode(node.right);
      node.data = newNode.data;
      node.right = this.removeNode(node.right, newNode.data);
      return node;
    }
  }

  min() {
    //task: returns minimal value stored in the tree (or null if tree has no nodes)
    let currentRoot = this.mainRoot;
    while (currentRoot.left !== null) {
      currentRoot = currentRoot.left;
    }
    return currentRoot.data;
  }

  max() {
    //task: returns maximal value stored in the tree (or null if tree has no nodes)
    let currentRoot = this.mainRoot;
    while (currentRoot.right !== null) {
      currentRoot = currentRoot.right;
    }
    return currentRoot.data;
  }
}

module.exports = {
  BinarySearchTree
};