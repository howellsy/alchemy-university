const Block = require('./Block');

class Blockchain {
  constructor() {
    const genesisBlock = new Block('The first block');
    genesisBlock.previousHash = genesisBlock.toHash();
    this.chain = [genesisBlock];
  }

  addBlock(newBlock) {
    const lastBlock = this.chain[this.chain.length - 1];
    newBlock.previousHash = lastBlock.toHash();
    this.chain.push(newBlock);
  }

  /**
   * Check the integrity of every block in the blockchain by
   * examining each block's previousHash field and ensuring
   * it is equal to the hash of the block before it.
   */
  isValid() {
    let valid = true;
    let previousHash = this.chain[0].previousHash;
    this.chain.forEach((block) => {
      if (block.previousHash.toString() !== previousHash.toString()) {
        valid = false;
        return;
      }
      previousHash = block.toHash();
    });
    return valid;
  }
}

module.exports = Blockchain;
