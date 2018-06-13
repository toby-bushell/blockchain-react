const Block = require('./block');
const Transaction = require('./transaction');

class Chain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;

    // Place to store transactions in between block creation
    this.pendingTransactions = [];

    // How many coins a miner will get as a reward for his/her efforts
    this.miningReward = 100;
  }

  createGenesisBlock() {
    return new Block(Date.parse('2017-01-01'), [], '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  async createTransaction(fromAddress, toAddress, amount) {
    // There should be some validation here!
    const newTransaction = new Transaction(fromAddress, toAddress, amount);

    // Push into onto the "pendingTransactions" array
    this.pendingTransactions.push(newTransaction);

    return 'transaction created', newTransaction;
  }

  async minePendingTransactions(miningRewardAddress) {
    // Create new block with all pending transactions and mine it..
    let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
    let newBlock = await block.mineBlock(this.difficulty);

    // Add the newly mined block to the chain
    this.chain.push(newBlock);

    // Reset the pending transactions and send the mining reward
    this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];

    return block;
  }

  async getTransactionByAddress(address) {
    let transactions = { sent: [], received: [] };

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          transactions.sent.push(trans);
        }

        if (trans.toAddress === address) {
          transactions.received.push(trans);
        }
      }
    }

    // console.log('\x1b[32m', 'transactions', transactions, '\x1b[0m');

    return transactions;
  }

  async getBalanceOfAddress(address) {
    let balance = 0; // you start at zero!

    // Loop over each block and each transaction inside the block
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        // If the given address is the sender -> reduce the balance
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        // If the given address is the receiver -> increase the balance
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Chain;
