import { Link } from 'react-router-dom'
import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Table } from "reactstrap";
import "./Blocks.css";
import base64url from "base64url";
const PREFETCH_COUNT = 4;

export default class Blocks extends Component {
  constructor(props) {
    super(props);
    this.props.blockActions.fetchAndSubscribeToBlocks(PREFETCH_COUNT);
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
      <div>
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
    );
  }

  blocks() {
    return (
      <TransitionGroup
        enter={this.props.latestBlocks.length > 3}
        component="tbody"
      >
        {this.props.latestBlocks.map((block, index) => (
          <CSSTransition key={block.number} timeout={500} classNames="fade">
            <tr>
              <td className="block-number">
                <div>
                  <Link to={`/blocks/${base64url(block.hash)}`}>
                    {block.number}
                  </Link>
                </div>
              </td>
              <td>
                <div>
                  <Link to={`/addresses/${base64url(block.winner)}`}>
                    {block.winner.toString("base64")}
                  </Link>
                </div>
              </td>
            </tr>
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
}
