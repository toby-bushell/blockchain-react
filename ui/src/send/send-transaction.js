import React, { Component } from 'react';
import AppContext from '../context/app';
import { sendTransaction } from '../api';
import ErrorHandler from './error-handling';
import PropTypes from 'prop-types';

// Styles
import { TransactionWrapper } from './styles';
import { SubmitButton } from '../styles';
import { FormStyled } from '../styles/form';

class TransactionSend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        toAddress: '',
        amount: ''
      },
      errors: null,
      message: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendTransactionToApi = this.sendTransactionToApi.bind(this);
  }

  handleChange(e, field) {
    console.log('handle change', field);
    const value = e.target.value;

    this.setState(prevState => ({
      form: {
        ...prevState.form,
        [field]: value
      }
    }));
  }

  handleSubmit(e) {
    e.preventDefault();

    const { toAddress, amount } = this.state.form;
    const { address: fromAddress } = this.props;

    // If no from address return
    if (fromAddress.length < 1) return;

    // Check has values
    if (toAddress.length < 1 || amount.length < 1) {
      let errorsObject = {};
      if (toAddress.length < 1) {
        errorsObject.toAddress = {
          param: 'toAddress',
          msg: 'Required'
        };
      }
      if (amount.length < 1) {
        errorsObject.amount = {
          param: 'amount',
          msg: 'Required'
        };
      }

      this.setState({
        errors: errorsObject
      });

      return;
    }

    const transaction = {
      fromAddress,
      toAddress,
      amount
    };

    // Submitting form values
    this.sendTransactionToApi(transaction);
  }

  sendTransactionToApi(transaction) {
    const { updateTransactions } = this.props;

    // Submitting form values
    sendTransaction(transaction).then(response => {
      console.log('response from sendTransaction', response);
      if (response.error) {
        this.setState({ errors: response.errorData.errors });
        return;
      }
      // Else update transactions
      this.setState({ message: response, errors: null });
      updateTransactions();
    });
  }

  render() {
    return (
      <div>
        <h1>Transaction Send</h1>
        {this.state.errors && <ErrorHandler errors={this.state.errors} />}
        {this.state.message && <p>{this.state.message}</p>}
        <form onSubmit={this.handleSubmit}>
          <label className="label-hidden" htmlFor="amount">
            Address to send to
          </label>
          <input
            type="text"
            value={this.state.form.toAddress}
            onChange={e => this.handleChange(e, 'toAddress')}
            name="toAddress"
            placeholder="to address"
          />
          <label className="label-hidden" htmlFor="amount">
            Amount to send
          </label>
          <input
            type="number"
            value={this.state.form.amount}
            onChange={e => this.handleChange(e, 'amount')}
            name="amount"
            placeholder="amount"
          />
          <SubmitButton type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

TransactionSend.propTypes = {
  address: PropTypes.string.isRequired,
  transactions: PropTypes.object,
  updateTransactions: PropTypes.func
};

export default TransactionSend;
