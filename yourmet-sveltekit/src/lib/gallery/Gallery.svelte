<script lang="ts">
  import Delete from "../buttons/Delete.svelte";
  import Add from "../buttons/Add.svelte";
  import Seen from "../buttons/Seen.svelte";
  import Unsee from "../buttons/Unsee.svelte";
  export let gallery:any;
  export let openModal:any;
  export let reload:any;
  let images:any[] = [];
  // console.log(images);
  // console.log(gallery);
  // image_id, image_url, info_url, name, artist, year, id
  // $: console.log(modalState);
  // function getImageUrls() {
  //   for (let i = 0; i < images.length; i++) {
  //     const imageUrl = images[i].src;
  //     console.log(imageUrl);
  //   }
  // }
</script>

<div class="gallery">
  <!-- <button on:click={getImageUrls}>getimga</button> -->
  {#each gallery as artwork, i}
  <div class="wrapper">
    <div class="container">
      <div>{artwork.id}</div>
      <Delete reload={reload} container={artwork.id}/>
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
      {i}
      {#if images[i]}
      <div>{images[i]}</div>
      <div class="info">{#if artwork.artist}{artwork.artist}{:else}Unknown{/if}</div>
      <div class="name">{#if artwork.name}{artwork.name}{:else}Untitled{/if}</div>
      <div class="info">{#if artwork.year}{artwork.year}{:else}Unknown{/if}</div>
      {/if}
      <Add openModal={openModal} container={artwork.id}/>
      {#if artwork.image_url}
      <Seen />
      <!-- <Unsee /> -->
      {/if}
    </div>
  </div>
  {/each}
</div>

<style>
  .wrapper {
  margin: auto;
  justify-content: space-evenly;
  }
  .container {
  position: relative;
  text-align: center;
  background-color: rgb(252, 252, 252);
  border: 1px solid lightgray;
  padding: 5px;
  margin: 10px;
  top: 50%;
  min-width: 300px;
  transform: translateY(0%);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
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