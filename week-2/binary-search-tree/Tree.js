class Tree {
  constructor() {
    this.root = null;
  }

  addNodeToParent(parent, child) {
    if (child.data < parent.data) {
      // if the parent already has a left node, call again recursively
      if (parent.left) {
        this.addNodeToParent(parent.left, child);
      } else {
        parent.left = child;
      }
    } else {
      // if the parent already has a right node, call again recursively
      if (parent.right) {
        this.addNodeToParent(parent.right, child);
      } else {
        parent.right = child;
      }
    }
  }

  addNode(node) {
    // set the root node, if not already set
    if (this.root === null) {
      this.root = node;
      return;
    }

    this.addNodeToParent(this.root, node);
  }

  /**
   * Searches the tree and returns a boolean value indicating
   * if a node in the tree contains the number to find.
   *
   * @param {number} numberToFind
   * @param {Node} [node=this.root]
   * @returns {boolean}
   */
  hasNode(numberToFind, node) {
    const currentNode = node || this.root;

    if (!currentNode) {
      return false;
    }

    if (currentNode.data === numberToFind) {
      return true;
    }

    if (numberToFind < currentNode.data && currentNode.left) {
      return this.hasNode(numberToFind, currentNode.left);
    } else if (numberToFind > currentNode.data && currentNode.right) {
      return this.hasNode(numberToFind, currentNode.right);
    } else {
      return false;
    }
  }
}

module.exports = Tree;
