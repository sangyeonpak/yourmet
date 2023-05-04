<script>
  import { fade } from "svelte/transition";
  let mouseState = false;
</script>

<div class="mobileDropdown">
  <a class="mobileLink" on:click={()=> mouseState = !mouseState}><div>Visit</div></a>
  {#if mouseState}
    <a class="mobileSublink" href="https://www.metmuseum.org/art/libraries-and-research-centers" target="_blank" rel="noreferrer"><div>Libraries and Research Centers</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/visit/plan-your-visit" target="_blank" rel="noreferrer">
      <div>Plan Your Visit</div>
    </a>
    <a class="mobileSublink" href="https://engage.metmuseum.org/admission" target="_blank" rel="noreferrer">
      <div>Buy Tickets</div>
    </a>
    <a class="mobileSublink" href="https://www.metmuseum.org/join-and-give/membership" target="_blank" rel="noreferrer">
      <div>Become a Member</div>
    </a>
    <a class="mobileSublink" href="https://maps.metmuseum.org/?screenmode=base&floor=1#hash=17/40.779448/-73.963517/-61" target="_blank" rel="noreferrer">
      <div>Museum Map</div>
    </a>
    <a class="mobileSublink" href="https://www.metmuseum.org/visit/dining" target="_blank" rel="noreferrer">
      <div>Food and Drink</div>
    </a>
    <a class="mobileSublink" href="https://www.metmuseum.org/visit/group-visits" target="_blank" rel="noreferrer">
      <div>Group Visits</div>
    </a>
    <a class="mobileSublink" href="https://www.metmuseum.org/visit/accessibility" target="_blank" rel="noreferrer">
      <div>Accessibility</div>
    </a>
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