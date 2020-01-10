import { Col, Row } from "reactstrap";
import React from "react";
import BlocksContainer from "./containers/BlocksContainer";
import TransactionsContainer from "./containers/TransactionsContainer";
import "./App.css";

const App = () => (
  <>
    <Row>
      <Col xs="12" lg="9" className="transactions">
        <TransactionsContainer />
      </Col>
      <Col xs="12" sm="3">
        <aside>
          <h5>About</h5>
          Ellipticoin is a blockchain that runs decentralized applications. The
          Ellipticoin Block Explorer gives insight into the Ellipticoin network.
        </aside>
      </Col>
    </Row>
    <BlocksContainer />
  </>
);

export default App;
