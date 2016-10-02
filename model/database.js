'use strict'

const pg = require('pg');
const connectionString = 'postgres://localhost:5432/test'
const client = new pg.Client(connectionString);
		client.connect();
		const query = client.query(
			'CREATE TABLE IF NOT EXISTS files(id SERIAL PRIMARY KEY, uniq_ref VARCHAR not null, file_path VARCHAR not null, created_at TIMESTAMP not null)'
		)
		query.on('end', ()=>{client.end()});


module.exports = {
	create: ()=>{
		
	},

	write: (ref, file_path, created_at)=>{
		const client = new pg.Client(connectionString);
		client.connect();
		const query = client.query(
			'INSERT INTO files(uniq_ref, file_path, created_at) VALUES ($1, $2, $3)', [ref, file_path, created_at]
		)
		query.on('end', ()=>{client.end()});
	},

	read: (ref, callback)=>{
		var result;
		const pg = require('pg');
		const connectionString = 'postgres://localhost:5432/test';
		const client = new pg.Client(connectionString);
		client.connect();
		const query = client.query('SELECT file_path FROM files WHERE uniq_ref = ($1)', [ref]);
		query.on('row', (row)=>{
			result = row;
			console.log(query)
			callback("/"+result.file_path.replace(/\\/g, "/"));
		})
		query.on('end', ()=>{
			client.end();	
		})
		
	}
}

