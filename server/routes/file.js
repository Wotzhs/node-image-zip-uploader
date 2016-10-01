'use strict'

var router = require('express').Router();
var path = require('path');
var multerConfig = require('../../config/multer.js');
var AdmZip = require('adm-zip');
var fs = require('fs');

router.use((req, res, next)=>{
	next();
})

router.get('/:id', (req, res)=>{
	// retrieve selected file path from db
})

router.post('/image', multerConfig.image().single('file'), (req, res)=>{
	console.log(req.file);
	// return a unique link for the uploaded file
});

router.post('/zip', multerConfig.zip().single('file'), (req, res)=>{
	console.log(req.file);
	var zip = new AdmZip(req.file.path);
	var zipEntries = zip.getEntries();

	zipEntries.forEach((zipEntry)=>{
		console.log(zipEntry.toString());

		// extact only image files
		if (zipEntry.entryName.match(/\.(jpg|jpeg|png)$/)){
			zip.extractEntryTo( zipEntry.entryName,'./public/tmp/', true, false)			
		}
		// rename file on extract to upload path to avoid name conflict
		var newName = Date.now()+path.extname(zipEntry.entryName);
		fs.rename(req.file.destination+'/'+zipEntry.entryName, './public/upload/'+newName);	
	})
	// delete uploaded zip file after extraction
	fs.unlink(req.file.path);
});


module.exports = router;