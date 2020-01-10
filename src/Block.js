import { Col, Row } from "reactstrap";
import React, { Component } from "react";
import { Table } from "reactstrap";
import Transactions from "./Transactions.js";
import "./Block.css";
import AddressLink from "./AddressLink";

export default class Block extends Component {
  constructor(props) {
    super();
    if (!props.block) {
      props.blockActions.fetchBlock(props.match.params.hash);
    }
  }
  render() {
    if (this.props.block) {
      const { block } = this.props;
      return (
        <>
          <h1>Block</h1>

          <Table className="block">
            <tbody>
              <tr>
                <th>Number</th>
                <td>
                  <div>{block.number}</div>
                </td>
              </tr>
              <tr>
                <th>Hash</th>
                <td>
                  <div>{block.hash.toString("base64")}</div>
                </td>
              </tr>
              <tr>
                <th>Winner</th>
                <td>
                  <div>{AddressLink(block.winner)}</div>
                </td>
              </tr>
            </tbody>
          </Table>
          <Row>
            <Col xs="12" lg="12" className="transactions">
              <h1>Transactions</h1>
              <Transactions
                latestTransactions={this.props.block.transactions}
              />
            </Col>
          </Row>
        </>
      );
    } else {
      return null;
    }
  }
}
