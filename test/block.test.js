const block = require('../Classes/Block');

test('block creates', () => {
	let newBlock = new block(2, "10/03/2018", {amount: 500});
	expect(newBlock.data).toEqual({amount: 500});
	expect(newBlock.index).toEqual(2);
	expect(newBlock.timestamp).toEqual("10/03/2018");
	expect(newBlock.hash).toEqual('4dc2032e3972376688921847a80d896e13e46f5bd4106d21f7b8a25d8264a803');
});

test('block respects difficulty', (done) => {
	let newBlock = new block(2, "10/03/2018", {amount: 500});
	let difficulty = 2;
	newBlock.mineBlock(difficulty);
	expect(newBlock.hash.substring(0,difficulty)).toEqual(new Array(difficulty + 1).join("0"));
	done();
});