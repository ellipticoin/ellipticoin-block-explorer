const base64url = require("base64url");
const Long = require("long");
const cbor = require("borc");
const crypto = require("crypto");
const WORDS = require("./english.json");
const _ = require("lodash");

export function contractCreatedBy(contractAddress) {
  return contractAddress.slice(0, 32);
}

export function contractName(contractAddress) {
  return contractAddress.slice(32).toString("utf8");
}

export function pathToAddress(contractPath) {
  const parts = contractPath.split("/");
  if (parts.length === 1) {
    return base64url.toBuffer(parts[0]);
  } else {
    return Buffer.concat([
      Buffer.from(base64url.toBuffer(parts[0])),
      Buffer.from(parts[1], "utf8"),
    ]);
  }
}

export function transactionHash(transaction) {
  return objectHash(
    _.omit(transaction, ["block_hash", "return_code", "return_value", "hash"])
  );
}

export function networkIdentifier(number) {
  const parts = numberToParts(number);
  const words = parts.slice(0, -1).map((n) => WORDS[n]);
  return [...words, parts[parts.length - 1]].join("-");
}

export function numberToParts(number, partSizeBits = 12) {
  return [
    (number >>> (32 - 11)) & 2047,
    (number >> (32 - 2 * 11)) & 2047,
    number & 255,
  ];
}

export function objectHash(object) {
  return sha256(cbor.encode(object));
}

function sha256(message) {
  return crypto.createHash("sha256").update(message, "utf8").digest();
}

export function balanceKey(address) {
  let key = new Uint8Array(address.length + 1);
  key.set(Buffer.from([1]), 0);
  key.set(address, 1);
  return key;
}

export function bytesToNumber(bytes) {
  return Long.fromBytesLE(Buffer.from(bytes)).toNumber();
}

export function toKey(address, contractName, key) {
  return Buffer.concat([
    Buffer.from(address),
    Buffer.from(padRight(stringToBytes(contractName))),
    Buffer.from(key),
  ]);
}

function stringToBytes(string) {
  return Buffer.from(string, "utf8");
}

function padRight(bytes, number) {
  let padded = new Uint8Array(255);
  padded.set(bytes);
  return padded;
}
