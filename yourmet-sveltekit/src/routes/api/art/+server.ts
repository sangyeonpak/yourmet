import pool from "../../../lib/db";

import { error } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const artworks = await pool.query(`SELECT * FROM display`);
	// console.log(artworks);
  return new Response(JSON.stringify(artworks.rows));
}

export async function POST({ request }) {
  console.log((JSON.stringify(request.origin)));
  // console.log(Object.keys(request));

  return new Response(JSON.stringify(request.body));
}