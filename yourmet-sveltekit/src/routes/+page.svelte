<script lang="ts">
	import { reload } from "$lib/functions";
	import { user, canvasState } from "$lib/stores";
	import UserInfo from '$lib/userinfo/UserInfo.svelte';
	import Gallery from '$lib/gallery/Gallery.svelte';
	import Modal from '$lib/modal/Modal.svelte';
	import OffCanvas from "$lib/offcanvas/OffCanvas.svelte"
	import Footer from "$lib/footer/Footer.svelte"
	import '../global.css';
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
  <UserInfo />
  <Gallery {openModal} {modalState}/>
  <button class="addContainerButton" on:click={addContainer}>Add more art</button>
  {#if modalState}
    <Modal {closeModal} {container}/>
  {/if}
  {#if $canvasState}
    <OffCanvas {closeCanvas} />
  {/if}
{:else}
  Login
{/if}

<Footer />