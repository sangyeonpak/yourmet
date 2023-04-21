import { writable, derived } from "svelte/store";

// yourmet
export const gallery:any = writable([]);
export const seen:any = writable([]);

// auth0
export const isAuthenticated = writable(false);
export const user:any = writable({});
export const popupOpen = writable(false);
export const error = writable();