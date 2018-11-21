import React, { Component } from "react";

class Topic extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>{this.props.title}</h1>
        <h2>{this.props.summary}</h2>
        <button>Toggle</button>
      </React.Fragment>
    );
  }
}

export default Topic;
