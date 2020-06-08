import { Link } from "react-router-dom";
import React from "react";
import base64url from "base64url";

const AddressLink = (address) => {
  if (address.length > 32) {
    let contractCreatedBy = addressToString(address.slice(0, 32));
    let contractName = address.slice(32).toString("utf8");

    return (
      <Link
        to={`/addresses/${contractCreatedBy}/${contractName}`}
      >{`${contractCreatedBy}/${contractName}`}</Link>
    );
  } else {
    return (
      <Link to={`/addresses/${addressToString(address)}`}>
        {addressToString(address)}
      </Link>
    );
  }
};

const addressToString = (address) => {
  if (address.compare(new Buffer(32)) === 0) {
    return "System";
  } else {
    return base64url(address);
  }
};
export default AddressLink;
