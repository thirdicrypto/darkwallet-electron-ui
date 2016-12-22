import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/identities';
import Balance from './Balance';
import IdentityLoginForm from './IdentityLoginForm';
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
<li className={this.props.isCurrentIdentity ? "currentIdentity identity" : ""}>
  <div className="panel radius nomarginbottom identity">
    <h4>{this.props.name}</h4>
    <h6>Balance: <Balance balance={this.props.balance} /></h6>
    <IdentityLoginForm name={this.props.name} handleLogin={this.props.handleLogin} isCurrentIdentity={this.props.isCurrentIdentity} />
    <div className="row collapse">
      <div className="small-6 columns">
        <button onClick={this.props.handleBackupIdentity} className="nomarginbottom small expand"><i className="icon-upload"></i> Backup</button>
      </div>
      <div className="small-6 columns">
        <button onClick={this.props.handleDeleteIdentity} data-name={this.props.name} className="small expand alert nomarginbottom"><i className="icon-trash"></i> Delete</button>
      </div>
    </div>
  </div>
</li>
    )
  }
}
