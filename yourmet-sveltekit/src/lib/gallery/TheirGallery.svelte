<script lang="ts">
  import Seen from "../buttons/Seen.svelte";
  import placeholder from "./placeholder.jpg"
	import MediaQuery from '$lib/MediaQuery.svelte';
  import GalleryView from "../buttons/GalleryView.svelte";
	import { userInfo } from "$lib/stores";
  import unavailable from "../modal/placeholder.jpg"

  import GridView from "../buttons/GridView.svelte";
	import { reload } from "$lib/functions";
  export let theirGallery:any;
  import { page } from '$app/stores';
  import Share from "../buttons/Share.svelte";
	import TheirInfo from "$lib/userinfo/TheirInfo.svelte";
  let selectedMode:string = "grid";
  let showTooltip:boolean = false;
  let width:any = "370px"
  function selectMode(view:string, size:string){
    width = size;
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
  // function isADemo(artwork:any){
  //   artwork.seen = true;
  //   gallery = gallery;
  //   setTimeout(() => {
  //     artwork.seen = false;
  //     gallery=gallery;
  //   }, 3000)
  // }
</script>


<MediaQuery query="(min-width: 600px)" let:matches>
  <div class="buttons">
  {#if matches}
    <GalleryView {selectMode}/>
    <GridView {selectMode}/>
  {/if}
  <Share {share}/>
  {#if showTooltip}
    <div class="tooltip">
      Copied your visitor's link to your clipboard:
      <br>
      <span class="shareLink">{text}</span>
    </div>
  {/if}
</div>
{#key theirGallery}
<div class="gallery" style={matches ? `display:${selectedMode}` : "display:grid"}>
  {#if theirGallery.length > 0}
  {#each theirGallery as artwork, i (artwork.id)}
    <div class="container" style={matches ? `width: ${width}` : `width: auto`}>
      <div class="actions">
        {#if $userInfo}
        <Seen {artwork}/>
        {/if}
      </div>
      <div class="imageWrapper">
        <a href={artwork.info_url} target="_blank" rel="noreferrer">
          {#if artwork.info_url}
          <img
            src={artwork.image_url !== null ? artwork.image_url : unavailable}
            alt="Unavailable."
            class="image"
            bind:this = {images[i]}
          />
          {:else}
          <img
            src={placeholder}
            alt="Unavailable."
            class="image"
            bind:this = {images[i]}
          />
          {/if}
        </a>
      </div>
      <div class="infoWrapper">
        {#if images[i]}
          {#if !images[i].src.includes(placeholder)}
            <div class="name">{artwork.name || "Untitled"}</div>
            <div class="info">{artwork.artist || "Unknown"}, {artwork.year || "Unknown"}</div>
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

  .gallery {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 0.5rem;
    width: auto;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    grid-auto-rows: min-content;
    padding: 5px;
    margin-bottom: 100px;
  }
  @media (max-width: 1600px) {
    .gallery {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (max-width: 1200px) {
    .gallery {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 800px) {
    .gallery {
      width: auto;
      grid-template-columns: 1fr;
    }
    .container {
      width: auto;
    }
  }
  .imageWrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
    width: 90%;
  }
  .buttons {
    margin: 50px 0px 15px 10%;
  }

  .infoWrapper {
    margin: 1.2rem 0 1.2rem 0;
    height: 15%;
  }
  .container {
    position: relative;
    text-align: center;
    background-color: rgb(252, 252, 252);
    border: 1px solid lightgray;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
    max-width: 500px;
  }
  .actions{
    width: 100%;
    display: flex;
    justify-content: start;
    margin-bottom: 5px;
  }
  .info {
    font-size: 0.9rem;
    font-weight: 400;
  }
  .image{
    max-height: 300px;
    width: auto;
    height: auto;
    object-fit: scale-down;
  }
  @media (max-width: 800px) {
    .image{
      width: 100%;
    }
  }
</style>