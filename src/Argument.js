import React from "react";
import base64url from "base64url";
import cbor from "borc";

const Argument = (argument) => {
  if (Array.isArray(argument)) {
    return base64url(Buffer.from(argument));
    return Buffer.from(argument).toString();
  } else {
    return argument;
  }
};
export default Argument;
