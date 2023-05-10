// import postgres from 'postgres';
import pkg from "pg";
import dotenv from 'dotenv';
const { Pool } = pkg;

dotenv.config();

// const sql = postgres({database: process.env.DB_URL});

let pool:any;

if(!pool) {
	pool = new Pool({ connectionString: process.env.DB_URL });
}

pool.connect((err: any) => {
	if (err) {
		console.error(err);
	} else {
		console.log('Connected to Database')
	}
});

export default pool;
