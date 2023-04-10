<script lang="ts">
  import SeenResults from "$lib/buttons/SeenResults.svelte";
  // interface ForDB {
  //   // id: number,
  //   image_url: string,
  //   info_url: string,
  //   name: string,
  //   artist: string,
  //   born: string,
  //   death: string,
  //   year: string,
  //   wing: string
  // }
  export let seen:any;
  export let closeModal:any;
  export let id:number;
  export let searched:boolean;
  export let container:number;
  export let reload:any;
  let info:any = {};
  let body:any = {};
  async function gatherInfo(id:number) {
    let data = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    info = await data.json();
    body = {
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
  gatherInfo(id);
  function addToGallery(container:number) {
    fetch(`/api/art/${container}`, {
      mode: "cors",
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    closeModal();
  }
</script>

<!-- {#await gatherInfo} -->
<!-- {:then info} -->
<div class="wrapper">
  <div class="container">
    <div class="imageWrapper">
      <a href={body.info_url} target="_blank" rel="noreferrer">
        <img
          src={body.image_url}
          alt="Currently unavailable for view on YourMet. Click here to view the art on our main website."
          class="image"
        />
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
    <p class="name">{#if body.name}{body.name}{:else}Untitled{/if}</p>
    <p class="text">{#if body.year}{body.year}{:else}Date unknown{/if}</p>
    <p class="text">{#if body.wing}{body.wing}{:else}Currently not at the Met{/if}</p>
    <div class="resultButtonsDiv">
      <SeenResults seen={seen} artwork={body} reload={reload}/>
      <button class="addToGalleryButton" on:click={() => addToGallery(container)}>+</button>
    </div>
  </div>
</div>
<!-- {/await} -->

<style>
  .container {
    width: 600px;
  }
  .wrapper {
    display: flex;
    outline: 1px solid lightgray;
    padding: 5px;
  }

  .info {
    width: 100%;
    text-align: left;
    padding-left: 30px;
    font-weight: 400;
  }
  .text {
    font-size: 18px;
    font-weight: 100;
  }
  .name {
    font-size: 30px;
    font-style: italic;
    font-weight: 100;
  }
</style>