import * as types from "./actionTypes";
import cbor from "borc";
import queryString from "query-string";
import { SYSTEM_ADDRESS, Token, tokenId, Client as ECClient } from "ec-client";

const ellipticoin =   process.env.NODE_ENV === "production"
    ? new ECClient({
        privateKey: null,
      })
    : new ECClient({
        privateKey: null,
        bootnodes: ["http://localhost:8080"],
      });


export function fetchBalance(address) {
  return async (dispatch) => {
          const tokenContract = new Token(ellipticoin, [SYSTEM_ADDRESS, Buffer.from("Ellipticoin")], tokenId("ELC"));
          const balance = await tokenContract.getBalance(address);
    dispatch(
      receiveBalance({
        [address]: {
          balance: balance,
        },
      })
    );
  };
}

export function fetchTransaction(transactionHash) {
  return async (dispatch) => {
    let t = await ellipticoin.getTransaction(transactionHash)
    console.log(t)
    // fetch(`${HOST}/transactions/${transactionHash}`).then(
    //   async (response, json) => {
    //     if (response.status === 200) {
    //       dispatch(
    //         receiveTransaction(decodeBytes(await response.arrayBuffer()))
    //       );
    //     } else {
    //       dispatch(fetchTransactionError(response.statusText));
    //     }
    //   }
    // );
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
  return async (dispatch) => {
    let blocks = await ellipticoin.getBlocks({limit})
    blocks.forEach((block) => {
          dispatch(receiveBlock(block))
    })
    subscribeToBlocks(dispatch);
  };
}

export function subscribeToBlocks(dispatch) {
  ellipticoin.addBlockListener(async (blockHash) => {
    let block = await ellipticoin.getBlock(blockHash)
    
    dispatch(receiveBlock(block));
    
  })
}
