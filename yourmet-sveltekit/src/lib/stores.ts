import { readable, writable } from 'svelte/store';

// yourmet
export const gallery: any = writable([]);
export const seen: any = writable([]);
export const userInfo: any = writable();
export const mouseState: any = writable({
  art: false,
  exhibition: false,
  learn: false,
  research: false,
  visit: false,
  yourMet: false
})
export const art:any  = writable(false);
export const exhibition:any  = writable(false);
export const learn:any  = writable(false);
export const research:any  = writable(false);
export const visit:any  = writable(false);
export const yourMet:any  = writable(false);

// auth0
export const isAuthenticated = writable(false);
export const user: any = writable();
export const popupOpen = writable(false);
export const error = writable();
