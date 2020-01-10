import { Link } from 'react-router-dom'
import React from "react";
import base64url from "base64url";

const AddressLink = address => {
  let linkText;
  if (address.compare(new Buffer(32)) === 0) {
    linkText = `System (${address.toString("base64")})`;
  } else {
    linkText = address.toString("base64");
  }

  return <Link to={`/addresses/${base64url(address)}`}>{linkText}</Link>;
};
export default AddressLink;
