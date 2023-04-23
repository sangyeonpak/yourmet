import { gallery, seen, user } from "$lib/stores"
interface Artwork {id: number};

export async function load({ fetch }){
  console.log("ts", user);
  const artParsed = await fetch("/api/art", { method: "GET", mode: "cors"}).then(data => data.json());
  // const artParsed = await artRes.json();
  const seenParsed = await fetch("api/seen", { method: "GET", mode: "cors"}).then(data => data.json());
  gallery.set(artParsed.sort((a:Artwork, b:Artwork) => (a.id > b.id ? 1: -1)));
  seen.set(seenParsed.sort((a:Artwork, b:Artwork) => (a.id > b.id ? 1: -1)));
}