import { createAuth0Client } from "@auth0/auth0-spa-js";
import { get } from 'svelte/store';
import { user, isAuthenticated, popupOpen } from "$lib/stores";
import config from "./auth_config";

async function createClient() {
  // console.log(get(isAuthenticated));
  let auth0Client = await createAuth0Client({
    domain: config.domain,
    clientId: config.clientId
  });

  return auth0Client;
}

async function loginWithPopup(client:any, options:any) {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);
    user.set(await client.getUser());
    console.log(get(user));
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client:any) {
  return client.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout
};

export default auth;