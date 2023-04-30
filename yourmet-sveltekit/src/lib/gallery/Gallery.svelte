<script lang="ts">
	import { userInfo, gallery } from "$lib/stores"
  import Delete from "../buttons/Delete.svelte";
  import Add from "../buttons/Add.svelte";
  import Seen from "../buttons/Seen.svelte";
  import GalleryView from "./modes/GalleryView.svelte";
  import GridView from "./modes/GridView.svelte";
  export let openModal:any;
  export let modalState:boolean;
  let selectedMode:string = "grid";
  // $: selectedMode = $userInfo.view_mode
  // $: if ($user) {
  //   fetchUser($user.email).then(data => {
  //     if (data.view_mode){
  //       selectedMode = data.view_mode;
  //     }
  //     reload(1, data.username); // reload is here because when I tried to do it in +page, $user wouldn't correctly detect changes and would never fire; this ensures reload fires when gallery is rendered
  //   });
  // }

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
  let images:any[] = []; // this is so that I can refer to each image so I can check if the picture is a placeholder or not
  $: modalState, () => {images = images}; // need this weird function to correctly have the images array function as intended

</script>

<div class="modes">
  <GalleryView {selectMode}/>
  <GridView {selectMode}/>
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
  .gallery {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    background-color: #f8f8f8;
    border: 1px solid lightgray;
    margin: auto;
    width: 90vw;
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
  .image{
    transform: scale(.95, .95);
  }
</style>