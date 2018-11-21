/**
  API function to list all topics in tepla
*/

var express = require('express');
var router = express.Router();

/* GET topics listing. */
router.get('/', function(req, res, next) {
  // Lists all visible topics
	res.locals.connection.query(
    'select * from topics where topic_visible = 1',

    function (error, results, fields) {
	  	if (error) {
	  		res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	  	}
  	}
  );
});

module.exports = router;
