import pool from "$lib/db";

export async function GET({ request }) {
  const username = request.url.split("/api/seen/")
  const seen = await pool.query(`SELECT id, username, image_id, image_url, info_url, name, artist, year FROM seen WHERE username=$1 ORDER BY id ASC`, [username[1]]);
  return new Response(JSON.stringify(seen.rows));
}