import React, { Component } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";

export class LoginModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authentication: {
        email: "",
        password: "",
        jwt: ""
      },

      loginModal: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  toggleLoginModal() {
    this.setState({
      loginModal: !this.state.loginModal
    });
  }

  login() {}

  render() {
    return (
      <Modal
        isOpen={this.state.loginModal}
        toggle={this.toggleLoginModal.bind(this)}
      >
        <ModalHeader toggle={this.toggleLoginModal.bind(this)}>
          Log in
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="emai">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="name@domain.com"
              value={this.state.authentication.email}
              onChange={e => {
                this.setState({
                  authentication: {
                    email: e.value
                  }
                });
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={this.state.authentication.password}
              onChange={e => {
                this.setState({
                  authentication: {
                    password: e.value
                  }
                });
              }}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.login.bind(this)}>
            Log in
          </Button>{" "}
          <Button color="secondary" onClick={this.toggleLoginModal.bind(this)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}