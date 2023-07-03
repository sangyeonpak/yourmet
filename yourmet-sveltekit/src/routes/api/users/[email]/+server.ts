import pool from "$lib/db";

export async function GET({ request }) {
  const email = request.url.split("/api/users/")
  console.log("email:", email);
  const check = await pool.query(`SELECT username, first_name, last_name, picture, cover_photo, view_mode, favorite_artist, favorite_artwork, favorite_period FROM users WHERE email=$1`, [email[1]]);
  return new Response(JSON.stringify(check.rows));
}