import pool from "$lib/db";

export async function GET({ request }) {
  const email = request.url.split("/api/users/")
  const check = await pool.query(`SELECT * FROM users WHERE email=$1`, [email[1]]);
  return new Response(JSON.stringify(check.rows));
}