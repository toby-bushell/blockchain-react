const block = require('../Classes/Block');
const chain = require('../Classes/Chain');
let testCoin = [];

beforeEach(() => {
  let initializeBlockChain = () => {
    testCoin = new chain();
    //set thing low for tests
    testCoin.difficulty = 1;

    testCoin.createTransaction('address1', 'address2', 200);
    testCoin.createTransaction('address3', 'address1', 500);
    testCoin.minePendingTransactions('rewardAddress');
  };
  return initializeBlockChain();
});

afterEach(() => {
  testCoin = [];
});

test('chain creates', () => {
  expect(testCoin.chain.length).toEqual(2);
});

test('get latest block', () => {
  let getLatest = testCoin.getLatestBlock();

  expect(getLatest).toHaveProperty('previousHash');
  expect(getLatest).toHaveProperty('hash');
});

test('valid chain', () => {
  expect(testCoin.isChainValid()).toEqual(true);

  const lastBlock = testCoin.getLatestBlock();

  // Change transaction
  const correctAmount = lastBlock.transactions[0].amount;
  lastBlock.transactions[0].amount = 1;
  expect(testCoin.isChainValid()).toEqual(false);

  // Reset transaction to correct amount
  lastBlock.transactions[0].amount = correctAmount;
  expect(testCoin.isChainValid()).toEqual(true);

  // Break the hash of the previous block
  const correctHash = lastBlock.previousHash;
  lastBlock.previousHash = 'wrong';
  expect(testCoin.isChainValid()).toEqual(false);

  // Reset
  lastBlock.previousHash = correctHash;
  expect(testCoin.isChainValid()).toEqual(true);
});

test('test transaction amount added and correct', () => {
  let testTransactionAmount = testCoin.chain[1].transactions[0].amount;
  expect(testTransactionAmount).toEqual(200);
});

test('can get transaction by address', () => {
  transactions = testCoin.getTransactionByAddress('address1').then(transactions => {
    expect(transactions).toHaveProperty('sent');
    expect(transactions).toHaveProperty('received');

    // Check sent the 200 test
    expect(transactions.sent[0].amount).toEqual(200);
  });
});

test('can address balance', () => {
  transactions = testCoin.getBalanceOfAddress('address1').then(balance => {
    // Check sent the 200 test
    expect(balance).toEqual(300);
  });
});
