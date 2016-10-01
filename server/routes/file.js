'use strict'

var router = require('express').Router();

var multerConfig = require('../../config/multer.js');
var imageProcessor = require('../../model/image.js');
var unzipper = require('../../model/zip.js');

router.use((req, res, next)=>{
	next();
})

router.get('/:id', (req, res)=>{
	// retrieve selected file path from db
})

router.post('/image', multerConfig.image().single('file'), (req, res)=>{
	console.log(req.file)
	imageProcessor.process(req.file)
});

router.post('/zip', multerConfig.zip().single('file'), (req, res)=>{
	console.log(req.file);
	unzipper.process(req.file);
});


module.exports = router;