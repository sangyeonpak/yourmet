import pool from "$lib/db";

export async function GET() {
  const photos = await pool.query(`SELECT cover_photos FROM admin`);
  console.log(photos);
  return new Response(JSON.stringify(photos.rows));
}