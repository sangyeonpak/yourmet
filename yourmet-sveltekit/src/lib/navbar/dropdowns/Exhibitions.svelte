<script>
  import { fade } from "svelte/transition";
  let mouseState = false;
</script>

<div class="bottombarLinks" on:mouseenter={()=> mouseState = true} on:mouseleave={()=> mouseState = false}>
  <span class="bottombarText">Exhibitions and Events</span>
  {#if mouseState}
  <div class="dropdownMenu">
    <a href="https://www.metmuseum.org/exhibitions" target="_blank" rel="noreferrer"><div class="dropdownLinks">Exhibitions</div></a>
    <a href="https://www.metmuseum.org/events/whats-on" target="_blank" rel="noreferrer"><div class="dropdownLinks">Events and Tours</div></a>
    <a href="https://www.metmuseum.org/events/whats-on?tab=Events&categories=Performances" target="_blank" rel="noreferrer"><div class="dropdownLinks bottomDropdownLinks">Performances</div></a>
  </div>
  {/if}
</div>

<style>
  .bottombarLinks {
    min-width: 175px;
  }
  .dropdownMenu {
    width: 202px;
  }
</style>