import React from 'react';
import { base64url } from "./helpers.js";

const AddressLink = (transactionHash) => (
  <a href={`/transactions/${base64url(transactionHash)}`}>{transactionHash.toString("base64")}</a>
)
export default AddressLink;
