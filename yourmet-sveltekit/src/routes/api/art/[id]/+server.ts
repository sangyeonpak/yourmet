import pool from "../../../../lib/db";

export async function PATCH({ request }) {
  const {id, image_url, info_url, name, artist, year} = await request.json();
  console.log({id, image_url, info_url, name, artist, year})
  // sql`UPDATE display SET ${sql(req.body, 'image_id', 'image_url', 'info_url', 'name', 'artist', 'year')} WHERE id=${buttonID}`
  const artwork = await pool.query(`UPDATE display SET image_url=$2, info_url=$3, name=$4, artist=$5, year=$6 WHERE id=$1 RETURNING *`,
  [
    id, image_url, info_url, name, artist, year
  ])
  // console.log(artwork.rows[0]);
  return new Response(JSON.stringify(artwork.rows[0]));
}

export async function DELETE({ request }) {
  const { id } = await request.json();
  const deleted = await pool.query(`DELETE FROM display WHERE id=$1 RETURNING *`, [id]);
  return new Response(JSON.stringify(deleted.command), {status: 202});
}