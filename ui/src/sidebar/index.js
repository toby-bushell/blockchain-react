import React, { Fragment, Component } from 'react';
import { SidebarWrapper } from './styles';
import { NavLink } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    console.log('this sidebar props', this.props);

    return (
      <SidebarWrapper>
        <li>
          <NavLink exact to={'/'}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={'/mining/'}>Mining</NavLink>
        </li>
        <li>
          <NavLink to={'/transactions/'}>Transactions</NavLink>
        </li>
        <li>
          <NavLink to={'/send/'}>Send</NavLink>
        </li>
      </SidebarWrapper>
    );
  }
}

export default Sidebar;
