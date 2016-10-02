'use strict'

const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/file.js');
const db = require('../model/database.js');


app.use('/public/upload', express.static(path.resolve(__dirname, '../public/upload')))
app.use('/file', routes);
console.log(path.resolve(__dirname, '../public'))

app.get('/', (req, res)=>{
	res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

db.create();

const port = 3000
app.listen(port)
console.log("app listening on port "+ port)