interface Artwork {
  id: number;
}

export async function load({ fetch }){
  // console.log(fetch);
  const res = await fetch("/api/art", { method: "GET", mode: "cors"});
  const data = await res.json();
  if (res.ok){
    const gallery:any[] = data.sort((a:Artwork, b:Artwork) => (a.id > b.id ? 1: -1));
    return { gallery };
  }
  return {
    status: 301,
    redirect: "/"
  };
}