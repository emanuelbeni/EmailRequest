var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//FILL THESE
var connection = mysql.createConnection({
	host: "localhost",
	user: "USERNAME",
	password: "PASSWORD",
	database: "DATABASE_NAME"
});

app.get("/", function(req, res) {
	// Find count of users in DB
	var q = "SELECT COUNT(*) AS count FROM users";
	connection.query(q, function(error, results) {
		if (error) throw error;
		var count = results[0].count;
		res.render("home", { count });
	});
});

app.post("/register", function(req, res) {
	var q = "INSERT INTO users SET ?";
	var person = {
		email: req.body.email
	};
	connection.query(q, person, function(err, results) {
		if (err) throw err;
		res.redirect("/");
	});
});

app.listen(3000, function() {
	console.log("App listening on port 3000!");
});
