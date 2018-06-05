import React, { Component } from 'react';
import { PopupOverlay, PopupDiv } from './styles';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.closePopup = this.closePopup.bind(this);
    this.state = { active: true };
  }

  componentDidMount() {
    console.log('props inside component did mount', this.props);
  }

  closePopup() {
    this.setState({
      active: false
    });
  }

  render() {
    console.log('this state inside pop up', this.state);

    return (
      <PopupOverlay active={this.state.active}>
        <PopupDiv>{this.props.render(this.closePopup)}</PopupDiv>
      </PopupOverlay>
    );
  }
}

export default Popup;
