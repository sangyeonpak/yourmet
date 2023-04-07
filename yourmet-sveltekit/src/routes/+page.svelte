<script lang="ts">
	import Navbar from '$lib/navbar/Navbar.svelte';
	import UserInfo from '$lib/userinfo/UserInfo.svelte';
	import Gallery from '$lib/gallery/Gallery.svelte';
	import Modal from '$lib/modal/Modal.svelte';
	import '../global.css';
	// const [gallery, setGallery] = useState([]);
	// const [modalState, showModal] = useState(false);
	// const [offCanvasState, showCanvas] = useState(false);
	// const [buttonID, setButtonID] = useState("");
	// const [fetchSwitch, toggleFetchSwitch] = useState(false);
	// const [seen, setSeen] = useState([]);

	let modalState:boolean = false;
	function openModal() {
    modalState = true;
  }
	function closeModal(){
		modalState = false;
	}
	export let data:any;
</script>


<Navbar />
<UserInfo />
<Gallery gallery={data.gallery} openModal={openModal}/>
{#if modalState}
	<Modal closeModal={closeModal}/>
{/if}