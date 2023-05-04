<script>
  import { fade } from "svelte/transition";
  let mouseState = false;
</script>

<div class="mobileDropdown">
  <a class="mobileLink" on:click={()=> mouseState = !mouseState}><div>Exhibitions and Events</div></a>
  {#if mouseState}
    <a class="mobileSublink" href="https://www.metmuseum.org/exhibitions" target="_blank" rel="noreferrer"><div>Exhibitions</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/events/whats-on" target="_blank" rel="noreferrer"><div>Events and Tours</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/events/whats-on?tab=Events&categories=Performances" target="_blank" rel="noreferrer"><div>Performances</div></a>
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