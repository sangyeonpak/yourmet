import pool from "../../../lib/db";

// import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const artworks = await pool.query(`SELECT * FROM display`);
  return new Response(JSON.stringify(artworks.rows));
}

export async function POST() {
  pool.query(`INSERT INTO display (image_id, image_url, info_url, name, artist, year) VALUES (null, null, null, null, null, null)`);
  return new Response(String("New container created"));
}