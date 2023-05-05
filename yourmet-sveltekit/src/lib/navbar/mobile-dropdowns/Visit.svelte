<script lang="ts">
  import { art, exhibition, learn, research, visit, yourMet } from '$lib/stores';
  let classState:any;
  let linkState:any;
  function toggle() {
    art.set(false);
    exhibition.set(false);
    learn.set(false);
    research.set(false);
    visit.set(!$visit);
    yourMet.set(false);
  }
  $: $visit ? classState = "plus-active" : classState = "plus";
  $: $visit ? linkState = "mobileLink-active" : linkState = "mobileLink";
</script>

<div class="mobileDropdown">
  <a class={linkState} on:click={toggle}>
    <div class="mobileInnerWrapper">
      <div class="mobileLinkText">Visit</div>
      <div class="mobileLinkButton"><div class={classState}></div></div>
    </div>
  </a>
  {#if $visit}
  <div class="mobileSubWrapper">
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
  </div>
  {/if}
</div>
