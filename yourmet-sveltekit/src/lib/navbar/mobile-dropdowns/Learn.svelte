<script>
  import { fade } from "svelte/transition";
  let mouseState = false;
</script>

<div class="mobileDropdown">
  <a class="mobileLink" on:click={()=> mouseState = !mouseState}><div>Learn With Us</div></a>
  {#if mouseState}
    <a class="mobileSublink" href="https://www.metmuseum.org/learn/learning-resources" target="_blank" rel="noreferrer"><div>Learning Resources</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/art/metpublications" target="_blank" rel="noreferrer"><div>Publications</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/toah/" target="_blank" rel="noreferrer"><div>Timeline of Art History</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/learn/workshops-and-activities" target="_blank" rel="noreferrer"><div>Workshop and Activities</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/perspectives" target="_blank" rel="noreferrer"><div>Articles, Videos, and Podcasts</div></a>

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