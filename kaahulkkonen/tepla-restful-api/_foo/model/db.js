var mysql = require("mysql");

//local mysql db connection
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "teplapassword",
  database: "tepla"
});

connection.connect(function(err) {
  if (err) throw err;
});

module.exports = connection;
