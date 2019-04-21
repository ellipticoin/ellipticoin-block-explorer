import React, { Component } from 'react';
import {
  Table,
} from 'reactstrap';
import "./Transaction.css";

export default class Transaction extends Component {
  constructor(props) {
    super();
    if(!props.transaction) {
      props.transactionActions.fetchTransaction(props.match.params.hash);
    }
  }
  render() {
    if(this.props.transaction) {
      return <>
        <h1>Transaction</h1>

        <Table className="transaction">
          <tbody>
            <tr>
              <th>Hash</th>
              <td><div>{this.props.transaction.hash.toString("base64")}</div></td>
            </tr>
            <tr>
              <th>Contract Address</th>
              <td><div>{this.props.transaction.contract_address}</div></td>
            </tr>
            <tr>
              <th>Contract Name</th>
              <td><div>{this.props.transaction.contract_name}</div></td>
            </tr>
            <tr>
              <th>Sender</th>
              <td><div>{this.props.transaction.sender}</div></td>
            </tr>
            <tr>
              <th>Function</th>
              <td><div>{this.props.transaction.function}</div></td>
            </tr>
            <tr>
              <th>Return Value</th>
              <td>{this.props.transaction.return_value}</td>
            </tr>
            <tr>
              <th>Return Code</th>
              <td>{this.props.transaction.return_code}</td>
            </tr>
          </tbody>
        </Table>
      </>
    } else {
      return null;
    }
  }
}
