const { providers } = require('ethers');
const { ganacheProvider } = require('../config');

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Given an Ethereum address, find all the addresses
 * that were sent ether from that address.
 * 
 * @param {string} address The hexadecimal address for the sender
 * @async
 * @returns {Array} All the addresses that received ether
 */
async function findEther(address) {
  const receiveAddresses = [];

  for (let i = 1; i <= 3; i++) {
    const { transactions } = await provider.getBlock(i);
    for (const tx of transactions) {
      const receipt = await provider.getTransactionReceipt(tx);
      const { from, to } = receipt;

      if (from === address) {
        receiveAddresses.push(to);
      }
    }
  }

  return receiveAddresses;
}

module.exports = findEther;
