var Long = require("long");

export function base64url(bytes) {
  return (new Buffer.from(bytes))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}
export function base64urlToBytes(base64url) {
  return Buffer.from(base64url.replace(/-/g, "+").replace(/_/g, "/"), "base64")
}

export function balanceKey(address) {
  let key = new Uint8Array(address.length + 1);
  key.set(new Buffer([0]), 0);
  key.set(address, 1);
  return key;
}

export function bytesToNumber(bytes) {
  return Long.fromBytesLE(Buffer.from(bytes)).toNumber()
}

export function systemContract(contractName, size) {
  let contractNameBytes = new Buffer(contractName, 'utf8');
  let padded = new Uint8Array(32);
  padded.set(contractNameBytes);
  return padded;
}
