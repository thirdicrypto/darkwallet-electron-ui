import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class IdentityLoginForm extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isCurrentIdentity: PropTypes.bool.isRequired,
    handleLogin: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render(){
    if(this.props.isCurrentIdentity) {
      return <h3> Logged In </h3>
    } else {
      return (

<form onSubmit={this.props.handleLogin} >
  <input type="hidden" name="accountName" value={this.props.name} />
  <input type="password" name="password" placeholder="password" />
  <button type="submit" className="radius small expand"><i className="icon-user"></i> Log in</button>
</form>

      )
    }
  }
}
