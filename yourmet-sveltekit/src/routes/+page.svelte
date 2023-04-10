<script lang="ts">
	import Navbar from '$lib/navbar/Navbar.svelte';
	import UserInfo from '$lib/userinfo/UserInfo.svelte';
	import Gallery from '$lib/gallery/Gallery.svelte';
	import Modal from '$lib/modal/Modal.svelte';
	import OffCanvas from "$lib/offcanvas/OffCanvas.svelte"
	import Footer from "$lib/footer/Footer.svelte"
	import '../global.css';
	export let data:any;
	let container:number;
	let rebuilder:number = 0;
	let modalState:boolean = false;
	let canvasState:boolean = false;
	interface Artwork {id: number};
	$: galleryLength = data.gallery.filter((container:any) => container.image_id !== null).length

	async function reload(){
		const res = await fetch("/api/art", { method: "GET", mode: "cors"});
		const another = await fetch("/api/seen", { method: "GET", mode: "cors"});
		const gallery = await res.json();
		const seen = await another.json();
		// console.log(seen);
		gallery.sort((a:Artwork, b:Artwork) => (a.id > b.id ? 1: -1));
		seen.sort((a:Artwork, b:Artwork) => (a.id > b.id ? 1: -1));
		data = {gallery, seen}
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
		setTimeout(() => {reload()}, 100);
		rebuilder++;
  }

	function openModal(selected:number) {
    modalState = true;
		rebuilder++;
		container = selected;
  }

	function closeModal(){
    reload();
		setTimeout(() => {reload()}, 50);
		rebuilder++;
		modalState = false;
	}

	function openCanvas() {
    canvasState = true;
  }

	function closeCanvas(){
    reload();
		setTimeout(() => {reload()}, 50);
		canvasState = false;
	}
</script>

<Navbar openCanvas={openCanvas}/>
<UserInfo gallery={galleryLength} seen={data.seen.length}/>
{#key rebuilder}
<Gallery gallery={data.gallery} seen={data.seen} openModal={openModal} reload={reload} modalState={modalState}/>
{/key}
<button class="addContainerButton" on:click={addContainer}>Add more art</button>
{#if modalState}
	<Modal seen={data.seen} closeModal={closeModal} container={container} reload={reload}/>
{/if}
{#if canvasState}
	<OffCanvas gallery={data.gallery} seen={data.seen} closeCanvas={closeCanvas} />
{/if}
<Footer />