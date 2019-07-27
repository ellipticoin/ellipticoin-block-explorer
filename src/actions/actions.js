import * as types from './actionTypes';
import cbor from 'cbor';
import queryString from 'query-string';
import { base64url, toKey, balanceKey, bytesToNumber } from "../helpers.js"
const HOST = process.env.NODE_ENV === 'production' ||true ?
  "https://davenport.ellipticoin.org":
  "http://localhost:4460";
const WEBSOCKET_HOST = process.env.NODE_ENV === 'production' ||true?
  "wss://davenport.ellipticoin.org":
  "ws://localhost:4460";

const SYSTEM_ADDRESS = new Uint8Array(32);
var newBlockEvent = new Event('newBlock');

export function fetchBalance(address) {
  return dispatch => {
    let key = toKey(SYSTEM_ADDRESS, "BaseToken", balanceKey(address));
    fetch(`${HOST}/memory/${base64url(key)}`).then(async (response, json) => {
      if(response.status === 200) {
        dispatch(receiveBalance({[address]: {balance: bytesToNumber(await response.arrayBuffer())}}))
      } else {
        throw(Error("Failed to fetch block"))
      }
    })
  }
}

export function fetchBlock(hash) {
  return dispatch => {
    fetch(`${HOST}/blocks/${hash}`).then(async (response, json) => {
      if(response.status === 200) {
        dispatch(receiveBlock(decodeBytes(await response.arrayBuffer())))
      } else {
        throw(Error("Failed to fetch block"))
      }
    })
  }
}

export function fetchTransaction(blockHash, executionOrder) {
  return dispatch => {
    fetch(`${HOST}/transactions/${blockHash}/${executionOrder}`).then(async (response, json) => {
      if(response.status === 200) {
        dispatch(
          receiveTransaction(decodeBytes(await response.arrayBuffer()))
        )
      } else {
        dispatch(fetchTransactionError())
      }
    })
  }
}

export function receiveBalance(balance) {
  return {
    type: types.RECEIVE_BALANCE,
    balance
  };
}

export function receiveBlock(block) {
  return {
    type: types.RECEIVE_BLOCK,
    block
  };
}

export function receiveTransaction(transaction) {
  return {
    type: types.RECEIVE_TRANSACTION,
    transaction
  };
}

export function fetchBlocksSuccess(json) {
  return {
    type: types.RECEIVE_BLOCK, block: json.blocks
  };
}

export function fetchBlocksError(error) {
  console.log(error);
}

export function fetchTransactionError(error) {
  console.log(error);
}
export function fetchAndSubscribeToBlocks(limit) {
  return dispatch => {
    var queryParams = queryString.stringify({ limit });
    fetch(`${HOST}/blocks?${queryParams}`).then(async (response, json) => {
      if(response.status === 200) {
        decodeBytes(await response.arrayBuffer()).blocks.forEach((block) =>
          dispatch(receiveBlock(block))
        );
        subscribeToBlocks(dispatch);
      } else {
        throw(Error(fetchBlocksError()));
      }
    })
  }
}
export function subscribeToBlocks(dispatch) {
      var blocksSocket = new WebSocket(`${WEBSOCKET_HOST}/websocket/blocks`);
      blocksSocket.binaryType = "arraybuffer";
      blocksSocket.onmessage = ({data}) => {
        window.dispatchEvent(newBlockEvent);
        dispatch(receiveBlock(decodeBytes(data)))
      };
      blocksSocket.onclose = ({code}) => console.log(`WebSocket disconnect code: ${code}`)

      // Heartbeat
      // https://stackoverflow.com/a/46112000/1356670
      // https://ninenines.eu/docs/en/cowboy/2.4/guide/ws_handlers/#_keeping_the_connection_alive
      setInterval(() => blocksSocket.send(new ArrayBuffer([])), 30000)
  //     window.count = 13231
  //     setInterval(() => dispatch(receiveBlock({
  //       "winner": new Buffer([40,175,84,97,202,214,131,4,27,211,102,104,81,242,192,102,39,112,136,165]),
  //       "transactions":[],
  //       "total_burned": 0,
  //       "parent_hash": new Buffer([72,176,130,3,132,140,143,209,145,29,216,137,206,46,65,50,46,188,13,110,85,1,162,253,164,237,195,46,118,120,203,44]),
  //       "number": window.count++,
  //       "changeset_hash": new Buffer([227,176,196,66,152,252,28,20,154,251,244,200,153,111,185,36,39,174,65,228,100,155,147,76,164,149,153,27,120,82,184,85]),
  //         "block_hash": new Buffer([48,8,9,0,153,121,27,81,40,66,241,117,193,69,22,109,24,95,206,1,20,75,148,175,114,133,237,57,103,81,28,87]),
  // })), 1000)
}



const decodeBytes = (bytes) => cbor.decodeFirstSync(Buffer.from(bytes));
