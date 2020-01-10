import { Button } from "reactstrap";
import React, { Component } from "react";
import Web3 from 'web3';
const {promisify} = require('util');
const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const getAccounts = promisify(web3.eth.getAccounts);
const ethSign = promisify(web3.eth.sign);
const web3Send = promisify(web3.currentProvider.sendAsync);

const UNLOCK_MESSAGE = "unlock_ellipticoin";

async function sign(message, account) {
  return web3.utils.hexToBytes((await web3Send({method: 'personal_sign',
      params: [message, account]
  })).result)
}
export default class UnlockEther extends Component {
  async sign () {
    await window.ethereum.enable();
    let account = (await getAccounts())[0];
    console.log(await sign(UNLOCK_MESSAGE, account))
  }
  render() {
    return <div>
      <div><p>Ellipticoin is a Hard Spoon of the Ethereum network. Users can migrate their tokens via calling <strong>Ellipticoin.unlock</strong> on the the System contract. Click the button below to migrate your tokens using Web3</p></div>
      <Button onClick={this.sign} color="success">Migrate Ether via Web3</Button>
    </div>
  }
}
