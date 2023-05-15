<script lang="ts">
	import { userInfo, gallery } from "$lib/stores"
  import placeholder from "./placeholder.jpg"
  import { page } from '$app/stores';
  import Delete from "../buttons/Delete.svelte";
  import Actions from "../buttons/Actions.svelte";
  import Add from "../buttons/Add.svelte";
  import Seen from "../buttons/Seen.svelte";
  import GalleryView from "../buttons/GalleryView.svelte";
  import GridView from "../buttons/GridView.svelte";
  import Share from "../buttons/Share.svelte";
  export let openModal:any;
  export let modalState:boolean;
  let selectedMode:string = "grid"
  let width:any = "370px"
	import MediaQuery from '$lib/MediaQuery.svelte';
  let text:string;
  $: if ($userInfo) {
    selectedMode = $userInfo.view_mode;
    if (selectedMode = "flex"){
      width = "auto";
    }
    text = $page.url.href.replace('/gallery/curate', `/gallery/visitor/${$userInfo.username}`);
  }
  let showTooltip:boolean = false;
  function selectMode(view:string, size:string){
    selectedMode = view;
    width = size;
    fetch(`/api/users/`, {
      mode: "cors",
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({view_mode: view, username: $userInfo.username})
    });
  }
  function share() {
  navigator.clipboard.writeText(text).then(function() {
      showTooltip = true;
      setTimeout(()=>showTooltip = false, 3000)
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }
  let images:any[] = []; // this is so that I can refer to each image so I can check if the picture is a placeholder or not
  $: modalState, () => {images = images}; // need this weird function to correctly have the images array function as intended

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
{#key $gallery}
<div class="gallery" style={matches ? `display:${selectedMode}` : "display:grid"}>
  {#if $gallery.length > 0}
  {#each $gallery as artwork, i (artwork.id)}
    <div class="container" style={matches ? `width: ${width}` : `width: auto`}>
      <div class="actions">
        {#if images[i]}
        {#if !images[i].src.includes(placeholder)}
        <Seen {artwork}/>
        {/if}
        {/if}
        <Add {openModal} container={artwork.id}/>
        <Delete container={artwork.id}/>
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
    width: auto;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
    grid-auto-rows: min-content;
    padding: 5px;
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