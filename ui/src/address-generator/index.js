import React, { Component, Fragment } from 'react';
import AppContext from '../context/app';
import Popup from '../shared/popup/';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal');

class AddressGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: null
    };
    this.el = document.createElement('div');
    this.generateAddress = this.generateAddress.bind(this);
  }

  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  generateAddress(updateAddress) {
    let address = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 20; i++) address += possible.charAt(Math.floor(Math.random() * possible.length));

    // Save address in context
    updateAddress(address);
  }

  render() {
    const address = this.state.address;

    console.log('address', address);

    return ReactDOM.createPortal(
      <Popup
        render={close => (
          <AppContext.Consumer>
            {({ address, updateAddress }) => (
              <Fragment>
                {console.log(this.state, 'a')}

                <h2>{address ? `Your address is \n ${address}` : 'You need an address'}</h2>
                {address ? (
                  <button className="o-btn" onClick={close}>
                    let's start
                  </button>
                ) : (
                  <button className="o-btn" onClick={e => this.generateAddress(updateAddress)}>
                    generate address
                  </button>
                )}
              </Fragment>
            )}
          </AppContext.Consumer>
        )}
      />,
      this.el
    );
  }
}
{
  /* <AppContext.Consumer>
{({ address, updateAddress }) => (
  <div>

  </div>
)}
</AppContext.Consumer> */
}

export default AddressGenerator;
