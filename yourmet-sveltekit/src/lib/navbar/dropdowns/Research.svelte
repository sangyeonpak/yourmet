<script>
  import { fade } from "svelte/transition";
  let mouseState = false;
</script>

<div class="bottombarLinks" on:mouseenter={()=> mouseState = true}  on:mouseleave={()=> mouseState = false}>
  <span class="bottombarText">Research</span>
  {#if mouseState}
  <div class="dropdownMenu">
    <a href="https://www.metmuseum.org/art/libraries-and-research-centers" target="_blank" rel="noreferrer"><div class="dropdownLinks">Libraries and Research Centers</div></a>
  </div>
  {/if}
</div>

<style>
  .bottombarLinks {
    min-width: 80px;
  }
</style>