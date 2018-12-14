import _ from "lodash";
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import React, { Component } from 'react';
import {
  Col,
  Row,
  Table,
} from 'reactstrap';
const PREFETCH_COUNT = 3;

export default class Blocks extends Component {
  constructor(props) {
    super(props);
    this.props.blockActions.fetchAndSubscribeToBlocks(PREFETCH_COUNT);
  }

  render() {
    return <div>
      <h1>Latest Blocks</h1>
      <Table>
        <thead>
          <tr>
            <th>Block Number</th>
            <th>Forged By</th>
          </tr>
        </thead>
        {this.blocks()}
      </Table>
    </div>
  }

  blocks() {
    return this.props.latestBlocks.map((block) => {
      return <tr>
        <td>{block.number}</td>
        <td><a href="#">0x{block.winner.toString("hex")}</a></td>
      </tr>;
    });
  };
}
