import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class IdentityButtons extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    isCurrentIdentity: PropTypes.bool.isRequired,
    handleBackupIdentity: PropTypes.func.isRequired,
    handleDeleteIdentity: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render(){
    if(this.props.isCurrentIdentity) {
      return(
<div>
  <div className="row collapse">
    <div className="small-12 columns">
      <button onClick={this.props.handleBackupIdentity} className="radius small expand"><i className="icon-upload"></i> Backup</button>
    </div>
  </div>
  <div className="row collapse">
    <div className="small-12 columns">
      <button onClick={this.props.handleDeleteIdentity} data-name={this.props.name} className="small expand alert nomarginbottom"><i className="icon-trash"></i> Delete</button>
    </div>
  </div>
</div>

      )
    } else {
      return (

<div className="row collapse">
  <div className="small-12 columns">
    <button onClick={this.props.handleDeleteIdentity} data-name={this.props.name} className="small expand alert nomarginbottom"><i className="icon-trash"></i> Delete</button>
  </div>
</div>

      )
    }
  }
}
