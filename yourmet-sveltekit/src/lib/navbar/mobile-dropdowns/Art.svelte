<script>
  import { fade } from "svelte/transition";
  let mouseState = false;
</script>

<div class="mobileDropdown">
  <a class="mobileLink" on:click={()=> mouseState = !mouseState}><div>Art</div></a>
  {#if mouseState}
    <a class="mobileSublink" href="https://www.metmuseum.org/art/the-collection" target="_blank" rel="noreferrer"><div>The Met Collection</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/about-the-met/collection-areas" target="_blank" rel="noreferrer"><div>Curatorial Areas</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/about-the-met/conservation-and-scientific-research" target="_blank" rel="noreferrer"><div>Convservation and Scientific Research</div></a>
  {/if}
</div>

<style>
  .mobileLink {
    height: 52px;
    background-color: white;
    align-items: center;
    width: 340px;
  }
  .mobileSublink {
    height: 40px;
    background-color: white;
    align-items: center;
    width: 340px;
  }
  .mobileDropdown {
    display: flex;
    flex-direction: column;

  }
</style>