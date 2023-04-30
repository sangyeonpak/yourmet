import { gallery, seen, user, userInfo } from "$lib/stores"
import { get } from 'svelte/store';

let limiter = 1;
export function reload(count:number = 1, username:string){
  for (let i = 1; i <= count; i++){
    fetchRequest(username);
    setTimeout(() => {fetchRequest(username)}, 100); // if I don't do another fetchRequest, data won't load properly. Hence I devised reload() to fetchRequest() twice. But if I do it without any time separation, again the data won't load properly. Sometimes, I need to do this even more times, hence the for loop... lol
  }
}

export async function fetchRequest(username:string){
  const artParsed = await fetch(`/api/art/${username}`, { method: "GET"}).then(data => data.json());
  const seenParsed = await fetch(`/api/seen/${username}`, { method: "GET"}).then(data => data.json());
  gallery.set(artParsed)
  seen.set(seenParsed)
}

export async function checkUser(email:string){
  fetchUser(email);
  setTimeout(() => fetchUser(email), 100)
}
export async function fetchUser(email:string){
  const checked = await fetch(`/api/users/${email}`, { method: "GET"}).then(data => data.json());
  if (checked.length == 0){
    console.log('adding a new user')
    const added = await fetch(`/api/users/`, {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(get(user))
    }).then((data) => data.json());
    userInfo.set(added);
    return added;
  } else {
    userInfo.set(checked[0]);
    return checked[0]
  }
}