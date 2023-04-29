<script lang="ts">
	import { reload } from "$lib/functions";
	import { gallery, user, isAuthenticated, canvasState } from "$lib/stores";
	import UserInfo from '$lib/userinfo/UserInfo.svelte';
	import Gallery from '$lib/gallery/Gallery.svelte';
	import Modal from '$lib/modal/Modal.svelte';
	import OffCanvas from "$lib/offcanvas/OffCanvas.svelte"
	import '../global.css';
	let container:number;
	let modalState:boolean = false;
  import { onMount } from "svelte";
  import auth from "$lib/authService";
  let auth0Client:any;
  let checker:number = 1;
  onMount(async () => {
    auth0Client = await auth.createClient();
    isAuthenticated.set(await auth0Client.isAuthenticated());
    user.set(await auth0Client.getUser());
    checker = 2;
  });
  function addContainer() {
    fetch(`/api/art/`, {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: $user.email})
    });
    reload(2, $user.email);
  }

	function openModal(selected:number) {
    modalState = true;
		container = selected;
  }

	function closeModal(){
    reload(2, $user.email);
		modalState = false;
	}

	function closeCanvas(){
		canvasState.set(false);
	}

  function login() {
    auth.loginWithPopup(auth0Client, undefined);
  }
</script>

{#if $user != undefined}
  <div class="main">
    <UserInfo />
    <Gallery {openModal} {modalState}/>
    <button class="addContainerButton" on:click={addContainer}>{#if $gallery.length == 0}Add your first art{:else} Add more art{/if}</button>
    {#if modalState}
      <Modal {closeModal} {container}/>
    {/if}
    {#if $canvasState}
      <OffCanvas {closeCanvas} />
    {/if}
  </div>
{:else}
{#if checker == 2}
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
  .addContainerButton {
    width: 150px;
    height: 70px;
    position: static;
    margin:auto;
    margin-top: 50px;
    margin-bottom: 50px;
    font-weight: 500;
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
  .main{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>