import { get } from "svelte/store";
import { gallery, seen, user } from "$lib/stores"
interface Artwork {id: number};

export async function load({ fetch }){
  const artParsed = await fetch(`/api/art/${user.email}`, { method: "GET", mode: "cors"}).then(data => data.json())
  const seenParsed = await fetch("/api/seen", { method: "GET", mode: "cors"}).then(data => data.json());
  gallery.set(artParsed)
  seen.set(seenParsed)
}