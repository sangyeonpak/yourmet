<script lang="ts">
  export let closeModal:any;
  export let gallery:any;
  export let id:number;
  export let container:number;
  let info:any = {};
  let body:any = {};
  let isItAlreadyThere:boolean = false;
  let showTooltip:boolean = false;
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
  for (let toFind of gallery){ // performs a check to see if the art is already in gallery
    let extracted:any;
    promise.then((body) => {
      extracted = body;
      if (toFind.image_id == extracted.image_id){
      isItAlreadyThere = true;
    }})
  }
  // id: index,
  //     image_id: null,
  //     image_url: null,
  //     info_url: null,
  //     name: null,
  //     artist: null,
  //     year:null
  function addToGallery(container:number) {
    for (let i = 0; i < gallery.length; i++){
      if (gallery[i].id == container){
        gallery[i].image_id = body.image_id;
        gallery[i].image_url = body.image_url;
        gallery[i].info_url = body.info_url;
        gallery[i].name = body.name;
        gallery[i].artist = body.artist;
        gallery[i].year = body.year;
      }
    }
    closeModal();
  }
  function isADemo(){
    showTooltip = true;
  }
</script>

{#if info.message == undefined}
{#await promise then body}
<div class="wrapper">
  <div class="container">
    <div class="imageWrapper">
      {#if isItAlreadyThere}
      <a href={body.info_url} target="_blank" rel="noreferrer">
        <div class="veil">Already displayed in YourMet</div>
      </a>
      {/if}
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
    <p class="name">{body.name || "Untitled"}</p>
    <p class="text">{body.year || "Date unknown"}</p>
    <p class="text">{body.wing || "Currently not at the Met"}</p>
    <div class="resultButtonsDiv">
      <button class="markSeenButtonResults" on:click={isADemo}>
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
      {#if !isItAlreadyThere}
      <button class="addToGalleryButton" on:click={() => addToGallery(container)}>+</button>
      {/if}
      {#if showTooltip}
      <div>Register to mark as seen!</div>
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
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    color: white;
    justify-content: center;
    align-items: center;
    font-weight: 100;
    /* font-style: italic; */
    font-size: 16px;
  }

  .container {
    width: 600px;
  }

  .wrapper {
    display: flex;
    outline: 1px solid lightgray;
    padding: 5px;
    margin-bottom: 1rem;
  }


  .info {
    width: 100%;
    text-align: left;
    padding-left: 30px;
    font-weight: 400;
  }
  .text {
    font-size: 15px;
    font-weight: 400;
  }
  .name {
    font-size: 18px;
    /* font-style: italic; */
    font-weight: 700;
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

  .veil:hover ~ .image {
    transform: scale(1.05);
  }
</style>