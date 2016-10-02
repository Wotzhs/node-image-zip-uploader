'use strict'

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

