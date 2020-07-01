import React, { Component } from "react";
import { Table } from "reactstrap";
import AddressLink from "./AddressLink";
import TransactionLink from "./TransactionLink";
import Argument from "./Argument";
import "./Transaction.css";
import {
  contractName,
  contractCreatedBy,
  transactionHash,
  networkIdentifier,
} from "./helpers.js";

export default class Transaction extends Component {
  constructor(props) {
    super();
    if (!props.transaction) {
      props.transactionActions.fetchTransaction(
        props.match.params.transactionHash
      );
    }
  }
  render() {
    console.log(this.props.error);
    if (this.props.error === "Not Found") {
      return (
        <div>
          <h1>Transaction Not Found</h1>
        </div>
      );
    }
    if (this.props.transaction) {
      return (
        <>
          <h1>Transaction</h1>
          <Table className="transaction">
            <tbody>
              <tr>
                <th>Transaction Hash</th>
                <td>
                  <div>
                    {TransactionLink(transactionHash(this.props.transaction))}
                  </div>
                </td>
              </tr>
              <tr>
                <th>Network ID</th>
                <td>
                  <div>
                    {networkIdentifier(this.props.transaction.network_id)} (
                    {this.props.transaction.network_id})
                  </div>
                </td>
              </tr>
              <tr>
                <th>Contract Address</th>
                <td>
                  <div>
                    {AddressLink(this.props.transaction.contract_address)}
                  </div>
                </td>
              </tr>
              <tr>
                <th>Contract Created By</th>
                <td>
                  <div>
                    {AddressLink(
                      contractCreatedBy(this.props.transaction.contract_address)
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <th>Contract Name</th>
                <td>
                  <div>
                    {contractName(this.props.transaction.contract_address)}
                  </div>
                </td>
              </tr>
              <tr>
                <th>Sender</th>
                <td>
                  <div>{AddressLink(this.props.transaction.sender)}</div>
                </td>
              </tr>
              <tr>
                <th>Nonce</th>
                <td>
                  <div>{this.props.transaction.nonce}</div>
                </td>
              </tr>
              <tr>
                <th>Function</th>
                <td>
                  <div>{this.props.transaction.function}</div>
                </td>
              </tr>
              <tr>
                <th>Arguments</th>
                <td>
                  <div>
                    {this.props.transaction.arguments.map(Argument).join(", ")}
                  </div>
                </td>
              </tr>
              <tr>
                <th>Return Value</th>
                <td>
                  <div>
                    {this.props.transaction.return_value
                      ? JSON.stringify(this.props.transaction.return_value)
                      : "Null"}
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </>
      );
    } else {
      return null;
    }
  }
}
