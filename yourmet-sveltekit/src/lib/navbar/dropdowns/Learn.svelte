<script>
  import { fade } from "svelte/transition";
  let mouseState = false;
</script>

<div class="bottombarLinks" on:mouseenter={()=> mouseState = true} on:mouseleave={()=> mouseState = false}>
  <span class="bottombarText">Learn With Us</span>
  {#if mouseState}
  <div class="dropdownMenu">
    <a href="https://www.metmuseum.org/learn/learning-resources" target="_blank" rel="noreferrer"><div class="dropdownLinks">Learning Resources</div></a>
    <a href="https://www.metmuseum.org/art/metpublications" target="_blank" rel="noreferrer"><div class="dropdownLinks">Publications</div></a>
    <a href="https://www.metmuseum.org/toah/" target="_blank" rel="noreferrer"><div class="dropdownLinks">Timeline of Art History</div></a>
    <a href="https://www.metmuseum.org/learn/workshops-and-activities" target="_blank" rel="noreferrer"><div class="dropdownLinks">Workshop and Activities</div></a>
    <a href="https://www.metmuseum.org/perspectives" target="_blank" rel="noreferrer"><div class="dropdownLinks bottomDropdownLinks">Articles, Videos, and Podcasts</div></a>
  </div>
  {/if}
</div>

<style>
  .bottombarLinks {
    min-width: 113px;
  }
</style>