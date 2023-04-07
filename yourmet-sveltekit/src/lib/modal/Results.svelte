<script lang="ts">
	import UserInfo from '$lib/userinfo/UserInfo.svelte';
  import { onMount } from 'svelte';
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
  export let id:number;
  export let searched:boolean;
  let info:any = {};
  let body:any = {};
  // $: console.log(Object.entries(body));
  export async function gatherInfo(id:number) {
    let data = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
    info = await data.json();
    // console.log(info.message);
    body = {
      // id: number,
      image_url: info.primaryImageSmall,
      info_url: info.objectURL,
      name: info.title,
      artist: info.artistDisplayName,
      born: info.artistBeginDate,
      death: info.artistEndDate,
      year: info.objectDate,
      wing: info.department
    }
    // console.log(body);
  }
  gatherInfo(id);
  body = {};
</script>

{#if searched && info.message == undefined}
<div class="wrapper">
  <div class="container">
    <a href={body.info_url} target="_blank" rel="noreferrer">
      <img
        src={body.image_url}
        alt="Currently unavailable for view on YourMet. Click here to view the art on our main website."
      />
    </a>
  </div>
  <div class="info">
    <p class="text">
      {#if body.artist}
        {body.artist}
          {#if body.born != null && body.born != 0 && body.death != null && body.born != null}
            ({body.born}-{body.death})
          {/if}
        {:else}Unknown artist
      {/if}
    </p>
    <p class="name">{#if body.name}{body.name}{:else}Untitled{/if}</p>
    <p class="text">{#if body.year}{body.year}{:else}Date unknown{/if}</p>
    <p class="text">{#if body.wing}{body.wing}{:else}Currently not at the Met{/if}</p>
    <div class="resultButtonsDiv">
    <!-- {(props.seen.some((match) => match.image_id === image_id) ? filledEye() : unfilledEye())}
    <button class="addToGalleryButton" onClick={addToGallery}>+</button> -->
    </div>
  </div>
</div>
{/if}

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