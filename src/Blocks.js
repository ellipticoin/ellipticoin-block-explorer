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

export default class Blocks extends Component {
  constructor(props) {
    super(props);
    this.props.blockActions.fetchAndSubscribeToBlocks(10);
  }

  render() {
    let blocks = this.generateBlocks()

    return <div>
      <h1>Latest Blocks</h1>
      <Table>
        <thead>
          <tr>
            <th>Block Number</th>
            <th>Forged By</th>
          </tr>
        </thead>
      <TransitionGroup
        component="tbody"
        className="todo-list"
        >
        {blocks}
      </TransitionGroup>
      </Table>
    </div>
  }

  generateBlocks() {
    return 0, this.props.latestBlocks.map((block) => {
      return <CSSTransition
                key={block.number}
                timeout={500}
                classNames="slide-down"
              >
        <tr>
          <td>{block.number}</td>
          <td><a href="#">0x{block.winner.toString("hex")}</a></td>
        </tr>
      </CSSTransition>;
    });
  };
}
