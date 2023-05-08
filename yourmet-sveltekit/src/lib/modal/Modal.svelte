<script lang="ts">
	import MediaQuery from '$lib/MediaQuery.svelte';
  import Results from "./Results.svelte"
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
    searched = true;
    rebuilder++;
  }

  function showMore() {
    stream = [...stream, ...parsed.objectIDs.slice(index, index+5)]
    index += 5;
  }
</script>

<MediaQuery query="(min-width: 750px)" let:matches>
<div class={searched ? "modal-searched" : "modal"}>
  <div class="wrapper">
    <div class="separator"></div>
    <!-- <div class="instructions">Search for an artwork or artist</div> -->
  </div>
    <form class="form" on:submit|preventDefault={searchArt}>
      <input class="input" type="text" placeholder={matches ? "Search for an artwork or artist" : "Search"} bind:value={query} />
      <button class="submitSearchButton" >Go</button>
    </form>
  <button class="closeModalButton" on:click={closeModal} on:click={() => searched = false}>X</button>
  {#key rebuilder}
  {#if searched && parsed.total === 0}
    <div class="oops">Oops! There are no results found. Please try another search.</div>
  {:else if searched && parsed.total == 1}
    <div class="totalCount">{parsed.total} result for "{query}"</div>
    {#each parsed.objectIDs as id} <!--id in this case is the objectID returned from the array-->
      <Results {id} {container} {closeModal}/>
    {/each}
  {:else if searched && (parsed.total >= 2 && parsed.total <= 5)}
    <div class="totalCount">{parsed.total} results for "{query}"</div>
    {#each parsed.objectIDs as id}
      <Results {id} {container} {closeModal}/>
    {/each}
  {:else if searched && parsed.total > 5}
    <div class="totalCount">{parsed.total} results for "{query}"</div>
    {#each stream as id}
      <Results {id} {container} {closeModal}/>
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
<div class="backdrop" on:click={closeModal} on:click={() => searched = false}></div>
</MediaQuery>

<style>
  .modal {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    background-color: white;
    padding: 1rem;
    text-align: center;
    width: 70%;
    z-index: 8;
    position: fixed;
    top: 10%;
    left: 12.5%;
    overflow-y: auto;
    max-height: calc(100vh - 170px);
    margin-top: 1vh;

  }
    .modal-searched {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    background-color: white;
    padding: 1rem;
    text-align: center;
    width: 70%;
    z-index: 8;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow-y: auto;
    max-height: calc(100vh - 170px);
  }


  .form {
    width: 100%;
    display: flex;
    margin: auto;
    margin-bottom: 50px;
    margin-top: 20px;
  }

  .showMoreButton{
    padding: 10px;
    height: 60px;
    margin: auto;
    transform: translateX(20%);
  }

  .submitSearchButton {
    max-height: 40px;
    max-width: 86px;
    font-size: 30px;
    background: none;
    border: none;
    margin-left: 30px;
    margin-top: 10px;
    border-bottom: 4px white solid;
    transition: 0.15s;
    padding: 0;
  }

  .submitSearchButton:hover{
    border-bottom: 4px black solid;
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
    margin-top: 50px;
  }
  .totalCount{
    text-align: start;
    margin-left: 2px;
    margin-bottom: 20px;
  }
  .oops {
    padding: 10px;
    font-size: 20px;
  }

  .separator {
    width: 38px;
  }

  .input {
    width: 90%;
    height: 50px;
    font-size: 30px;
    padding-left: 10px;
  }
</style>