import pool from "$lib/db";

export async function POST({request}) {
  const { image_id, image_url, info_url, name, artist, year, email } = await request.json();
  pool.query(`INSERT INTO seen (image_id, image_url, info_url, name, artist, year, email) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [image_id, image_url, info_url, name, artist, year, email]);
  return new Response(String("Artwork seen"), {status: 201});
}

export async function DELETE({ request }) {
  const { email, image_id } = await request.json();
  pool.query(`DELETE FROM seen WHERE email=$1 AND image_id=$2`, [email, image_id]);
  return new Response(String("Artwork removed from list"), {status: 202});
}