require('dotenv').config();
const { API_KEY } = process.env;
const axios = require('axios');
const url = `https://eth-mainnet.g.alchemy.com/v2/${API_KEY}`;

async function getTotalBalance(addresses) {
  const batch = addresses.map((address, index) => {
    return {
      jsonrpc: '2.0',
      id: index + 1,
      params: [address, 'latest'],
      method: 'eth_getBalance',
    };
  });

  const response = await axios.post(url, batch);

  return response.data.reduce(
    (totalBalance, currentAcc) => totalBalance + parseInt(currentAcc.result),
    0
  );
}

module.exports = getTotalBalance;
