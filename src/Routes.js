import App from './App';
import TransactionContainer from './containers/TransactionContainer';
import BlockContainer from './containers/BlockContainer';
import AddressContainer from './containers/AddressContainer';
import React from 'react';
import { Route } from "react-router-dom";

const Routes = () => (<>
  <Route exact path="/" component={App} />
  <Route path="/addresses/:address" component={AddressContainer} />
  <Route path="/transactions/:hash" component={TransactionContainer} />
  <Route path="/blocks/:hash" component={BlockContainer} />
</>)

export default Routes;
