var sql = require("./db.js");

// Topic constructor
var Topic = function(topic) {
  this.title = topic.title;
  this.data = topic.data;
};

Topic.getById = function createUser(taskId, result) {
  sql.query("select topic from topics where topic_id = ? ", taskId, function(
    err,
    res
  ) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Topic.getAll = function(result) {
  sql.query("select * from topics", function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("tasks : ", res);

      result(null, res);
    }
  });
};

/*Topic.updateById = function(id, task, result) {
  sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function(
    err,
    res
  ) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

Topic.remove = function(id, result) {
  sql.query("DELETE FROM tasks WHERE id = ?", [id], function(err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};*/

module.exports = Topic;
