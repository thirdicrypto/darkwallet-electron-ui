// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { setIdentities, setCurrentIdentity } from '../actions/identities';
import { handleNewPockets } from '../actions/pockets';
import { createAppMessage, deleteAppMessage } from '../actions/app';
import AppMessageList from './AppMessageList';
import IdentityList from './IdentityList';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    identities: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentIdentity: PropTypes.string,
    setIdentities: PropTypes.func.isRequired,
    setCurrentIdentity: PropTypes.func.isRequired,
    handleNewPockets: PropTypes.func.isRequired,
    appMessages: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentPocket: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleDaemonEvents();
    this.props.dwDaemon.init();
  }

  componentWillMount() {
    this.setState({busy: false});
    for (i in this.props.appMessages) {
      if(this.props.appMessages.type = "info") {
        this.setState({busy: false});
      }
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.currentIdentity == null) {
      this.setState({showIdentitiesDropdown: true});
    } else {
      if(this.props.currentIdentity != newProps.currentIdentity) {
        this.setState({showIdentitiesDropdown: false});
      }
    }
  }

  handleDaemonEvents = () => {
    this.props.dwDaemon.on("identitiesListReady", (identities) => {
      console.log("Daemon Event: identitiesListReady");
      this.props.setCurrentIdentity(identities.currentIdentity);
      this.props.setIdentities(identities.identitiesList);
    });
    this.props.dwDaemon.on("currentAccountReady", (identity) => {
      console.log("Daemon Event: currentAccountReady");
      this.props.setCurrentIdentity(identity);
    });
    this.props.dwDaemon.on("pocketsListReady", (pockets) => {
      console.log("Daemon Event: pocketsListReady");
      this.props.handleNewPockets(pockets);
    });
    this.props.dwDaemon.on("daemonMessage", (message) => {
      console.log("Daemon Event: daemonMessage");
      this.props.createAppMessage(message);
    });
    this.props.dwDaemon.on("daemonMessageDelete", (message) => {
      console.log("Daemon Event: daemonMessageDelete");
      this.props.deleteAppMessage(message);
    });
  }

  toggleIdentitiesDropdown = () => {
    this.setState({showIdentitiesDropdown: !this.state.showIdentitiesDropdown})
  }

  render() {
    return (
      <div className="container">
        <nav className="top-bar">
          <ul className="title-area">
            <li className="name">
              <h1><a><img id="logo" className={this.state.busy ? "busy" : ""} width="32" height="32" src="../resources/images/logo.svg" /> Darkwallet</a></h1>
            </li>
          </ul>
          <AppMessageList deleteAppMessage={this.props.deleteAppMessage} appMessages={this.props.appMessages}/>
          <section className="top-bar-section">
            <ul className="right">
              {/*<li title="Gateway: ok" ><i className="icon-chain-broken"></i></li> */}
              {/*<li title="Fetching data from obelisk!" ><i className="icon-cloud-download"> 0</i></li>*/}
              {/*<li title="Current height">BC Height</li>*/}
              {/*<li title="Block explorer"><Link to="/explorer"><i className="icon-sitemap"></i></Link></li>*/}
              <li><Link to={ "/wallet/details/" + this.props.currentPocket }><i className="icon-wallet"></i> Wallet</Link></li>
              {/*<li><Link to="/send"><i className="icon-rocket"></i> Send</Link></li> */}
              {/*<li><Link to="/contacts"><i className="icon-contacts"></i> Contacts</Link></li>*/}
              {/*<li><Link to="/lobby"><i className="icon-chat"></i> Lobby</Link></li>*/}
              <li title="Settings" id="settings"><Link to="/settings"><i className="icon-cog"></i> Settings</Link></li>
              <li title="Identities" onClick={this.toggleIdentitiesDropdown}><a><i className="icon-profile"></i> {this.props.currentIdentity}</a></li>
            </ul>
          </section>
        </nav>
        <div id="identitiesDropdown" className={this.state.showIdentitiesDropdown? "navDropdown active" : "navDropdown"}>
          <IdentityList toggleIdentitiesDropdown={this.toggleIdentitiesDropdown} />
        </div>
        {this.props.children}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    dwDaemon: state.app.dwDaemon,
    identities: state.identities.identities,
    currentIdentity: state.identities.currentIdentity,
    appMessages: state.app.appMessages,
    currentPocket: state.pockets.currentPocket,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setIdentities: (identities) => dispatch(setIdentities(identities)),
    setCurrentIdentity: (identity) => dispatch(setCurrentIdentity(identity)),
    handleNewPockets: (pockets) => dispatch(handleNewPockets(pockets)),
    createAppMessage: (message) => dispatch(createAppMessage(message)),
    deleteAppMessage: (messageName) => dispatch(deleteAppMessage(messageName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
