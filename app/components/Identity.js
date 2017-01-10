import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/identities';
import Balance from './Balance';
import IdentityLoginForm from './IdentityLoginForm';
import IdentityButtons from './IdentityButtons';
import './Identity.css';

 export default class Identity extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
    isCurrentIdentity: PropTypes.bool.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleDeleteIdentity: PropTypes.func.isRequired,
    handleBackupIdentity: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render(){
    return (
<li className={this.props.isCurrentIdentity ? "currentIdentity identity" : "identity"}>
  <div className="panel radius nomarginbottom">
    <h4>{this.props.name}</h4>
    <h6>Balance: <Balance balance={this.props.balance} /></h6>
    <IdentityLoginForm name={this.props.name} handleLogin={this.props.handleLogin} isCurrentIdentity={this.props.isCurrentIdentity} />
    <IdentityButtons isCurrentIdentity={this.props.isCurrentIdentity}
      handleBackupIdentity={this.props.handleBackupIdentity}
      handleDeleteIdentity={this.props.handleDeleteIdentity}
      name={this.props.name} />
  </div>
</li>
    )
  }
}
