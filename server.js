var argv = process.ARGV || process.argv;

var http = require('http');
var express = require('express');
var app = express();
var dir = argv[2] || (__dirname + "/dist");
var port = process.env.C9_PORT || parseInt(argv[3], 10) || 8080;

// Load static server
app.use(express['static'](dir));

console.log("Listening on", port);

app.listen(port, '0.0.0.0');
