import React, { Component } from 'react';
import {
  Table,
} from 'reactstrap';
import AddressLink from "./AddressLink";
import "./Transaction.css";
import cbor from "cbor";

export default class Transaction extends Component {
  constructor(props) {
    super();
    if(!props.transaction) {
      props.transactionActions.fetchTransaction(
        props.match.params.blockHash,
        props.match.params.executionOrder,
      );
    }
  }
  render() {
    if(this.props.transaction) {
      return <>
        <h1>Transaction</h1>

        <Table className="transaction">
          <tbody>
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
              <td><div>{AddressLink(this.props.transaction.sender)}</div></td>
            </tr>
            <tr>
              <th>Function</th>
              <td><div>{this.props.transaction.function}</div></td>
            </tr>
            <tr>
              <th>Arguments</th>
              <td>

        {console.log(this.props.transaction.arguments)}
        {this.props.transaction.arguments.map((arg) => (
        <tr>
            <td>{Buffer.isBuffer(arg) ? arg.toString("base64") : arg}</td>
        </tr>
        ))
        }</td>
            </tr>
            <tr>
              <th>Return Value</th>
              <td><div>{this.props.transaction.return_value}</div></td>
            </tr>
            <tr>
              <th>Return Code</th>
              <td><div>{this.props.transaction.return_code}</div></td>
            </tr>
          </tbody>
        </Table>
      </>
    } else {
      return null;
    }
  }
}
