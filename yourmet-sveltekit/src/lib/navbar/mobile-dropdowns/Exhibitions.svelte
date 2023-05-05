<script lang="ts">
  import { art, exhibition, learn, research, visit, yourMet } from '$lib/stores';
  let classState:any;
  let linkState:any;
  function toggle() {
    art.set(false);
    exhibition.set(!$exhibition);
    learn.set(false);
    research.set(false);
    visit.set(false);
    yourMet.set(false);

  }
  $: $exhibition ? classState = "plus-active" : classState = "plus";
  $: $exhibition ? linkState = "mobileLink-active" : linkState = "mobileLink";
</script>

<div class="mobileDropdown">
  <a class={linkState} on:click={toggle}>
    <div class="mobileInnerWrapper">
      <div class="mobileLinkText">Exhibitions and Events</div>
      <div class="mobileLinkButton"><div class={classState}></div></div>
    </div>
  </a>
  {#if $exhibition}
  <div class="mobileSubWrapper">
    <a class="mobileSublink" href="https://www.metmuseum.org/exhibitions" target="_blank" rel="noreferrer"><div>Exhibitions</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/events/whats-on" target="_blank" rel="noreferrer"><div>Events and Tours</div></a>
    <a class="mobileSublink" href="https://www.metmuseum.org/events/whats-on?tab=Events&categories=Performances" target="_blank" rel="noreferrer"><div>Performances</div></a>
  </div>
  {/if}
</div>
