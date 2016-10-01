'use strict'

var multer = require('multer');
var path = require('path');

// multer config for uploading image
var imgUpload = multer({ 
	storage: multer.diskStorage({
		destination: (req, file, cb)=>{
			cb(null, './public/upload');
		},
		filename: (req, file, cb)=>{
			cb(null, Date.now()+path.extname(file.originalname));
		}
	}),
	fileFilter: (req, file, cb)=>{
		if(file.originalname.match(/\.(jpg|jpeg|png)$/)){
			return cb(null, true)
		}
		cb("Error: please upload files in jpg or jpeg or png format only")
	}
});

// multer config for uploading zip
var zipUpload = multer({ 
	storage: multer.diskStorage({
		destination: (req, file, cb)=>{
			cb(null, './public/tmp');
		},
		filename: (req, file, cb)=>{
			cb(null, Date.now()+path.extname(file.originalname));
		}
	}),
	fileFilter: (req, file, cb)=>{
		if(file.originalname.match(/\.zip$/)){
			return cb(null, true)
		}
		cb("Error: please upload files in zip format only")
	}
});

module.exports = {
	image: ()=>{
		return imgUpload;
	},
	zip: ()=>{
		return zipUpload;
	}
}