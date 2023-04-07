<script lang="ts">
  import Results from "./Results.svelte"
  export let closeModal:any;
  let query:string;
  let parsed:any;
  export async function searchArt() {
    let data = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`)
    parsed = await data.json();
    console.log(parsed);
  }
  let index:number = 5;
  $: index;
  function showMore() {
    index+=5;
  }

</script>

<div class="modal">
  <div class="wrapper">
    <div class="separator"></div>
    <div class="instructions">Search for an artwork or artist</div>
  </div>
  <input class="input" type="text" bind:value={query} on:submit={searchArt}/>
  <button class="closeModalButton" on:click={closeModal}>X</button>
  <button class="submitSearchButton" on:click={searchArt}>Search</button>
  {#if parsed!= undefined && parsed.total < 5}
    {#each parsed.objectIDs as id}
      <Results id={id}/>
    {/each}
  {/if}
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

  .instructions {
    text-align: left;
    padding-bottom: 10px;
    font-size: 20px;
  }

  .separator {
    width: 7.1%;
  }

  .input {
    padding-left: 20px;
    width: 80%;
    height: 50px;
    font-size: 30px;
    margin: 0px 85px 20px 0px;
  }
</style>