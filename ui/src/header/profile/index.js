import React, { Fragment, Component } from 'react';
import AppContext from '../../context/app';
import PersonSVG from '../../assets/img/person-svg';
import { ProfileDiv, ProfileMenu } from './styles';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };

    this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
  }

  toggleProfileMenu() {
    console.log('open');

    this.setState((prevState, props) => ({
      open: !prevState.open
    }));
  }

  render() {
    console.log('this state', this.state);

    return (
      <AppContext.Consumer>
        {({ address }) => (
          <ProfileDiv>
            <PersonSVG onClick={this.toggleProfileMenu} />
            {this.state.open && (
              <ProfileMenu onMouseLeave={this.toggleProfileMenu}>
                <li>
                  Your Address: <br />
                  {address}
                </li>
              </ProfileMenu>
            )}
            {/* Address: nfbsajfbasjbfsjla{address && `Address: ${address}`} */}
          </ProfileDiv>
        )}
      </AppContext.Consumer>
    );
  }
}

export default Profile;
