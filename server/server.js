'use strict'

const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes/file.js');

app.use('/public/upload/*', (req, res, next)=>{
	res.attachment();
	next();
})

app.use('/public/upload', express.static(path.resolve(__dirname, '../public/upload')))
app.use('/js/', express.static(path.resolve(__dirname, '../public/js')))
app.use('/file', routes);

app.get('/', (req, res)=>{
	res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

const port = 3000
app.listen(port)
console.log("app listening on port "+ port)