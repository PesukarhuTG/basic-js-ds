const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

/*##########################################################################################################
  #### задача решалась на основании теории https://webdevblog.ru/dvoichnoe-derevo-poiska-na-javascript/ #### 
  ##########################################################################################################*/

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

    // является ли узел, который мы пытаемся добавить, первым в дереве (т.е. если какое либо значение у root)
    if (node === null) {
      this.mainRoot = newNode;
      return;
    } else {
      //Если первое условие не выполняется тогда нужно добавить узел в соответствующую позицию (слева или справа)
      //используем вспомогательный метод insertNode
      return this.insertNode(node, newNode);
    }
  }

  has(data) {
    let currentRoot = this.mainRoot;
    while (currentRoot) {
      if (data === currentRoot.data) return true;
      currentRoot = (data < currentRoot.data) ? currentRoot.left : currentRoot.right;
    }
    return false;
  }

  find(data) {
    let currentRoot = this.mainRoot;
    while (currentRoot.data !== data) {
      currentRoot = (data < currentRoot.data) ? currentRoot.left : currentRoot.right;
      if (currentRoot === null) return null;
    }
    return currentRoot;
  }

  remove(data) {
    this.mainRoot = removeNode(this.mainRoot, data);

    function removeNode(node, data) {
      if (!node) return null;

      //если данные равны корневому элементу
      if (data === node.data) {
        //...и нет левой и правой ветки - возвращаем null
        if (!node.left && !node.right) return null;

        //...и нет левой, то идем по правой
        if (!node.left) {
          node = node.right;
          return node;
        }
        //...и нет правой, то идем по левой
        if (!node.right) {
          node = node.left;
          return node;
        }
        //...и есть обе ветки
        if (node.left && node.right) {
          let currentRoot = node.right;

          while (currentRoot.left) {
            currentRoot = currentRoot.left;
          }

          node.data = currentRoot.data;
          node.right = removeNode(node.right, currentRoot.data);
          return node;
        }
        //если данные меньше корневого элемента, то ведем удаление по левой ветке
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
      } else {
        //если данные больше корневого элемента, то ведем удаление по правой ветке
        node.right = removeNode(node.right, data);
      }
      return node;
    }
  }


  min() {
    let currentRoot = this.mainRoot;
    while (currentRoot.left !== null) {
      currentRoot = currentRoot.left;
    }
    return currentRoot.data;
  }

  max() {
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