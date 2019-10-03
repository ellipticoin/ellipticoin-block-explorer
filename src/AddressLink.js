import React from 'react';
import { base64url } from "./helpers.js";

const AddressLink = (address) => {
  let linkText;
  if (address.compare(new Buffer(32)) == 0) {
    linkText = `System (${address.toString("base64")})`;
  } else {
    linkText = address.toString("base64");
  }
  
  return <a href={`/addresses/${base64url(address)}`}>{linkText}</a>
}
export default AddressLink;
