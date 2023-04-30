import pool from "$lib/db";

export async function GET({ request }) {
  const username = request.url.split("/api/users/visitor")
  const check = await pool.query(`SELECT username, first_name, last_name, picture, cover_photo, view_mode, favorite_artist, favorite_artwork, favorite_period FROM users WHERE username=$1`, [username[1]]);
  return new Response(JSON.stringify(check.rows));
}