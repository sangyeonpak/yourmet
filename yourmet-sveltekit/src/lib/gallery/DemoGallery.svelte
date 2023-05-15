<script lang="ts">
  import placeholder from "./placeholder.jpg"
  import DemoDelete from "../buttons/DemoDelete.svelte";
  import Add from "../buttons/Add.svelte";
  import GalleryView from "../buttons/GalleryView.svelte";
  import GridView from "../buttons/GridView.svelte";
  import Share from "../buttons/Share.svelte";
  export let openModal:any;
  export let modalState:boolean;
  export let gallery:any;
  export let galleryIsGallery:any;
  $: displayed = [...gallery];
  //
  let selectedMode:string = "grid"
  let width:any = "370px"
	import MediaQuery from '$lib/MediaQuery.svelte';
  let showTooltip:boolean = false;
  function selectMode(view:string){
    selectedMode = view;
  }
  function share() {
    showTooltip = true;
    setTimeout(()=>showTooltip = false, 3000)
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


<MediaQuery query="(min-width: 600px)" let:matches>
<div class="buttons">
  {#if matches}
    <GalleryView {selectMode}/>
    <GridView {selectMode}/>
  {/if}
    <Share {share}/>
  {#if showTooltip}
  <div class="tooltip">
    Register to share your gallery!
  </div>
  {/if}
</div>
<div class="gallery" style={matches ? `display:${selectedMode}` : "display:grid"}>
  {#if displayed.length > 0}
  {#each displayed as artwork, i (artwork.id)}
    <div class="container" style={matches ? `width: ${width}` : `width: auto`}>
      <div class="actions">
        {#if images[i]}
        {#if !images[i].src.includes(placeholder)}
        {#if matches}
        <button class="actionButton" on:click={() => isADemo(artwork)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
        </button>
        {:else}
        <button class="actionButton" on:click={() => isADemo(artwork)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
          </svg>
        </button>
        {/if}
        {/if}
        {/if}
        {#if matches}
        <Add {openModal} container={artwork.id}/>
        <DemoDelete container={artwork.id} {gallery} {galleryIsGallery} dimensions={32} fontSize={14}/>
        {:else}
        <Add {openModal} container={artwork.id}/>
        <DemoDelete container={artwork.id} {gallery} {galleryIsGallery} dimensions={40} fontSize={16}/>
        {/if}
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
      {#if artwork.seen}
      <div class="seenTooltip">Register to mark as seen!</div>
      {/if}
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
</MediaQuery>


<style>

  .seenTooltip{
    position:absolute;
    border: 1px solid lightgray;
    display:flex;
    flex-direction: column;
    justify-content: center;
    background-color: white;
    text-align: center;
    padding: 1rem;
    font-size: 20px;
    z-index: 1;
    border-radius: 5px;
    font-size: .9rem;
    font-weight: 500;
    box-shadow:5px 5px 5px rgba(0, 0, 0, 0.2);
    width: auto;
    overflow-wrap: break-word;
    margin-right: 15px;
    left: 10px;
    top: 50px;
  }

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
  .image{
    max-height: 300px;
    width: auto;
    height: auto;
    object-fit: scale-down;
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
  @media (max-width: 1100px) {
    .actionButton {
      height: 40px;
      width: 40px;
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
    .image{
      width: 100%;
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


</style>