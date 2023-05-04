<script>
  import { fade } from "svelte/transition";
  let mouseState = false;
</script>

<div class="mobileDropdown">
  <a class="mobileLink" on:click={()=> mouseState = !mouseState}><div>Research</div></a>
  {#if mouseState}
    <a class="mobileSublink" href="https://www.metmuseum.org/art/libraries-and-research-centers" target="_blank" rel="noreferrer"><div>Libraries and Research Centers</div></a>
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