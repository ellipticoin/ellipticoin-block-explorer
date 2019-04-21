import Address from "../Address";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as addressActions from "../actions/actions";
import { base64urlToBytes } from "../helpers.js";

function mapStateToProps(state, props) {
  let address = base64urlToBytes(props.match.params.address);
  return {
    address: state.addressReducer[address]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addressActions: bindActionCreators(addressActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Address);
