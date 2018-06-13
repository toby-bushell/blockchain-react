class Block {
  constructor(timestamp, transactions, previousHash = '') {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    const SHA256 = require('crypto-js/sha256');
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  async mineBlock(difficulty) {
    // console.log('Mining.......', difficulty, this.hash.substring(0, difficulty));

    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      let hashToUse = this.calculateHash();
      this.hash = hashToUse;
    }

    return this;
  }
}

module.exports = Block;
