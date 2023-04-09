<script>
  import { fade } from "svelte/transition";
  let mouseState = false;
</script>

<div class="bottombarLinks" on:mouseenter={()=> mouseState = true} on:mouseleave={()=> mouseState = false}>
  <a class="bottombarText" href="#" rel="noreferrer" >Art</a>
  {#if mouseState}
  <div class="dropdownMenu" >
    <a href="https://www.metmuseum.org/art/the-collection" target="_blank" rel="noreferrer"><div class="dropdownLinks">The Met Collection</div></a>
    <a href="https://www.metmuseum.org/about-the-met/collection-areas" target="_blank" rel="noreferrer"><div class="dropdownLinks">Curatorial Areas</div></a>
    <a href="https://www.metmuseum.org/about-the-met/conservation-and-scientific-research" target="_blank" rel="noreferrer"><div class="dropdownLinks">Convservation and Scientific Research</div></a>
  </div>
  {/if}
</div>

<style>
  .bottombarLinks {
    min-width: 35px;
  }
  .bottombarLinks:hover .text{
    border-bottom: 2px solid black;
  }
  .text{
    border-bottom: 2px solid white;
    padding-bottom: 10px;
    transition: .2s;
  }
</style>