import pool from "$lib/db";

export async function POST({request}) {
  const { email, given_name, family_name, picture } = await request.json();
  let username = email.split('@')[0];
  const usernameChecker = await pool.query('SELECT username FROM users WHERE username=$1', [username]);
  if (usernameChecker.rows.length == 0){
    const result = await pool.query(`INSERT INTO users (email, first_name, last_name, picture, username) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [email, given_name, family_name, picture, username]);
    const newUser = JSON.stringify(result.rows[0]);
    return new Response(newUser, {status: 201});
  } else {
    username = username + "1";
    const result = await pool.query(`INSERT INTO users (email, first_name, last_name, picture, username) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [email, given_name, family_name, picture, username]);
    const newUser = JSON.stringify(result.rows[0]);
    return new Response(newUser, {status: 201});
  }
}

export async function DELETE({ request }) {
  const { email } = await request.json();
  pool.query(`DELETE FROM users WHERE email=$1`, [email]);
  return new Response(String("User removed"), {status: 202});
}

export async function PATCH({ request }){
  const { first_name, last_name, picture, view_mode, cover_photo, favorite_artist, favorite_artwork, favorite_period, email, username, newUsername } = await request.json();
  if (cover_photo) {
    const result = await pool.query("UPDATE users SET cover_photo=$1 WHERE username=$2 RETURNING *", [cover_photo, username])
    const editedProfile = JSON.stringify(result.rows[0])
    return new Response(editedProfile, {status: 200});
  }
  if (view_mode) {
    const result = await pool.query("UPDATE users SET view_mode=$1 WHERE username=$2 RETURNING *", [view_mode, username])
    const editedProfile = JSON.stringify(result.rows[0])
    return new Response(editedProfile, {status: 200});
  }

}