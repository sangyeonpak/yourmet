<script lang="ts">
	import '../global.css';
	import { fetchUser } from "$lib/functions";
	import { user, isAuthenticated } from "$lib/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import auth from "$lib/authService";
  let auth0Client:any;
  onMount(async () => {
    auth0Client = await auth.createClient();
    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
  });
  $: if ($user) {
    fetchUser($user.email).then(data => {
      goto(`/gallery/${data.username}`);
    });
  }

  function login() {
    auth.loginWithPopup(auth0Client, undefined);
  }
</script>

{#if $user == undefined}
  <div class="outerWrapper">
    <div class="wrapper">
      <div class="login">
        <div class="welcome">
          Welcome to YourMet
        </div>
        <div class="optionsWrapper">
          <div class="options" on:click={login}>
            Login using Auth0
          </div>
          <div class="options">
            No-login Demo
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .outerWrapper {
    display: flex;
    justify-content: center;
    background-image: url(https://rare-gallery.com/mocahbig/441945-ultrawide-Vincent-van-Gogh-painting-impressionism.jpg);
		background-size: cover;
  }
  .wrapper {
    height: calc(100vh - 261px);
    display: flex;
    justify-content: center;
  }
  .login {
    margin: auto;
    border: 2px solid white;
    padding: 50px;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.3)
  }
  .options {
    border: 2px solid white;
    border-radius: 50px;
    color: white;
    padding: 18px;
    font-weight: 500;
    cursor: pointer;
    transition: .2s;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    width: 150px;
    text-align: center;
  }
  .options:hover{
    background-color: white;
    color: black;
  }

  .welcome{
    text-align: center;
    color: white;
    /* font-family: 'Playfair Display', serif; */
    font-family: 'DM Serif Display', serif;
    /* font-weight: 100; */
    font-size: 48px;
    margin-bottom: 50px;
  }
  .optionsWrapper{
    display: flex;
    justify-content: space-evenly;
  }
</style>