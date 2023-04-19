<script lang="ts">
	import { reload } from "$lib/functions";
	import Navbar from '$lib/navbar/Navbar.svelte';
	import UserInfo from '$lib/userinfo/UserInfo.svelte';
	import Gallery from '$lib/gallery/Gallery.svelte';
	import Modal from '$lib/modal/Modal.svelte';
	import OffCanvas from "$lib/offcanvas/OffCanvas.svelte"
	import Footer from "$lib/footer/Footer.svelte"
	import '../global.css';
	let container:number;
	let modalState:boolean = false;
	let canvasState:boolean = false;

	function addContainer() {
    fetch(`/api/art/`, {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    reload(2);
  }

	function openModal(selected:number) {
    modalState = true;
		container = selected;
  }

	function closeModal(){
    reload(2);
		modalState = false;
	}

	function openCanvas() {
    canvasState = true;
  }

	function closeCanvas(){
		canvasState = false;
	}
</script>

<Navbar {openCanvas}/>
<UserInfo />
<Gallery {openModal} {modalState}/>
<button class="addContainerButton" on:click={addContainer}>Add more art</button>
{#if modalState}
	<Modal {closeModal} {container}/>
{/if}
{#if canvasState}
	<OffCanvas {closeCanvas} />
{/if}
<Footer />