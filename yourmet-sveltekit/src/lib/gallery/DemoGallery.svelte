<script lang="ts">
  import { fade } from "svelte/transition";
  import { fly } from 'svelte/transition';
  import DemoDelete from "../buttons/DemoDelete.svelte";
  import Add from "../buttons/Add.svelte";
  import GalleryView from "../buttons/GalleryView.svelte";
  import GridView from "../buttons/GridView.svelte";
  import Share from "../buttons/Share.svelte";
  export let openModal:any;
  export let modalState:boolean;
  export let gallery:any;
  export let galleryIsGallery:any;
  let showSeenTooltip:boolean = false;
  $: displayed = [...gallery];
  //
  let selectedMode:string = "grid"
	import MediaQuery from '$lib/MediaQuery.svelte';
  let showTooltip:boolean = false;
  function selectMode(view:string){
    selectedMode = view;
  }
  let text = "Register to share your gallery!"
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

  function isADemo(artwork:any){
    artwork.seen = true;
    gallery = gallery;
    setTimeout(() => {
      artwork.seen = false;
      gallery=gallery;
    }, 3000)
  }
</script>

{#if showTooltip}
  <div class="tooltip" in:fly="{{ y: -220, duration: 750 }}" out:fly="{{ y: -220, duration: 750 }}">
    <div style="margin-left:-10px;"><span style="margin-left:10px;">{text}</span></div>
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
<div class="gallery" style="display:{selectedMode}">
  {#if displayed.length > 0}
  {#each displayed as artwork, i (artwork.id)}
  <div class="wrapper" >
    <div class="container" >
      <DemoDelete container={artwork.id} {gallery} {galleryIsGallery}/>
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
      {#if artwork.seen}
      <div in:fade out:fade>Register to mark as seen!</div>
      {/if}
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
        <button class="markSeenButton" on:click={() => isADemo(artwork)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
        </button>
        {/if}
      {/if}
    </div>
  </div>
  {/each}
  {/if}
</div>
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