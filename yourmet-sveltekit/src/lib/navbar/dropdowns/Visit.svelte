<script>
  import { fade } from "svelte/transition";
  let mouseState = false;
</script>

<div class="bottombarLinks" on:mouseenter={()=> mouseState = true} on:mouseleave={()=> mouseState = false}>
  <span class="bottombarText">Visit</span>
  {#if mouseState}
  <div class="dropdownMenu">
    <a href="https://www.metmuseum.org/visit/plan-your-visit" target="_blank" rel="noreferrer">
      <div class="dropdownLinks">Plan Your Visit</div>
    </a>
    <a href="https://engage.metmuseum.org/admission" target="_blank" rel="noreferrer">
      <div class="dropdownLinks">Buy Tickets</div>
    </a>
    <a href="https://www.metmuseum.org/join-and-give/membership" target="_blank" rel="noreferrer">
      <div class="dropdownLinks">Become a Member</div>
    </a>
    <a href="https://maps.metmuseum.org/?screenmode=base&floor=1#hash=17/40.779448/-73.963517/-61" target="_blank" rel="noreferrer">
      <div class="dropdownLinks">Museum Map</div>
    </a>
    <a href="https://www.metmuseum.org/visit/dining" target="_blank" rel="noreferrer">
      <div class="dropdownLinks">Food and Drink</div>
    </a>
    <a href="https://www.metmuseum.org/visit/accessibility" target="_blank" rel="noreferrer">
      <div class="dropdownLinks">Accessibility</div>
    </a>
    <a href="https://www.metmuseum.org/visit/group-visits" target="_blank" rel="noreferrer">
      <div class="dropdownLinks bottomDropdownLinks">Group Visits</div>
    </a>
  </div>
  {/if}
</div>

<style>
  .bottombarLinks {
    min-width: 45px;
  }

</style>