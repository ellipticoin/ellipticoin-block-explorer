import React from 'react';
import { base64url } from "./helpers.js";

const AddressLink = (address) => (
  <a href={`/addresses/${base64url(address)}`}>{address.toString("base64")}</a>
)
export default AddressLink;
