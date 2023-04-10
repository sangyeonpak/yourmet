<script lang="ts">
  import { onMount } from 'svelte';
  // import { fade } from "svelte/transition";
  // import SeenResults from "$lib/buttons/SeenResults.svelte";
  export let seen:any;
  export let closeModal:any;
  export let id:number;
  export let searched:boolean;
  export let container:number;
  export let reload:any;
  let info:any = {};
  let body:any = {};
  let isItSeen:boolean = false;
	// export let testdata = writable(body)
  async function gatherInfo(id:number) {
    let data = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    info = await data.json();
    body = {
      id: container,
      image_id: info.objectID,
      image_url: info.primaryImageSmall,
      info_url: info.objectURL,
      name: info.title,
      artist: info.artistDisplayName,
      born: info.artistBeginDate,
      death: info.artistEndDate,
      year: info.objectDate,
      wing: info.department
    }
    for (let toFind of seen){
    // console.log(toFind);
      if (toFind.image_id == body.image_id){
        // console.log(toFind.image_id, body.image_id);
        isItSeen = true;
      }
    }
  }
  onMount(async () => {
    await gatherInfo(id);
    // console.log(isItSeen);
  });

  function addToGallery(container:number) {
    fetch(`/api/art/${container}`, {
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    closeModal();
  }

  function markSeen() {
    fetch(`/api/seen/`, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    reload();
		setTimeout(() => {reload()}, 100);
    isItSeen = !isItSeen;
  }

  function undoSeen() {
    fetch(`/api/seen/${body.id}`, {
      mode: "cors",
      method: "DELETE",
      body: JSON.stringify( body.image_id ),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    reload();
		setTimeout(() => {reload()}, 100);
    isItSeen = !isItSeen;
  }
</script>

{#await gatherInfo}
<h1> NOOB </h1>
{:then info}
<div class="wrapper">
  <div class="container">
    <div class="imageWrapper">
      <a href={body.info_url} target="_blank" rel="noreferrer">
        <img
          src={body.image_url}
          alt="Currently unavailable for view on YourMet. Click here to view the art on our main website."
          class="image"
        />
      </a>
    </div>
  </div>
  <div class="info">
    <p class="text">
      {#if body.artist}
        {body.artist}
          {#if body.born != null && body.born != 0 && body.death != null && body.born != null}
            {#if body.death == 9999}
            ({body.born})
            {:else}
            ({body.born}-{body.death})
            {/if}
          {/if}
        {:else}
        Unknown artist
      {/if}
    </p>
    <p class="name">{#if body.name}{body.name}{:else}Untitled{/if}</p>
    <p class="text">{#if body.year}{body.year}{:else}Date unknown{/if}</p>
    <p class="text">{#if body.wing}{body.wing}{:else}Currently not at the Met{/if}</p>
    <div class="resultButtonsDiv">
      {#if !isItSeen}
      <button class="markSeenButtonResults" on:click={markSeen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
        </svg>
      </button>
      {:else}
        <button class="markUnseenResults" on:click={undoSeen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
          </svg>
        </button>
      {/if}
      <button class="addToGalleryButton" on:click={() => addToGallery(container)}>+</button>
    </div>
  </div>
</div>
{/await}

<style>
  .container {
    width: 600px;
  }
  .wrapper {
    display: flex;
    outline: 1px solid lightgray;
    padding: 5px;
  }

  .info {
    width: 100%;
    text-align: left;
    padding-left: 30px;
    font-weight: 400;
  }
  .text {
    font-size: 18px;
    font-weight: 100;
  }
  .name {
    font-size: 30px;
    font-style: italic;
    font-weight: 100;
  }
</style>