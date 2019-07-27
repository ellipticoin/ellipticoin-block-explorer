import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes.js";
import WebFont from "webfontloader";
import {
  Container
} from 'reactstrap';

WebFont.load({
  google: {
    families: ['Open Sans']
  }
});
const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Header />
      <Container>
        <Routes />
      </Container>
    </Router>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
