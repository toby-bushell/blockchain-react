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
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  async mineBlock(difficulty) {
    console.log('Mining.......', difficulty);

    while (this.hash.substring(0, difficulty) !== new Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
      console.log('Block mined: ' + this.hash);
      return this.hash;
    }

    // while(this.hash.substring(0, difficulty) !== new Array(difficulty + 1).join("0")) {
    // 	this.nonce++;
    // 	this.hash = this.calculateHash();
    // }
  }
}

module.exports = Block;
