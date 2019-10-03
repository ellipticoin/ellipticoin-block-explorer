const Long = require("long");
const cbor = require("cbor");
const crypto = require("crypto");
const _ = require("lodash");

export function contractCreatedBy(contractAddress) {
  return contractAddress.slice(0, 32);
}
export function contractName(contractAddress) {
  return contractAddress.slice(32).toString("utf8");
}

export function transactionHash(transaction) {
  return objectHash(_.omit(transaction, [
    "hash",
    "block_hash",
    "return_code",
    "return_value",
  ]))
}
export function objectHash(object) {
  return sha256(cbor.encode(object))
}

function sha256(message) {
  return crypto.createHash('sha256').update(message, 'utf8').digest()
}

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

export function toKey(address, contractName, key) {
  return Buffer.concat([
    Buffer.from(address),
    Buffer.from(padRight(stringToBytes(contractName))),
    Buffer.from(key)
  ])
}

function stringToBytes(string) {
  return new Buffer(string, 'utf8');
}

function padRight(bytes, number) {
  let padded = new Uint8Array(32);
  padded.set(bytes);
  return padded;
}
