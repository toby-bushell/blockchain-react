const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');

const app = express();
const server = require('http').createServer(app);
const io = socketIo(server);
const { check, validationResult } = require('express-validator/check');

app.use(bodyParser.json());
app.use(helmet());

const Chain = require('./Classes/chain');

let tobyCoin = new Chain();

app.get(
  '/api/get-transactions',
  check('address')
    .exists()
    .isLength({ min: 1 })
    .isString()
    .withMessage('must be a string')
    .trim(),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log('\x1b[32m', 'req.query transactions', req.query, '\x1b[0m');

    if (!errors.isEmpty()) {
      return res.statmus(422).json({ errors: errors.mapped() });
    }

    const address = req.query.address;

    tobyCoin.getTransactionByAddress(address).then(response => {
      console.log('\x1b[34m', 'respoonse from getTransactionByAddress', response, '\x1b[0m');
      res.json(response);
    });
  }
);

app.get(
  '/api/get-balance',

  check('address')
    .exists()
    .isLength({ min: 1 })
    .isString()
    .withMessage('must be a string')
    .trim(),

  (req, res, next) => {
    console.log('\x1b[32m', 'continueing', '\x1b[0m');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    const address = req.query.address;
    console.log('\x1b[32m', 'address requesting balance', address, '\x1b[0m');

    // res.json('woo');
    tobyCoin.getBalanceOfAddress(address).then(response => {
      console.log('\x1b[32m', 'getBalanceOfAddress', address, response, '\x1b[0m');
      res.json(response);
    });

    // res.json('response');
  }
);

app.post(
  '/api/transaction',
  [
    check('fromAddress')
      .exists()
      .isLength({ min: 1 })
      .withMessage('required')
      .isString()
      .trim(),

    check('toAddress')
      .exists()
      .isLength({ min: 1 })
      .withMessage('required')
      .isString()
      .trim(),

    check('amount')
      .exists()
      .isLength({ min: 1 })
      .withMessage('required')
      .isInt({ gt: 0 })
      .withMessage('needs to be positive')
      .trim()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('\x1b[31m', 'errors', errors.mapped(), '\x1b[0m');

      return res.status(422).json({ errors: errors.mapped() });
    }

    const { fromAddress, toAddress, amount } = req.body;

    console.log('fromAddress', fromAddress, 'toAddress', toAddress, 'amount', amount);

    tobyCoin
      .createTransaction(fromAddress, toAddress, amount)
      .then(response => {
        console.log('\x1b[32m', response, '\x1b[0m');
        res.json('Transaction created');
      })
      .catch(err => {
        console.log('\x1b[31m', 'error from catch!', err, '\x1b[0m');
        res.json('error', err);
      });
  }
);
io.on('connection', socket => {
  console.log('\x1b[31m', 'socket firing', '\x1b[0m');

  // return the result of next() to accept the connection.
  if (!socket.handshake.query.address) {
    console.log('\x1b[31m', 'no address sent', '\x1b[0m');
    socket.emit('miningError', 'no address sent');
    socket.disconnect();
  } else {
    const address = socket.handshake.query.address;

    socket.emit('miningStarted', { mining: true }, message => {
      console.log('sockets', Object.keys(io.sockets.sockets));

      attemptMine(address)
        .then(block => {
          socket.emit('miningFinished', block);
          socket.disconnect();

          console.log('\x1b[34m', '4) firing in promise from mining', block, '\x1b[0m');
        })
        .catch(err => {
          console.log('\x1b[31m', 'error from catch!', err, '\x1b[0m');
          socket.emit('error', error);
        });
    });
  }

  socket.on('disconnect', message => {
    // socket.emit('disconnected');
    console.log('3) Client disconnected', message);
  });
});

const attemptMine = async address => {
  console.log('\x1b[34m', '1) get api and emit firing', '\x1b[0m');

  let block = await tobyCoin
    .minePendingTransactions(address)
    .then(block => {
      console.log('\x1b[31m', 'block returned from attempt mine', block, '\x1b[0m');

      return block;
    })
    .catch(err => {
      console.log('\x1b[31m', 'error', err, '\x1b[0m');

      throw err;
    });

  return block;
};

// tobyCoin.createTransaction(new Transaction('address1', 'address2', 100));
// tobyCoin.createTransaction(new Transaction('address2', 'address1', 50));

// console.log('\n Starting the miner...');

// console.log('\nBalance of xavier is', tobyCoin.getBalanceOfAddress('xaviers-address'));

// console.log('\n Starting the miner again...');
// tobyCoin.minePendingTransactions('xaviers-address');

server.listen(3001, () => {
  console.log(`Find the server at: http://localhost:3001/`); // eslint-disable-line no-console
});
