import * as types from './actionTypes';
import cbor from 'cbor';
import queryString from 'query-string';
const HOST = "davenport.ellipticoin.org:4047";
const BLOCKS_WEBSOCKET_PATH = "websocket/blocks";
const BLOCKS_PATH = "blocks";

export function receiveBlock(json) {
  return {
    type: types.RECEIVE_BLOCKS, block: json
  };
}

export function fetchBlocksSuccess(json) {
  return {
    type: types.RECEIVE_BLOCKS, block: json.blocks
  };
}

export function fetchBlocksError(error) {
  console.log(error);
}
export function fetchAndSubscribeToBlocks(limit) {
  return dispatch => {
    var queryParams = queryString.stringify({ limit });
    fetch(`https://${HOST}/${BLOCKS_PATH}?${queryParams}`).then(async (response, json) => {
      if(response.status === 200) {
        decodeBytes(await response.arrayBuffer()).blocks.map((block) =>
          dispatch(receiveBlock(block))
        );
      } else {
        dispatch(fetchBlocksError())
      }
      subscribeToBlocks(dispatch);
    })
  }
}
export function subscribeToBlocks(dispatch) {
      var blocksSocket = new WebSocket(`wss://${HOST}/${BLOCKS_WEBSOCKET_PATH}`);
      blocksSocket.binaryType = "arraybuffer";
      blocksSocket.onmessage = ({data}) => dispatch(receiveBlock(decodeBytes(data)));
}



const decodeBytes = (bytes) => cbor.decodeFirstSync(Buffer.from(bytes));
