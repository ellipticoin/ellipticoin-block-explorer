import React, { Component } from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Table,
} from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { base64url } from "./helpers";
import "./Transactions.css";
import {
  objectHash,
} from "./helpers.js"

library.add(faInfoCircle)

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rendered: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      ...this.state,
      rendered: true
    });
  }


  render() {
    return <Row>
          <Col xs="9" className="transactions">
            <h1>Latest Transactions</h1>
            <Table>
              <thead>
                <tr>
                  <th>Contract Name</th>
                  <th>Function</th>
                  <th colSpan="2">Result</th>
                </tr>
              </thead>
                {this.transactions()}
            </Table>
          </Col>
          <Col xs="3">
            <aside>
              <h5>About</h5>
              Ellipticoin is a blockchain that runs decentralized applications. The Ellipticoin Block Explorer gives insight into the Ellipticoin network.
            </aside>
          </Col>
        </Row>
  }

  transactions() {
    return <TransitionGroup 
    enter={this.props.latestTransactions.length > 3}
    component="tbody" >
      {this.props.latestTransactions.map((transaction, index) =>
        <CSSTransition
          key={transaction.block_hash.toString() + transaction.execution_order}
          timeout={500}
          key={transaction.function + transaction.nonce + transaction.block_hash}
          classNames="fade"
        >
          <tr>
            <td><div>{transaction.contract_name}</div></td>
            <td><div>{transaction.function}</div></td>
            <td><div>{transaction.return_code === 0 ? "Success" : "Failed"}</div></td>
            <td>
              <a href={`/transactions/${base64url(transaction.block_hash)}/${transaction.execution_order}`}><FontAwesomeIcon icon="info-circle" /></a>
            </td>
        </tr>
        </CSSTransition>
      )}
    </TransitionGroup>
  };
}


