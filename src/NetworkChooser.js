import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

export default class NetworkChooser extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      modalOpen: false,
    };
  }

  toggle() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  toggleModal = () => {
    this.setState(({ modalOpen }) => ({
      modalOpen: !modalOpen,
    }));
  };

  render() {
    return (
      <>
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle caret>Network (Testnet)</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Testnet</DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={this.toggleModal}>Mainnet</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Modal
          isOpen={this.state.modalOpen}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModal}>
            Under Construction
          </ModalHeader>
          <ModalBody>
            Ellipticoin is still in alpha. The mainnet is scheduled to be
            launched Q1 2020.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>
              Got it
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
