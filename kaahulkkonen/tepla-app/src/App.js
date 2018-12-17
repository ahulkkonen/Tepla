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

// Import the Log class...
import Log from "./log";

class App extends Component {
  state = {
    topics: [],

    authentication: {
      email: "",
      password: "",
      jwt: ""
    },
    loginModal: false,

    // New topic specific
    newTopicData: {
      name: "",
      data: "",
      visible: true
    },
    newTopicModal: false,

    editTopicData: {
      _id: "",
      name: "",
      data: "",
      visible: true
    },
    editTopicModal: false
  };

  componentWillMount() {
    this.refreshTopics();
  }

  toggleLoginModal() {
    this.setState({
      loginModal: !this.state.loginModal
    });
  }

  login() {}

  refreshTopics() {
    axios
      .get("http://localhost:3001/topics")
      .then(response => {
        this.setState({
          topics: response.data.topics
        });
      })
      .catch(error => {
        // Error cant connect
      });
  }

  toggleNewTopicModal() {
    this.setState({
      newTopicModal: !this.state.newTopicModal
    });
  }

  toggleEditTopicModal() {
    this.setState({
      editTopicModal: !this.state.editTopicModal
    });
  }

  addNewTopic() {
    axios
      .post("http://localhost:3001/topics", this.state.newTopicData)
      .then(res => {
        let { topics } = this.state;

        // Add "createdTopic" to topics array
        topics.push(res.data.createdTopic);
        this.setState({ topics });

        // Close modal
        this.setState({
          newTopicModal: false,

          newTopicData: {
            name: "",
            data: ""
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteTopic(id) {
    console.log(id);

    axios
      .delete("http://localhost:3001/topics/" + id)
      .then(res => {
        this.refreshTopics();
      })
      .catch(err => {
        console.log(err);
      });
  }

  editTopic(id, name, data, visible) {
    this.setState({
      editTopicData: { _id: id, name: name, data: data, visible: visible },
      editTopicModal: !this.state.editTopicModal
    });
  }

  updateTopic() {
    /*
    [
	    {"propName": "name", "value": "Test123"}
    ]
    */

    // Populate operations list
    let ops = [];
    ops.push({ propName: "name", value: this.state.editTopicData.name });
    ops.push({ propName: "data", value: this.state.editTopicData.data });
    ops.push({ propName: "visible", value: this.state.editTopicData.visible });

    axios
      .patch(
        "http://localhost:3001/topics/" + this.state.editTopicData._id,
        ops
      )
      .then(res => {
        this.setState({
          editTopicData: { _id: "", name: "", data: "", visible: true },
          editTopicModal: false
        });

        this.refreshTopics();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let topics = this.state.topics.map(topic => {
      return (
        <tr key={topic._id}>
          <td>{topic._id}</td>
          <td>{topic.name}</td>
          <td>{topic.data.slice(0, 10)}..</td>
          <td>
            <Button
              color="success"
              size="sm"
              className="mr-2"
              onClick={this.editTopic.bind(
                this,
                topic._id,
                topic.name,
                topic.data,
                topic.visible
              )}
            >
              Edit
            </Button>
            <Button
              color="danger"
              size="sm"
              onClick={this.deleteTopic.bind(this, topic._id)}
            >
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App container">
        <div>
          <Button color="primary" onClick={this.toggleNewTopicModal.bind(this)}>
            Add a new topic
          </Button>
          <Button color="primary" className="ml-2" onClick={this.toggleLoginModal.bind(this)}>
            Log in
          </Button>

          <Modal
            isOpen={this.state.newTopicModal}
            toggle={this.toggleNewTopicModal.bind(this)}
          >
            <ModalHeader toggle={this.toggleNewTopicModal.bind(this)}>
              Add a new topic
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Topic title"
                  value={this.state.newTopicData.name}
                  onChange={e => {
                    let { newTopicData } = this.state;

                    newTopicData.name = e.target.value;
                    this.setState({ newTopicData });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="data">Data</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="data"
                  value={this.state.newTopicData.data}
                  onChange={e => {
                    let { newTopicData } = this.state;

                    newTopicData.data = e.target.value;
                    this.setState({ newTopicData });
                  }}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addNewTopic.bind(this)}>
                Add new topic
              </Button>{" "}
              <Button
                color="secondary"
                onClick={this.toggleNewTopicModal.bind(this)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>

        <Modal
          isOpen={this.state.editTopicModal}
          toggle={this.toggleEditTopicModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleEditTopicModal.bind(this)}>
            Edit topic
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Topic title"
                value={this.state.editTopicData.name}
                onChange={e => {
                  let { editTopicData } = this.state;

                  editTopicData.name = e.target.value;
                  this.setState({ editTopicData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="data">Data</Label>
              <Input
                type="textarea"
                name="text"
                id="data"
                value={this.state.editTopicData.data}
                onChange={e => {
                  let { editTopicData } = this.state;

                  editTopicData.data = e.target.value;
                  this.setState({ editTopicData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateTopic.bind(this)}>
              Edit topic
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleEditTopicModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

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
            <Button
              color="secondary"
              onClick={this.toggleLoginModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Data</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>{topics}</tbody>
        </Table>
      </div>
    );
  }
}

export default App;
