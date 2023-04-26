import pool from "$lib/db";

export async function POST({ request }) {
  const { email } = await request.json();
  pool.query(`INSERT INTO display (email, image_id, image_url, info_url, name, artist, year) VALUES ($1, null, null, null, null, null, null)`, [email]);
  return new Response(String("New container created"), {status: 201});
}

export async function PATCH({ request }) {
  const {image_id, image_url, info_url, name, artist, year, id} = await request.json();
  // console.log({id, image_url, info_url, name, artist, year})
  // sql`UPDATE display SET ${sql(req.body, 'image_id', 'image_url', 'info_url', 'name', 'artist', 'year')} WHERE id=${buttonID}`
  const artwork = await pool.query(`UPDATE display SET image_id=$1, image_url=$2, info_url=$3, name=$4, artist=$5, year=$6 WHERE id=$7`,
  [
    image_id, image_url, info_url, name, artist, year, id
  ])
  return new Response(JSON.stringify(artwork.command), {status: 200});
}

export async function DELETE({ request }) {
  const { id } = await request.json();
  console.log(id);
  const deleted = await pool.query(`DELETE FROM display WHERE id=$1`, [id]);
  return new Response(JSON.stringify(deleted.command), {status: 202});
}