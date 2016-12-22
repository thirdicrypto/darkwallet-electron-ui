import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import IdentityPage from './containers/IdentityPage';
import IdentityCreateForm from './components/IdentityCreateForm';
import WalletPage from './containers/WalletPage';
import PocketDetails from './components/PocketDetails';
import PocketOverview from './components/PocketOverview';
import PocketHistory from './components/PocketHistory';
import PocketAddressList from './components/PocketAddressList';
import PocketCreate from './components/PocketCreate';
import SendPage from './containers/SendPage';
import ContactsPage from './containers/ContactsPage';
import LobbyPage from './containers/LobbyPage';
import SettingsPage from './containers/SettingsPage';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={WalletPage} />
    <Route path="/identities" component={IdentityPage} />
    <Route path="/identities/createidentity" component={IdentityCreateForm} />
    <Route path="/wallet" component={WalletPage}>
      <IndexRoute component={PocketDetails} />
      <Route path="/wallet/details/:pocketName" component={PocketDetails} >
      	<IndexRoute component={PocketOverview} />
      	<Route path="/wallet/details/overview/:pocketName" component={PocketOverview} />
      	<Route path="/wallet/details/history/:pocketName" component={PocketHistory} />
      	<Route path="/wallet/details/addresses/:pocketName" component={PocketAddressList} />
      </Route>
      <Route path="/wallet/createpocket" component={PocketCreate} />
    </Route>
    <Route path="/send" component={SendPage} />
    <Route path="/contacts" component={ContactsPage} />
    <Route path="/lobby" component={LobbyPage} />
    <Route path="/settings" component={SettingsPage} />
  </Route>
);
