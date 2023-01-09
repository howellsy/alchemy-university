class Transaction {
  constructor(inputUTXOs, outputUTXOs) {
    this.inputUTXOs = inputUTXOs;
    this.outputUTXOs = outputUTXOs;
  }

  // get the sum of all amount properties given an array of UTXO objects
  getSumAmounts(UTXOs) {
    return UTXOs.reduce((acc, { amount }) => acc + amount, 0);
  }

  execute() {
    // check if any input UTXO has already been spent
    this.inputUTXOs.forEach((utxo) => {
      if (utxo.spent) {
        throw new Error('An input UTXO has already been spent!');
      }
    });

    const sumInputAmounts = this.getSumAmounts(this.inputUTXOs);
    const sumOutputAmounts = this.getSumAmounts(this.outputUTXOs);

    if (sumInputAmounts < sumOutputAmounts) {
      throw new Error('Insufficient total value in input UTXOs to cover output!');
    }

    // mark the input UTXOs as spent
    this.inputUTXOs.forEach((UTXO) => (UTXO.spent = true));

    this.fee = sumInputAmounts - sumOutputAmounts;
  }
}

module.exports = Transaction;
