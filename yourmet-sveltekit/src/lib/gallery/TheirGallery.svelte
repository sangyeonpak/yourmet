<script lang="ts">
  import Seen from "../buttons/Seen.svelte";
	import MediaQuery from '$lib/MediaQuery.svelte';
  import GalleryView from "../buttons/GalleryView.svelte";
	import { userInfo } from "$lib/stores";
  import { fly } from 'svelte/transition';
  import GridView from "../buttons/GridView.svelte";
	import { reload } from "$lib/functions";
  export let theirGallery:any;
  import { page } from '$app/stores';
  import Share from "../buttons/Share.svelte";
  let selectedMode:string = "grid";
  let showTooltip:boolean = false;
  function selectMode(view:string){
    selectedMode = view;
  }
  let images:any[] = [];
  $: if ($userInfo){
    reload(1, $userInfo.username);
  }

  let text = $page.url.href;
  function share() {
  navigator.clipboard.writeText(text).then(function() {
      showTooltip = true;
      setTimeout(()=>showTooltip = false, 3000)
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
</script>

{#if showTooltip}
  <div class="tooltip" in:fly="{{ y: -220, duration: 750 }}" out:fly="{{ y: -220, duration: 750 }}">
    <div style="margin-left:-10px;">Copied this gallery's link to your clipboard: <span style="margin-left:10px;">{text}</span></div>
    <button class="closeTip" on:click={()=>showTooltip=false}>
      X
    </button>
  </div>
{/if}
<MediaQuery query="(min-width: 600px)" let:matches>
<div class="buttons">
  {#if matches}
    <GalleryView {selectMode}/>
    <GridView {selectMode}/>
  {/if}
  <Share {share}/>
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
</MediaQuery>


<style>
  .tooltip {
    position: fixed;
    display:flex;
    flex-direction: column;
    justify-content: center;
    top: 0;
    height:94px;
    background-color: white;
    width: 100%;
    text-align: center;
    font-size: 20px;
  }
  .closeTip {
    width: 30px;
    height: 30px;
    position: fixed;
    right: 10px;
    top: 10px;
    background-color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
  }
  .gallery {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    background-color: #f8f8f8;
    border: 1px solid lightgray;
    margin: auto;
    width: 80vw;
    flex-wrap: wrap;
  }
  @media (max-width: 1200px) {
    .gallery {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (max-width: 900px) {
    .gallery {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (max-width: 600px) {
    .gallery {
      grid-template-columns: 1fr;
    }
  }
  .imageWrapper{
    /* max-height: 500px; */
  }
  .buttons {
    margin: 50px 0px 15px 10%;
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
    /* height: 500px; */
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
  .image{
    object-fit: contain;
  }


</style>