<script lang="ts">
  import Seen from "../buttons/Seen.svelte";
  import placeholder from "./placeholder.jpg"
	import MediaQuery from '$lib/MediaQuery.svelte';
  import GalleryView from "../buttons/GalleryView.svelte";
	import { userInfo } from "$lib/stores";
  import GridView from "../buttons/GridView.svelte";
	import { reload } from "$lib/functions";
  export let theirGallery:any;
  export let theirInfo:any;
  import { page } from '$app/stores';
  import Share from "../buttons/Share.svelte";
	import TheirInfo from "$lib/userinfo/TheirInfo.svelte";
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
<div class="gallery" style="display:{selectedMode}">
  {#if theirGallery.length > 0}
  {#each theirGallery as artwork, i (artwork.id)}
    <div class="container" >
      <div class="actions">
        <Seen {artwork} />
      </div>
      <div class="imageWrapper">
        <a href={artwork.info_url} target="_blank" rel="noreferrer">
          <img
            src={artwork.image_url !== null ? artwork.image_url : placeholder}
            alt="Currently unavailable for view on YourMet. Click here to view the art on our main website."
            class="image"
            bind:this = {images[i]}
          />
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
    width: 80vw;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    grid-auto-rows: min-content;
    margin-bottom: 100px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
    width: 90%;
    margin-bottom: 1.2rem
  }
  .buttons {
    margin: 50px 0px 15px 10%;
  }

  .infoWrapper {
    margin-bottom: 1.2rem;
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
  }
  .actions{
    width: 100%;
    display: flex;
    justify-content: start;
  }
  .info {
    font-size: 0.9rem;
    font-weight: 400;
  }
  .image{
    max-height: 500px;
  }

</style>