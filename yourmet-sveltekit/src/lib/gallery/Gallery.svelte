<script lang="ts">
	import { userInfo, gallery } from "$lib/stores"
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';
  import Delete from "../buttons/Delete.svelte";
  import Add from "../buttons/Add.svelte";
  import Seen from "../buttons/Seen.svelte";
  import GalleryView from "../buttons/GalleryView.svelte";
  import GridView from "../buttons/GridView.svelte";
  import Share from "../buttons/Share.svelte";
  export let openModal:any;
  export let modalState:boolean;
  let selectedMode:string = "grid"
  $: if ($userInfo) {
    selectedMode = $userInfo.view_mode;
  }
  let showTooltip:boolean = false;
  function selectMode(view:string){
    selectedMode = view;
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
  let text = $page.url.href.replace('/gallery/', '/gallery/visitor/');
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

{#if showTooltip}
  <div class="tooltip" in:fly="{{ y: -220, duration: 750 }}" out:fly="{{ y: -220, duration: 750 }}">
    <div style="margin-left:-10px;">Copied your visitor's link to your clipboard: <span style="margin-left:10px;">{text}</span></div>
    <button class="closeTip" on:click={()=>showTooltip=false}>
      X
    </button>
  </div>
{/if}
<div class="buttons">
  <GalleryView {selectMode}/>
  <GridView {selectMode}/>
  <Share {share}/>
</div>
{#key $gallery}
<div class="gallery" style="display:{selectedMode}">
  {#if $gallery.length > 0}
  {#each $gallery as artwork, i (artwork.id)}
  <div class="wrapper" >
    <div class="container" >
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
            <div class="info">{artwork.artist || "Unknown"}</div>
            <div class="name">{artwork.name || "Untitled"}</div>
            <div class="info">{artwork.year || "Unknown"}</div>
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
  {/if}
</div>
{/key}

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