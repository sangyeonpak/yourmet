import pool from "$lib/db";

export async function POST({request}) {
  const { email, given_name, family_name, picture } = await request.json();
  const result = await pool.query(`INSERT INTO users (email, first_name, last_name, picture) VALUES ($1, $2, $3, $4) RETURNING *`, [email, given_name, family_name, picture]);
  const newUser = JSON.stringify(result.rows[0]);
  return new Response(newUser, {status: 201});
}

export async function DELETE({ request }) {
  const { email } = await request.json();
  pool.query(`DELETE FROM users WHERE email=$1`, [email]);
  return new Response(String("User removed"), {status: 202});
}

export async function PATCH({ request }){
  const { first_name, last_name, picture, view_mode, cover_photo, favorite_artist, favorite_artwork, favorite_period, email } = await request.json();
  if (cover_photo) {
    const result = await pool.query("UPDATE users SET cover_photo=$1 WHERE email=$2 RETURNING *", [cover_photo, email])
    const editedProfile = JSON.stringify(result.rows[0])
    return new Response(editedProfile, {status: 200});
  }
  if (view_mode) {
    const result = await pool.query("UPDATE users SET view_mode=$1 WHERE email=$2 RETURNING *", [view_mode, email])
    const editedProfile = JSON.stringify(result.rows[0])
    return new Response(editedProfile, {status: 200});
  }

}