'use strict'

var permlink = (links) =>{
	$('#permlink').remove();

	if (typeof links !== 'string') {

		// processing of zipped images
		for(var i = 0; i < links.length; i++)
			$('body').append("<div id='permlink'>"+
							 	"<label>Permanent Link:-</label>"+
							 	'<h3><a href="http://localhost:3000/file/'+links[i]+'">http://localhost:3000/file/'+links[i]+'</a></h3>'+
							 "</div>"
			)
	} else{

		// processing of single image
		$('body').append("<div id='permlink'>"+
							 	"<label>Permanent Link:-</label>"+
							 	'<h3><a href="http://localhost:3000/file/'+links+'">http://localhost:3000/file/'+links+'</a></h3>'+
							 "</div>")
	}
}

var postreq = (url) =>{
	var fd = new FormData($('form')[0]);
	$.ajax({
		method: 'post',
		url: url,
		data: fd,
		cache: false,
		contentType: false,
		processData: false,
		success: (data)=>{
			permlink(data);
		}
	});
}

$('#form').on('submit', (e)=>{

	// get file type
	var filetype = $('input[name="file"]').val().split('.').pop();

	e.preventDefault();
	if (filetype === "zip"){
		postreq('/file/zip');				
	} else if (filetype.match(/jpg|jpeg|png/)){
		postreq('/file/image');
	} else{
		permlink("Error: please upload images in jpg or jpeg or png or zip format only");
	}
	$('input[name="file"]').val("");
});