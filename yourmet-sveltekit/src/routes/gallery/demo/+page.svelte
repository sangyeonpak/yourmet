<script lang="ts">
	import DemoUserInfo from '$lib/userinfo/DemoUserInfo.svelte';
	import DemoGallery from '$lib/gallery/DemoGallery.svelte';
	import Modal from '$lib/modal/Modal.svelte';
	import '../../../global.css';
	let container:number;
	let modalState:boolean = false;
  let gallery:any[] = [];
  let index = 1;
  // instead of using the gallery component, i created a separate demogallery component because instead of rendering the demogallery instead of the actual gallery within the gallery component by checking to see if $userInfo is defined, so that i don't show anything otherwise. also i created demo everything because of type errors for not receiving the prop
  function addContainer() {
    gallery.push({
      id: index,
      image_id: null,
      image_url: null,
      info_url: null,
      name: null,
      artist: null,
      year:null,
      seen: false
    })
    gallery = gallery;
    index++;
  }

  function galleryIsGallery(){
    gallery = gallery;
  }

	function openModal(selected:number) {
    modalState = true;
		container = selected;
  }

	function closeModal(){
		modalState = false;
    gallery = gallery;
    setTimeout(() => gallery = gallery, 50);
	}

</script>

<title>Your Gallery (Demo) - YourMet</title>
<div class="main">
  <DemoUserInfo {gallery}/>
  <DemoGallery {openModal} {modalState} {gallery} {galleryIsGallery}/>
  <button class="addContainerButton" on:click={addContainer}>{#if gallery.length == 0}Add your first art{:else} Add more art{/if}</button>
  {#if modalState}
    <Modal {closeModal} {container} {gallery}/>
  {/if}
</div>

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