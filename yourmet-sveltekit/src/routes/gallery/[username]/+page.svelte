<script lang="ts">
	import { reload } from "$lib/functions";
	import { gallery, user, canvasState } from "$lib/stores";
	import UserInfo from '$lib/userinfo/UserInfo.svelte';
	import Gallery from '$lib/gallery/Gallery.svelte';
	import Modal from '$lib/modal/Modal.svelte';
	import OffCanvas from "$lib/offcanvas/OffCanvas.svelte"
	import '../../../global.css';
	let container:number;
	let modalState:boolean = false;

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
{/if}

<style>
  .addContainerButton {
    width: 150px;
    height: 70px;
    position: static;
    margin:auto;
    margin-top: 50px;
    margin-bottom: 50px;
    font-weight: 500;
  }
  .main{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>