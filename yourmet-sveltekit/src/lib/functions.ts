import { gallery, seen } from "$lib/stores"
interface Artwork {id: number};

export function reload(count:number = 1){
  for (let i = 1; i <= count; i++){
    fetchRequest();
    setTimeout(() => {fetchRequest()}, 100); // if I don't do another fetchRequest, data won't load properly. Hence I devised reload() to fetchRequest() twice. But if I do it without any time separation, again the data won't load properly. Sometimes, I need to do this even more times, hence the for loop... lol
  }
}

async function fetchRequest(){
  const artParsed = await fetch("/api/art", { method: "GET", mode: "cors"}).then(data => data.json())
  const seenParsed = await fetch("/api/seen", { method: "GET", mode: "cors"}).then(data => data.json());
  gallery.set(artParsed.sort((a:Artwork, b:Artwork) => (a.id > b.id ? 1: -1)));
  seen.set(seenParsed.sort((a:Artwork, b:Artwork) => (a.id > b.id ? 1: -1)));
}