'use strict'

const router = require('express').Router();
const multerConfig = require('../../config/multer.js');
const imageProcessor = require('../../model/image.js');
const unzipper = require('../../model/zip.js');
const db = require('../../helper/dbops.js');

router.use((req, res, next)=>{
	next();
})

router.get('/:id', (req, res)=>{
	db.read(req.params.id, (result)=>{
		console.log(result);
		res.send('<h1>Original - '+
					'<a href="'+result+'">click to download</a>'+
				 '</h1><img src='+result+'>'+

				 '<h1>Thumbnail Big - '+
				 	'<a href="'+result.split('.')[0]+'_thumb-big.'+result.split('.').pop()+'">click to download</a>'+
				 '</h1><img src='+result.split('.')[0]+'_thumb-big.'+result.split('.').pop()+'>'+

				 '<h1>Thumbnail Small - '+
					'<a href="'+result.split('.')[0]+'_thumb-small.'+result.split('.').pop()+'">click to download</a>'+
				 '</h1><img src='+result.split('.')[0]+'_thumb-small.'+result.split('.').pop()+'>'+
				 '<h4><a href="/">Upload another image/zip</a></h4>')
	})
})

// handler for single image
router.post('/image', multerConfig.image().single('file'), (req, res)=>{
	res.send(imageProcessor.process(req.file))
	console.log("processed")
});

// handler for zipped images
router.post('/zip', multerConfig.zip().single('file'), (req, res)=>{
	res.send(unzipper.process(req.file));
	console.log("processed")
});


module.exports = router;