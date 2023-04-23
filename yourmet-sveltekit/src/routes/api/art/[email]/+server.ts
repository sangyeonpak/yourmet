import pool from "$lib/db";

export async function GET({ request }) {
  const email = request.url.split("/api/art/")
  const artworks = await pool.query(`SELECT * FROM display WHERE email=$1 ORDER BY id ASC`, [email[1]]);
  return new Response(JSON.stringify(artworks.rows));
}