<script>
  import { fade } from "svelte/transition";
  let mouseState = false;
</script>

<div class="bottombarLinks" on:mouseenter={()=> mouseState = true}  on:mouseleave={()=> mouseState = false}>
  <a class="bottombarText" href="#" rel="noreferrer" >Research</a>
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
  .bottombarLinks:hover .text{
    border-bottom: 2px solid black;
  }
  .text{
    border-bottom: 2px solid white;
    padding-bottom: 10px;
    transition: .2s;
  }
</style>