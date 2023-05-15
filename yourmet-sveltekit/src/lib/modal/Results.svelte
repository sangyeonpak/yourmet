<script lang="ts">
	import { userInfo, gallery } from "$lib/stores"
  import unavailable from "./unavailable.jpg"
  import SeenResults from "$lib/buttons/SeenResults.svelte";
  export let closeModal:any;
  export let id:number;
  export let container:number;
  let info:any = {};
  let body:any = {};
  let isItAlreadyThere:boolean = false;
  async function gatherInfo(id:number) {
    let data = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    info = await data.json();
    return body = {
      id: container,
      image_id: info.objectID,
      image_url: info.primaryImageSmall,
      info_url: info.objectURL,
      name: info.title,
      artist: info.artistDisplayName,
      born: info.artistBeginDate,
      death: info.artistEndDate,
      year: info.objectDate,
      wing: info.department
    }
  }
  let promise = gatherInfo(id) // so that the art can only render only after all info loads
  for (let toFind of $gallery){ // performs a check to see if the art is already in gallery
    let extracted:any;
    promise.then((body) => {
      extracted = body;
      if (toFind.image_id == extracted.image_id){
      isItAlreadyThere = true;
    }})
  }
  function addToGallery(container:number) {
    fetch(`/api/art/`, {
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    for (let i = 0; i < $gallery.length; i++){
      if ($gallery[i].id == container){
        $gallery[i].image_id = body.image_id;
        $gallery[i].image_url = body.image_url;
        $gallery[i].info_url = body.info_url;
        $gallery[i].name = body.name;
        $gallery[i].artist = body.artist;
        $gallery[i].year = body.year;
      }
    }
    closeModal();
  }
</script>

{#if info.message == undefined}
{#await promise then body}
<div class="wrapper">
  <div class="container" style={body.image_url ? null : "background: none"}>
    <div class="imageWrapper">
      {#if isItAlreadyThere}
      <a href={body.info_url} target="_blank" rel="noreferrer">
        <div class="veil">Already displayed in YourMet</div>
      </a>
      {/if}
      <a href={body.info_url} style={isItAlreadyThere ? "filter: brightness(0.4)": null} target="_blank" rel="noreferrer">
        {#if body.image_url}
        <img
          src={body.image_url}
          alt="Unavailable."
          class="image"
        />
        {:else}
        <img
          src={unavailable}
          alt="Unavailable."
          class="image"
        />
        {/if}
      </a>
    </div>
  </div>
  <div class="info">
    <p class="text">
      {#if body.artist}
        {body.artist}
          {#if body.born != null && body.born != 0 && body.death != null && body.born != null}
            {#if body.death == 9999}
            ({body.born})
            {:else}
            ({body.born}-{body.death})
            {/if}
          {/if}
        {:else}
        Unknown artist
      {/if}
    </p>
    <p class="name">{body.name || "Untitled"}</p>
    <p class="text">{body.year || "Date unknown"}</p>
    <p class="text">{body.wing || "Currently not at the Met"}</p>
    <div class="resultButtonsDiv">
      <SeenResults artwork={body}/>
      {#if !isItAlreadyThere}
      <button class="addToGalleryButton" on:click={() => addToGallery(container)}>+</button>
      {/if}
    </div>
  </div>
</div>
{/await}
{/if}

<style>
  .veil {
    display: flex;
    position: absolute;
    z-index: 7;
    width: 100%;
    height: 100%;
    color: white;
    justify-content: center;
    align-items: center;
    font-weight: 100;
    /* font-style: italic; */
    font-size: 16px;
  }
  .image{
    max-height: 300px;
    object-fit: scale-down;
  }
  .container {
    width: 500px;
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(228, 228, 228);
  }

  .wrapper {
    display: flex;
    outline: 1px solid lightgray;
    padding: 5px;
    margin-bottom: 1rem;
  }

  .imageWrapper{
    display: flex;
    max-height: 100%;
    margin-bottom: -2px;

  }

  .info {
    width: 100%;
    text-align: left;
    padding-left: 15px;
    font-weight: 400;
  }
  .text {
    font-size: 15px;
    font-weight: 400;
  }
  .name {
    font-size: 18px;
    /* font-style: italic; */
  }
  @media (max-width: 800px) {
    .wrapper {
      flex-direction: column;
      align-items: center;
    }
    img {
      object-fit: scale-down;
    }
    .container{
      width: 80%;
    }
    .info {
      width: 80%;
      padding-left: 0;
    }
  }
</style>