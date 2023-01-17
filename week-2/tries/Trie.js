const TrieNode = require('./TrieNode');

class Trie {
  constructor() {
    this.root = new TrieNode(null);
  }

  /**
   * Splits a given word up by character and creates nodes in the trie for
   * each character, linking the nodes using their children property.
   * 
   * @param {string} word 
   * @returns {void}
   */
  insert(word) {
    let lastNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const currentChar = word.charAt(i);
      const currentNode = new TrieNode(currentChar);

      if (lastNode.children[currentChar] === undefined) {
        lastNode.children[currentChar] = currentNode;
      }

      lastNode = lastNode.children[currentChar];
    }

    lastNode.isWord = true;
  }

  /**
   * Takes a string and returns true or false depending on
   * whether the string is present in the trie.
   * 
   * @param {string} word 
   * @returns {boolean}
   */
  contains(word) {
    let node = this.root.children;

    for (let i = 0; i < word.length; i++) {
      let wordChar = word.charAt(i);

      if (node[wordChar] === undefined) {
        return false;
      }

      if (node[wordChar].key !== wordChar) {
        return false;
      }

      if (i === word.length - 1) {
        if (!node[wordChar].isWord) {
          return false;
        }
      }

      node = node[wordChar].children;
    }

    return true;
  }
}

module.exports = Trie;
