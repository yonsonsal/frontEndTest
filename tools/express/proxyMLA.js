var express = require("express");
var app = express();
app.get("/", function(req, res) {
  res.send("Hello World!");
});
var server = app.listen(3002, function() {});
