import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Table } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import base64url from "base64url";
import "./Transactions.css";
import { contractName, transactionHash } from "./helpers.js";

library.add(faInfoCircle);

export default class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rendered: false
    };
  }

  componentDidMount = () => {
    this.setState({
      ...this.state,
      rendered: true
    });
  };

  render() {
    return (
      <>
        <Table>
          <thead>
            <tr>
              <th>Contract Name</th>
              <th>Function</th>
              <th colSpan="3">Result</th>
            </tr>
          </thead>
          {this.transactions()}
        </Table>
      </>
    );
  }

  transactions() {
    return (
      <TransitionGroup
        enter={this.props.latestTransactions.length > 3}
        component="tbody"
      >
        {this.props.latestTransactions.map((transaction, index) => (
          <CSSTransition
            key={transaction.block_hash + transactionHash(transaction)}
            timeout={500}
            classNames="fade"
          >
            <tr>
              <td>
                <div>{contractName(transaction.contract_address)}</div>
              </td>
              <td>
                <div>{transaction.function}</div>
              </td>
              <td>
                <div>{transaction.return_code}</div>
              </td>
              <td>
                <div>
                  {transaction.return_code === 0 ? "Success" : "Failed"}
                </div>
              </td>
              <td>
                <a
                  href={`/transactions/${base64url(
                    transactionHash(transaction)
                  )}`}
                >
                  <FontAwesomeIcon icon="info-circle" />
                </a>
              </td>
            </tr>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
}
