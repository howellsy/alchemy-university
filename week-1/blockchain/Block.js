const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(data) {
    this.data = data;
  }

  toHash() {
    if (this.previousHash) {
      return SHA256(this.data + this.previousHash);
    }
    return SHA256(this.data);
  }
}

module.exports = Block;
