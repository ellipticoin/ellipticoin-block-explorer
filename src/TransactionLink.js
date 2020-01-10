import React from "react";
import base64url from "base64url";

const AddressLink = transactionHash => (
  <a href={`/transactions/${base64url(transactionHash)}`}>
    {base64url(transactionHash)}
  </a>
);
export default AddressLink;
