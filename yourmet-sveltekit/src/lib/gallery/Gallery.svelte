<script lang="ts">
	import { gallery } from "$lib/stores"
  import Delete from "../buttons/Delete.svelte";
  import Add from "../buttons/Add.svelte";
  import Seen from "../buttons/Seen.svelte";
  export let openModal:any;
  export let modalState:boolean;
  let images:any[] = []; // this is so that I can refer to each image so I can check if the picture is a placeholder or not
  $: modalState, () => {images = images}; // need this weird function to correctly have the images array function as intended
</script>

{#key $gallery}
<div class="gallery" >
  {#if $gallery.length > 0}
  {#each $gallery as artwork, i (artwork.id)}
  <div class="wrapper" >
    <div>{artwork.id}</div>
    <div class="container">
      <Delete container={artwork.id}/>
      <div class="imageWrapper">
        <a href={artwork.info_url} target="_blank" rel="noreferrer">
          <img
            src={artwork.image_url !== null ? artwork.image_url : "/src/lib/gallery/placeholder.jpg"}
            alt="Currently unavailable for view on YourMet. Click here to view the art on our main website."
            class="image"
            bind:this = {images[i]}
          />
        </a>
      </div>
      <div class="infoWrapper">
        {#if images[i]}
          {#if !images[i].src.includes("/src/lib/gallery/placeholder.jpg")}
            <div class="info">{#if artwork.artist}{artwork.artist}{:else}Unknown{/if}</div>
            <div class="name">{#if artwork.name}{artwork.name}{:else}Untitled{/if}</div>
            <div class="info">{#if artwork.year}{artwork.year}{:else}Unknown{/if}</div>
          {/if}
        {/if}
      </div>
      <Add {openModal} container={artwork.id}/>
      {#if images[i]}
        {#if !images[i].src.includes("/src/lib/gallery/placeholder.jpg")}
          <Seen {artwork} />
        {/if}
      {/if}
    </div>
  </div>
  {/each}
  {:else}
  <div class="instructions">
  Use the add more art button
  </div>
  {/if}
</div>
{/key}

<style>
  .gallery {
    display: flex;
    background-color: #f8f8f8;
    border: 1px solid lightgray;
    margin: auto;
    margin-top: 100px;
    max-width: 90vw;
    flex-wrap: wrap;
  }

  .instructions {
    margin: auto;
    padding: 50px;
    font-size: 28px;
  }

  .wrapper {
    transform: scale(0.9);
    margin: auto;
    /* outline: 1px solid black; */
  }

  .infoWrapper {
    min-height: 61px;
  }
  .container {
    position: relative;
    text-align: center;
    background-color: rgb(252, 252, 252);
    border: 1px solid lightgray;
    padding: 5px;
    margin: 10px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.7);
  }
  .info {
  font-weight: 300;
  }
  .name {
  font-weight: 500;
  font-size: 19px;
  font-style: italic;
  width: 80%;
  margin: auto;
  }
</style>