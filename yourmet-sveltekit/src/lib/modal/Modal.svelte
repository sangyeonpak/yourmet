<script lang="ts">
  import Results from "./Results.svelte"
  export let reload:any;
  export let seen:any;
  export let closeModal:any;
  export let container:number;
  let rebuilder:number = 0;
  let query:string;
  let parsed:any;
  let stream:any;
  let searched:boolean = false;
  let index:number = 5;
  async function searchArt() {
    if (query == null) return;
    parsed = {};
    let data = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`)
    parsed = await data.json();
    if (parsed.total >= 5){
      stream = parsed.objectIDs.slice(0, index);
    }
    // console.log(parsed);
    searched = true;
    rebuilder++;
  }

  function showMore() {
    stream = [...stream, ...parsed.objectIDs.slice(index, index+5)]
    index += 5;
  }
</script>

<div class="modal">
  <div class="wrapper">
    <div class="separator"></div>
    <div class="instructions">Search for an artwork or artist</div>
  </div>
    <form class="form" on:submit|preventDefault={searchArt}>
      <input class="input" type="text" bind:value={query} />
      <button class="submitSearchButton" >Search</button>
    </form>
  <button class="closeModalButton" on:click={closeModal} on:click={() => searched = false}>X</button>
  {#key rebuilder}
  {#if searched && parsed.total === 0}
    <div class="oops">Oops! There are no results found. Please try another search.</div>
  {:else if searched && parsed.total <= 5}
    {#each parsed.objectIDs as id}
      <Results id={id} seen={seen} searched={searched} container={container} closeModal={closeModal} reload={reload}/>
    {/each}
  {:else if searched && parsed.total > 5}
    {#each stream as id}
      <Results id={id} seen={seen} searched={searched} container={container} closeModal={closeModal} reload={reload}/>
    {/each}
    <div class="bottomWrapper">
      {#if index < parsed.total}
      <button class="showMoreButton" on:click={showMore} >Show more</button>
      {/if}
      <button class="closeModalBottom" on:click={closeModal} on:click={() => searched = false}>X</button>
    </div>
  {/if}
  {/key}
</div>
<div class="backdrop"></div>

<style>
  .modal {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  background-color: white;
  padding: 1rem;
  text-align: center;
  width: 70rem;
  z-index: 10;
  position: fixed;
  top: 5vh;
  left: calc(50% - 35rem);
  overflow-y: auto;
  max-height: calc(100vh - 170px);
  }

  .form {
    width: 100%;
    display: flex;
    margin: auto;
    margin-bottom: 10px;
  }

  .submitSearchButton {
    max-height: 40px;
    max-width: 86px;
    font-size: 24px;
    background: none;
    border: none;
    margin-left: 22px;
    border-bottom: 3px white solid;
    transition: 0.15s
  }

  .submitSearchButton:hover{
    border-bottom: 3px black solid;
  }

  .backdrop {
    position: fixed;
    z-index: 4;
    background-color: rgba(0, 0, 0, 0.75);
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
  }

  .wrapper {
    display: flex;
    margin-top: 30px;
  }

  .bottomWrapper{
    height: 50px;
  }

  .instructions {
    text-align: left;
    padding-bottom: 10px;
    font-size: 20px;
  }

  .oops {
    padding: 10px;
    font-size: 20px;
  }

  .separator {
    width: 7.1%;
  }

  .input {
    width: 85%;
    height: 50px;
    font-size: 30px;
    margin-left: 38px;
  }
</style>