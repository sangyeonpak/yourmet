import pool from "$lib/db";

export async function GET({ request }) {
  const email = request.url.split("/api/seen/")
  const seen = await pool.query(`SELECT * FROM seen WHERE email=$1 ORDER BY id ASC`, [email[1]]);
  return new Response(JSON.stringify(seen.rows));
}