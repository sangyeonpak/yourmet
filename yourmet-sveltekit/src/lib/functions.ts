import { gallery, seen } from "$lib/stores"
interface Artwork {id: number};

export function reload(count:number = 1, email:string){
  for (let i = 1; i <= count; i++){
    fetchRequest(email);
    setTimeout(() => {fetchRequest(email)}, 100); // if I don't do another fetchRequest, data won't load properly. Hence I devised reload() to fetchRequest() twice. But if I do it without any time separation, again the data won't load properly. Sometimes, I need to do this even more times, hence the for loop... lol
  }
}

export async function fetchRequest(email:string){
  const artParsed = await fetch(`/api/art/${email}`, { method: "GET", mode: "cors"}).then(data => data.json())
  const seenParsed = await fetch("/api/seen", { method: "GET", mode: "cors"}).then(data => data.json());
  gallery.set(artParsed)
  seen.set(seenParsed)
}