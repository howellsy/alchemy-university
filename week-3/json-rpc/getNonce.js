require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getNonce(address) {
  const response = await axios.post(url, {
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_getProof',
    params: [address, [], 'latest'],
  });

  // return the nonce for the address
  return response.data.result.nonce;
}

module.exports = getNonce;
