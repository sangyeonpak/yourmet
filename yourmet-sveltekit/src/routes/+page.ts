interface Artwork {id: number};

export async function load({ fetch }){
  // console.log(fetch);
  const res = await fetch("/api/art", { method: "GET", mode: "cors"});
  const display = await res.json();
  const another = await fetch("api/seen", { method: "GET", mode: "cors"});
  const list = await another.json();
  if (res.ok){
    const gallery:any[] = display.sort((a:Artwork, b:Artwork) => (a.id > b.id ? 1: -1));
    const seen:any[] = list.sort((a:Artwork, b:Artwork) => (a.id > b.id ? 1: -1));
    return { gallery, seen };
  }
  return {
    status: 301,
    redirect: "/"
  };
}