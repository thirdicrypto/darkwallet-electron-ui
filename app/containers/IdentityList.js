import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Identity from '../components/Identity';
import IdentityCreateForm from '../components/IdentityCreateForm';

class IdentityList extends Component {
  static propTypes = {
    identities: PropTypes.array.isRequired,
    currentIdentity: PropTypes.string,
    dwDaemonStartLogin : PropTypes.func.isRequired,
    dwDaemonDeleteIdentity: PropTypes.func.isRequired,
    dwDaemonBackupIdentity: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({display: "listIdentities"});
  }

  componentWillReceiveProps(newProps) {
    this.setState({display: "listIdentities"});
  }

  handleLogin = (e) => {
    e.preventDefault();
    let password = e.target.querySelector('[name=password]').value;
    let accountName = e.target.querySelector('[name=accountName]').value;
    this.props.dwDaemonStartLogin(accountName, password);
  }

  handleDeleteIdentity = (e) => {
    e.preventDefault();
    var identityName = e.target.getAttribute('data-name');
    if(confirm("Are you sure you want to delete this identity?")) {
      this.props.dwDaemonDeleteIdentity(identityName);
    }
  }

  handleBackupIdentity = (e) => {
    e.preventDefault();
    this.props.dwDaemonBackupIdentity();
  }

  showCreateForm = (e) => {
    this.setState({display: "createIdentity"});
  }

  showList = (e) => {
    this.setState({display: "listIdentities"});
  }

  render() {

    if(this.state.display == "createIdentity") {
      return (
        <div>
          <IdentityCreateForm />
          <a onClick={this.showList} className="backButton button small radius alert"><i className="icon-plus"></i> Back to Identity List</a>
        </div>
      )
    }

    return (
<div className="scroller off-canvas-wrap" >
  <div className="row identityListActions">
    <div className="small-12 columns">
      <a onClick={this.showCreateForm} className="button small radius"><i className="icon-plus"></i> New wallet</a>
      <a className="button radius small"><i className="icon-download"></i> Restore a backup</a>
      <a className="button radius small"><i className="icon-upload"></i> Backup all wallets</a>
    </div>
  </div>
  <div className="row">
    <div className="small-12 columns">
      <ul className="large-block-grid-5 medium-block-grid-4 small-block-grid-2">
        {this.props.identities.map((identity, i) => {
          return <Identity key={i}
            name={identity.name}
            balance={identity.balance}
            handleLogin={this.handleLogin}
            handleBackupIdentity={this.handleBackupIdentity}
            handleDeleteIdentity={this.handleDeleteIdentity}
            isCurrentIdentity={identity.name == this.props.currentIdentity} />
        })}
      </ul>
    </div>
  </div>
</div>

    )
  }
}

function mapStateToProps(state) {
  return {
    identities: state.identities.identities,
    currentIdentity: state.identities.currentIdentity,
    dwDaemonStartLogin: state.app.dwDaemon.startLogin,
    dwDaemonDeleteIdentity: state.app.dwDaemon.deleteIdentity,
    dwDaemonBackupIdentity: state.app.dwDaemon.backupIdentity,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startLogin: () => dispatch(startLogin()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdentityList);
