import React, { Component } from 'react';
import {
  Table,
} from 'reactstrap';
import "./Address.css";
import NumberEasing from 'che-react-number-easing';
import base64url from "base64url";

export default class Address extends Component {
  constructor(props) {
    super();
    if(!props.address) {
      props.addressActions.fetchAndSubscribeToBlocks();
      props.addressActions.fetchBalance(base64url.toBuffer(props.match.params.address));
    }
    window.addEventListener('newBlock', () => {
      props.addressActions.fetchBalance(base64url.toBuffer(props.match.params.address));
    })
  }
  render() {
    if(this.props.address) {
      const {address} = this.props;
      return <>
        <h1>Address</h1>

        <Table className="address">
          <tbody>
            <tr>
              <th>Address</th>
              <td><div>{this.props.match.params.address.toString("base64")}</div></td>
            </tr>
            <tr>
              <th>Balance</th>
              <td><div><NumberEasing
  value={address.balance/10000}
  precision={2}
  trail={2}
  speed={500}
  ease='quintInOut' /></div></td>
            </tr>
          </tbody>
        </Table>
      </>
    } else {
      return null;
    }
  }
}
