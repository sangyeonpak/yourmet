export async function load({ fetch, params }) {
  const theirInfo = await fetch(`/api/users/visitor/${params.username}`).then(data => data.json())
  const unfilteredGallery = await fetch(`/api/art/${params.username}`).then(data => data.json());
  const theirGallery = unfilteredGallery.filter((item:any) => item.info_url !== null);
  const theirSeen = await fetch(`/api/seen/${params.username}`).then(data => data.json())
  return {
    theirInfo,
    theirGallery,
    theirSeen
  }
}