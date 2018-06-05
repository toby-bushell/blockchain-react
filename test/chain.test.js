const block = require('../Classes/Block');
const chain = require('../Classes/Chain');
let testCoin = [];

beforeEach(() => {
	let initializeBlockChain = function () {
		testCoin = new chain(block);
		//set thing low for tests
		testCoin.difficulty = 1;
		testCoin.addBlock(new block(1, "9/01/2018", {amount: 5}));
		testCoin.addBlock(new block(2, "10/03/2018", {amount: 500}));
		testCoin.addBlock(new block(3, "10/05/2018", {amount: 5000}));
	};
	return initializeBlockChain();
});

afterEach(() => {
	testCoin = [];
});

test('chain creates', () => {
	expect(testCoin.chain[0].data).toEqual("Genesis Block");
});

test('get last block', () => {
	expect(testCoin.chain[0].data).toEqual("Genesis Block");
});

test('gets last block', () => {
	let lastBLock = testCoin.getLatestBlock();
	expect(lastBLock.data).toEqual({amount: 5000});
});

test('valid chain', () => {
	expect(testCoin.isChainValid()).toEqual(true);
	testCoin.chain[2].data = {amount:10000000};
	expect(testCoin.isChainValid()).toEqual(false);
});

test('valid chain 2', () => {
	testCoin.chain[2].previousHash = 'thiswillfail';
	expect(testCoin.isChainValid()).toEqual(false);
});

