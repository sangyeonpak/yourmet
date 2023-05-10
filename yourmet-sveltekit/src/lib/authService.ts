import { createAuth0Client } from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "$lib/stores";
import { goto } from '$app/navigation';
import config from "./auth_config";

async function createClient() {
  // console.log(get(isAuthenticated));
  let auth0Client = await createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
    useRefreshTokens: true,
    cacheLocation: 'localstorage'
  });

  return auth0Client;
}

async function loginWithPopup(client:any, options:any) {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);
    user.set(await client.getUser());
    isAuthenticated.set(true);
    goto("/")
  } catch (e) {
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