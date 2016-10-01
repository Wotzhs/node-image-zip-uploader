'use strict'

var Jimp = require('jimp');

module.exports = {
	process: (file)=>{
		Jimp.read(file.path, (err, image)=>{
			console.log(file.path)
			if (image.bitmap.width > 128 && image.bitmap.height > 128){
				image.resize(64, 64)
					 .write("./public/upload/"+file.filename.split('.')[0]+"-thumb-big."+file.filename.split('.').pop())
				image.resize(32, 32)
					 .write("./public/upload/"+file.filename.split('.')[0]+"-thumb-small."+file.filename.split('.').pop())	 
			}
		})
	}
}
