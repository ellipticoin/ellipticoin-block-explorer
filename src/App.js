import {
  Button,
  Col,
  Container,
  Input,
  Jumbotron,
  Row,
  Table,
} from 'reactstrap';


import React, { Component } from 'react';
import NetworkChooser from './NetworkChooser';
import BlocksContainer from './containers/BlocksContainer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <header>
          <div>
            <img src={logo} />
          </div>
          <div>
          <h1>Ellipticoin</h1>
          <h2>Block Explorer</h2>
          </div>
          <nav>
            <a href="/">Network Status</a>
            <a href="/">Transactions</a>
            <a href="/">Blocks</a>
          </nav>
          <input placeholder="Search"/>
          <nav>
            <NetworkChooser></NetworkChooser>
          </nav>
        </header>
        <Container>
          <Row>
            <Col xs="9">
              <div>
                <h1>Latest Transactions</h1>
                <Table>
                  <thead>
                    <tr>
                      <th>Transaction Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col xs="3">
              <aside>
                <h5>About</h5>
                Ellipticoin is a blockchain that runs decentralized applications. The Ellipticoin Block Explorer gives insight into the Ellipticoin network.
              </aside>
            </Col>
          </Row>
          <BlocksContainer />
        </Container>
      </div>
    );
  }
}

export default App;
