import * as types from "./actionTypes";
import cbor from "borc";
import queryString from "query-string";
import { bytesToNumber } from "../helpers.js";
import { Client as ECClient } from "ec-client";

const ellipticoin =
  process.env.NODE_ENV === "production"
    ? new ECClient({
        privateKey: null,
      })
    : new ECClient({
        privateKey: null,
        bootnodes: ["http://localhost:8080"],
      });

const HOST =
  process.env.NODE_ENV === "production"
    ? "https://davenport.ellipticoin.org"
    : "http://localhost:8080";
const WEBSOCKET_HOST =
  process.env.NODE_ENV === "production"
    ? "wss://davenport.ellipticoin.org"
    : "ws://localhost:81";

var newBlockEvent = new Event("newBlock");

export function fetchBalance(address) {
  return async (dispatch) => {
    const balanceBytes = await ellipticoin.getMemory(
      new Buffer(32),
      "Ellipticoin",
      Buffer.concat([new Buffer([1]), Buffer.from(address)])
    );
    console.log(balanceBytes);
    dispatch(
      receiveBalance({
        [address]: {
          balance: bytesToNumber(balanceBytes),
        },
      })
    );
  };
}

export function fetchBlock(hash) {
  return (dispatch) => {
    fetch(`${HOST}/blocks/${hash}`).then(async (response, json) => {
      if (response.status === 200) {
        dispatch(receiveBlock(decodeBytes(await response.arrayBuffer())));
      } else {
        throw Error("Failed to fetch block");
      }
    });
  };
}

export function fetchTransaction(transactionHash) {
  return (dispatch) => {
    fetch(`${HOST}/transactions/${transactionHash}`).then(
      async (response, json) => {
        if (response.status === 200) {
          dispatch(
            receiveTransaction(decodeBytes(await response.arrayBuffer()))
          );
        } else {
          dispatch(fetchTransactionError(response.statusText));
        }
      }
    );
  };
}

export function receiveBalance(balance) {
  return {
    type: types.RECEIVE_BALANCE,
    balance,
  };
}

export function receiveBlock(block) {
  return {
    type: types.RECEIVE_BLOCK,
    block,
  };
}

export function receiveTransaction(transaction) {
  return {
    type: types.RECEIVE_TRANSACTION,
    transaction,
  };
}

export function fetchBlocksSuccess(json) {
  return {
    type: types.RECEIVE_BLOCK,
    block: json.blocks,
  };
}

export function fetchBlocksError(error) {
  return {
    type: types.ERROR,
    error,
  };
}

export function fetchTransactionError(error) {
  return {
    type: types.ERROR,
    error,
  };
}
export function fetchAndSubscribeToBlocks(limit) {
  return (dispatch) => {
    var queryParams = queryString.stringify({ limit });
    fetch(`${HOST}/blocks?${queryParams}`).then(async (response, json) => {
      if (response.status === 200) {
        decodeBytes(await response.arrayBuffer()).forEach((block) =>
          dispatch(receiveBlock(block))
        );
        subscribeToBlocks(dispatch);
      } else {
        throw Error(fetchBlocksError());
      }
    });
  };
}
export function subscribeToBlocks(dispatch) {
  var blocksSocket = new WebSocket(`${WEBSOCKET_HOST}/websocket`);
  blocksSocket.binaryType = "arraybuffer";
  blocksSocket.onerror = console.log;
  blocksSocket.onmessage = ({ data }) => {
    window.dispatchEvent(newBlockEvent);
    dispatch(receiveBlock(decodeBytes(data)));
  };
  blocksSocket.onclose = ({ code }) =>
    console.log(`WebSocket disconnect code: ${code}`);

  // Heartbeat
  // https://stackoverflow.com/a/46112000/1356670
  // https://ninenines.eu/docs/en/cowboy/2.4/guide/ws_handlers/#_keeping_the_connection_alive
  setInterval(() => blocksSocket.send(new ArrayBuffer([])), 30000);
}

const decodeBytes = (bytes) => cbor.decode(Buffer.from(bytes));
