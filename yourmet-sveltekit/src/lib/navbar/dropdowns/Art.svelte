<script>
  import { fade } from "svelte/transition";
  let mouseState = false;
</script>

<div class="bottombarLinks" on:mouseenter={()=> mouseState = true} on:mouseleave={()=> mouseState = false}>
  <a href="#" rel="noreferrer" >Art</a>
  {#if mouseState}
  <hr transition:fade={{duration: 100}} class="linkUnderline">
  {/if}
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
    min-width: 31px;
  }
</style>