<script lang="ts">
	import { reload } from "$lib/functions";
	import { gallery, user, userInfo } from "$lib/stores";
	import UserInfo from '$lib/userinfo/UserInfo.svelte';
	import Gallery from '$lib/gallery/Gallery.svelte';
	import Modal from '$lib/modal/Modal.svelte';
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
      body: JSON.stringify({email: $user.email, username:$userInfo.username})
    });
    reload(2, $userInfo.username);
  }

	function openModal(selected:number) {
    modalState = true;
		container = selected;
  }

	function closeModal(){
    reload(2, $userInfo.username);
		modalState = false;
	}

</script>

{#if $user != undefined}
<title>Your Gallery - YourMet</title>
  <div class="main">
    <UserInfo />
    <Gallery {openModal} {modalState}/>
    <button class="addContainerButton" on:click={addContainer}>{#if $gallery.length == 0}Add your first art{:else} Add more art{/if}</button>
    {#if modalState}
      <Modal {closeModal} {container} {gallery}/> <!-- the gallery here doesn't really do anything; it's just to avoid prop not received error-->
    {/if}
  </div>
  {:else}
  Please log in
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