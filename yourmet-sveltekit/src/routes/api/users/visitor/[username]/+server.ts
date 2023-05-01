import pool from "$lib/db";

export async function GET({ request }) {
  const username = request.url.split("/api/users/visitor/")[1]
  const check = await pool.query(`SELECT username, first_name, picture, cover_photo, favorite_artist, favorite_artwork, favorite_period FROM users WHERE username=$1`, [username]);
  return new Response(JSON.stringify(check.rows));
}