import pool from "$lib/db";

export async function POST({request}) {
  const { image_id, image_url, info_url, name, artist, year, email, username } = await request.json();
  console.log(email);
  pool.query(`INSERT INTO seen (image_id, image_url, info_url, name, artist, year, email, username) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [image_id, image_url, info_url, name, artist, year, email, username]);
  return new Response(String("Artwork seen"), {status: 201});
}

export async function DELETE({ request }) {
  const { username, image_id } = await request.json();
  pool.query(`DELETE FROM seen WHERE username=$1 AND image_id=$2`, [username, image_id]);
  return new Response(String("Artwork removed from list"), {status: 202});
}