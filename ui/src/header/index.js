import React, { Fragment, Component } from 'react';
import { HeaderWrapper } from './styles';
import AppContext from '../context/app';
import Profile from './profile';
import PersonSVG from '../assets/img/person-svg';
import Balance from '../balance';

class Header extends Component {
  render() {
    console.log('this state', this.props.context);

    return (
      <HeaderWrapper>
        <div className="header__info">
          Your Balance: <Balance />
        </div>
        <Profile />
      </HeaderWrapper>
    );
  }
}

export default Header;
