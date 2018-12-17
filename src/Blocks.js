import React, { Component } from 'react';
import {
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
        <tbody>
          {this.blocks()}
        </tbody>
      </Table>
    </div>
  }

  blocks() {
    return this.props.latestBlocks.map((block, i) => {
      return <tr key={i}>
        <td>{block.number}</td>
        <td><a href="#">0x{block.winner.toString("hex")}</a></td>
      </tr>;
    });
  };
}
