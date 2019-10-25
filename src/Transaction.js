import React, { Component } from 'react';
import {
  Table,
} from 'reactstrap';
import AddressLink from "./AddressLink";
import TransactionLink from "./TransactionLink";
import "./Transaction.css";
import base64url from "base64url";
import {
  contractName,
  contractCreatedBy,
  transactionHash,
} from "./helpers.js"

export default class Transaction extends Component {
  constructor(props) {
    super();
    if(!props.transaction) {
      props.transactionActions.fetchTransaction(
        props.match.params.transactionHash,
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
              <th>Transaction Hash</th>
              <td><div>{TransactionLink(transactionHash(this.props.transaction))}</div></td>
            </tr>
            <tr>
              <th>Contract Address</th>
              <td><div>{base64url(this.props.transaction.contract_address)}</div></td>
            </tr>
            <tr>
              <th>Contract Created By</th>
              <td><div>{AddressLink(contractCreatedBy(this.props.transaction.contract_address))}</div></td>
            </tr>
            <tr>
              <th>Contract Name</th>
              <td><div>{contractName(this.props.transaction.contract_address)}</div></td>
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
              <div>
          {this.props.transaction.arguments.map((arg) => 
              Buffer.isBuffer(arg) ? arg.toString("base64") : arg
          ).join(", ")}
              </div>
        </td>
            </tr>
            <tr>
              <th>Return Value</th>
              <td><div>{this.props.transaction.return_value ? this.props.transaction.return_value: "Null"}</div></td>
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
