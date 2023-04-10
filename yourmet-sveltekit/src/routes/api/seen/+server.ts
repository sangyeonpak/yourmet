import pool from "$lib/db";


// import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const seen = await pool.query(`SELECT * FROM seen`);
  return new Response(JSON.stringify(seen.rows));
}

/*
const artwork = await pool.query(`UPDATE display SET image_url=$2, info_url=$3, name=$4, artist=$5, year=$6 WHERE id=$1 RETURNING *`,
  [
    id, image_url, info_url, name, artist, year
  ])
*/
export async function POST({request}) {
  const { image_id, image_url, info_url, name, artist, year } = await request.json();
  pool.query(`INSERT INTO seen (image_id, image_url, info_url, name, artist, year) VALUES ($1, $2, $3, $4, $5, $6)`, [image_id, image_url, info_url, name, artist, year]);
  return new Response(String("Artwork seen"), {status: 201});
}