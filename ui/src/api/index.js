import axios from 'axios';

const isRequired = () => {
  throw new Error('param is required');
};

export const getTransactions = async (address = isRequired()) => {
  let response = await axios.get('/api/get-transactions', {
    params: {
      address
    }
  });
  return response.data;
};

export const getBalance = async (address = isRequired()) => {
  let response = await axios.get('/api/get-balance', {
    params: {
      address
    }
  });
  return response.data;
};

export const sendTransaction = async ({
  fromAddress = isRequired(),
  toAddress = isRequired(),
  amount = isRequired()
}) => {
  let reponse = setTimeout(() => {
    return 'finished timeout test';
  }, 2000);

  try {
    let response = await axios.post('/api/transaction', {
      fromAddress,
      toAddress,
      amount
    });

    return response.data;
  } catch (err) {
    console.log('err', err);
    console.log('err', err.response.data.errors);

    const data = err.response.data;
    const errors = data.errors;

    return responseWrapper(data, errors);
  }

  // console.log('response from api?', response);

  // return response.data;
};

// Just to organise error handling
const responseWrapper = (responseData, errors = false) => {
  const errorData = errors ? { errors } : null;

  const response = {
    responseData,
    errorData,
    error: errors ? true : false
  };

  return response;
};
