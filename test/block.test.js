const block = require('../Classes/Block');

test('block creates', () => {
  let mockTransactions = [{}];
  let newBlock = new block('10/03/2018', mockTransactions);
  // expect(newBlock.data).toEqual({ amount: 500 });
  // expect(newBlock.index).toEqual(1);
  expect(newBlock.timestamp).toEqual('10/03/2018');
  expect(newBlock.hash).toEqual('db7fb23d71e57530145623cf5507a9f787a5c5ee549364f0c75a0cef2c68d5e1');
  expect(newBlock.previousHash).toEqual('');
  expect(newBlock.transactions.length).toEqual(1);
});

test('block respects difficulty', done => {
  let mockTransactions = [{}];

  let newBlock = new block('10/03/2018', mockTransactions);
  let difficulty = 2;

  newBlock.mineBlock(difficulty);

  expect(newBlock.hash.substring(0, difficulty)).toEqual(new Array(difficulty + 1).join('0'));
  done();
});
