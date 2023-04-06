import pool from "../../../../lib/db";

export async function PATCH({ request }) {
  const {id, image_id, image_url, info_url, name, artist, year} = await request.json();
  // sql`UPDATE display SET ${sql(req.body, 'image_id', 'image_url', 'info_url', 'name', 'artist', 'year')} WHERE id=${buttonID}`
  const artwork = await pool.query(`UPDATE display SET image_id=$2, image_url=$3, info_url=$4, name=$5, artist=$6, year=$7 WHERE id=$1 RETURNING *`,
  [
    id, image_id, image_url, info_url, name, artist, year
  ])
  // console.log(artwork.rows[0]);
  return new Response(JSON.stringify(artwork.rows[0]));
}

export async function DELETE({ request }) {
  const { id } = await request.json();
  const deleted = await pool.query(`DELETE FROM display WHERE id=$1`, [id]);
  return new Response(JSON.stringify(deleted.command), {status: 202});
}