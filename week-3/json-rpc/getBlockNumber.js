const axios = require('axios');
require('dotenv').config();

// grab the API key from the .env
const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.API_KEY}`;

async function getBlockNumber() {
  const response = await axios.post(url, {
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_blockNumber',
  });

  return response.data.result;
}

module.exports = getBlockNumber;
