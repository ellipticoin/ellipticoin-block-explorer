import { Link } from 'react-router-dom'
import React from "react";
import base64url from "base64url";

const AddressLink = transactionHash => (
  <Link to={`/transactions/${base64url(transactionHash)}`}>
    {base64url(transactionHash)}
  </Link>
);
export default AddressLink;
