import * as types from './actionTypes';
import cbor from 'cbor';
import queryString from 'query-string';
const HOST = "davenport.ellipticoin.org:4047";
const BLOCKS_WEBSOCKET_PATH = "websocket/blocks";
const BLOCKS_PATH = "blocks";

export function receiveBlock(block) {
  return {
    type: types.RECEIVE_BLOCKS,
    block
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
