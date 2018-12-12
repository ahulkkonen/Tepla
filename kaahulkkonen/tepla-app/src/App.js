import React, { Component } from "react";
import axios from "axios";
import { Table, Button } from "reactstrap";

class App extends Component {
  state = {
    books: []
  };

  componentWillMount() {
    axios.get("http://localhost:3000/books").then(response => {
      this.setState({
        books: response.data
      });
    });
  }

  render() {
    let books = this.state.books.map(book => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.rating}</td>
          <td>
            <Button color="success" size="sm" className="mr-2">
              Edit
            </Button>
            <Button color="danger" size="sm">
              Delete
            </Button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App container">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>{books}</tbody>
        </Table>
      </div>
    );
  }
}

export default App;
