const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY =
  BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
  mempool.push(transaction);
}

function mine() {
  let transactions = [];
  let nonce = 0;
  let solved = false;

  while (transactions.length < MAX_TRANSACTIONS && mempool.length > 0) {
    transactions.push(mempool.pop());
  }

  let block = { id: blocks.length, transactions, nonce };

  while (!solved) {
    block.nonce += 1;
    const hash = SHA256(JSON.stringify(block));

    // look for a hash that is less than the target difficulty
    if (BigInt(`0x${hash}`) < TARGET_DIFFICULTY) {
      block.hash = SHA256(JSON.stringify(block));
      solved = true;
    }
  }

  blocks.push(block);
}

module.exports = {
  TARGET_DIFFICULTY,
  MAX_TRANSACTIONS,
  addTransaction,
  mine,
  blocks,
  mempool,
};
