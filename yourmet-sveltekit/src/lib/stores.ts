import { writable } from "svelte/store";

// yourmet
export const gallery:any = writable([]);
export const seen:any = writable([]);
export const canvasState:any = writable(false);

// auth0
export const isAuthenticated = writable(false);
export const user:any = writable();
export const popupOpen = writable(false);
export const error = writable();