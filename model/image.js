'use strict'

const Jimp = require('jimp');
const db = require('../helper/dbops.js');
const random = require('../helper/randalphanum.js');

module.exports = {
	process: (file)=>{
		const ref = random.random()

		Jimp.read(file.path, (err, image)=>{
			console.log(file.path)
			if (image.bitmap.width > 128 && image.bitmap.height > 128){
				image.resize(64, 64)
					 .write("./public/upload/"+file.filename.split('.')[0]+"_thumb-big."+file.filename.split('.').pop())
				image.resize(32, 32)
					 .write("./public/upload/"+file.filename.split('.')[0]+"_thumb-small."+file.filename.split('.').pop())	 
			}
		})
		
		db.write(ref, file.path, new Date().toISOString());
		console.log("saved");
		return ref
	}
}
