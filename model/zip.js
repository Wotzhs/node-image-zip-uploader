'use strict'

const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');
const imageProcessor = require('./image.js');

module.exports = {

	process: (file)=>{

		// array to store uniq_ref of each images
		var refs = []

		const zip = new AdmZip(file.path);
		const zipEntries = zip.getEntries();

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
			const newName = Date.now()+file;
			fs.renameSync('./public/tmp/'+file, './public/upload/'+newName)

			// process each images to get thumbnails
			refs.push(imageProcessor.process({filename: newName, path: 'public\\upload\\'+newName}))
		})

		// return the arrays of uniq_refs
		return refs
	}
}