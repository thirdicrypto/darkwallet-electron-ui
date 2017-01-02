// @flow
import { combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'
import { routerReducer as routing } from 'react-router-redux';
import app from './app';
import identities from './identities';
import pockets from './pockets';
import addresses from './addresses';
import stealthAddress from './stealthAddress';
import history from './history';

const rootReducer = combineReducers({
  app,
  identities,
  pockets,
  addresses,
  stealthAddress,
  history,
  routing,
});

export default rootReducer;
