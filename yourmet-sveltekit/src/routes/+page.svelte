<script lang="ts">
	import Navbar from '$lib/navbar/Navbar.svelte';
	import UserInfo from '$lib/userinfo/UserInfo.svelte';
	import Gallery from '$lib/gallery/Gallery.svelte';
	import Modal from '$lib/modal/Modal.svelte';
	import '../global.css';
	export let data:any;
	let container:number;
	let modalState:boolean = false;
	interface Artwork {id: number};

	async function reload(){
		const res = await fetch("/api/art", { method: "GET", mode: "cors"});
		const gallery = await res.json();
		gallery.sort((a:Artwork, b:Artwork) => (a.id > b.id ? 1: -1));
		data = {gallery}
	}

	function addContainer() {
    fetch(`/api/art/`, {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    reload();
    reload();
  }

	function openModal(selected:number) {
    modalState = true;
		container = selected;
  }

	function closeModal(){
		reload();
		modalState = false;
	}

</script>

<Navbar />
<UserInfo />
<Gallery gallery={data.gallery} openModal={openModal} reload={reload}/>
<button class="addContainerButton" on:click={addContainer}>Add more art</button>
{#if modalState}
	<Modal closeModal={closeModal} container={container}/>
{/if}