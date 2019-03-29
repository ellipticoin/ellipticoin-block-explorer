import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Table,
} from 'reactstrap';
const PREFETCH_COUNT = 4;
const ETHEREUM_BLOCK_EXPLORER = "https://rinkeby.etherscan.io";

export default class Blocks extends Component {
  constructor(props) {
    super(props);
    this.props.blockActions.fetchAndSubscribeToBlocks(PREFETCH_COUNT);
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
    return <TransitionGroup 
    enter={this.props.latestBlocks.length > 3}
    component="tbody" >
      {this.props.latestBlocks.map((block, index) =>
        <CSSTransition
          key={block.number}
          timeout={500}
          classNames="fade"
        >
          <tr>
            <td><div>{block.number}</div></td>
            <td><div><a href="#">{block.winner.toString("base64")}</a></div></td>
        </tr>
        </CSSTransition>
      )}
    </TransitionGroup>
  };
}


