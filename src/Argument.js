import base64url from "base64url";

const Argument = (argument) => {
  if (Array.isArray(argument)) {
    return base64url(Buffer.from(argument));
  } else {
    return argument;
  }
};
export default Argument;
