'use strict'

var AdmZip = require('adm-zip');
var fs = require('fs');
var path = require('path');
var imageProcessor = require('./image.js');

module.exports = {

	process: (file)=>{
		var zip = new AdmZip(file.path);
		var zipEntries = zip.getEntries();

		zipEntries.forEach((zipEntry)=>{
			console.log(zipEntry.toString());

			// extact only image files
			if (zipEntry.entryName.match(/\.(jpg|jpeg|png)$/)){
				zip.extractEntryTo( zipEntry.entryName,'./public/tmp/', false, false)
				console.log("extracting")			
			}
			
		console.log('finished extracting')
		})
		// delete uploaded zip file after extraction
		console.log('removing zip')
		fs.unlinkSync(file.path)

		// rename file to avoid conflict/overwritten
		console.log('renaming and moving to upload folder')
		fs.readdirSync('./public/tmp/').forEach((file)=>{
			var newName = Date.now()+file;
			fs.renameSync('./public/tmp/'+file, './public/upload/'+newName)

			// process each images to get thumbnails
			imageProcessor.process({filename: newName, path: './public/upload/'+newName})
		})
	}
}