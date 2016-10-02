'use strict'

// database creation & setup
const pgtools = require('pgtools');
const config = {
	port: 5432,
	host: 'localhost'
}

pgtools.createdb(config, 'test', function (err, res) {
  	if (err) {
    	console.error(err);
    	process.exit(-1);
  	}
  	console.log(res);
	const pg = require('pg');
	const connectionString = 'postgres://localhost:5432/test'
	const client = new pg.Client(connectionString);
	client.connect();
	const query = client.query(
		'CREATE TABLE IF NOT EXISTS files(id SERIAL PRIMARY KEY, uniq_ref VARCHAR not null, file_path VARCHAR not null, created_at TIMESTAMP not null)'
	)
	query.on('end', ()=>{
		client.end()
	});

});

// app directory setup
const fs = require('fs');
const tmpdir = './public/tmp';
const uploaddir = './public/upload';

if (!fs.existsSync(tmpdir) && !fs.existsSync(uploaddir)){
	fs.mkdirSync(tmpdir);
	fs.mkdirSync(uploaddir)
}
console.log('done')