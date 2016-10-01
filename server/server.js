'use strict'

var express = require('express');
var app = express();
var path = require('path');
var routes = require('./routes/file.js');

app.use('/file', routes);

app.get('/', (req, res)=>{
	res.sendFile(path.resolve(__dirname, '../client/index.html'))
});

var port = 3000
app.listen(port)
console.log("app listening on port "+ port)