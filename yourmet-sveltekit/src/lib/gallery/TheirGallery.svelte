<script lang="ts">
  import Seen from "../buttons/Seen.svelte";
  import GalleryView from "../buttons/GalleryView.svelte";
	import { userInfo } from "$lib/stores";
  import GridView from "../buttons/GridView.svelte";
	import { reload } from "$lib/functions";
  export let theirGallery:any;
  let selectedMode:string = "grid";
  function selectMode(view:string){
    selectedMode = view;
  }
  let images:any[] = [];
  $: if ($userInfo){
    reload(1, $userInfo.username);
  }
</script>

<div class="modes">
  <GalleryView {selectMode}/>
  <GridView {selectMode}/>
</div>
{#key theirGallery}
<div class="gallery" style="display:{selectedMode}">
  {#if theirGallery.length > 0}
  {#each theirGallery as artwork, i (artwork.id)}
  <div class="wrapper" >
    <div class="container" >
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
            <div class="info">{artwork.artist || "Unknown"}</div>
            <div class="name">{artwork.name || "Untitled"}</div>
            <div class="info">{artwork.year || "Unknown"}</div>
          {/if}
        {/if}
      </div>
      {#if images[i]}
        {#if !images[i].src.includes("/src/lib/gallery/placeholder.jpg")}
          <Seen {artwork} />
        {/if}
      {/if}
    </div>
  </div>
  {/each}
  {/if}
</div>
{/key}

<style>
  .gallery {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    background-color: #f8f8f8;
    border: 1px solid lightgray;
    margin: auto;
    width: 80vw;
    flex-wrap: wrap;
  }

  .modes {
    margin: 50px 0px 15px 5%;
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
    max-width: 600px;
  }
  .info {
    font-size: 15px;
    font-weight: 400;
  }
  .name {
    font-weight: 500;
    font-size: 18px;
    /* font-style: italic; */
    width: 80%;
    margin: auto;
  }


</style>