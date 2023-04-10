import pool from "$lib/db";

export async function DELETE({request}) {
  const image_id = await request.json();
  pool.query(`DELETE FROM seen WHERE image_id=$1`, [image_id]);
  return new Response(String("Artwork removed from list"), {status: 202});
}