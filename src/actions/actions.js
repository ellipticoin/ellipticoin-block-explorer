import * as types from './actionTypes';
import cbor from 'cbor';
import queryString from 'query-string';
const PREFETCH_COUNT = 10;
const HOST = "68.183.123.91:4047";
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
    fetch(`http://${HOST}/${BLOCKS_PATH}?${queryParams}`).then(async (response, json) =>{
      if(response.status === 200) {
        decodeBytes(await response.arrayBuffer()).blocks.map((block) =>
        dispatch(receiveBlock(block))
        );
      } else{
        dispatch(fetchBlocksError())
      }

      var blocksSocket = new WebSocket(`ws://${HOST}/${BLOCKS_WEBSOCKET_PATH}`);
      blocksSocket.binaryType = "arraybuffer";
      blocksSocket.onmessage = ({data}) => dispatch(receiveBlock(decodeBytes(data)));
    })
  }
}

const decodeBytes = (bytes) => cbor.decodeFirstSync(Buffer.from(bytes));

export function subscribeToBlocks() {
  return dispatch => {
    var queryParams = queryString.stringify({"prefetch": PREFETCH_COUNT });
    var blocksSocket = new WebSocket(`ws://${HOST}/${BLOCKS_WEBSOCKET_PATH}?${queryParams}`);
    blocksSocket.onmessage = ({data}) => {
      dispatch(receiveBlock(JSON.parse(data)));
    }
  }
}
