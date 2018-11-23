const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "teplapassword",
  database: "tepla"
});

connection.connect(err => {
  if (!err) {
    console.log("Sucessfully connected to database");
  } else {
    console.log(
      "Error connecting to database\n" + JSON.stringify(err, null, 2)
    );
  }
});

app.listen(3000, () => console.log("Running on 3000"));

// Get all topics
app.get("/topics", (req, res) => {
  connection.query(
    "select * from topics where topic_visible = 1",
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Get singe topic
app.get("/topic/:id", (req, res) => {
  connection.query(
    "select * from `tepla`.`topics` where topic_visible = 1 and topic_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Delete single topic
app.delete("/topic/:id", (req, res) => {
  connection.query(
    "delete from `tepla`.`topics` where topic_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Update single topic
app.put("/topic/:id", (req, res) => {
  let topic = req.body;

  let query =
    "update `tepla`.`topics` set `topic_name` = ?, `topic_data` = ? where topic_id = ?";

  connection.query(
    query,
    [topic.name, topic.data, req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Create singe topic
app.post("/topic", (req, res) => {
  let topic = req.body;

  let query =
    "insert into `tepla`.`topics` (`topic_name`,`topic_data`) values (?,?)";

  connection.query(query, [topic.name, topic.data], (err, rows, fields) => {
    if (!err) {
      res.send("Updated");
    } else {
      console.log(err);
    }
  });
});
